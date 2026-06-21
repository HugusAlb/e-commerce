# ShopReact — Catálogo de Produtos E-commerce

Atividade Avaliativa de Programação Web II — IFPE 2026.1

---

## Como rodar o projeto

**Pré-requisito:** ter o [Node.js](https://nodejs.org) instalado (versão 18 ou superior).

```bash
# 1. Instalar as dependências do projeto
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev
```

Após rodar o segundo comando, abra o navegador e acesse `http://localhost:5173`.

```bash
# Para gerar a versão final para publicação
npm run build
```

---

## O que é este projeto?

Uma página inicial de loja virtual (e-commerce) feita com **ReactJS**. Ao abrir a página, a aplicação busca automaticamente uma lista de produtos de uma API externa e exibe esses produtos em tela, com nome, imagem, preço e categoria. O usuário também pode buscar produtos pelo nome e filtrar por categoria.

---

## Tecnologias utilizadas

| Tecnologia | Para que serve |
|---|---|
| **ReactJS** | Biblioteca JavaScript para construir interfaces visuais |
| **Vite** | Ferramenta que inicia o projeto rapidamente no navegador durante o desenvolvimento |
| **CSS puro** | Estilização visual dos componentes, sem biblioteca externa |
| **Fetch API** | Recurso nativo do navegador usado para buscar dados de uma API |
| **Fake Store API** | API gratuita que fornece dados fictícios de produtos para testes |

---

## Estrutura de pastas

```
src/
├── services/           # Comunicação com APIs externas
├── hooks/              # Lógica de estado reutilizável
├── components/         # Peças visuais da interface
│   ├── Header/
│   ├── SearchBar/
│   ├── CategoryFilter/
│   ├── ProductList/
│   ├── ProductCard/
│   └── Snackbar/
├── App.jsx             # Componente raiz que monta tudo
└── index.css           # Estilos globais (cores, fontes)
```

---

## Explicação de cada parte

### `services/productsService.js`

**O que faz:** é o único lugar do projeto que sabe o endereço da API e como buscar os dados dela.

**Por que existe separado:** se o endereço da API mudar amanhã, só precisamos editar este arquivo. O resto do projeto não precisa saber de onde os dados vêm.

```
Quando chamado → acessa https://fakestoreapi.com/products
              → retorna a lista de produtos
              → lança um erro se a conexão falhar
```

---

### `hooks/useProducts.js`

**O que é um hook:** em React, um hook é uma função especial que gerencia informações que mudam ao longo do tempo (chamadas de "estado"). Pense nele como um assistente que fica de olho em algo e avisa quando muda.

**O que este hook faz:** gerencia três informações ao mesmo tempo:

- `loading` — verdadeiro enquanto os dados ainda estão sendo buscados
- `products` — a lista de produtos que chegou da API
- `error` — a mensagem de erro, caso a busca falhe

**Fluxo de funcionamento:**

```
Página abre → loading = true
           → chama productsService para buscar os dados
           → [sucesso] products = lista de produtos, loading = false
           → [falha]   error = mensagem do erro, loading = false
```

A busca é feita com `async/await` dentro de um bloco `try/catch/finally`:
- `try` — tenta buscar os dados
- `catch` — captura o erro se a busca falhar
- `finally` — executa **sempre** (com ou sem erro), por isso é onde o `loading` é desligado — evita repetir essa linha nos dois casos

O `useEffect` não aceita função `async` diretamente, então a função `load` é declarada dentro dele e chamada logo em seguida — esse é o padrão correto para usar `async/await` dentro de `useEffect`.

O hook também fornece `clearError`, uma função que apaga o erro (usada para fechar o Snackbar).

---

### `components/`

Em React, a interface é dividida em **componentes**: peças independentes e reutilizáveis, cada uma responsável por uma parte da tela. Pense como blocos de montar — cada bloco cuida do próprio visual e comportamento.

---

#### `Header/`

**O que aparece na tela:** a barra escura no topo com o nome "ShopReact".

**O que faz:** funciona como moldura do cabeçalho. Ele mesmo não tem campo de busca nem filtro — delega isso para os componentes filhos `SearchBar` e `CategoryFilter`, que ficam dentro dele.

---

#### `SearchBar/`

**O que aparece na tela:** o campo de texto "Buscar produto..." dentro do cabeçalho.

**O que faz:** captura o que o usuário digita e avisa o `App` para filtrar os produtos em tempo real. O SearchBar não faz a filtragem — ele só repassa o texto digitado para quem pediu.

---

#### `CategoryFilter/`

**O que aparece na tela:** o botão vermelho "Todas as categorias" (que é um menu suspenso).

**O que faz:** exibe as categorias disponíveis com base nos produtos carregados. Quando o usuário escolhe uma categoria, avisa o `App` para filtrar a lista.

---

#### `ProductList/`

**O que aparece na tela:** a grade com todos os cards de produto.

**O que faz:** recebe a lista de produtos já filtrados e os renderiza em grade. Se a lista estiver vazia, exibe "Nenhum produto encontrado." em vez de uma grade vazia.

---

#### `ProductCard/`

**O que aparece na tela:** cada card individual de produto, com imagem, nome, categoria, avaliação, preço e botão "Adicionar ao carrinho".

**O que faz:** recebe os dados de um produto e os exibe de forma organizada. Também trata o caso em que a imagem falha ao carregar, mostrando "Sem imagem" no lugar.

---

#### `Snackbar/`

**O que aparece na tela:** uma caixa vermelha no canto superior direito quando ocorre um erro de conexão.

**O que faz:** notifica o usuário de que algo deu errado ao buscar os produtos. Desaparece sozinho após 5 segundos ou pode ser fechado manualmente pelo botão `✕`. Tem animação de entrada (desliza da direita) e de saída (desliza de volta).

**Detalhe técnico (para curiosos):** o componente gerencia internamente um estado `closing`. Quando o fechamento é acionado, ele primeiro aplica a animação de saída (300ms) e só depois remove o componente da tela, garantindo que o usuário veja a animação completa.

---

### `App.jsx`

**O que faz:** é o componente principal que monta todos os outros. Ele:

1. Usa o hook `useProducts` para obter os dados
2. Gerencia o texto de busca e a categoria selecionada
3. Calcula a lista filtrada combinando os dois filtros
4. Passa as informações certas para cada componente filho

O `App` não sabe como buscar dados da API (isso é do `productsService`), não sabe como gerenciar loading/error (isso é do `useProducts`) e não sabe como renderizar um card (isso é do `ProductCard`). Ele apenas **coordena** quem recebe o quê.

---

## Fluxo completo da aplicação

```
Usuário abre a página
  └─ App monta
       └─ useProducts é acionado
            └─ productsService busca a API
                 ├─ [enquanto busca] mostra spinner "Carregando produtos..."
                 ├─ [sucesso] ProductList exibe os cards
                 └─ [erro] Snackbar aparece no canto superior direito

Usuário digita na busca
  └─ SearchBar avisa o App
       └─ App recalcula a lista filtrada
            └─ ProductList atualiza os cards exibidos

Usuário escolhe uma categoria
  └─ CategoryFilter avisa o App
       └─ App recalcula a lista filtrada
            └─ ProductList atualiza os cards exibidos
```

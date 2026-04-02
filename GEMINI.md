# Amazonia Travel e Events

Este documento (`GEMINI.md`) descreve a arquitetura, funcionalidades, regras de negócios e tecnologias aplicadas no projeto **Amazonia Travel e Events**, servindo como um guia principal do sistema e do seu processo de desenvolvimento.

---

## 1. Principais Recursos do Projeto

- **Vitrine de Pacotes e Destinos:** Catálogo interativo de passeios turísticos, categorizado e pesquisável pelos usuários.
- **Reserva via WhatsApp:** Fluxo de compra que redireciona o cliente para o WhatsApp com uma pré-reserva configurada, incluindo detalhes de pacotes e valores.
- **Painel Administrativo (Admin Panel):** Sistema de retaguarda que permite gerenciamento completo (CRUD) do conteúdo do site.
  - Gerenciamento de Destinos e Pacotes (incluindo abas gerais, depoimentos e itinerários).
  - Gestão do Blog (Posts e Categorias).
  - Gerenciamento de Comentários e Avaliações.
  - Reordenação de FAQ (Drag-and-drop).
- **Galeria Interativa:** Visualização de imagens com modal de zoom.
- **Hero Carousel:** Carrossel automático com transição suave (staggered crossfade effect) na página inicial.
- **Carrinho de Compras Simulado:** Sistema para agrupar reservas e adicionais (extras) antes da finalização.

---

## 2. Regras de Negócios

- **Modelos de Precificação (Pricing):** Os pacotes possuem preços dinâmicos que variam com base no tipo de licença (Regional ou Executivo) e do número de convidados.
- **Adicionais e Extras:** Usuários podem selecionar serviços adicionais durante a reserva, afetando o cálculo final antes de serem enviados para finalizar a compra via WhatsApp.
- **Conteúdo Dinâmico:** As informações de turismo (itinerários, imagens, preços e texto) são controladas via Painel Admin, sendo refletidas de imediato no front-end após as atualizações.
- **Persistência de Dados (Migração para Nuvem):** O estado de dados, antes local, agora é gravado remotamente em nuvem para permitir uso concorrente (através da integração com o Supabase).

---

## 3. Páginas da Aplicação

### Interface Pública (User-Facing)
- **Home:** Landing page complexa com carrossel dinâmico, seções de destaques, slider de pacotes e galeria em modal.
- **Destinos / Pacotes:** Lista de destinos com possibilidade de filtro por categoria e ordenação.
- **Tour Details:** Página detalhada de um pacote de turismo, contendo dados do itinerário, widget de precificação dinâmico e avaliações.
- **Sobre (About):** Informações sobre a agência e parceiros.
- **Blog:** Notícias, artigos e posts informativos.
- **Como Comprar (How To Buy):** Instruções de passo-a-passo.
- **Contato:** Informações de atendimento e fomulário.

### Interface Administrativa (Admin Dashboard)
- **Dashboard Principal:** Resumo de atividades e fluxo administrativo.
- **Gerenciador de Destinos:** Editor robusto (layout em colunas) para lidar com informações gerais, itinerários e testimonials de cada pacote.
- **Gerenciador de Blog Posts & Categorias:** Edição com suporte a rich text editor.
- **Gerenciador de FAQ.**
- **Detalhes de Clientes / Reservas.**

---

## 4. Tecnologias Usadas

O projeto foi modernizado recentemente e utiliza as seguintes tecnologias:

### Front-end
- **Framework Core:** React 18
- **Build Tool:** Vite
- **Roteamento:** React Router DOM v6
- **Estilização:** CSS Puro (Vanilla CSS via `index.css`) + React Inline Styles
- **Ícones:** `lucide-react`
- **Gerenciamento de Estado:** React Context API (ex: `CartContext`) e Local State (`useState`).

### Back-end & Dados
- **Banco de Dados & Auth:** Supabase (Substituindo ambiente legado construído com SQLite).
- O Supabase gerencia dados de persistência de clientes, blog e pacotes turísticos.

---

## 5. Estrutura do Projeto

A organização de pastas segue uma arquitetura orientada a modularização de componentes com React:

```text
src/
├── assets/       # Imagens e ícones estáticos (tours, features, parceiros).
├── components/   # Fragmentos de UI reutilizáveis (Header, Footer, Floating WhatsApp Btn).
├── context/      # Provedores de estado global (CartContext).
├── data/         # Mock data / Configurações exportáveis (toursData.js).
├── layouts/      # Layouts globais para encapsulamento das páginas.
├── lib/          # Scripts/Utilitários de biblioteca (ex: conexão Supabase).
├── pages/        # Telas base renderizadas pelas Rotas do App.
└── styles/       # Declarações CSS auxiliares (complemento ao index.css).
```

*Arquivos na raiz importantes:* `package.json`, `index.html`.

---

## 6. Design System

- **Cores Principais (Theme):** 
  - Base e Background em Dark Theme (`#000000`).
  - Destaques (Highlights) em Dourado/Amarelo (`#FFD700`).
  - Tons de destaque secundário e status em Verde (`#7EB53F` e `#16a34a`).
- **Tipografia:** Famílias sans-serif modernas, tipicamente **Inter** ou **Roboto**. Variando peso (400-600 para textos comuns, 700-900 para Headings e Call-to-actions).
- **Layout System:** Uso intensivo de CSS Grid e Flexbox. A largura máxima de containers costuma ter constrição focada em `1200px` para foco do conteúdo.
- **Responsividade:** Comportamentos break-point orientados nas media queries primárias de `max-width: 991px` e `max-width: 768px`, trazendo colunas adaptáveis (2 imagens por linha no mobile da galeria, etc). Formatação e espaçamento orientados à otimização mobile-first nas regras de CSS.
- **Estética & Interação:** Micro-interações, hover effects vitais nos cartões de destinos, transições automáticas suaves e exclusão do framework Tailwind em favor de uma CSS modular customizada.

---

## 7. Instruções de Desenvolvimento

Para trabalhar localmente no projeto, utilize os seguintes comandos básicos do NPM/Vite:

- **Instalar dependências:** `npm install`
- **Rodar servidor local (desenvolvimento):** `npm run dev`
- **Gerar build para produção:** `npm run build`

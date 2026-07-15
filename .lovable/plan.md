## Visão Geral

Transformar o Viva Leve em uma plataforma completa de nutrição e bem-estar, mantendo React + Vite + Tailwind + shadcn/ui. O trabalho será dividido em fases para garantir qualidade, entrega incremental e manutenção do que já funciona.

---

## Fase 1 — Fundação (Design System, UX Base e Cloud)

**Objetivo:** Preparar a base técnica antes de escalar features.

- **Ativar Lovable Cloud** para autenticação, banco de dados (perfis, favoritos, progresso, respostas do questionário) e edge functions (Nutri Assistente).
- **Modo escuro real** com toggle no Header (persistido em `localStorage` + `prefers-color-scheme`).
- **Refino do design system** (`index.css` + `tailwind.config.ts`): tokens semânticos para verde/bege atuais, novos tokens para dark mode, gradientes, sombras, animações reutilizáveis.
- **Acessibilidade base:** `aria-label` em botões de ícone, `<main>` único por página, contraste WCAG AA, foco visível, `h-dvh` em telas cheias.
- **SEO:** títulos e descrições únicos por rota via `react-helmet-async`, JSON-LD para receitas, sitemap.

---

## Fase 2 — Banco de Receitas Expandido

**Objetivo:** Escalar de ~20 para ~50+ receitas reais, organizadas.

- Refatorar `src/data/content.ts` em módulos: `recipes.ts`, `categories.ts`, `goals.ts`, `restrictions.ts`.
- Adicionar ~30 novas receitas caseiras/econômicas cobrindo: café da manhã, almoço, jantar, lanches, sobremesas fit, pré/pós-treino, vegano, low carb, sem glúten, sem lactose.
- Schema uniforme: imagem, ingredientes, preparo, tempo, rendimento, calorias, macros (P/C/G/fibras), benefícios, tags, categoria, objetivo, restrições.
- Gerar imagens faltantes via imagegen (batch).
- Página `/receitas` com: busca em tempo real, filtros por categoria/objetivo/restrição/tempo, ordenação (calorias, tempo, avaliação), grid responsivo com skeletons.
- **Receita da Semana** em destaque na Home.
- **Receitas relacionadas** na página de detalhe (mesma categoria/tags).

---

## Fase 3 — Nutri Assistente (Feature Principal)

**Objetivo:** Assistente inteligente com questionário e cardápio personalizado.

- **Questionário multi-etapas** (`/nutri-assistente`): dados pessoais (idade, sexo, altura, peso), objetivo (emagrecer/manter/ganhar), nível de atividade, rotina, preferências, restrições, alergias, condições de saúde (diabetes, hipertensão, colesterol, gastrite, etc).
- Componente `Stepper` reutilizável com progresso, validação Zod por etapa, salvamento em Cloud (se logado) ou `localStorage`.
- **Edge function** `nutri-assistant` chamando Lovable AI Gateway (`google/gemini-3.5-flash`) com prompt estruturado + `Output.object` (Zod) para gerar:
  - Cardápio semanal (7 dias × 5 refeições) usando receitas do banco quando possível
  - Lista de compras consolidada
  - Meta de hidratação (ml/dia calculada)
  - Orientações gerais adaptadas às condições
  - Disclaimer médico obrigatório
- Página de resultado com abas: Cardápio | Lista de Compras | Orientações | Refazer questionário.
- Exportar PDF (via `react-to-print`) e salvar em favoritos.

---

## Fase 4 — Calculadoras e Ferramentas

**Objetivo:** Suite de ferramentas de saúde.

- Nova rota `/ferramentas` com hub de calculadoras:
  - **IMC** — classificação + faixa saudável
  - **Gasto calórico (TMB/GET)** — fórmula Mifflin-St Jeor
  - **Ingestão de água** — baseado em peso e atividade
  - **Macros** — distribuição P/C/G por objetivo
- Componente `Calculator` reutilizável com inputs validados, resultado animado, explicação e CTA para Nutri Assistente.
- Resultados podem ser salvos no perfil (se logado).

---

## Fase 5 — Perfil, Favoritos e Progresso

**Objetivo:** Área do usuário com persistência real.

- **Autenticação** (Lovable Cloud): email/senha + Google. Páginas `/entrar`, `/cadastrar`.
- Tabelas Supabase (com RLS): `profiles`, `favorites`, `progress`, `nutri_plans`, `user_roles` (padrão seguro).
- **Dashboard `/perfil`:** dados pessoais, metas, gráficos de progresso (peso, água, treinos) com `recharts`, favoritos, planos salvos.
- **Botão de favoritar** em cada receita (fallback para `localStorage` se deslogado).
- Header ganha avatar/menu do usuário quando logado.

---

## Fase 6 — Engajamento e Conteúdo Social

**Objetivo:** Elementos que aumentam retenção.

- **Depoimentos** — carrossel na Home (Embla) com fotos e histórias.
- **Estatísticas** — seção com contadores animados (receitas, usuários, cardápios gerados).
- **FAQ** — accordion (`shadcn/accordion`) com perguntas frequentes sobre nutrição, uso da plataforma, Nutri Assistente.
- **Newsletter** funcional — edge function integrando com tabela Cloud + confirmação por toast.
- **Blog** — expandir com 3-5 novos artigos.

---

## Fase 7 — Performance, Polimento e Micro-interações

**Objetivo:** Qualidade premium.

- Lazy loading de imagens (`loading="lazy"` + `aspect-ratio`).
- Code splitting por rota (`React.lazy` + `Suspense`).
- Skeletons em todas as listas.
- Micro-interações: hover em cards, transições de página (`framer-motion` leve), animações de entrada com `IntersectionObserver`.
- Toast de sucesso/erro consistente (`sonner`).
- Auditoria de acessibilidade final.

---

## Ordem de Execução Sugerida

Recomendo entregar em 3 blocos de mensagens para manter qualidade e permitir seu feedback:

1. **Bloco 1:** Fases 1 + 2 (fundação, dark mode, banco expandido, busca/filtros)
2. **Bloco 2:** Fases 3 + 4 (Nutri Assistente com Cloud + AI, calculadoras)
3. **Bloco 3:** Fases 5 + 6 + 7 (auth, perfil, depoimentos, FAQ, polimento)

---

## Pergunta antes de começar

Para o **Nutri Assistente** e **perfil do usuário**, preciso saber:

- Você quer que os usuários possam **criar conta** (login com email/Google) para salvar cardápios, favoritos e progresso? Ou o Nutri Assistente deve funcionar apenas para visitantes (dados salvos só no navegador)?

Se sim para contas, ativo o Lovable Cloud já no Bloco 1. Se preferir "só navegador" agora, sigo sem auth e adiciono depois se quiser.

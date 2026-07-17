import { receitas, nutricao } from "./content";
import { getRecipeImage } from "./recipeImages";
import {
  recipeMetadata,
  type EnrichedRecipe,
  type RecipeDifficulty,
} from "./recipeMetadata";
import { CATEGORIES } from "./categories";

/** Slug a partir do nome (sem acentos, hífens) */
const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** Custo estimado de um ingrediente com base em palavras-chave (R$) */
const INGREDIENT_COST: Array<[RegExp, number]> = [
  [/salm[aã]o/i, 22],
  [/at[uú]m/i, 8],
  [/sardinha/i, 6],
  [/til[aá]pia|peixe/i, 15],
  [/carne moída|patinho/i, 12],
  [/carne|bife|alcatra|mignon|coxão/i, 18],
  [/frango|peito/i, 8],
  [/quinoa/i, 6],
  [/whey/i, 5],
  [/aveia/i, 2],
  [/ovo/i, 1],
  [/leite/i, 2],
  [/iogurte/i, 3],
  [/queijo|cottage|requeijão/i, 4],
  [/abacate/i, 4],
  [/banana|maçã|maca|pera/i, 1.5],
  [/frutas vermelhas|morango|amora|blueberry/i, 6],
  [/arroz/i, 2],
  [/feij[aã]o|lentilha|gr[aã]o.de.bico/i, 2.5],
  [/macarr[aã]o|penne|espaguete|massa/i, 3],
  [/tapioca/i, 2],
  [/p[aã]o/i, 2],
  [/tomate|cenoura|pepino|piment[aã]o|abobrinha|beterraba|espinafre|couve|alface|brócolis|brocolis/i, 1.5],
  [/batata|mandioca|inhame/i, 2],
  [/azeite|óleo|oleo/i, 1],
  [/mel|agave|cacau|chia|linhaça|linhaca|castanha|amêndoa|amendoa|amendoim/i, 2],
];

const estimateCost = (ingredientes: string[]): number => {
  let total = 0;
  for (const ing of ingredientes) {
    let matched = false;
    for (const [re, price] of INGREDIENT_COST) {
      if (re.test(ing)) {
        total += price;
        matched = true;
        break;
      }
    }
    if (!matched) total += 0.8; // temperos / básicos
  }
  return Math.round(total * 10) / 10;
};

/** Dificuldade derivada do tempo + nº de passos */
const deriveDifficulty = (
  timeMinutes: number,
  steps: number,
): RecipeDifficulty => {
  if (timeMinutes <= 20 && steps <= 4) return "facil";
  if (timeMinutes >= 45 || steps >= 8) return "dificil";
  return "medio";
};

const NUTRI_BY_NAME = new Map(nutricao.map((n) => [n.receita, n]));

/**
 * Lista única e enriquecida de receitas, com imagem resolvida, categoria,
 * objetivos, restrições, macros, custo estimado, slug e categoryTags.
 * Fonte da verdade para todas as páginas de receita.
 */
export const enrichedRecipes: EnrichedRecipe[] = receitas.map((r, idx) => {
  const meta = recipeMetadata[idx];
  const nutri = NUTRI_BY_NAME.get(r.nome);
  const calNum = parseInt(r.calories, 10) || 0;

  // Macros: usa nutrição real quando existe, senão deriva das calorias.
  const proteins = nutri?.proteinas ?? Math.round((calNum * 0.2) / 4);
  const carbs = nutri?.carboidratos ?? Math.round((calNum * 0.5) / 4);
  const fats = nutri?.gorduras ?? Math.round((calNum * 0.3) / 9);
  const fibers = nutri?.fibras ?? Math.max(2, Math.round(calNum / 80));

  const costTotal = estimateCost(r.ingredientes);
  const servings = meta.servings || 1;
  const costPerServing = Math.round((costTotal / servings) * 10) / 10;

  const difficulty = deriveDifficulty(meta.timeMinutes, r.modo_preparo.length);
  const slug = `${slugify(r.nome)}-${idx}`;

  const description =
    `${r.nome} — receita ${meta.category === "sobremesa" ? "doce" : "saudável"} ` +
    `com ${r.calories} kcal, pronta em ${r.time}. ` +
    (r.tags.length ? `${r.tags.slice(0, 3).join(", ")}.` : "");

  const base: EnrichedRecipe = {
    id: idx,
    slug,
    nome: r.nome,
    description,
    image: getRecipeImage(r.image),
    time: r.time,
    timeMinutes: meta.timeMinutes,
    calories: r.calories,
    caloriesNum: calNum,
    rating: r.rating,
    tags: r.tags,
    category: meta.category,
    categoryTags: [],
    goals: meta.goals,
    restrictions: meta.restrictions,
    servings,
    yieldLabel: nutri?.porcao ?? `${servings} ${servings === 1 ? "porção" : "porções"}`,
    difficulty,
    proteins,
    carbs,
    fats,
    fibers,
    costTotal,
    costPerServing,
    ingredientes: r.ingredientes,
    modo_preparo: r.modo_preparo,
    dicas: r.dicas,
    substituicoes: r.dicas.filter((d) => /substitu|troc|alterna|opcion/i.test(d)),
    conservacao: "Conserve em recipiente fechado na geladeira por até 3 dias.",
    congelamento:
      meta.category === "bebida" || meta.category === "sobremesa"
        ? "Não recomendado congelar após pronto."
        : "Pode ser congelado por até 30 dias em porções individuais.",
  };

  // Calcula categoryTags após ter todos os campos disponíveis.
  base.categoryTags = CATEGORIES.filter((c) => c.match(base)).map((c) => c.slug);
  return base;
});

export const getRecipeById = (id: number): EnrichedRecipe | undefined =>
  enrichedRecipes[id];

export const getRecipeBySlug = (slug: string): EnrichedRecipe | undefined =>
  enrichedRecipes.find((r) => r.slug === slug);

export const getRecipesByCategory = (categorySlug: string): EnrichedRecipe[] =>
  enrichedRecipes.filter((r) => r.categoryTags.includes(categorySlug));

export const getPopularRecipes = (limit = 6): EnrichedRecipe[] =>
  [...enrichedRecipes].sort((a, b) => b.rating - a.rating).slice(0, limit);

export const getRecentRecipes = (limit = 6): EnrichedRecipe[] =>
  [...enrichedRecipes].sort((a, b) => b.id - a.id).slice(0, limit);

export const getRelatedRecipes = (id: number, limit = 3): EnrichedRecipe[] => {
  const current = enrichedRecipes[id];
  if (!current) return [];
  return enrichedRecipes
    .filter((r) => r.id !== id)
    .map((r) => {
      let score = 0;
      if (r.category === current.category) score += 3;
      score += r.goals.filter((g) => current.goals.includes(g)).length * 2;
      score += r.restrictions.filter((x) =>
        current.restrictions.includes(x),
      ).length;
      score += r.tags.filter((t) => current.tags.includes(t)).length;
      score += r.categoryTags.filter((t) => current.categoryTags.includes(t)).length;
      return { r, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.r);
};

/** Receita da semana — determinística por semana do ano */
export const getFeaturedRecipe = (): EnrichedRecipe => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const week = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
  return enrichedRecipes[week % enrichedRecipes.length];
};

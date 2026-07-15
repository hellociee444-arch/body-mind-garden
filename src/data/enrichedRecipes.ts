import { receitas } from "./content";
import { getRecipeImage } from "./recipeImages";
import { recipeMetadata, type EnrichedRecipe } from "./recipeMetadata";

/**
 * Lista única e enriquecida de receitas, com imagem resolvida, categoria,
 * objetivos, restrições, tempo em minutos e calorias numéricas.
 * Fonte da verdade para todas as páginas de receita.
 */
export const enrichedRecipes: EnrichedRecipe[] = receitas.map((r, idx) => {
  const meta = recipeMetadata[idx];
  return {
    id: idx,
    nome: r.nome,
    image: getRecipeImage(r.image),
    time: r.time,
    timeMinutes: meta.timeMinutes,
    calories: r.calories,
    caloriesNum: parseInt(r.calories, 10) || 0,
    rating: r.rating,
    tags: r.tags,
    category: meta.category,
    goals: meta.goals,
    restrictions: meta.restrictions,
    servings: meta.servings,
    ingredientes: r.ingredientes,
    modo_preparo: r.modo_preparo,
    dicas: r.dicas,
  };
});

export const getRecipeById = (id: number): EnrichedRecipe | undefined =>
  enrichedRecipes[id];

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

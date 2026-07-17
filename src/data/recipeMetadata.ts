import { receitas } from "./content";

export type RecipeCategory =
  | "cafe-da-manha"
  | "almoco"
  | "jantar"
  | "lanche"
  | "sobremesa"
  | "bebida"
  | "sopa";

export type RecipeGoal =
  | "emagrecimento"
  | "ganho-massa"
  | "energia"
  | "detox"
  | "manutencao";

export type RecipeRestriction =
  | "vegana"
  | "vegetariana"
  | "sem-gluten"
  | "sem-lactose"
  | "low-carb";

export const CATEGORY_LABELS: Record<RecipeCategory, string> = {
  "cafe-da-manha": "Café da manhã",
  almoco: "Almoço",
  jantar: "Jantar",
  lanche: "Lanche",
  sobremesa: "Sobremesa",
  bebida: "Bebida",
  sopa: "Sopa",
};

export const GOAL_LABELS: Record<RecipeGoal, string> = {
  emagrecimento: "Emagrecimento",
  "ganho-massa": "Ganho de massa",
  energia: "Energia",
  detox: "Detox",
  manutencao: "Manutenção",
};

export const RESTRICTION_LABELS: Record<RecipeRestriction, string> = {
  vegana: "Vegana",
  vegetariana: "Vegetariana",
  "sem-gluten": "Sem glúten",
  "sem-lactose": "Sem lactose",
  "low-carb": "Low carb",
};

export interface RecipeMetadata {
  category: RecipeCategory;
  goals: RecipeGoal[];
  restrictions: RecipeRestriction[];
  servings: number;
  timeMinutes: number;
}

/** Extrai minutos de strings como "25 min", "30-45 minutos" */
const parseTime = (time: string): number => {
  const match = time.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 15;
};

/** Deriva categoria/objetivos/restrições dos nomes/tags/ingredientes existentes */
function deriveMetadata(recipe: (typeof receitas)[number]): RecipeMetadata {
  const nome = recipe.nome.toLowerCase();
  const tags = recipe.tags.map((t) => t.toLowerCase());
  const ingredientesText = recipe.ingredientes.join(" ").toLowerCase();

  // Category
  let category: RecipeCategory = "almoco";
  if (
    nome.includes("panqueca") ||
    nome.includes("overnight") ||
    nome.includes("tapioca") ||
    nome.includes("muffin") ||
    nome.includes("toast") ||
    nome.includes("omelete") ||
    tags.some((t) => t.includes("café"))
  ) {
    category = "cafe-da-manha";
  } else if (nome.includes("smoothie") || nome.includes("suco")) {
    category = "bebida";
  } else if (nome.includes("sopa")) {
    category = "sopa";
  } else if (
    nome.includes("brigadeiro") ||
    tags.some((t) => t.includes("sobremesa"))
  ) {
    category = "sobremesa";
  } else if (nome.includes("bowl") || nome.includes("açaí")) {
    category = "lanche";
  } else if (
    nome.includes("sanduíche") ||
    nome.includes("sanduiche") ||
    nome.includes("pasta")
  ) {
    category = "lanche";
  } else if (
    nome.includes("frango") ||
    nome.includes("salmão") ||
    nome.includes("arroz") ||
    nome.includes("feijão")
  ) {
    category = "almoco";
  }

  // Goals
  const goals: RecipeGoal[] = [];
  const calories = parseInt(recipe.calories, 10);
  if (tags.some((t) => t.includes("low carb") || t.includes("leve")) || calories < 250) {
    goals.push("emagrecimento");
  }
  if (
    tags.some((t) => t.includes("proteína") || t.includes("proteico")) ||
    calories >= 350
  ) {
    goals.push("ganho-massa");
  }
  if (tags.some((t) => t.includes("energético") || t.includes("pós-treino"))) {
    goals.push("energia");
  }
  if (tags.some((t) => t.includes("detox"))) {
    goals.push("detox");
  }
  if (goals.length === 0) goals.push("manutencao");

  // Restrictions
  const restrictions: RecipeRestriction[] = [];
  const hasAnimalProduct =
    ingredientesText.includes("frango") ||
    ingredientesText.includes("salmão") ||
    ingredientesText.includes("atum") ||
    ingredientesText.includes("sardinha") ||
    ingredientesText.includes("whey") ||
    ingredientesText.includes("ovo") ||
    ingredientesText.includes("iogurte") ||
    ingredientesText.includes("leite") ||
    ingredientesText.includes("requeijão") ||
    ingredientesText.includes("cottage");

  if (!hasAnimalProduct || tags.some((t) => t.includes("vegana"))) {
    restrictions.push("vegana");
    restrictions.push("vegetariana");
    restrictions.push("sem-lactose");
  } else {
    const hasMeat =
      ingredientesText.includes("frango") ||
      ingredientesText.includes("salmão") ||
      ingredientesText.includes("atum") ||
      ingredientesText.includes("sardinha");
    if (!hasMeat) restrictions.push("vegetariana");

    const hasDairy =
      ingredientesText.includes("leite") ||
      ingredientesText.includes("iogurte") ||
      ingredientesText.includes("requeijão") ||
      ingredientesText.includes("cottage") ||
      ingredientesText.includes("whey");
    if (!hasDairy) restrictions.push("sem-lactose");
  }

  const hasGluten =
    ingredientesText.includes("pão") ||
    ingredientesText.includes("macarrão") ||
    ingredientesText.includes("aveia");
  if (!hasGluten || tags.some((t) => t.includes("sem glúten"))) {
    restrictions.push("sem-gluten");
  }

  if (
    tags.some((t) => t.includes("low carb")) ||
    (recipe.calories && parseInt(recipe.calories, 10) < 250)
  ) {
    if (!restrictions.includes("low-carb")) restrictions.push("low-carb");
  }

  return {
    category,
    goals,
    restrictions,
    servings: 1,
    timeMinutes: parseTime(recipe.time),
  };
}

/** Metadata enriquecido para cada receita (mesmo índice de `receitas`) */
export const recipeMetadata: RecipeMetadata[] = receitas.map(deriveMetadata);

export type RecipeDifficulty = "facil" | "medio" | "dificil";

export interface EnrichedRecipe {
  id: number;
  slug: string;
  nome: string;
  description: string;
  image: string;
  time: string;
  timeMinutes: number;
  calories: string;
  caloriesNum: number;
  rating: number;
  tags: string[];
  category: RecipeCategory;
  categoryTags: string[]; // slugs de CATEGORIES às quais a receita pertence
  goals: RecipeGoal[];
  restrictions: RecipeRestriction[];
  servings: number;
  yieldLabel: string;
  difficulty: RecipeDifficulty;
  proteins: number;
  carbs: number;
  fats: number;
  fibers: number;
  costTotal: number;
  costPerServing: number;
  ingredientes: string[];
  modo_preparo: string[];
  dicas: string[];
  substituicoes: string[];
  conservacao: string;
  congelamento: string;
}

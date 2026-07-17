import type { EnrichedRecipe } from "./recipeMetadata";

/**
 * Catálogo de categorias / coleções do portal.
 * Cada categoria pode agrupar receitas por tipo de refeição, ingrediente
 * principal, restrição, custo ou tempo. Uma receita pode pertencer a várias.
 */
export interface CategoryDefinition {
  slug: string;
  label: string;
  short: string;
  description: string;
  match: (r: EnrichedRecipe) => boolean;
}

const hasIng = (r: EnrichedRecipe, ...keys: string[]) => {
  const hay = r.ingredientes.join(" ").toLowerCase();
  return keys.some((k) => hay.includes(k));
};
const hasTag = (r: EnrichedRecipe, ...keys: string[]) => {
  const hay = r.tags.join(" ").toLowerCase();
  return keys.some((k) => hay.includes(k.toLowerCase()));
};
const nameHas = (r: EnrichedRecipe, ...keys: string[]) => {
  const n = r.nome.toLowerCase();
  return keys.some((k) => n.includes(k));
};

export const CATEGORIES: CategoryDefinition[] = [
  {
    slug: "cafe-da-manha",
    label: "Café da manhã",
    short: "Café da manhã",
    description: "Receitas nutritivas para começar o dia com energia — panquecas, tapiocas, overnight oats, tostas e muito mais.",
    match: (r) => r.category === "cafe-da-manha",
  },
  {
    slug: "almoco",
    label: "Almoço",
    short: "Almoço",
    description: "Pratos equilibrados para o almoço: bowls, arroz, feijão, proteínas e opções para a marmita.",
    match: (r) => r.category === "almoco",
  },
  {
    slug: "jantar",
    label: "Jantar",
    short: "Jantar",
    description: "Jantares leves, saborosos e saudáveis para fechar o dia sem exageros.",
    match: (r) => r.category === "jantar" || (r.category === "almoco" && r.caloriesNum < 400),
  },
  {
    slug: "lanches",
    label: "Lanches",
    short: "Lanches",
    description: "Lanches práticos, funcionais e cheios de sabor para qualquer hora do dia.",
    match: (r) => r.category === "lanche",
  },
  {
    slug: "sobremesas",
    label: "Sobremesas",
    short: "Sobremesas",
    description: "Doces saudáveis, sobremesas fit e alternativas leves sem culpa.",
    match: (r) => r.category === "sobremesa",
  },
  {
    slug: "bebidas",
    label: "Bebidas",
    short: "Bebidas",
    description: "Sucos, smoothies, chás e drinques funcionais.",
    match: (r) => r.category === "bebida",
  },
  {
    slug: "marmitas",
    label: "Marmitas",
    short: "Marmitas",
    description: "Receitas ideais para marmitar durante a semana: fáceis de armazenar, transportar e reaquecer.",
    match: (r) => r.category === "almoco" && r.servings >= 1 && r.timeMinutes <= 45,
  },
  {
    slug: "air-fryer",
    label: "Air Fryer",
    short: "Air Fryer",
    description: "Preparos rápidos, crocantes e com pouco óleo direto na airfryer.",
    match: (r) => hasTag(r, "air fryer", "airfryer") || nameHas(r, "airfryer", "air fryer"),
  },
  {
    slug: "frango",
    label: "Frango",
    short: "Frango",
    description: "Receitas leves e proteicas com frango — do peito grelhado a bolinhos e refogados.",
    match: (r) => hasIng(r, "frango"),
  },
  {
    slug: "carne-bovina",
    label: "Carne bovina",
    short: "Carne bovina",
    description: "Cortes bovinos preparados de forma saudável e cheios de sabor.",
    match: (r) => hasIng(r, "carne bovina", "patinho", "alcatra", "coxão", "filé mignon", "bife"),
  },
  {
    slug: "carne-moida",
    label: "Carne moída",
    short: "Carne moída",
    description: "Receitas versáteis e econômicas com carne moída.",
    match: (r) => hasIng(r, "carne moída", "carne moida"),
  },
  {
    slug: "peixes",
    label: "Peixes",
    short: "Peixes",
    description: "Peixes assados, grelhados e em preparos leves, ricos em ômega-3.",
    match: (r) => hasIng(r, "salmão", "salmao", "atum", "sardinha", "tilápia", "tilapia", "peixe"),
  },
  {
    slug: "massas",
    label: "Massas",
    short: "Massas",
    description: "Massas equilibradas — integrais, de grão-de-bico e opções sem glúten.",
    match: (r) => hasIng(r, "macarrão", "macarrao", "espaguete", "penne", "massa integral", "lasanha"),
  },
  {
    slug: "arroz",
    label: "Arroz",
    short: "Arroz",
    description: "Do arroz integral ao arroz de couve-flor, versões nutritivas do clássico brasileiro.",
    match: (r) => hasIng(r, "arroz"),
  },
  {
    slug: "feijao",
    label: "Feijão",
    short: "Feijão",
    description: "Feijão em receitas caseiras, ricas em fibras e proteína vegetal.",
    match: (r) => hasIng(r, "feijão", "feijao", "grão-de-bico", "grao de bico", "lentilha"),
  },
  {
    slug: "saladas",
    label: "Saladas",
    short: "Saladas",
    description: "Saladas completas, coloridas e nutricionalmente equilibradas.",
    match: (r) => nameHas(r, "salada", "bowl") || hasTag(r, "salada"),
  },
  {
    slug: "sopas",
    label: "Sopas",
    short: "Sopas",
    description: "Sopas reconfortantes, detox e cremes leves.",
    match: (r) => r.category === "sopa" || nameHas(r, "sopa", "creme"),
  },
  {
    slug: "vegetarianas",
    label: "Vegetarianas",
    short: "Vegetarianas",
    description: "Receitas sem carne, saborosas e nutritivas.",
    match: (r) => r.restrictions.includes("vegetariana"),
  },
  {
    slug: "veganas",
    label: "Veganas",
    short: "Veganas",
    description: "100% à base de plantas, sem ingredientes de origem animal.",
    match: (r) => r.restrictions.includes("vegana"),
  },
  {
    slug: "low-carb",
    label: "Low Carb",
    short: "Low Carb",
    description: "Opções com baixo teor de carboidratos para dietas restritas.",
    match: (r) => r.restrictions.includes("low-carb"),
  },
  {
    slug: "sem-gluten",
    label: "Sem Glúten",
    short: "Sem Glúten",
    description: "Receitas livres de glúten, seguras para celíacos e intolerantes.",
    match: (r) => r.restrictions.includes("sem-gluten"),
  },
  {
    slug: "sem-lactose",
    label: "Sem Lactose",
    short: "Sem Lactose",
    description: "Sem leite ou derivados — leves para a digestão.",
    match: (r) => r.restrictions.includes("sem-lactose"),
  },
  {
    slug: "economicas",
    label: "Econômicas",
    short: "Econômicas",
    description: "Receitas gostosas que cabem no bolso — ingredientes acessíveis e resultado nutritivo.",
    match: (r) => r.costPerServing <= 8,
  },
  {
    slug: "ate-10-reais",
    label: "Até R$ 10",
    short: "Até R$10",
    description: "Receitas completas por até R$ 10 no total.",
    match: (r) => r.costTotal <= 10,
  },
  {
    slug: "ate-20-reais",
    label: "Até R$ 20",
    short: "Até R$20",
    description: "Receitas completas por até R$ 20 no total.",
    match: (r) => r.costTotal <= 20,
  },
  {
    slug: "ate-20-minutos",
    label: "Até 20 minutos",
    short: "≤ 20 min",
    description: "Pronto em 20 minutos ou menos — perfeito para dias corridos.",
    match: (r) => r.timeMinutes <= 20,
  },
  {
    slug: "proteicas",
    label: "Proteicas",
    short: "Proteicas",
    description: "Receitas ricas em proteínas para apoiar treinos e ganho de massa.",
    match: (r) => r.proteins >= 20 || r.goals.includes("ganho-massa"),
  },
];

export const getCategoryBySlug = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug);

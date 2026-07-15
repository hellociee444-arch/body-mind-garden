import saladBowl from "@/assets/recipe-salad-bowl.jpg";
import smoothie from "@/assets/recipe-smoothie.jpg";
import breakfast from "@/assets/recipe-breakfast.jpg";
import avocadoToast from "@/assets/recipe-avocado-toast.jpg";
import acaiBowl from "@/assets/recipe-acai-bowl.jpg";
import salmonQuinoa from "@/assets/recipe-salmon-quinoa.jpg";
import bananaPancake from "@/assets/recipe-banana-pancake.jpg";
import fitBrigadeiro from "@/assets/recipe-fit-brigadeiro.jpg";
import tunaSandwich from "@/assets/recipe-tuna-sandwich.jpg";
import detoxSoup from "@/assets/recipe-detox-soup.jpg";
import omeleteClaras from "@/assets/recipe-omelete-claras.jpg";
import muffinBanana from "@/assets/recipe-muffin-banana.jpg";
import pastaAmendoim from "@/assets/recipe-pasta-amendoim.jpg";
import bolinhoFrango from "@/assets/recipe-bolinho-frango.jpg";
import smoothieCouve from "@/assets/recipe-smoothie-couve.jpg";
import frangoLegumes from "@/assets/recipe-frango-legumes.jpg";
import pureBatatadoce from "@/assets/recipe-pure-batata-doce.jpg";
import overnightOatsPote from "@/assets/recipe-overnight-oats-pote.jpg";
import tapiocaOvo from "@/assets/recipe-tapioca-ovo.jpg";
import arrozLentilha from "@/assets/recipe-arroz-lentilha.jpg";

/**
 * Central mapping of virtual image paths (as stored in content.ts)
 * to their bundled asset URLs. Used everywhere a recipe image is rendered.
 */
export const recipeImageMap: Record<string, string> = {
  "/src/assets/recipe-salad-bowl.jpg": saladBowl,
  "/src/assets/recipe-smoothie.jpg": smoothie,
  "/src/assets/recipe-breakfast.jpg": breakfast,
  "/src/assets/recipe-avocado-toast.jpg": avocadoToast,
  "/src/assets/recipe-acai-bowl.jpg": acaiBowl,
  "/src/assets/recipe-salmon-quinoa.jpg": salmonQuinoa,
  "/src/assets/recipe-banana-pancake.jpg": bananaPancake,
  "/src/assets/recipe-fit-brigadeiro.jpg": fitBrigadeiro,
  "/src/assets/recipe-tuna-sandwich.jpg": tunaSandwich,
  "/src/assets/recipe-detox-soup.jpg": detoxSoup,
  "/src/assets/recipe-omelete-claras.jpg": omeleteClaras,
  "/src/assets/recipe-muffin-banana.jpg": muffinBanana,
  "/src/assets/recipe-pasta-amendoim.jpg": pastaAmendoim,
  "/src/assets/recipe-bolinho-frango.jpg": bolinhoFrango,
  "/src/assets/recipe-smoothie-couve.jpg": smoothieCouve,
  "/src/assets/recipe-frango-legumes.jpg": frangoLegumes,
  "/src/assets/recipe-pure-batata-doce.jpg": pureBatatadoce,
  "/src/assets/recipe-overnight-oats-pote.jpg": overnightOatsPote,
  "/src/assets/recipe-tapioca-ovo.jpg": tapiocaOvo,
  "/src/assets/recipe-arroz-lentilha.jpg": arrozLentilha,
};

export const getRecipeImage = (path: string): string =>
  recipeImageMap[path] ?? breakfast;

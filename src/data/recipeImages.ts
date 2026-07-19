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
import boloSaudavel from "@/assets/recipe-bolo-saudavel.jpg";
import paoSaudavel from "@/assets/recipe-pao-saudavel.jpg";
import panquecaProteica from "@/assets/recipe-panqueca-proteica.jpg";
import escondidinhoFit from "@/assets/recipe-escondidinho-fit.jpg";
import tortaFrango from "@/assets/recipe-torta-frango.jpg";
import arrozForno from "@/assets/recipe-arroz-forno.jpg";
import frangoCremoso from "@/assets/recipe-frango-cremoso.jpg";
import macarraoSaudavel from "@/assets/recipe-macarrao-saudavel.jpg";
import sopaNutritiva from "@/assets/recipe-sopa-nutritiva.jpg";
import smoothieFrutas from "@/assets/recipe-smoothie-frutas.jpg";

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
  "/src/assets/recipe-bolo-saudavel.jpg": boloSaudavel,
  "/src/assets/recipe-pao-saudavel.jpg": paoSaudavel,
  "/src/assets/recipe-panqueca-proteica.jpg": panquecaProteica,
  "/src/assets/recipe-escondidinho-fit.jpg": escondidinhoFit,
  "/src/assets/recipe-torta-frango.jpg": tortaFrango,
  "/src/assets/recipe-arroz-forno.jpg": arrozForno,
  "/src/assets/recipe-frango-cremoso.jpg": frangoCremoso,
  "/src/assets/recipe-macarrao-saudavel.jpg": macarraoSaudavel,
  "/src/assets/recipe-sopa-nutritiva.jpg": sopaNutritiva,
  "/src/assets/recipe-smoothie-frutas.jpg": smoothieFrutas,
};

export const getRecipeImage = (path: string): string =>
  recipeImageMap[path] ?? breakfast;

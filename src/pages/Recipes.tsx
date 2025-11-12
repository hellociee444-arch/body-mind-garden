import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecipeCard from "@/components/RecipeCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import { receitas } from "@/data/content";
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

const Recipes = () => {
  const imageMap: { [key: string]: string } = {
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

  const recipes = receitas.map(recipe => ({
    title: recipe.nome,
    image: imageMap[recipe.image],
    time: recipe.time,
    calories: recipe.calories,
    rating: recipe.rating,
    tags: recipe.tags,
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-hero py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground">
                Receitas Saudáveis
              </h1>
              <p className="text-lg text-primary-foreground/90">
                Explore centenas de receitas deliciosas e nutritivas para todas as refeições do dia
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar receitas por ingrediente, categoria..."
                  className="pl-12 h-12 bg-card"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Recipes Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe, index) => (
                <RecipeCard key={index} {...recipe} recipeId={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Recipes;

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecipeCard from "@/components/RecipeCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import saladBowl from "@/assets/recipe-salad-bowl.jpg";
import smoothie from "@/assets/recipe-smoothie.jpg";
import breakfast from "@/assets/recipe-breakfast.jpg";

const Recipes = () => {
  const recipes = [
    {
      title: "Bowl de Quinoa com Abacate e Vegetais Coloridos",
      image: saladBowl,
      time: "25 min",
      calories: "420",
      rating: 4.9,
      tags: ["Vegana", "Low Carb", "Rico em proteína"],
    },
    {
      title: "Smoothie Verde Detox com Espinafre e Banana",
      image: smoothie,
      time: "10 min",
      calories: "180",
      rating: 4.8,
      tags: ["Detox", "Rápido", "Energético"],
    },
    {
      title: "Overnight Oats com Frutas Vermelhas e Mel",
      image: breakfast,
      time: "5 min",
      calories: "310",
      rating: 4.9,
      tags: ["Café da manhã", "Prático", "Sem glúten"],
    },
    {
      title: "Bowl de Quinoa com Abacate e Vegetais Coloridos",
      image: saladBowl,
      time: "25 min",
      calories: "420",
      rating: 4.9,
      tags: ["Vegana", "Low Carb", "Rico em proteína"],
    },
    {
      title: "Smoothie Verde Detox com Espinafre e Banana",
      image: smoothie,
      time: "10 min",
      calories: "180",
      rating: 4.8,
      tags: ["Detox", "Rápido", "Energético"],
    },
    {
      title: "Overnight Oats com Frutas Vermelhas e Mel",
      image: breakfast,
      time: "5 min",
      calories: "310",
      rating: 4.9,
      tags: ["Café da manhã", "Prático", "Sem glúten"],
    },
  ];

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
                <RecipeCard key={index} {...recipe} />
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

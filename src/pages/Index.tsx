import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RecipeCard from "@/components/RecipeCard";
import WellnessTip from "@/components/WellnessTip";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { Heart, Brain, Dumbbell, Moon, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import saladBowl from "@/assets/recipe-salad-bowl.jpg";
import smoothie from "@/assets/recipe-smoothie.jpg";
import breakfast from "@/assets/recipe-breakfast.jpg";

const Index = () => {
  const featuredRecipes = [
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

  const wellnessTips = [
    {
      icon: Heart,
      title: "Autocuidado Diário",
      description: "Pequenos momentos de carinho consigo mesmo fazem toda a diferença na sua jornada de bem-estar.",
    },
    {
      icon: Brain,
      title: "Mindfulness",
      description: "Pratique a atenção plena e reconecte-se com o momento presente para uma mente mais tranquila.",
    },
    {
      icon: Dumbbell,
      title: "Movimento Natural",
      description: "Encontre prazer no exercício físico e torne o movimento parte natural da sua rotina.",
    },
    {
      icon: Moon,
      title: "Sono Reparador",
      description: "Uma boa noite de sono é fundamental para a recuperação do corpo e equilíbrio emocional.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />

        {/* Featured Recipes Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
                  Receitas em Destaque
                </h2>
                <p className="text-muted-foreground text-lg">
                  Delícias saudáveis para o seu dia a dia
                </p>
              </div>
              <Button variant="outline" asChild className="gap-2">
                <Link to="/receitas">
                  Ver todas
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredRecipes.map((recipe, index) => (
                <RecipeCard key={index} {...recipe} />
              ))}
            </div>
          </div>
        </section>

        {/* Wellness Tips Section */}
        <section className="py-16 bg-accent/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Dicas de Bem-Estar</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold">
                Cuide do Corpo e da Mente
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Descubra práticas simples para integrar saúde física e mental na sua rotina
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {wellnessTips.map((tip, index) => (
                <WellnessTip key={index} {...tip} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-hero rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-soft">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground">
                Comece sua Jornada de Transformação
              </h2>
              <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
                Baixe gratuitamente nosso guia "21 Dias de Rotina Saudável" e dê o primeiro passo para uma vida mais equilibrada e feliz.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="shadow-soft">
                  Baixar e-book grátis
                </Button>
                <Button size="lg" variant="outline" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
                  Explorar planos
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ContinueWhereYouLeft from "@/components/ContinueWhereYouLeft";
import RecipeCard from "@/components/RecipeCard";

import WellnessTip from "@/components/WellnessTip";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Brain, Dumbbell, Moon, Sparkles, ArrowRight, Clock, Flame, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { enrichedRecipes, getFeaturedRecipe, getPopularRecipes, getRecentRecipes } from "@/data/enrichedRecipes";
import { CATEGORIES } from "@/data/categories";
import { CATEGORY_LABELS } from "@/data/recipeMetadata";

const Index = () => {
  const featuredRecipes = enrichedRecipes.slice(0, 6);
  const popular = getPopularRecipes(6);
  const recent = getRecentRecipes(6);
  const weekly = getFeaturedRecipe();
  const featuredCategories = CATEGORIES.slice(0, 12);

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
      <SEO
        title="Viva Leve — Coma bem. Viva leve."
        description="Receitas saudáveis, nutrição, fitness e bem-estar. Transforme sua rotina com alimentação natural e hábitos equilibrados."
      />
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
              {featuredRecipes.map((r) => (
                <RecipeCard
                  key={r.id}
                  recipeId={r.id}
                  title={r.nome}
                  image={r.image}
                  time={r.time}
                  calories={r.calories}
                  rating={r.rating}
                  tags={r.tags}
                  costPerServing={r.costPerServing}
                  servings={r.servings}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Categorias */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 space-y-2">
              <h2 className="font-heading text-3xl md:text-4xl font-bold">
                Explore por categoria
              </h2>
              <p className="text-muted-foreground text-lg">
                Do café da manhã à marmita, do Air Fryer ao Low Carb.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {featuredCategories.map((c) => (
                <Link
                  key={c.slug}
                  to={`/categoria/${c.slug}`}
                  className="group rounded-2xl border border-border bg-card p-4 text-center shadow-sm hover:shadow-hover hover:-translate-y-1 hover:border-primary/40 transition-all"
                >
                  <p className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                    {c.short}
                  </p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" asChild className="gap-2">
                <Link to="/receitas">
                  Ver todas as categorias <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Populares */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
                  Receitas populares
                </h2>
                <p className="text-muted-foreground text-lg">
                  As melhores avaliadas pela nossa comunidade.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popular.map((r) => (
                <RecipeCard
                  key={r.id}
                  recipeId={r.id}
                  title={r.nome}
                  image={r.image}
                  time={r.time}
                  calories={r.calories}
                  rating={r.rating}
                  tags={r.tags}
                  costPerServing={r.costPerServing}
                  servings={r.servings}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Recentes */}
        <section className="py-16 bg-accent/10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
                  Adicionadas recentemente
                </h2>
                <p className="text-muted-foreground text-lg">
                  Novidades fresquinhas no portal.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recent.map((r) => (
                <RecipeCard
                  key={r.id}
                  recipeId={r.id}
                  title={r.nome}
                  image={r.image}
                  time={r.time}
                  calories={r.calories}
                  rating={r.rating}
                  tags={r.tags}
                  costPerServing={r.costPerServing}
                  servings={r.servings}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Receita da Semana */}
        <section className="py-16 bg-accent/20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8 space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Receita da Semana</span>
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  Escolhida a dedo para você
                </h2>
              </div>

              <Card className="overflow-hidden border-none shadow-hover">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative aspect-square md:aspect-auto">
                    <img
                      src={weekly.image}
                      alt={weekly.nome}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center space-y-5">
                    <Badge variant="outline" className="w-fit">
                      {CATEGORY_LABELS[weekly.category]}
                    </Badge>
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-balance">
                      {weekly.nome}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-primary" /> {weekly.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Flame className="h-4 w-4 text-primary" /> {weekly.calories} kcal
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Star className="h-4 w-4 fill-primary text-primary" /> {weekly.rating}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {weekly.tags.slice(0, 4).map((t) => (
                        <Badge key={t} variant="secondary">
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <Button asChild size="lg" className="w-fit gap-2">
                      <Link to={`/receita/${weekly.id}`}>
                        Ver receita completa <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </div>
              </Card>
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

        {/* CTA — Biblioteca Viva Leve */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-hero rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-soft">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground">
                Biblioteca Viva Leve
              </h2>
              <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
                Baixe em PDF seu relatório nutricional, cardápio semanal, lista de compras e coleções de receitas para levar para a cozinha e o mercado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="shadow-soft">
                  <Link to="/biblioteca">Abrir Biblioteca</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
                  <Link to="/nutri-assistente">Fazer minha avaliação</Link>
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

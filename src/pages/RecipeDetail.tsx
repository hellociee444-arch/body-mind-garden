import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecipeCard from "@/components/RecipeCard";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Clock,
  Star,
  Flame,
  Activity,
  Wheat,
  Droplet,
  Sparkles,
  CheckCircle2,
  Heart,
  Wallet,
  Users,
  ChefHat,
  Snowflake,
  Refrigerator,
  Download,
} from "lucide-react";
import { downloadRecipePdf } from "@/lib/pdf";
import { nutricao } from "@/data/content";
import { getRecipeById, getRelatedRecipes } from "@/data/enrichedRecipes";
import { CATEGORY_LABELS } from "@/data/recipeMetadata";
import { useFavorites } from "@/hooks/useFavorites";
import { useMadeRecipes } from "@/hooks/useMadeRecipes";

import { cn } from "@/lib/utils";

const RecipeDetail = () => {
  const { id } = useParams();
  const recipeIndex = parseInt(id || "0", 10);
  const recipe = getRecipeById(recipeIndex);
  const nutritionInfo = recipe
    ? nutricao.find((n) => n.receita === recipe.nome)
    : undefined;
  const related = recipe ? getRelatedRecipes(recipe.id, 3) : [];
  const { isFavorite, toggle } = useFavorites();
  const { isMade, toggleMade } = useMadeRecipes();

  const { user } = useAuth();

  useEffect(() => {
    if (user && recipe) {
      supabase.from("recipe_views").insert({ user_id: user.id, recipe_id: recipe.id });
    }
  }, [user, recipe?.id]);

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="font-heading text-3xl font-bold">Receita não encontrada</h1>
            <Button asChild>
              <Link to="/receitas">Voltar para receitas</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const favorited = isFavorite(recipe.id);
  const alreadyMade = isMade(recipe.id);


  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.nome,
    image: recipe.image,
    recipeCategory: CATEGORY_LABELS[recipe.category],
    recipeIngredient: recipe.ingredientes,
    recipeInstructions: recipe.modo_preparo.map((text) => ({
      "@type": "HowToStep",
      text,
    })),
    totalTime: `PT${recipe.timeMinutes}M`,
    nutrition: nutritionInfo
      ? {
          "@type": "NutritionInformation",
          calories: `${recipe.calories} kcal`,
          proteinContent: `${nutritionInfo.proteinas} g`,
          carbohydrateContent: `${nutritionInfo.carboidratos} g`,
          fatContent: `${nutritionInfo.gorduras} g`,
        }
      : undefined,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: recipe.rating,
      reviewCount: 10,
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={recipe.nome}
        description={`Receita ${recipe.nome} — ${recipe.calories} kcal, pronta em ${recipe.time}. Ingredientes, modo de preparo e informações nutricionais.`}
        image={recipe.image}
        type="article"
        jsonLd={jsonLd}
      />
      <Header />
      <main className="flex-1">
        {/* Back Button */}
        <section className="py-6 border-b border-border">
          <div className="container mx-auto px-4">
            <Button variant="ghost" asChild className="gap-2">
              <Link to="/receitas">
                <ArrowLeft className="h-4 w-4" />
                Voltar para receitas
              </Link>
            </Button>
          </div>
        </section>

        {/* Recipe Header */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="relative overflow-hidden rounded-2xl aspect-square shadow-soft">
                <img
                  src={recipe.image}
                  alt={recipe.nome}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-card">
                  <Star className="h-5 w-5 fill-primary text-primary" aria-hidden="true" />
                  <span className="font-semibold">{recipe.rating}</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <Badge variant="outline" className="mb-3">
                    {CATEGORY_LABELS[recipe.category]}
                  </Badge>
                  <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-balance">
                    {recipe.nome}
                  </h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {recipe.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" aria-hidden="true" />
                    <div>
                      <p className="text-xs">Tempo</p>
                      <p className="font-semibold text-foreground">{recipe.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-primary" aria-hidden="true" />
                    <div>
                      <p className="text-xs">Calorias</p>
                      <p className="font-semibold text-foreground">{recipe.calories} kcal</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" aria-hidden="true" />
                    <div>
                      <p className="text-xs">Rendimento</p>
                      <p className="font-semibold text-foreground">{recipe.yieldLabel}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-primary" aria-hidden="true" />
                    <div>
                      <p className="text-xs">Custo total</p>
                      <p className="font-semibold text-foreground">
                        R$ {recipe.costTotal.toFixed(2).replace(".", ",")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChefHat className="h-5 w-5 text-primary" aria-hidden="true" />
                    <div>
                      <p className="text-xs">Dificuldade</p>
                      <p className="font-semibold text-foreground capitalize">
                        {recipe.difficulty === "facil"
                          ? "Fácil"
                          : recipe.difficulty === "medio"
                            ? "Médio"
                            : "Difícil"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-primary" aria-hidden="true" />
                    <div>
                      <p className="text-xs">Custo/porção</p>
                      <p className="font-semibold text-foreground">
                        R$ {recipe.costPerServing.toFixed(2).replace(".", ",")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => toggle(recipe.id)}
                    variant={favorited ? "default" : "outline"}
                    className="gap-2"
                    aria-pressed={favorited}
                  >
                    <Heart className={cn("h-4 w-4", favorited && "fill-current")} />
                    {favorited ? "Salvo nos favoritos" : "Salvar nos favoritos"}
                  </Button>
                  <Button
                    onClick={() => toggleMade(recipe.id)}
                    variant={alreadyMade ? "default" : "outline"}
                    className="gap-2"
                    aria-pressed={alreadyMade}
                  >
                    <CheckCircle2 className={cn("h-4 w-4", alreadyMade && "fill-current")} />
                    {alreadyMade ? "Já fiz esta receita" : "Marcar como “Já fiz”"}
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => downloadRecipePdf(recipe)}
                  >
                    <Download className="h-4 w-4" />
                    Baixar receita em PDF
                  </Button>
                </div>


                {nutritionInfo && (
                  <Card className="border-none shadow-card bg-accent/20">
                    <CardContent className="p-6 space-y-4">
                      <h2 className="font-heading text-lg font-semibold flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
                        Informações Nutricionais
                      </h2>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-primary" aria-hidden="true" />
                          <div>
                            <p className="text-xs text-muted-foreground">Proteínas</p>
                            <p className="font-semibold">{nutritionInfo.proteinas}g</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Wheat className="h-4 w-4 text-primary" aria-hidden="true" />
                          <div>
                            <p className="text-xs text-muted-foreground">Carboidratos</p>
                            <p className="font-semibold">{nutritionInfo.carboidratos}g</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Droplet className="h-4 w-4 text-primary" aria-hidden="true" />
                          <div>
                            <p className="text-xs text-muted-foreground">Gorduras</p>
                            <p className="font-semibold">{nutritionInfo.gorduras}g</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                          <div>
                            <p className="text-xs text-muted-foreground">Fibras</p>
                            <p className="font-semibold">{nutritionInfo.fibras}g</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-border">
                        <p className="text-sm font-medium mb-2">Benefícios:</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {nutritionInfo.beneficios}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Ingredients & Instructions */}
        <section className="py-12 bg-accent/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <Card className="border-none shadow-card">
                <CardContent className="p-6 space-y-4">
                  <h2 className="font-heading text-2xl font-bold">Ingredientes</h2>
                  <ul className="space-y-3">
                    {recipe.ingredientes.map((ingrediente, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <span className="text-muted-foreground">{ingrediente}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-none shadow-card">
                <CardContent className="p-6 space-y-4">
                  <h2 className="font-heading text-2xl font-bold">Modo de Preparo</h2>
                  <ol className="space-y-4">
                    {recipe.modo_preparo.map((passo, index) => (
                      <li key={index} className="flex gap-3">
                        <span
                          className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm"
                          aria-hidden="true"
                        >
                          {index + 1}
                        </span>
                        <p className="text-muted-foreground pt-1">{passo}</p>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Tips */}
        {recipe.dicas && recipe.dicas.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <Card className="border-none shadow-card bg-gradient-hero">
                  <CardContent className="p-8 space-y-4">
                    <h2 className="font-heading text-2xl font-bold text-primary-foreground flex items-center gap-2">
                      <Sparkles className="h-6 w-6" aria-hidden="true" />
                      Dicas Especiais
                    </h2>
                    <ul className="space-y-3">
                      {recipe.dicas.map((dica, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary-foreground mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <span className="text-primary-foreground/90">{dica}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Conservação & Congelamento */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="border-none shadow-card">
                <CardContent className="p-6 space-y-2">
                  <h3 className="font-heading text-lg font-semibold flex items-center gap-2">
                    <Refrigerator className="h-5 w-5 text-primary" aria-hidden="true" />
                    Conservação
                  </h3>
                  <p className="text-sm text-muted-foreground">{recipe.conservacao}</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-card">
                <CardContent className="p-6 space-y-2">
                  <h3 className="font-heading text-lg font-semibold flex items-center gap-2">
                    <Snowflake className="h-5 w-5 text-primary" aria-hidden="true" />
                    Congelamento
                  </h3>
                  <p className="text-sm text-muted-foreground">{recipe.congelamento}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Related Recipes */}
        {related.length > 0 && (
          <section className="py-16 bg-accent/10">
            <div className="container mx-auto px-4">
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">
                Você também vai gostar
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((r) => (
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
        )}
      </main>
      <Footer />
    </div>
  );
};

export default RecipeDetail;

import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Star, Flame, Activity, Wheat, Droplet, Sparkles, CheckCircle2 } from "lucide-react";
import { receitas, nutricao } from "@/data/content";
import saladBowl from "@/assets/recipe-salad-bowl.jpg";
import smoothie from "@/assets/recipe-smoothie.jpg";
import breakfast from "@/assets/recipe-breakfast.jpg";
import avocadoToast from "@/assets/recipe-avocado-toast.jpg";
import acaiBowl from "@/assets/recipe-acai-bowl.jpg";
import salmonQuinoa from "@/assets/recipe-salmon-quinoa.jpg";

const RecipeDetail = () => {
  const { id } = useParams();
  const recipeIndex = parseInt(id || "0");
  
  const imageMap: { [key: string]: string } = {
    "/src/assets/recipe-salad-bowl.jpg": saladBowl,
    "/src/assets/recipe-smoothie.jpg": smoothie,
    "/src/assets/recipe-breakfast.jpg": breakfast,
    "/src/assets/recipe-avocado-toast.jpg": avocadoToast,
    "/src/assets/recipe-acai-bowl.jpg": acaiBowl,
    "/src/assets/recipe-salmon-quinoa.jpg": salmonQuinoa,
  };

  const recipe = receitas[recipeIndex];
  const nutritionInfo = nutricao.find(n => n.receita === recipe?.nome);

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

  return (
    <div className="min-h-screen flex flex-col">
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
              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl aspect-square shadow-soft">
                <img 
                  src={imageMap[recipe.image]} 
                  alt={recipe.nome}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-card">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <span className="font-semibold">{recipe.rating}</span>
                </div>
              </div>

              {/* Recipe Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
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

                <div className="flex items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs">Tempo</p>
                      <p className="font-semibold text-foreground">{recipe.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs">Calorias</p>
                      <p className="font-semibold text-foreground">{recipe.calories} kcal</p>
                    </div>
                  </div>
                </div>

                {/* Nutrition Info Card */}
                {nutritionInfo && (
                  <Card className="border-none shadow-card bg-accent/20">
                    <CardContent className="p-6 space-y-4">
                      <h3 className="font-heading text-lg font-semibold flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        Informações Nutricionais
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-primary" />
                          <div>
                            <p className="text-xs text-muted-foreground">Proteínas</p>
                            <p className="font-semibold">{nutritionInfo.proteinas}g</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Wheat className="h-4 w-4 text-primary" />
                          <div>
                            <p className="text-xs text-muted-foreground">Carboidratos</p>
                            <p className="font-semibold">{nutritionInfo.carboidratos}g</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Droplet className="h-4 w-4 text-primary" />
                          <div>
                            <p className="text-xs text-muted-foreground">Gorduras</p>
                            <p className="font-semibold">{nutritionInfo.gorduras}g</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-primary" />
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
              {/* Ingredients */}
              <Card className="border-none shadow-card">
                <CardContent className="p-6 space-y-4">
                  <h2 className="font-heading text-2xl font-bold">
                    Ingredientes
                  </h2>
                  <ul className="space-y-3">
                    {recipe.ingredientes.map((ingrediente, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{ingrediente}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Instructions */}
              <Card className="border-none shadow-card">
                <CardContent className="p-6 space-y-4">
                  <h2 className="font-heading text-2xl font-bold">
                    Modo de Preparo
                  </h2>
                  <ol className="space-y-4">
                    {recipe.modo_preparo.map((passo, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
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
                      <Sparkles className="h-6 w-6" />
                      Dicas Especiais
                    </h2>
                    <ul className="space-y-3">
                      {recipe.dicas.map((dica, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary-foreground mt-0.5 flex-shrink-0" />
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
      </main>
      <Footer />
    </div>
  );
};

export default RecipeDetail;

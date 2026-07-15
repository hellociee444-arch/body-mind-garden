import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecipeCard from "@/components/RecipeCard";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { enrichedRecipes } from "@/data/enrichedRecipes";
import { useFavorites } from "@/hooks/useFavorites";

const Favorites = () => {
  const { favorites } = useFavorites();
  const list = enrichedRecipes.filter((r) => favorites.includes(r.id));

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Meus Favoritos"
        description="Suas receitas saudáveis favoritas salvas em um só lugar."
      />
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-hero py-14">
          <div className="container mx-auto px-4 text-center space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-card/20 px-4 py-2 backdrop-blur">
              <Heart className="h-4 w-4 text-primary-foreground fill-current" />
              <span className="text-sm font-medium text-primary-foreground">
                {list.length} {list.length === 1 ? "receita salva" : "receitas salvas"}
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground">
              Meus Favoritos
            </h1>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            {list.length === 0 ? (
              <div className="text-center py-16 space-y-4 max-w-md mx-auto">
                <div className="mx-auto w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h2 className="font-heading text-xl font-semibold">
                  Você ainda não salvou nenhuma receita
                </h2>
                <p className="text-muted-foreground">
                  Toque no coração de qualquer receita para adicioná-la aqui.
                </p>
                <Button asChild>
                  <Link to="/receitas">Explorar receitas</Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {list.map((r) => (
                  <RecipeCard
                    key={r.id}
                    recipeId={r.id}
                    title={r.nome}
                    image={r.image}
                    time={r.time}
                    calories={r.calories}
                    rating={r.rating}
                    tags={r.tags}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;

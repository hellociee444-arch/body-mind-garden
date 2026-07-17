import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecipeCard from "@/components/RecipeCard";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import {
  CATEGORIES,
  getCategoryBySlug,
} from "@/data/categories";
import { getRecipesByCategory } from "@/data/enrichedRecipes";

type SortOption = "relevance" | "time-asc" | "cost-asc" | "calories-asc" | "rating-desc";

const Category = () => {
  const { slug = "" } = useParams();
  const category = getCategoryBySlug(slug);
  const [sort, setSort] = useState<SortOption>("relevance");

  const list = useMemo(() => {
    if (!category) return [];
    const items = getRecipesByCategory(category.slug);
    const sorted = [...items];
    switch (sort) {
      case "time-asc":
        sorted.sort((a, b) => a.timeMinutes - b.timeMinutes);
        break;
      case "cost-asc":
        sorted.sort((a, b) => a.costPerServing - b.costPerServing);
        break;
      case "calories-asc":
        sorted.sort((a, b) => a.caloriesNum - b.caloriesNum);
        break;
      case "rating-desc":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
    }
    return sorted;
  }, [category, sort]);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-24 text-center space-y-4">
          <h1 className="font-heading text-3xl font-bold">Categoria não encontrada</h1>
          <Button asChild>
            <Link to="/receitas">Ver todas as receitas</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Receitas ${category.label} — Viva Leve`,
    description: category.description,
    numberOfItems: list.length,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={`Receitas ${category.label}`}
        description={category.description}
        jsonLd={jsonLd}
      />
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-hero py-14">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <Button asChild variant="ghost" size="sm" className="text-primary-foreground/90">
                <Link to="/receitas" className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> Todas as receitas
                </Link>
              </Button>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground text-balance">
                Receitas {category.label}
              </h1>
              <p className="text-lg text-primary-foreground/90">
                {category.description}
              </p>
              <p className="text-sm text-primary-foreground/80">
                {list.length} {list.length === 1 ? "receita" : "receitas"} nesta categoria
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card/50 backdrop-blur">
          <div className="container mx-auto px-4 py-4 flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">Explorar mais:</span>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.filter((c) => c.slug !== category.slug)
                .slice(0, 12)
                .map((c) => (
                  <Link
                    key={c.slug}
                    to={`/categoria/${c.slug}`}
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
                  >
                    <Badge variant="outline" className="cursor-pointer hover:bg-accent transition-all">
                      {c.short}
                    </Badge>
                  </Link>
                ))}
            </div>
            <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
              <SelectTrigger className="w-[200px] ml-auto" aria-label="Ordenar">
                <SelectValue placeholder="Ordenar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Mais relevantes</SelectItem>
                <SelectItem value="time-asc">Mais rápidas</SelectItem>
                <SelectItem value="cost-asc">Mais baratas</SelectItem>
                <SelectItem value="calories-asc">Menos calorias</SelectItem>
                <SelectItem value="rating-desc">Melhor avaliadas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            {list.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <p className="text-lg font-medium">
                  Nenhuma receita cadastrada nesta categoria ainda.
                </p>
                <Button asChild variant="outline">
                  <Link to="/receitas">Ver todas as receitas</Link>
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
                    costPerServing={r.costPerServing}
                    servings={r.servings}
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

export default Category;

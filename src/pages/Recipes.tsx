import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecipeCard from "@/components/RecipeCard";
import { SEO } from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { enrichedRecipes } from "@/data/enrichedRecipes";
import { CATEGORIES } from "@/data/categories";
import {
  CATEGORY_LABELS,
  GOAL_LABELS,
  RESTRICTION_LABELS,
  type RecipeCategory,
  type RecipeGoal,
  type RecipeRestriction,
} from "@/data/recipeMetadata";

type SortOption =
  | "relevance"
  | "time-asc"
  | "calories-asc"
  | "calories-desc"
  | "rating-desc"
  | "cost-asc";

type CostFilter = "all" | "10" | "20" | "30";
type TimeFilter = "all" | "20" | "30" | "45";

const Recipes = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<RecipeCategory | "all">("all");
  const [goal, setGoal] = useState<RecipeGoal | "all">("all");
  const [restrictions, setRestrictions] = useState<RecipeRestriction[]>([]);
  const [cost, setCost] = useState<CostFilter>("all");
  const [time, setTime] = useState<TimeFilter>("all");
  const [sort, setSort] = useState<SortOption>("relevance");

  const toggleRestriction = (r: RecipeRestriction) => {
    setRestrictions((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r],
    );
  };

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setGoal("all");
    setRestrictions([]);
    setCost("all");
    setTime("all");
    setSort("relevance");
  };

  const activeFiltersCount =
    (query ? 1 : 0) +
    (category !== "all" ? 1 : 0) +
    (goal !== "all" ? 1 : 0) +
    (cost !== "all" ? 1 : 0) +
    (time !== "all" ? 1 : 0) +
    restrictions.length;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const costCap = cost === "all" ? Infinity : parseInt(cost, 10);
    const timeCap = time === "all" ? Infinity : parseInt(time, 10);
    const list = enrichedRecipes.filter((r) => {
      if (category !== "all" && r.category !== category) return false;
      if (goal !== "all" && !r.goals.includes(goal)) return false;
      if (restrictions.length && !restrictions.every((x) => r.restrictions.includes(x)))
        return false;
      if (r.costTotal > costCap) return false;
      if (r.timeMinutes > timeCap) return false;
      if (q) {
        const haystack = [
          r.nome,
          ...r.tags,
          ...r.ingredientes,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    const sorted = [...list];
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
      case "calories-desc":
        sorted.sort((a, b) => b.caloriesNum - a.caloriesNum);
        break;
      case "rating-desc":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
    }
    return sorted;
  }, [query, category, goal, restrictions, cost, time, sort]);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Receitas Saudáveis"
        description="Explore dezenas de receitas saudáveis, fitness e naturais. Filtre por categoria, objetivo e restrição alimentar."
      />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-hero py-14">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground text-balance">
                Receitas Saudáveis
              </h1>
              <p className="text-lg text-primary-foreground/90">
                {enrichedRecipes.length} receitas para todas as refeições — filtre por categoria,
                objetivo e restrição.
              </p>

              {/* Search */}
              <div className="relative max-w-xl mx-auto">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none"
                  aria-hidden="true"
                />
                <Input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar por nome, ingrediente ou tag..."
                  className="pl-12 h-12 bg-card border-none shadow-soft"
                  aria-label="Buscar receitas"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b border-border bg-card/50 backdrop-blur sticky top-16 z-30">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                <span>Filtros</span>
              </div>

              <Select
                value={category}
                onValueChange={(v) => setCategory(v as RecipeCategory | "all")}
              >
                <SelectTrigger className="w-[180px]" aria-label="Filtrar por categoria">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {(Object.keys(CATEGORY_LABELS) as RecipeCategory[]).map((c) => (
                    <SelectItem key={c} value={c}>
                      {CATEGORY_LABELS[c]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={goal} onValueChange={(v) => setGoal(v as RecipeGoal | "all")}>
                <SelectTrigger className="w-[180px]" aria-label="Filtrar por objetivo">
                  <SelectValue placeholder="Objetivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os objetivos</SelectItem>
                  {(Object.keys(GOAL_LABELS) as RecipeGoal[]).map((g) => (
                    <SelectItem key={g} value={g}>
                      {GOAL_LABELS[g]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
                <SelectTrigger className="w-[200px] ml-auto" aria-label="Ordenar">
                  <SelectValue placeholder="Ordenar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Mais relevantes</SelectItem>
                  <SelectItem value="time-asc">Mais rápidas</SelectItem>
                  <SelectItem value="calories-asc">Menos calorias</SelectItem>
                  <SelectItem value="calories-desc">Mais calorias</SelectItem>
                  <SelectItem value="rating-desc">Melhor avaliadas</SelectItem>
                </SelectContent>
              </Select>

              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="gap-1.5"
                >
                  <X className="h-4 w-4" />
                  Limpar ({activeFiltersCount})
                </Button>
              )}
            </div>

            {/* Restriction chips */}
            <div className="flex flex-wrap gap-2">
              {(Object.keys(RESTRICTION_LABELS) as RecipeRestriction[]).map((r) => {
                const active = restrictions.includes(r);
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => toggleRestriction(r)}
                    aria-pressed={active}
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full"
                  >
                    <Badge
                      variant={active ? "default" : "outline"}
                      className="cursor-pointer text-xs px-3 py-1 transition-all hover:scale-105"
                    >
                      {RESTRICTION_LABELS[r]}
                    </Badge>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground" aria-live="polite">
                {filtered.length}{" "}
                {filtered.length === 1 ? "receita encontrada" : "receitas encontradas"}
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <p className="text-lg font-medium">
                  Nenhuma receita corresponde aos filtros.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Limpar filtros
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((r) => (
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

export default Recipes;

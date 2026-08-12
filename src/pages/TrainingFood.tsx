import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import RecipeCard from "@/components/RecipeCard";
import { trainingArticles } from "@/data/education";
import { enrichedRecipes } from "@/data/enrichedRecipes";
import { downloadGuidePdf } from "@/lib/pdf";
import { Dumbbell, Download } from "lucide-react";

export default function TrainingFood() {
  const proteinRecipes = [...enrichedRecipes]
    .sort((a, b) => b.proteins - a.proteins)
    .slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Alimentação e Treino — Viva Leve"
        description="Pré-treino, pós-treino, proteínas, carboidratos e hidratação com comida de verdade, prática e econômica."
      />
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-soft py-12">
          <div className="container mx-auto px-4 max-w-4xl space-y-2">
            <div className="inline-flex items-center gap-2 text-sm text-primary font-medium">
              <Dumbbell className="h-4 w-4" /> Alimentação e Treino
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold">Comer bem para render bem</h1>
            <p className="text-muted-foreground max-w-2xl">
              Conteúdo prático para quem treina, sem exageros e sem suplementos obrigatórios. O foco continua sendo
              alimentação equilibrada com ingredientes acessíveis.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-10 max-w-4xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trainingArticles.map((a) => (
              <Card key={a.id} className="transition-all hover:shadow-hover hover:-translate-y-0.5">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base">{a.title}</CardTitle>
                    <Badge variant="outline" className="text-xs shrink-0">{a.readTime}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{a.summary}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="c" className="border-none">
                      <AccordionTrigger className="py-2 text-sm">Ler conteúdo</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        {a.sections.map((s) => (
                          <div key={s.heading} className="space-y-1.5">
                            <h3 className="font-heading font-semibold text-sm text-primary">{s.heading}</h3>
                            {s.paragraphs?.map((p, i) => (
                              <p key={i} className="text-sm text-muted-foreground">{p}</p>
                            ))}
                            {s.bullets && (
                              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                                {s.bullets.map((b, i) => <li key={i}>{b}</li>)}
                              </ul>
                            )}
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Button variant="outline" size="sm" onClick={() => downloadGuidePdf(a.title, a.summary, a.sections)}>
                    <Download className="h-4 w-4 mr-1" /> Baixar PDF
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 pb-14 max-w-6xl space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-heading text-xl font-semibold">Receitas para quem treina</h2>
            <Button asChild variant="outline" size="sm">
              <Link to="/receitas">Ver todas as receitas</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {proteinRecipes.map((r) => (
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
          <p className="text-xs text-muted-foreground">
            Valores nutricionais são estimativas. Para orientação individual, procure um nutricionista.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

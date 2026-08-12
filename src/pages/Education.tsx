import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { educationArticles, processedFoodsGuide, type EducationArticle } from "@/data/education";
import { downloadGuidePdf } from "@/lib/pdf";
import { BookOpen, Download, ShoppingCart } from "lucide-react";

function ArticleCard({ a }: { a: EducationArticle }) {
  return (
    <Card className="transition-all hover:shadow-hover hover:-translate-y-0.5">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{a.title}</CardTitle>
          <Badge variant="outline" className="text-xs shrink-0">{a.readTime}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{a.summary}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <Accordion type="single" collapsible>
          <AccordionItem value="conteudo" className="border-none">
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
  );
}

export default function Education() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Educação alimentar — Viva Leve"
        description="Conteúdos simples e acolhedores sobre alimentação equilibrada, prato saudável, compras, rótulos e rotina alimentar."
      />
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-soft py-12">
          <div className="container mx-auto px-4 max-w-4xl space-y-2">
            <div className="inline-flex items-center gap-2 text-sm text-primary font-medium">
              <BookOpen className="h-4 w-4" /> Educação alimentar
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold">Aprender para escolher melhor</h1>
            <p className="text-muted-foreground max-w-2xl">
              Alimentação simples, acessível, equilibrada e possível de manter. Aqui não existem alimentos proibidos —
              existe entendimento.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-10 max-w-4xl space-y-4">
          <h2 className="font-heading text-xl font-semibold">Conteúdos essenciais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {educationArticles.map((a) => <ArticleCard key={a.id} a={a} />)}
          </div>
        </section>

        <section className="container mx-auto px-4 pb-14 max-w-4xl space-y-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-primary" />
            <h2 className="font-heading text-xl font-semibold">Guia de alimentos industrializados</h2>
          </div>
          <ArticleCard a={processedFoodsGuide} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

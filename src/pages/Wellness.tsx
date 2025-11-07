import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, CheckCircle2, Sparkles } from "lucide-react";
import { bemEstar } from "@/data/content";

const Wellness = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-hero py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground">
                Bem-Estar e Autocuidado
              </h1>
              <p className="text-lg text-primary-foreground/90">
                Descubra práticas simples para integrar saúde física e mental na sua rotina
              </p>
            </div>
          </div>
        </section>

        {/* Guias Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-2">
                <Heart className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Guias de Autocuidado</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold">
                Cuide do Corpo e da Mente
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Pequenos passos diários que transformam sua vida
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {bemEstar.map((guia, index) => (
                <Card key={index} className="border-none shadow-card hover:shadow-soft transition-all duration-300">
                  <CardContent className="p-6 space-y-4">
                    <div className="inline-flex rounded-full bg-accent p-3">
                      <Sparkles className="h-6 w-6 text-accent-foreground" />
                    </div>
                    
                    <h3 className="font-heading text-xl font-semibold">
                      {guia.categoria}
                    </h3>
                    
                    <ul className="space-y-3">
                      {guia.conteudo.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-16 bg-accent/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <blockquote className="font-heading text-2xl md:text-3xl font-semibold italic">
                "Cuidar de si mesmo não é egoísmo, é autocuidado. É a base para uma vida plena e equilibrada."
              </blockquote>
              <p className="text-muted-foreground">
                Pequenos momentos de carinho consigo mesmo fazem toda a diferença na sua jornada de bem-estar.
              </p>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-center">
                Como Começar sua Jornada
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-none shadow-card">
                  <CardContent className="p-6 space-y-3">
                    <h3 className="font-heading text-lg font-semibold">
                      🌅 Comece o Dia com Intenção
                    </h3>
                    <p className="text-muted-foreground">
                      Dedique os primeiros minutos da manhã para definir suas intenções e prioridades do dia.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-card">
                  <CardContent className="p-6 space-y-3">
                    <h3 className="font-heading text-lg font-semibold">
                      🧘‍♀️ Pratique a Atenção Plena
                    </h3>
                    <p className="text-muted-foreground">
                      Reserve momentos para respirar conscientemente e reconectar-se com o presente.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-card">
                  <CardContent className="p-6 space-y-3">
                    <h3 className="font-heading text-lg font-semibold">
                      💚 Cultive Boas Relações
                    </h3>
                    <p className="text-muted-foreground">
                      Invista tempo em relacionamentos que te fazem bem e nutrem sua energia.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-card">
                  <CardContent className="p-6 space-y-3">
                    <h3 className="font-heading text-lg font-semibold">
                      🌙 Crie um Ritual Noturno
                    </h3>
                    <p className="text-muted-foreground">
                      Estabeleça uma rotina relaxante antes de dormir para garantir um sono reparador.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Wellness;

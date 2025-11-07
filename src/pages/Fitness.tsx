import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Dumbbell, Clock, Heart, Sparkles } from "lucide-react";
import { fitness } from "@/data/content";

const Fitness = () => {
  const iconMap: { [key: string]: any } = {
    "HIIT (Alta Performance)": Dumbbell,
    "Yoga / Pilates (Equilíbrio e Força)": Heart,
    "Corrida Leve / Caminhada": Sparkles
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-hero py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground">
                Fitness e Movimento
              </h1>
              <p className="text-lg text-primary-foreground/90">
                Encontre prazer no exercício físico e torne o movimento parte natural da sua rotina
              </p>
            </div>
          </div>
        </section>

        {/* Treinos Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-2">
                <Dumbbell className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Treinos Recomendados</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold">
                Seu Guia de Exercícios
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Treinos práticos e eficientes para todos os níveis
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fitness.map((item, index) => {
                const Icon = iconMap[item.treino] || Dumbbell;
                return (
                  <Card key={index} className="border-none shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6 space-y-4">
                      <div className="inline-flex rounded-full bg-accent p-3">
                        <Icon className="h-6 w-6 text-accent-foreground" />
                      </div>
                      
                      <h3 className="font-heading text-xl font-semibold">
                        {item.treino}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{item.duracao}</span>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {item.beneficios}
                      </p>
                      
                      <div className="pt-3 border-t border-border">
                        <p className="text-sm font-medium text-foreground mb-1">
                          Combinação alimentar:
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.combinacao_alimentar}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-16 bg-accent/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-center">
                Dicas para Começar
              </h2>
              
              <div className="space-y-4">
                <Card className="border-none shadow-card">
                  <CardContent className="p-6">
                    <h3 className="font-heading text-lg font-semibold mb-3">
                      🎯 Comece Devagar
                    </h3>
                    <p className="text-muted-foreground">
                      Não tente fazer tudo de uma vez. Escolha um treino que combine com seu nível atual e vá evoluindo gradualmente.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-card">
                  <CardContent className="p-6">
                    <h3 className="font-heading text-lg font-semibold mb-3">
                      💧 Hidrate-se Bem
                    </h3>
                    <p className="text-muted-foreground">
                      Beba água antes, durante e depois dos exercícios. A hidratação adequada melhora o desempenho e a recuperação.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-card">
                  <CardContent className="p-6">
                    <h3 className="font-heading text-lg font-semibold mb-3">
                      🍽️ Nutrição é Fundamental
                    </h3>
                    <p className="text-muted-foreground">
                      Combine seus treinos com as receitas sugeridas para otimizar resultados e garantir energia durante todo o dia.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-card">
                  <CardContent className="p-6">
                    <h3 className="font-heading text-lg font-semibold mb-3">
                      😴 Descanse Adequadamente
                    </h3>
                    <p className="text-muted-foreground">
                      O descanso é tão importante quanto o treino. Dê tempo ao corpo para se recuperar e fortalecer.
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

export default Fitness;

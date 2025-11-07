import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Apple, Flame, Activity, Wheat, Droplet, Sparkles } from "lucide-react";
import { nutricao } from "@/data/content";

const Nutrition = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-hero py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground">
                Nutrição Consciente
              </h1>
              <p className="text-lg text-primary-foreground/90">
                Entenda os nutrientes e benefícios de cada receita para fazer escolhas mais saudáveis
              </p>
            </div>
          </div>
        </section>

        {/* Nutrition Info Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-2">
                <Apple className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Informações Nutricionais</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold">
                Receitas e Seus Nutrientes
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Conheça os valores nutricionais e benefícios de cada receita
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {nutricao.map((item, index) => (
                <Card key={index} className="border-none shadow-card hover:shadow-soft transition-all duration-300">
                  <CardContent className="p-6 space-y-4">
                    <div className="inline-flex rounded-full bg-accent p-3">
                      <Apple className="h-6 w-6 text-accent-foreground" />
                    </div>
                    
                    <h3 className="font-heading text-xl font-semibold line-clamp-2">
                      {item.receita}
                    </h3>
                    
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between py-2 border-b border-border">
                        <div className="flex items-center gap-2">
                          <Flame className="h-4 w-4 text-primary" />
                          <span className="text-sm text-muted-foreground">Calorias</span>
                        </div>
                        <span className="font-semibold">{item.calorias} kcal</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-primary" />
                          <div>
                            <p className="text-muted-foreground">Proteínas</p>
                            <p className="font-semibold">{item.proteinas}g</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Wheat className="h-4 w-4 text-primary" />
                          <div>
                            <p className="text-muted-foreground">Carboidratos</p>
                            <p className="font-semibold">{item.carboidratos}g</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Droplet className="h-4 w-4 text-primary" />
                          <div>
                            <p className="text-muted-foreground">Gorduras</p>
                            <p className="font-semibold">{item.gorduras}g</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-primary" />
                          <div>
                            <p className="text-muted-foreground">Fibras</p>
                            <p className="font-semibold">{item.fibras}g</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-border">
                        <p className="text-sm font-medium text-foreground mb-2">
                          Benefícios:
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.beneficios}
                        </p>
                      </div>

                      <div className="text-xs text-muted-foreground bg-accent/20 rounded-lg p-2">
                        Porção: {item.porcao}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-16 bg-accent/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-center">
                Dicas de Nutrição
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-none shadow-card">
                  <CardContent className="p-6 space-y-3">
                    <h3 className="font-heading text-lg font-semibold">
                      🥗 Variedade é Essencial
                    </h3>
                    <p className="text-muted-foreground">
                      Combine diferentes receitas ao longo da semana para garantir todos os nutrientes que seu corpo precisa.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-card">
                  <CardContent className="p-6 space-y-3">
                    <h3 className="font-heading text-lg font-semibold">
                      ⏰ Horários Regulares
                    </h3>
                    <p className="text-muted-foreground">
                      Mantenha horários consistentes para suas refeições, isso ajuda na digestão e no metabolismo.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-card">
                  <CardContent className="p-6 space-y-3">
                    <h3 className="font-heading text-lg font-semibold">
                      💧 Hidratação Constante
                    </h3>
                    <p className="text-muted-foreground">
                      Beba pelo menos 2 litros de água por dia. A água é fundamental para absorção de nutrientes.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-card">
                  <CardContent className="p-6 space-y-3">
                    <h3 className="font-heading text-lg font-semibold">
                      🌈 Cores no Prato
                    </h3>
                    <p className="text-muted-foreground">
                      Quanto mais colorido seu prato, maior a variedade de vitaminas e minerais que você está consumindo.
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

export default Nutrition;

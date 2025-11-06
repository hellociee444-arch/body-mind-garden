import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Target, Users } from "lucide-react";
import wellnessImage from "@/assets/wellness-yoga.jpg";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground">
                Sobre o Viva Leve
              </h1>
              <p className="text-lg text-primary-foreground/90">
                Nossa missão é inspirar e guiar você em uma jornada de transformação para uma vida mais saudável, equilibrada e feliz
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div className="space-y-6">
                  <h2 className="font-heading text-3xl md:text-4xl font-bold">
                    Nossa História
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    O Viva Leve nasceu da crença de que saúde e bem-estar devem ser acessíveis a todos. Acreditamos que pequenas mudanças diárias podem gerar grandes transformações na vida das pessoas.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Combinamos conhecimento científico, receitas deliciosas e práticas de autocuidado para criar um espaço onde você encontra tudo o que precisa para viver melhor.
                  </p>
                </div>
                <div className="rounded-3xl overflow-hidden shadow-soft">
                  <img 
                    src={wellnessImage} 
                    alt="Bem-estar e saúde"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Values */}
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center space-y-4">
                  <div className="inline-flex rounded-full bg-primary/10 p-4">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-bold">
                    Cuidado Integral
                  </h3>
                  <p className="text-muted-foreground">
                    Acreditamos no equilíbrio entre corpo, mente e emoções para uma vida plena
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <div className="inline-flex rounded-full bg-primary/10 p-4">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-bold">
                    Informação de Qualidade
                  </h3>
                  <p className="text-muted-foreground">
                    Conteúdo baseado em ciência e práticas comprovadas de bem-estar
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <div className="inline-flex rounded-full bg-primary/10 p-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-bold">
                    Comunidade Acolhedora
                  </h3>
                  <p className="text-muted-foreground">
                    Um espaço de apoio mútuo e inspiração para sua jornada
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensagem enviada!",
      description: "Responderemos em breve. Obrigado pelo contato!",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground">
                Entre em Contato
              </h1>
              <p className="text-lg text-primary-foreground/90">
                Estamos aqui para ajudar. Envie sua mensagem e responderemos o mais breve possível
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nome completo
                    </label>
                    <Input id="name" placeholder="Seu nome" required />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      E-mail
                    </label>
                    <Input id="email" type="email" placeholder="seu@email.com" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Assunto
                  </label>
                  <Input id="subject" placeholder="Como podemos ajudar?" required />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Mensagem
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="Conte-nos mais sobre sua dúvida ou sugestão..."
                    rows={6}
                    required 
                  />
                </div>

                <Button type="submit" size="lg" className="w-full gap-2">
                  <Send className="h-5 w-5" />
                  Enviar mensagem
                </Button>
              </form>

              {/* Contact Info */}
              <div className="mt-16 grid md:grid-cols-2 gap-6">
                <div className="bg-accent/20 rounded-2xl p-6 space-y-3">
                  <div className="inline-flex rounded-full bg-primary/10 p-3">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-bold">
                    E-mail
                  </h3>
                  <p className="text-muted-foreground">
                    contato@vivaleve.com.br
                  </p>
                </div>

                <div className="bg-accent/20 rounded-2xl p-6 space-y-3">
                  <div className="inline-flex rounded-full bg-primary/10 p-3">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-bold">
                    Redes Sociais
                  </h3>
                  <p className="text-muted-foreground">
                    @vivaleve em todas as plataformas
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

export default Contact;

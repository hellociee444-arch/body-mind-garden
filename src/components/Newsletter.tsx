import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Inscrição realizada!",
        description: "Você receberá nossas novidades em breve.",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex rounded-full bg-primary/10 p-4 mb-4">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            Receba novidades e dicas exclusivas
          </h2>
          
          <p className="text-lg text-muted-foreground">
            Inscreva-se na nossa newsletter e transforme sua rotina com conteúdos semanais sobre saúde, bem-estar e vida equilibrada.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" size="lg" className="whitespace-nowrap">
              Quero receber!
            </Button>
          </form>
          
          <p className="text-xs text-muted-foreground">
            Ao se inscrever, você concorda com nossa política de privacidade. Cancele a qualquer momento.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;

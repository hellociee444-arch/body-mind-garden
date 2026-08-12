import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import RequireAccount from "@/components/RequireAccount";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNutriPlan } from "@/hooks/useNutriPlan";
import { useMeasurements } from "@/hooks/useMeasurements";
import { useMealHistory } from "@/hooks/useMealLogs";
import { useNotes } from "@/hooks/useNotes";
import { useFavorites } from "@/hooks/useFavorites";
import { useMadeRecipes } from "@/hooks/useMadeRecipes";
import { downloadProgressReport } from "@/lib/pdf";
import { toast } from "sonner";
import {
  CalendarDays,
  Utensils,
  ShoppingBasket,
  Heart,
  ChefHat,
  TrendingUp,
  BookOpen,
  Dumbbell,
  FileText,
  User as UserIcon,
  Download,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const SHORTCUTS = [
  { to: "/acompanhamento", title: "Acompanhamento de hoje", desc: "Marque e registre suas refeições.", icon: CalendarDays },
  { to: "/meu-cardapio", title: "Meu Cardápio", desc: "Planejamento por dia, semana e refeição.", icon: Utensils },
  { to: "/lista-de-compras", title: "Lista de compras", desc: "Organizada por categoria, com PDF.", icon: ShoppingBasket },
  { to: "/medidas", title: "Medidas e evolução", desc: "Registros e histórico respeitoso.", icon: TrendingUp },
  { to: "/favoritos", title: "Receitas favoritas", desc: "Tudo que você salvou.", icon: Heart },
  { to: "/minha-conta", title: "Meus dados e histórico", desc: "Perfil, avaliações e receitas já feitas.", icon: UserIcon },
  { to: "/biblioteca", title: "Biblioteca e PDFs", desc: "Materiais para baixar.", icon: FileText },
  { to: "/educacao-alimentar", title: "Educação alimentar", desc: "Conteúdos para escolher melhor.", icon: BookOpen },
  { to: "/alimentacao-e-treino", title: "Alimentação e treino", desc: "Pré, pós-treino e receitas práticas.", icon: Dumbbell },
];

export default function MyVivaLeve() {
  const { user } = useAuth();
  const { form, plan } = useNutriPlan();
  const { measurements } = useMeasurements();
  const logs = useMealHistory();
  const { notes, add, remove } = useNotes();
  const { favorites } = useFavorites();
  const { made } = useMadeRecipes();
  const [note, setNote] = useState("");

  const handleReport = () => {
    if (!form && !measurements.length && !logs.length && !notes.length) {
      toast.info("Registre suas informações para gerar o relatório.");
      return;
    }
    downloadProgressReport({
      name: user?.email ?? "Meu Viva Leve",
      form,
      plan,
      measurements,
      logs,
      notes,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Meu Viva Leve — sua área pessoal"
        description="Acesse seu acompanhamento, cardápio, lista de compras, medidas, favoritos, materiais e observações em um só lugar."
      />
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-soft py-10">
          <div className="container mx-auto px-4 max-w-5xl space-y-2">
            <h1 className="font-heading text-2xl md:text-3xl font-bold">Meu Viva Leve</h1>
            <p className="text-sm text-muted-foreground">
              Sua rotina alimentar organizada em um só lugar. Tudo o que você registra fica salvo na sua conta.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8 max-w-5xl space-y-6">
          {!user && <RequireAccount />}

          {user && (
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <span>{favorites.length} favoritas</span>•
              <span>{made.length} já feitas</span>•
              <span>{measurements.length} medidas registradas</span>•
              <span>{logs.filter((l) => l.done).length} refeições realizadas</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SHORTCUTS.map((s) => {
              const Icon = s.icon;
              return (
                <Link key={s.to} to={s.to}>
                  <Card className="h-full transition-all hover:shadow-hover hover:-translate-y-0.5">
                    <CardContent className="p-5 space-y-2">
                      <div className="rounded-xl bg-primary/10 p-2.5 w-fit">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h2 className="font-heading font-semibold">{s.title}</h2>
                      <p className="text-sm text-muted-foreground">{s.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          <Card>
            <CardContent className="p-5 space-y-3">
              <h2 className="font-heading font-semibold">Meu relatório</h2>
              <p className="text-sm text-muted-foreground">
                Reúne em PDF apenas as informações que você registrou: dados, objetivos, medidas, acompanhamento e
                observações.
              </p>
              <Button variant="outline" onClick={handleReport} disabled={!user}>
                <Download className="h-4 w-4 mr-1" /> Baixar meu relatório
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5 space-y-3">
              <h2 className="font-heading font-semibold">Minhas observações</h2>
              <Textarea
                placeholder="Anote como está sua rotina, o que funcionou e o que quer ajustar."
                value={note}
                maxLength={600}
                disabled={!user}
                onChange={(e) => setNote(e.target.value)}
              />
              <Button
                size="sm"
                disabled={!user || !note.trim()}
                onClick={async () => {
                  await add(note);
                  setNote("");
                  toast.success("Observação salva.");
                }}
              >
                <Plus className="h-4 w-4 mr-1" /> Salvar observação
              </Button>
              {notes.length > 0 && (
                <ul className="divide-y pt-2">
                  {notes.map((n) => (
                    <li key={n.id} className="py-2 flex items-start justify-between gap-3">
                      <div className="text-sm">
                        <p className="text-muted-foreground">{n.content}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(n.created_at).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Remover observação" onClick={() => remove(n.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}

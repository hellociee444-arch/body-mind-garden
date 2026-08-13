import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import RequireAccount from "@/components/RequireAccount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import {
  useShoppingList,
  SHOPPING_CATEGORIES,
  type ShoppingCategory,
} from "@/hooks/useShoppingList";
import { useNutriPlan } from "@/hooks/useNutriPlan";
import { downloadPersonalShoppingList } from "@/lib/pdf";
import { Download, Plus, Trash2, ShoppingBasket, Sparkles, Printer } from "lucide-react";
import { toast } from "sonner";

export default function ShoppingList() {
  const { user } = useAuth();
  const { items, addItem, addMany, toggle, remove, clearBought } = useShoppingList();
  const { plan } = useNutriPlan();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState<ShoppingCategory | "auto">("auto");

  const grouped = useMemo(() => {
    const g: Record<string, typeof items> = {};
    for (const it of items) (g[it.category] ||= []).push(it);
    return g;
  }, [items]);

  const pending = items.filter((i) => !i.bought).length;

  const handleAdd = async () => {
    if (!name.trim()) return;
    if (name.trim().length > 80) {
      toast.error("Use um nome mais curto para o item.");
      return;
    }
    await addItem(name, quantity, category === "auto" ? undefined : category);
    setName("");
    setQuantity("");
  };

  const importFromMenu = async () => {
    if (!plan?.lista_compras?.length) {
      toast.info("Gere seu cardápio com a NutriA para importar os ingredientes.");
      return;
    }
    const added = await addMany(plan.lista_compras);
    toast.success(added > 0 ? `${added} itens importados do seu cardápio.` : "Sua lista já está atualizada.");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Minha Lista de Compras — Viva Leve"
        description="Monte sua lista de compras por categoria, marque o que já comprou e baixe em PDF para levar ao mercado."
      />
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-soft py-10">
          <div className="container mx-auto px-4 max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-sm text-primary font-medium">
              <ShoppingBasket className="h-4 w-4" /> Lista de compras
            </div>
            <h1 className="font-heading text-2xl md:text-3xl font-bold">Minha lista de compras</h1>
            <p className="text-sm text-muted-foreground">
              Organizada por categoria para você percorrer o mercado com menos voltas.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8 max-w-3xl space-y-5">
          {!user && <RequireAccount message="Entre na sua conta para salvar sua lista de compras." />}

          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  placeholder="Item (ex.: tomate)"
                  value={name}
                  maxLength={80}
                  disabled={!user}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                />
                <Input
                  placeholder="Quantidade"
                  value={quantity}
                  maxLength={40}
                  disabled={!user}
                  className="sm:w-36"
                  onChange={(e) => setQuantity(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                />
                <Select
                  value={category}
                  onValueChange={(v) => setCategory(v as ShoppingCategory | "auto")}
                  disabled={!user}
                >
                  <SelectTrigger className="sm:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Categoria automática</SelectItem>
                    {SHOPPING_CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleAdd} disabled={!user}>
                  <Plus className="h-4 w-4 mr-1" /> Adicionar
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={importFromMenu} disabled={!user}>
                  <Sparkles className="h-4 w-4 mr-1" /> Importar do meu cardápio
                </Button>
                {items.length > 0 && (
                  <>
                    <Button variant="outline" size="sm" onClick={() => downloadPersonalShoppingList(items)}>
                      <Download className="h-4 w-4 mr-1" /> Baixar em PDF
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-1" /> Imprimir
                    </Button>
                    {items.some((i) => i.bought) && (
                      <Button variant="ghost" size="sm" onClick={clearBought}>
                        Limpar comprados
                      </Button>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {items.length > 0 && (
            <Card>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">
                    {bought} de {items.length} itens comprados
                  </span>
                  <span className="text-muted-foreground">{percent}%</span>
                </div>
                <Progress value={percent} aria-label="Progresso das compras" />
                <p className="text-xs text-muted-foreground">
                  {pending > 0
                    ? `${pending} ${pending === 1 ? "item ainda para comprar" : "itens ainda para comprar"}.`
                    : "Tudo comprado. Boas refeições!"}
                </p>
              </CardContent>
            </Card>
          )}

          {items.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-sm text-muted-foreground space-y-2">
                <p>Sua lista está vazia. Adicione itens ou importe os ingredientes do seu cardápio.</p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/meu-cardapio">Ver meu cardápio</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {SHOPPING_CATEGORIES.filter((c) => grouped[c]?.length).map((c) => (
                <Card key={c}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      {c}
                      <Badge variant="outline" className="text-xs">
                        {grouped[c].length}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1">
                    {grouped[c].map((it) => (
                      <div key={it.id} className="flex items-center gap-3 py-1.5">
                        <Checkbox
                          checked={it.bought}
                          onCheckedChange={(v) => toggle(it.id, !!v)}
                          aria-label={`Marcar ${it.name} como comprado`}
                        />
                        <span
                          className={`flex-1 text-sm ${it.bought ? "line-through text-muted-foreground" : ""}`}
                        >
                          {it.name}
                          {it.quantity && <span className="text-muted-foreground"> — {it.quantity}</span>}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          aria-label={`Remover ${it.name}`}
                          onClick={() => remove(it.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

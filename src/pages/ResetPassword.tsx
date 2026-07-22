import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function ResetPassword() {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  useEffect(() => {
    // Supabase auto-handles the recovery token in the URL hash and creates a session.
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) return toast.error("A senha precisa ter pelo menos 6 caracteres.");
    if (password !== confirm) return toast.error("As senhas não coincidem.");
    setLoading(true);
    const { error } = await updatePassword(password);
    setLoading(false);
    if (error) return toast.error(error);
    toast.success("Senha atualizada! Redirecionando...");
    setTimeout(() => navigate("/minha-conta", { replace: true }), 800);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO title="Redefinir senha — Viva Leve" description="Defina uma nova senha para sua conta Viva Leve." />
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-heading text-center">Redefinir senha</CardTitle>
            <p className="text-sm text-muted-foreground text-center">Escolha uma nova senha para acessar sua conta.</p>
          </CardHeader>
          <CardContent>
            {!ready ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Verificando link de recuperação... Se você chegou aqui sem clicar no e-mail de recuperação, solicite um novo link.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="new-pass">Nova senha</Label>
                  <Input id="new-pass" type="password" required minLength={6} value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="conf-pass">Confirmar senha</Label>
                  <Input id="conf-pass" type="password" required minLength={6} value={confirm}
                    onChange={(e) => setConfirm(e.target.value)} />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Salvar nova senha"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

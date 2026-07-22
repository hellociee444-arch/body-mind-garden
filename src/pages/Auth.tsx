import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function Auth() {
  const { signIn, signUp, resetPassword, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await resetPassword(forgotEmail);
    setLoading(false);
    if (error) toast.error(error);
    else {
      toast.success("Enviamos um link de recuperação para seu e-mail.");
      setShowForgot(false);
    }
  };

  useEffect(() => {
    if (user) navigate("/nutri-assistente", { replace: true });
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(loginData.email, loginData.password);
    setLoading(false);
    if (error) toast.error(error);
    else {
      toast.success("Bem-vindo(a) de volta!");
      navigate("/nutri-assistente");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password.length < 6) {
      toast.error("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }
    setLoading(true);
    const { error } = await signUp(signupData.name, signupData.email, signupData.password);
    setLoading(false);
    if (error) toast.error(error);
    else {
      toast.success("Conta criada! Você já está conectado.");
      navigate("/nutri-assistente");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO title="Entrar ou Cadastrar — Viva Leve" description="Acesse sua conta Viva Leve para salvar seu plano nutricional, favoritos e histórico." />
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-heading text-center">Bem-vindo(a) ao Viva Leve</CardTitle>
            <p className="text-sm text-muted-foreground text-center">Salve seu plano, favoritos e histórico.</p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="login">Entrar</TabsTrigger>
                <TabsTrigger value="signup">Cadastrar</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="l-email">E-mail</Label>
                    <Input id="l-email" type="email" required value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="l-pass">Senha</Label>
                    <Input id="l-pass" type="password" required value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Entrar"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="s-name">Nome</Label>
                    <Input id="s-name" required value={signupData.name}
                      onChange={(e) => setSignupData({ ...signupData, name: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="s-email">E-mail</Label>
                    <Input id="s-email" type="email" required value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="s-pass">Senha (mín. 6 caracteres)</Label>
                    <Input id="s-pass" type="password" required minLength={6} value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Criar conta"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            <p className="text-xs text-muted-foreground text-center mt-6">
              <Link to="/" className="hover:text-primary">← Voltar ao início</Link>
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/RecipeDetail";
import Category from "./pages/Category";
import Nutrition from "./pages/Nutrition";
import Fitness from "./pages/Fitness";
import Wellness from "./pages/Wellness";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Favorites from "./pages/Favorites";
import Tools from "./pages/Tools";
import NutriAssistant from "./pages/NutriAssistant";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import Library from "./pages/Library";
import MyAccount from "./pages/MyAccount";
import MyVivaLeve from "./pages/MyVivaLeve";
import Tracking from "./pages/Tracking";
import MyMenu from "./pages/MyMenu";
import ShoppingList from "./pages/ShoppingList";
import Progress from "./pages/Progress";
import Education from "./pages/Education";
import TrainingFood from "./pages/TrainingFood";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/receitas" element={<Recipes />} />
                <Route path="/receita/:id" element={<RecipeDetail />} />
                <Route path="/categoria/:slug" element={<Category />} />
                <Route path="/categorias" element={<Category />} />
                <Route path="/favoritos" element={<Favorites />} />
                <Route path="/nutricao" element={<Nutrition />} />
                <Route path="/fitness" element={<Fitness />} />
                <Route path="/bem-estar" element={<Wellness />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/sobre" element={<About />} />
                <Route path="/contato" element={<Contact />} />
                <Route path="/ferramentas" element={<Tools />} />
                <Route path="/nutri-assistente" element={<NutriAssistant />} />
                <Route path="/biblioteca" element={<Library />} />
                <Route path="/minha-conta" element={<MyAccount />} />
                <Route path="/meu-viva-leve" element={<MyVivaLeve />} />
                <Route path="/acompanhamento" element={<Tracking />} />
                <Route path="/meu-cardapio" element={<MyMenu />} />
                <Route path="/lista-de-compras" element={<ShoppingList />} />
                <Route path="/medidas" element={<Progress />} />
                <Route path="/educacao-alimentar" element={<Education />} />
                <Route path="/alimentacao-e-treino" element={<TrainingFood />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;

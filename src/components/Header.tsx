import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Leaf, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { favorites } = useFavorites();

  const navItems = [
    { name: "Início", path: "/" },
    { name: "Receitas", path: "/receitas" },
    { name: "Nutri IA", path: "/nutri-assistente" },
    { name: "Ferramentas", path: "/ferramentas" },
    { name: "Nutrição", path: "/nutricao" },
    { name: "Fitness", path: "/fitness" },
    { name: "Bem-Estar", path: "/bem-estar" },
    { name: "Blog", path: "/blog" },
    { name: "Sobre", path: "/sobre" },
    { name: "Contato", path: "/contato" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md supports-[backdrop-filter]:bg-card/70 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group shrink-0"
            aria-label="Viva Leve — página inicial"
          >
            <div className="rounded-full bg-gradient-accent p-2 group-hover:shadow-glow transition-all duration-300">
              <Leaf className="h-5 w-5 text-primary-foreground group-hover:rotate-12 transition-transform" />
            </div>
            <span className="font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              Viva Leve
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Navegação principal">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  cn(
                    "text-sm font-medium transition-all duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300",
                    isActive
                      ? "text-primary after:w-full"
                      : "text-muted-foreground hover:text-primary after:w-0 hover:after:w-full",
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-1 shrink-0">
            <Button
              asChild
              variant="ghost"
              size="icon"
              aria-label={`Favoritos (${favorites.length})`}
              className="relative rounded-full hover:scale-110 transition-transform"
            >
              <Link to="/favoritos">
                <Heart className="h-5 w-5" />
                {favorites.length > 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center"
                  >
                    {favorites.length}
                  </span>
                )}
              </Link>
            </Button>

            <ThemeToggle />

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav
            className="lg:hidden border-t border-border py-4 space-y-1 animate-fade-in"
            aria-label="Navegação móvel"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "block py-2 px-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "text-primary bg-accent/50"
                      : "text-muted-foreground hover:text-primary hover:bg-accent/30",
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

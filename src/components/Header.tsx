import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Leaf, Heart, LogIn, LogOut, User as UserIcon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { favorites } = useFavorites();
  const { user, signOut } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: "Início", path: "/" },
    { name: "Receitas", path: "/receitas" },
    { name: "Nutri IA", path: "/nutri-assistente" },
    { name: "Cardápio", path: "/meu-cardapio" },
    { name: "Acompanhamento", path: "/acompanhamento" },
    { name: "Educação", path: "/educacao-alimentar" },
  ];

  const moreItems = [
    { name: "Fitness", path: "/fitness" },
    { name: "Bem-Estar", path: "/bem-estar" },
    { name: "Ferramentas", path: "/ferramentas" },
    { name: "Blog", path: "/blog" },
    { name: "Sobre", path: "/sobre" },
    { name: "Contato", path: "/contato" },
  ];

  const isMoreActive = moreItems.some((i) => location.pathname.startsWith(i.path));
  const allMobileItems = [...navItems, ...moreItems];

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

            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  "inline-flex items-center gap-1 text-sm font-medium transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm data-[state=open]:text-primary",
                  isMoreActive ? "text-primary" : "text-muted-foreground hover:text-primary",
                )}
              >
                Mais
                <ChevronDown className="h-4 w-4 transition-transform duration-300" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-card">
                {moreItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      to={item.path}
                      className={cn(
                        "cursor-pointer text-sm",
                        location.pathname.startsWith(item.path) && "text-primary font-medium",
                      )}
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
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

            {user ? (
              <>
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  aria-label="Meu Viva Leve"
                  className="rounded-full hover:scale-110 transition-transform"
                  title={user.email ?? "Minha conta"}
                >
                  <Link to="/meu-viva-leve"><UserIcon className="h-5 w-5" /></Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => signOut()}
                  aria-label="Sair"
                  className="rounded-full hover:scale-110 transition-transform"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Button
                asChild
                variant="ghost"
                size="icon"
                aria-label="Entrar"
                className="rounded-full hover:scale-110 transition-transform"
              >
                <Link to="/auth"><LogIn className="h-5 w-5" /></Link>
              </Button>
            )}

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
            {allMobileItems.map((item) => (
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

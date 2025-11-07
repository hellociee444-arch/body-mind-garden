import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Início", path: "/" },
    { name: "Receitas", path: "/receitas" },
    { name: "Nutrição", path: "/nutricao" },
    { name: "Fitness", path: "/fitness" },
    { name: "Bem-Estar", path: "/bem-estar" },
    { name: "Blog", path: "/blog" },
    { name: "Sobre", path: "/sobre" },
    { name: "Contato", path: "/contato" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <div className="rounded-full bg-primary p-2">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl font-bold text-foreground">Viva Leve</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden border-t py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

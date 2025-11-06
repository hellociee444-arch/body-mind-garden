import { Link } from "react-router-dom";
import { Leaf, Instagram, Facebook, Youtube, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    "Navegação": [
      { name: "Início", path: "/" },
      { name: "Receitas", path: "/receitas" },
      { name: "Blog", path: "/blog" },
      { name: "Sobre", path: "/sobre" },
    ],
    "Categorias": [
      { name: "Nutrição", path: "/nutricao" },
      { name: "Fitness", path: "/fitness" },
      { name: "Bem-Estar", path: "/bem-estar" },
      { name: "Guias", path: "/guias" },
    ],
    "Recursos": [
      { name: "E-books Grátis", path: "/ebooks" },
      { name: "Planos Premium", path: "/premium" },
      { name: "Parceiros", path: "/parceiros" },
      { name: "Newsletter", path: "#newsletter" },
    ],
  };

  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 w-fit">
              <div className="rounded-full bg-primary p-2">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-heading text-xl font-bold text-foreground">Viva Leve</span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              Coma bem. Viva leve. Cuide do corpo e da mente. Descubra o equilíbrio perfeito entre alimentação saudável e bem-estar.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h3 className="font-heading font-semibold">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Viva Leve. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacidade" className="text-muted-foreground hover:text-primary transition-colors">
              Privacidade
            </Link>
            <Link to="/termos" className="text-muted-foreground hover:text-primary transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import wellnessImage from "@/assets/wellness-yoga.jpg";

const Blog = () => {
  const posts = [
    {
      id: "vida-saudavel",
      title: "10 Passos para uma Vida Mais Saudável e Equilibrada",
      excerpt: "Descubra mudanças simples que podem transformar sua rotina e trazer mais bem-estar para o seu dia a dia.",
      image: wellnessImage,
      category: "Bem-Estar",
      date: "15 Jan 2025",
      readTime: "5 min",
    },
    {
      id: "autocuidado",
      title: "Como Criar uma Rotina de Autocuidado Sustentável",
      excerpt: "Aprenda a construir hábitos de autocuidado que realmente funcionam para você e se encaixam na sua vida.",
      image: wellnessImage,
      category: "Autocuidado",
      date: "12 Jan 2025",
      readTime: "7 min",
    },
    {
      id: "alimentacao-consciente",
      title: "Alimentação Consciente: O Que É e Como Praticar",
      excerpt: "Entenda os princípios da alimentação consciente e como essa prática pode melhorar sua relação com a comida.",
      image: wellnessImage,
      category: "Nutrição",
      date: "10 Jan 2025",
      readTime: "6 min",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-hero py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground">
                Blog Viva Leve
              </h1>
              <p className="text-lg text-primary-foreground/90">
                Artigos, dicas e inspiração para uma vida mais saudável e equilibrada
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              {posts.map((post, index) => (
                <Link 
                  key={index} 
                  to={`/blog/${post.id}`}
                  className="block group"
                >
                  <Card className="overflow-hidden border-none shadow-card hover:shadow-hover transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up border border-border/50 hover:border-primary/30 hover:bg-gradient-to-br hover:from-accent/30 hover:to-card" style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="grid md:grid-cols-5 gap-6">
                      <div className="md:col-span-2 overflow-hidden relative">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover min-h-[200px] group-hover:scale-110 group-hover:brightness-105 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                      <CardContent className="md:col-span-3 p-6 space-y-4">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground transition-all duration-500 group-hover:text-foreground group-hover:translate-x-1">
                          <Badge variant="secondary" className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                            {post.category}
                          </Badge>
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime} de leitura</span>
                        </div>
                        
                        <h2 className="font-heading text-2xl font-bold text-foreground group-hover:text-primary transition-all duration-500 group-hover:translate-x-1">
                          {post.title}
                        </h2>
                        
                        <p className="text-muted-foreground leading-relaxed transition-all duration-500 group-hover:text-foreground">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center text-primary font-medium group-hover:gap-3 gap-2 transition-all duration-500">
                          <span className="group-hover:translate-x-1 transition-transform duration-500">Ler artigo completo</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-500" />
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;

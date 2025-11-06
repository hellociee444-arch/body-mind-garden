import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import wellnessImage from "@/assets/wellness-yoga.jpg";

const Blog = () => {
  const posts = [
    {
      title: "10 Passos para uma Vida Mais Saudável e Equilibrada",
      excerpt: "Descubra mudanças simples que podem transformar sua rotina e trazer mais bem-estar para o seu dia a dia.",
      image: wellnessImage,
      category: "Bem-Estar",
      date: "15 Jan 2025",
      readTime: "5 min",
    },
    {
      title: "Como Criar uma Rotina de Autocuidado Sustentável",
      excerpt: "Aprenda a construir hábitos de autocuidado que realmente funcionam para você e se encaixam na sua vida.",
      image: wellnessImage,
      category: "Autocuidado",
      date: "12 Jan 2025",
      readTime: "7 min",
    },
    {
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
                <Card key={index} className="overflow-hidden border-none shadow-card hover:shadow-soft transition-all duration-300">
                  <div className="grid md:grid-cols-5 gap-6">
                    <div className="md:col-span-2">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover min-h-[200px]"
                      />
                    </div>
                    <CardContent className="md:col-span-3 p-6 space-y-4">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Badge variant="secondary">{post.category}</Badge>
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime} de leitura</span>
                      </div>
                      
                      <h2 className="font-heading text-2xl font-bold hover:text-primary transition-colors cursor-pointer">
                        {post.title}
                      </h2>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <button className="text-primary font-medium hover:underline">
                        Ler artigo completo →
                      </button>
                    </CardContent>
                  </div>
                </Card>
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

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import wellnessImage from "@/assets/wellness-yoga.jpg";
const Blog = () => {
  const posts = [{
    title: "10 Passos para uma Vida Mais Saudável e Equilibrada",
    excerpt: "Descubra mudanças simples que podem transformar sua rotina e trazer mais bem-estar para o seu dia a dia.",
    image: wellnessImage,
    category: "Bem-Estar",
    date: "15 Jan 2025",
    readTime: "5 min"
  }, {
    title: "Como Criar uma Rotina de Autocuidado Sustentável",
    excerpt: "Aprenda a construir hábitos de autocuidado que realmente funcionam para você e se encaixam na sua vida.",
    image: wellnessImage,
    category: "Autocuidado",
    date: "12 Jan 2025",
    readTime: "7 min"
  }, {
    title: "Alimentação Consciente: O Que É e Como Praticar",
    excerpt: "Entenda os princípios da alimentação consciente e como essa prática pode melhorar sua relação com a comida.",
    image: wellnessImage,
    category: "Nutrição",
    date: "10 Jan 2025",
    readTime: "6 min"
  }];
  return <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        

        {/* Blog Posts */}
        
      </main>
      <Footer />
    </div>;
};
export default Blog;
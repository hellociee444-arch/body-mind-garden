import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import wellnessImage from "@/assets/wellness-yoga.jpg";

const BlogPost = () => {
  const { id } = useParams();

  const posts = [
    {
      id: "vida-saudavel",
      title: "10 Passos para uma Vida Mais Saudável e Equilibrada",
      excerpt: "Descubra mudanças simples que podem transformar sua rotina e trazer mais bem-estar para o seu dia a dia.",
      image: wellnessImage,
      category: "Bem-Estar",
      date: "15 Jan 2025",
      readTime: "5 min",
      content: `
        <h2>Transforme sua vida com pequenas mudanças</h2>
        <p>Viver de forma saudável e equilibrada não precisa ser complicado. Com algumas mudanças simples em sua rotina diária, você pode experimentar melhorias significativas em sua saúde física e mental.</p>
        
        <h3>1. Alimente-se com Consciência</h3>
        <p>Preste atenção ao que você come. Escolha alimentos naturais, ricos em nutrientes e evite ultraprocessados. Comer com atenção plena ajuda a reconhecer sinais de saciedade e a fazer escolhas mais saudáveis.</p>
        
        <h3>2. Hidrate-se Bem</h3>
        <p>A água é essencial para todas as funções do corpo. Mantenha-se hidratado ao longo do dia, especialmente antes, durante e após exercícios físicos.</p>
        
        <h3>3. Mova-se Diariamente</h3>
        <p>Não é necessário passar horas na academia. Incorpore movimento em sua rotina: caminhe, dance, faça yoga ou qualquer atividade que você goste.</p>
        
        <h3>4. Priorize o Sono</h3>
        <p>Dormir bem é fundamental para a recuperação física e mental. Estabeleça uma rotina de sono consistente e crie um ambiente propício ao descanso.</p>
        
        <h3>5. Exponha-se ao Sol com Moderação</h3>
        <p>A luz solar é importante para a produção de vitamina D e para regular o ritmo circadiano. Tome sol diariamente, mas sempre com proteção adequada.</p>
        
        <h3>6. Cuide da Mente</h3>
        <p>Pratique meditação, mindfulness ou simplesmente reserve momentos de silêncio para você. A saúde mental é tão importante quanto a física.</p>
        
        <h3>7. Cultive Boas Relações</h3>
        <p>Conexões sociais significativas são fundamentais para o bem-estar. Invista tempo em relacionamentos que te fazem bem.</p>
        
        <h3>8. Planeje sua Rotina Alimentar</h3>
        <p>Organize suas refeições com antecedência. Isso ajuda a fazer escolhas mais saudáveis e evita decisões impulsivas por alimentos não nutritivos.</p>
        
        <h3>9. Pratique a Gratidão</h3>
        <p>Reserve alguns minutos do seu dia para refletir sobre as coisas boas em sua vida. A gratidão está associada a maior felicidade e bem-estar.</p>
        
        <h3>10. Seja Gentil Consigo Mesmo</h3>
        <p>Mudanças levam tempo. Celebre pequenas vitórias e não se culpe por deslizes ocasionais. O importante é a consistência a longo prazo.</p>
      `
    },
    {
      id: "autocuidado",
      title: "Como Criar uma Rotina de Autocuidado Sustentável",
      excerpt: "Aprenda a construir hábitos de autocuidado que realmente funcionam para você e se encaixam na sua vida.",
      image: wellnessImage,
      category: "Autocuidado",
      date: "12 Jan 2025",
      readTime: "7 min",
      content: `
        <h2>Construindo uma rotina de autocuidado que funciona</h2>
        <p>O autocuidado não é egoísmo, é uma necessidade. Quando cuidamos bem de nós mesmos, temos mais energia e disposição para cuidar dos outros e enfrentar os desafios do dia a dia.</p>
        
        <h3>Comece o Dia com Intenção</h3>
        <p>Reserve os primeiros minutos da manhã para você. Pode ser meditação, alongamento, leitura ou simplesmente tomar um café com calma, sem pressa.</p>
        
        <h3>Hidrate-se ao Acordar</h3>
        <p>Comece o dia bebendo um copo de água. Depois de horas dormindo, seu corpo precisa de hidratação para funcionar bem.</p>
        
        <h3>Crie Pausas de Respiração</h3>
        <p>Ao longo do dia, faça pequenas pausas para respirar profundamente. Isso ajuda a reduzir o estresse e traz mais clareza mental.</p>
        
        <h3>Escolha Alimentos que Te Nutrem</h3>
        <p>Opte por refeições balanceadas que fornecem energia sustentável. Seu corpo agradece quando você o alimenta com qualidade.</p>
        
        <h3>Desconecte-se das Telas</h3>
        <p>Estabeleça horários sem celular ou computador. Use esse tempo para estar presente consigo mesmo ou com pessoas queridas.</p>
        
        <h3>Tenha um Ritual Noturno</h3>
        <p>Prepare-se para dormir com um ritual relaxante: banho morno, skincare, leitura ou qualquer atividade que te acalme.</p>
        
        <h3>Valorize o Descanso</h3>
        <p>Lembre-se: descansar não é preguiça. É essencial para sua saúde física e mental. Permita-se parar quando necessário.</p>
      `
    },
    {
      id: "alimentacao-consciente",
      title: "Alimentação Consciente: O Que É e Como Praticar",
      excerpt: "Entenda os princípios da alimentação consciente e como essa prática pode melhorar sua relação com a comida.",
      image: wellnessImage,
      category: "Nutrição",
      date: "10 Jan 2025",
      readTime: "6 min",
      content: `
        <h2>Transforme sua relação com a comida</h2>
        <p>A alimentação consciente, ou mindful eating, é uma prática que nos convida a estar plenamente presentes durante as refeições, prestando atenção aos sinais do corpo e aos aspectos sensoriais da comida.</p>
        
        <h3>O Que É Alimentação Consciente?</h3>
        <p>É comer com atenção plena, sem distrações, reconhecendo sensações físicas e emocionais relacionadas à comida. Não se trata de dieta, mas de desenvolver uma relação mais saudável com o ato de comer.</p>
        
        <h3>Elimine Distrações</h3>
        <p>Desligue a TV, afaste o celular e concentre-se na refeição. Isso permite que você perceba melhor os sabores, texturas e sinais de saciedade.</p>
        
        <h3>Coma Devagar</h3>
        <p>Mastigue bem os alimentos e faça pausas entre as garfadas. Leva cerca de 20 minutos para o cérebro registrar que você está satisfeito.</p>
        
        <h3>Reconheça a Fome Real</h3>
        <p>Aprenda a diferenciar fome física de fome emocional. Pergunte-se: "Estou realmente com fome ou estou comendo por outro motivo?"</p>
        
        <h3>Aprecie os Alimentos</h3>
        <p>Use todos os sentidos: observe as cores, sinta os aromas, aprecie as texturas e sabores. Isso torna a experiência de comer mais satisfatória.</p>
        
        <h3>Respeite Sua Saciedade</h3>
        <p>Pare de comer quando estiver satisfeito, não quando o prato estiver vazio. Aprenda a ouvir os sinais do seu corpo.</p>
        
        <h3>Pratique a Não Culpa</h3>
        <p>Evite rotular alimentos como "bons" ou "ruins". Todos os alimentos têm seu lugar em uma alimentação equilibrada. Livre-se da culpa alimentar.</p>
        
        <h3>Benefícios da Alimentação Consciente</h3>
        <p>Esta prática pode ajudar no controle de peso, reduzir compulsões alimentares, melhorar a digestão e proporcionar mais prazer nas refeições.</p>
      `
    }
  ];

  const post = posts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Artigo não encontrado</h1>
            <Link to="/blog">
              <Button>Voltar ao Blog</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Back Button */}
        <div className="container mx-auto px-4 py-6">
          <Link to="/blog">
            <Button variant="ghost" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Voltar ao Blog
            </Button>
          </Link>
        </div>

        {/* Hero Image */}
        <div className="relative h-[400px] overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        {/* Content */}
        <article className="container mx-auto px-4 -mt-32 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-2xl shadow-soft p-8 md:p-12 space-y-6 animate-fade-in-up">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <Badge variant="secondary" className="animate-scale-in">{post.category}</Badge>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime} de leitura</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>

              {/* Share Button */}
              <div className="flex gap-3 pt-4 border-t">
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Compartilhar
                </Button>
              </div>

              {/* Content */}
              <div 
                className="prose prose-lg max-w-none pt-8
                  prose-headings:font-heading prose-headings:text-foreground
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-primary
                  prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                  prose-strong:text-foreground prose-strong:font-semibold"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        </article>

        {/* Related Posts */}
        <section className="py-16 bg-secondary/30 mt-16">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl font-bold text-center mb-12">
              Mais Artigos
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {posts.filter(p => p.id !== id).slice(0, 2).map((relatedPost) => (
                <Link 
                  key={relatedPost.id} 
                  to={`/blog/${relatedPost.id}`}
                  className="group"
                >
                  <div className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 transform hover:-translate-y-1">
                    <img 
                      src={relatedPost.image} 
                      alt={relatedPost.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-6 space-y-3">
                      <Badge variant="secondary">{relatedPost.category}</Badge>
                      <h3 className="font-heading text-xl font-bold group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {relatedPost.readTime} de leitura
                      </p>
                    </div>
                  </div>
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

export default BlogPost;

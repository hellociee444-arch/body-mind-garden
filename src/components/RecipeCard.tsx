import { Link } from "react-router-dom";
import { Clock, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RecipeCardProps {
  title: string;
  image: string;
  time: string;
  calories: string;
  rating: number;
  tags: string[];
  recipeId: number;
}

const RecipeCard = ({ title, image, time, calories, rating, tags, recipeId }: RecipeCardProps) => {
  return (
    <Link to={`/receita/${recipeId}`} className="block">
      <Card className="group overflow-hidden border-none shadow-card hover:shadow-hover transition-all duration-500 hover:-translate-y-2 cursor-pointer bg-card hover:bg-gradient-to-br hover:from-accent/30 hover:to-card">
      <div className="relative overflow-hidden aspect-square">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-3 right-3 bg-card/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1 shadow-md transform transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg">
          <Star className="h-4 w-4 fill-primary text-primary transition-transform duration-500 group-hover:rotate-12" />
          <span className="text-sm font-medium text-foreground">{rating}</span>
        </div>
      </div>
      
      <CardContent className="p-5 space-y-3">
        <h3 className="font-heading text-lg font-semibold line-clamp-2 text-foreground group-hover:text-primary transition-all duration-500 group-hover:translate-x-1">
          {title}
        </h3>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground transition-all duration-500 group-hover:text-foreground">
          <div className="flex items-center gap-1.5 transition-transform duration-500 group-hover:scale-105">
            <Clock className="h-4 w-4 transition-transform duration-500 group-hover:rotate-12" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-1.5 transition-transform duration-500 group-hover:scale-105">
            <span className="font-medium">{calories}</span>
            <span>kcal</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="text-xs transition-all duration-500 hover:bg-primary hover:text-primary-foreground hover:scale-105"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      </Card>
    </Link>
  );
};

export default RecipeCard;

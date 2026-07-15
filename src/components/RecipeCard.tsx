import { Link } from "react-router-dom";
import { Clock, Star, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

interface RecipeCardProps {
  title: string;
  image: string;
  time: string;
  calories: string;
  rating: number;
  tags: string[];
  recipeId: number;
}

const RecipeCard = ({
  title,
  image,
  time,
  calories,
  rating,
  tags,
  recipeId,
}: RecipeCardProps) => {
  const { isFavorite, toggle } = useFavorites();
  const favorited = isFavorite(recipeId);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(recipeId);
  };

  return (
    <Link
      to={`/receita/${recipeId}`}
      className="block group focus-visible:outline-none rounded-2xl"
      aria-label={`Ver receita: ${title}`}
    >
      <Card className="relative overflow-hidden border-none shadow-card hover:shadow-hover transition-all duration-500 hover:-translate-y-2 cursor-pointer bg-card group-hover:bg-gradient-to-br group-hover:from-accent/30 group-hover:to-card h-full">
        <div className="relative overflow-hidden aspect-square">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-105"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />

          {/* Rating badge */}
          <div className="absolute top-3 right-3 bg-card/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1 shadow-md transition-all duration-500 group-hover:scale-110">
            <Star
              className="h-4 w-4 fill-primary text-primary transition-transform duration-500 group-hover:rotate-12"
              aria-hidden="true"
            />
            <span className="text-sm font-medium text-foreground">{rating}</span>
          </div>

          {/* Favorite button */}
          <button
            type="button"
            onClick={handleFavorite}
            aria-label={
              favorited ? `Remover ${title} dos favoritos` : `Adicionar ${title} aos favoritos`
            }
            aria-pressed={favorited}
            className={cn(
              "absolute top-3 left-3 h-9 w-9 rounded-full flex items-center justify-center backdrop-blur-sm shadow-md transition-all duration-300 hover:scale-110 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              favorited
                ? "bg-destructive text-destructive-foreground"
                : "bg-card/95 text-muted-foreground hover:text-destructive",
            )}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-all",
                favorited && "fill-current scale-110",
              )}
            />
          </button>
        </div>

        <CardContent className="p-5 space-y-3">
          <h3 className="font-heading text-lg font-semibold line-clamp-2 text-foreground group-hover:text-primary transition-all duration-500">
            {title}
          </h3>

          <div className="flex items-center gap-4 text-sm text-muted-foreground transition-colors duration-500 group-hover:text-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              <span>{time}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-medium">{calories}</span>
              <span>kcal</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs transition-all duration-500"
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

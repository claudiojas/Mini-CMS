import { ExternalLink, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  title: string;
  image: string;
  platform: string;
  badge?: "Top CB" | "Testado" | "Promoção";
  rating?: number;
  link: string;
  featured?: boolean;
}

export function ProductCard({
  title,
  image,
  platform,
  badge,
  rating,
  link,
  featured = false,
}: ProductCardProps) {
  return (
    <Card className={`group overflow-hidden transition-all duration-300 hover:shadow-card-hover ${featured ? 'border-secondary border-2' : ''}`}>
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {badge && (
            <Badge 
              variant={badge === "Top CB" ? "warning" : badge === "Testado" ? "success" : "secondary"}
              className="absolute top-3 right-3 shadow-md"
            >
              {badge}
            </Badge>
          )}
        </div>
        
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-base line-clamp-2 min-h-[3rem]">
            {title}
          </h3>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{platform}</span>
            {rating && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span className="font-medium">{rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          variant="cta" 
          className="w-full"
          asChild
        >
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`Ver ${title} no ${platform}`}
          >
            Ver Oferta
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

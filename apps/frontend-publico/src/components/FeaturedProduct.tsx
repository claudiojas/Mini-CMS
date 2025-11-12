import { ExternalLink, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FeaturedProductProps {
  title: string;
  image: string;
  platform: string;
  description: string;
  link: string;
}

export function FeaturedProduct({
  title,
  image,
  platform,
  description,
  link,
}: FeaturedProductProps) {
  return (
    <Card className="border-secondary border-2 overflow-hidden bg-gradient-card shadow-card-hover">
      <CardContent className="p-0">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative aspect-video md:aspect-square overflow-hidden bg-muted">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
              loading="eager"
            />
            <Badge variant="warning" className="absolute top-4 left-4 shadow-lg">
              <Zap className="h-3 w-3 mr-1" />
              Destaque
            </Badge>
          </div>
          
          <div className="p-6 md:p-8 flex flex-col justify-center space-y-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {title}
              </h2>
              <p className="text-muted-foreground text-sm mb-3">
                {platform}
              </p>
              <p className="text-foreground leading-relaxed">
                {description}
              </p>
            </div>
            
            <Button 
              variant="cta" 
              size="lg"
              className="w-full md:w-auto"
              asChild
            >
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={`Ver oferta especial: ${title}`}
              >
                Ver Oferta Especial
                <ExternalLink className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Share2, Play } from "lucide-react";
import { useState } from "react";

interface MovieCardProps {
  id: string;
  title: string;
  year: number;
  rating: number;
  genre: string;
  poster: string;
  description: string;
  duration?: string;
  isLiked?: boolean;
  onLike?: (id: string) => void;
  onShare?: (id: string) => void;
  onPlay?: (id: string) => void;
}

export const MovieCard = ({
  id,
  title,
  year,
  rating,
  genre,
  poster,
  description,
  duration,
  isLiked = false,
  onLike,
  onShare,
  onPlay,
}: MovieCardProps) => {
  const [liked, setLiked] = useState(isLiked);

  const handleLike = () => {
    setLiked(!liked);
    onLike?.(id);
  };

  const handleShare = () => {
    onShare?.(id);
  };

  const handlePlay = () => {
    onPlay?.(id);
  };

  return (
    <Card className="card-gradient overflow-hidden group hover:scale-105 transition-all duration-300 animate-fade-in">
      <div className="relative">
        <img
          src={poster}
          alt={title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://via.placeholder.com/300x400/1a1a2e/eee?text=" + encodeURIComponent(title);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={handlePlay}
        >
          <Play className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg leading-tight mb-1">{title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{year}</span>
              {duration && (
                <>
                  <span>•</span>
                  <span>{duration}</span>
                </>
              )}
              <span>•</span>
              <span className="text-primary">★ {rating}</span>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{genre}</p>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{description}</p>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`flex-1 ${liked ? 'text-primary glow-effect' : ''}`}
          >
            <Heart className={`h-4 w-4 mr-2 ${liked ? 'fill-current' : ''}`} />
            {liked ? 'Сохранено' : 'Сохранить'}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
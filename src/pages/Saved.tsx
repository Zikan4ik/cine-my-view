import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { MovieCard } from "@/components/MovieCard";
import { getSavedMovies, toggleSavedMovie } from "@/data/movies";
import { useToast } from "@/hooks/use-toast";
import { Heart, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const Saved = () => {
  const { toast } = useToast();
  const savedMovies = getSavedMovies();

  const handleLike = (movieId: string) => {
    const isNowSaved = toggleSavedMovie(movieId);
    toast({
      title: "Фильм удалён из сохранённых",
      description: "Фильм больше не в вашем списке",
    });
    // Trigger re-render by forcing component update
    window.location.reload();
  };

  const handleShare = (movieId: string) => {
    const movie = savedMovies.find(m => m.id === movieId);
    if (movie && navigator.share) {
      navigator.share({
        title: movie.title,
        text: `Посмотри этот фильм: ${movie.title} (${movie.year})`,
        url: window.location.href,
      });
    } else {
      toast({
        title: "Ссылка скопирована!",
        description: "Поделитесь фильмом с друзьями",
      });
    }
  };

  const handlePlay = (movieId: string) => {
    toast({
      title: "Функция в разработке",
      description: "Скоро вы сможете смотреть фильмы прямо в приложении!",
    });
  };

  const handleDownloadAll = () => {
    toast({
      title: "Загрузка начата",
      description: "Ваши фильмы загружаются для просмотра оффлайн",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-background pb-20">
      <Header title="Сохранённые" />
      
      <div className="px-4 py-6">
        {savedMovies.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary fill-current" />
                <h2 className="text-xl font-semibold">Мои фильмы</h2>
                <span className="text-sm text-muted-foreground">
                  ({savedMovies.length})
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleDownloadAll}
                className="bg-accent/50 border-accent hover:bg-accent"
              >
                <Download className="w-4 h-4 mr-2" />
                Скачать все
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {savedMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  {...movie}
                  isLiked={true}
                  onLike={handleLike}
                  onShare={handleShare}
                  onPlay={handlePlay}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-muted/20 rounded-full p-6 mb-4">
              <Heart className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Список пуст</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-sm">
              Сохраняйте фильмы и сериалы, чтобы легко найти их позже. 
              Начните с главной страницы!
            </p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-gradient-primary hover:opacity-90 glow-effect"
            >
              Найти фильмы
            </Button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Saved;
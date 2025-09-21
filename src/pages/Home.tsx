import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { MovieCard } from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import { recommendedMovies, trendingMovies, toggleSavedMovie, isMovieSaved } from "@/data/movies";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-banner.jpg";
import { Flame, TrendingUp } from "lucide-react";

const Home = () => {
  const { toast } = useToast();

  const handleLike = (movieId: string) => {
    const isNowSaved = toggleSavedMovie(movieId);
    toast({
      title: isNowSaved ? "Фильм сохранён!" : "Фильм удалён из сохранённых",
      description: isNowSaved 
        ? "Вы можете найти его в разделе 'Сохранённые'" 
        : "Фильм больше не в вашем списке",
    });
  };

  const handleShare = (movieId: string) => {
    const movie = [...recommendedMovies, ...trendingMovies].find(m => m.id === movieId);
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

  return (
    <div className="min-h-screen bg-gradient-background pb-20">
      <Header title="CineApp" />
      
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Hero Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute bottom-6 left-4 right-4">
          <h2 className="text-2xl font-bold mb-2">Откройте для себя</h2>
          <p className="text-muted-foreground mb-4">Персональные рекомендации фильмов и сериалов</p>
          <Button className="bg-gradient-primary hover:opacity-90 glow-effect">
            <Flame className="w-4 h-4 mr-2" />
            Начать просмотр
          </Button>
        </div>
      </div>

      {/* Recommended Movies */}
      <section className="px-4 py-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Рекомендуем для вас</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {recommendedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              {...movie}
              isLiked={isMovieSaved(movie.id)}
              onLike={handleLike}
              onShare={handleShare}
              onPlay={handlePlay}
            />
          ))}
        </div>
      </section>

      {/* Trending Movies */}
      <section className="px-4 py-6">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">В тренде</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {trendingMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              {...movie}
              isLiked={isMovieSaved(movie.id)}
              onLike={handleLike}
              onShare={handleShare}
              onPlay={handlePlay}
            />
          ))}
        </div>
      </section>

      <BottomNav />
    </div>
  );
};

export default Home;
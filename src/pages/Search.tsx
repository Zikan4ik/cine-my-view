import { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { MovieCard } from "@/components/MovieCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { recommendedMovies, trendingMovies, toggleSavedMovie, isMovieSaved } from "@/data/movies";
import { useToast } from "@/hooks/use-toast";
import { Search as SearchIcon, Filter } from "lucide-react";

const genres = ["Все", "Фантастика", "Драма", "Боевик", "Криминал", "Биография", "Триллер"];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Все");
  const { toast } = useToast();

  const allMovies = [...recommendedMovies, ...trendingMovies];

  const filteredMovies = allMovies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         movie.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         movie.director?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGenre = selectedGenre === "Все" || movie.genre.includes(selectedGenre);
    
    return matchesSearch && matchesGenre;
  });

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
    const movie = allMovies.find(m => m.id === movieId);
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
      <Header title="Поиск" />
      
      <div className="px-4 py-6">
        {/* Search Input */}
        <div className="relative mb-6">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Найти фильм, сериал, актёра..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>

        {/* Genre Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Жанры</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <Badge
                key={genre}
                variant={selectedGenre === genre ? "default" : "secondary"}
                className={`cursor-pointer transition-all ${
                  selectedGenre === genre 
                    ? "bg-gradient-primary text-primary-foreground glow-effect" 
                    : "hover:bg-accent"
                }`}
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </Badge>
            ))}
          </div>
        </div>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">
              {searchQuery ? `Результаты для "${searchQuery}"` : "Все фильмы"}
            </h3>
            <span className="text-sm text-muted-foreground">
              {filteredMovies.length} фильмов
            </span>
          </div>
          
          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredMovies.map((movie) => (
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
          ) : (
            <div className="text-center py-12">
              <SearchIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Ничего не найдено</h3>
              <p className="text-muted-foreground">
                Попробуйте изменить поисковый запрос или фильтры
              </p>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Search;
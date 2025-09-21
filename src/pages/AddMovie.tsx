import { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Upload, Star } from "lucide-react";

const AddMovie = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    director: "",
    genre: "",
    duration: "",
    description: "",
    poster: "",
    rating: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.year || !formData.genre) {
      toast({
        title: "Заполните обязательные поля",
        description: "Название, год и жанр обязательны для заполнения",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Фильм добавлен!",
      description: `"${formData.title}" успешно добавлен в вашу коллекцию`,
    });

    // Reset form
    setFormData({
      title: "",
      year: "",
      director: "",
      genre: "",
      duration: "",
      description: "",
      poster: "",
      rating: ""
    });
  };

  const handleImageUpload = () => {
    toast({
      title: "Функция в разработке",
      description: "Скоро вы сможете загружать постеры фильмов",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-background pb-20">
      <Header title="Добавить фильм" />
      
      <div className="px-4 py-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Plus className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Новый фильм</h2>
          </div>

          <Card className="card-gradient p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-sm font-medium">
                  Название фильма *
                </Label>
                <Input
                  id="title"
                  placeholder="Введите название фильма"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="mt-1 bg-background/50 border-border"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="year" className="text-sm font-medium">
                    Год выпуска *
                  </Label>
                  <Input
                    id="year"
                    type="number"
                    placeholder="2023"
                    value={formData.year}
                    onChange={(e) => handleInputChange("year", e.target.value)}
                    className="mt-1 bg-background/50 border-border"
                  />
                </div>
                <div>
                  <Label htmlFor="rating" className="text-sm font-medium">
                    Рейтинг
                  </Label>
                  <div className="relative">
                    <Input
                      id="rating"
                      type="number"
                      step="0.1"
                      max="10"
                      placeholder="8.5"
                      value={formData.rating}
                      onChange={(e) => handleInputChange("rating", e.target.value)}
                      className="mt-1 bg-background/50 border-border pr-8"
                    />
                    <Star className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary" />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="director" className="text-sm font-medium">
                  Режиссёр
                </Label>
                <Input
                  id="director"
                  placeholder="Имя режиссёра"
                  value={formData.director}
                  onChange={(e) => handleInputChange("director", e.target.value)}
                  className="mt-1 bg-background/50 border-border"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="genre" className="text-sm font-medium">
                    Жанр *
                  </Label>
                  <Input
                    id="genre"
                    placeholder="Фантастика, Драма"
                    value={formData.genre}
                    onChange={(e) => handleInputChange("genre", e.target.value)}
                    className="mt-1 bg-background/50 border-border"
                  />
                </div>
                <div>
                  <Label htmlFor="duration" className="text-sm font-medium">
                    Длительность
                  </Label>
                  <Input
                    id="duration"
                    placeholder="2ч 30мин"
                    value={formData.duration}
                    onChange={(e) => handleInputChange("duration", e.target.value)}
                    className="mt-1 bg-background/50 border-border"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium">
                  Описание
                </Label>
                <Textarea
                  id="description"
                  placeholder="Краткое описание сюжета..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="mt-1 bg-background/50 border-border h-20 resize-none"
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Постер фильма</Label>
                <div className="mt-1">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleImageUpload}
                    className="w-full bg-muted/20 border-dashed border-border hover:bg-muted/30"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Загрузить постер
                  </Button>
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary hover:opacity-90 glow-effect"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить фильм
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default AddMovie;
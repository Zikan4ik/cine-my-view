export interface Movie {
  id: string;
  title: string;
  year: number;
  rating: number;
  genre: string;
  poster: string;
  description: string;
  duration: string;
  director?: string;
  actors?: string[];
  trailer?: string;
}

export const recommendedMovies: Movie[] = [
  {
    id: "1",
    title: "Дюна",
    year: 2021,
    rating: 8.1,
    genre: "Фантастика, Драма",
    poster: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop",
    description: "Приключения Пола Атрейдеса на планете Арракис в борьбе за контроль над самым ценным ресурсом во вселенной.",
    duration: "2ч 35мин",
    director: "Дени Вильнёв",
    actors: ["Тимоти Шаламе", "Ребекка Фергюсон", "Оскар Айзек"]
  },
  {
    id: "2",
    title: "Бегущий по лезвию 2049",
    year: 2017,
    rating: 8.0,
    genre: "Фантастика, Триллер",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=400&fit=crop",
    description: "Молодой клинок-бегун К обнаруживает давно скрытую тайну, которая может погрузить остатки общества в хаос.",
    duration: "2ч 44мин",
    director: "Дени Вильнёв",
    actors: ["Райан Гослинг", "Харрисон Форд", "Ана де Армас"]
  },
  {
    id: "3",
    title: "Интерстеллар",
    year: 2014,
    rating: 8.6,
    genre: "Фантастика, Драма",
    poster: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=300&h=400&fit=crop",
    description: "Группа исследователей использует недавно обнаруженный червоточину для преодоления ограничений космических путешествий.",
    duration: "2ч 49мин",
    director: "Кристофер Нолан",
    actors: ["Мэтью МакКонахи", "Энн Хэтэуэй", "Джессика Честейн"]
  },
  {
    id: "4",
    title: "Темный рыцарь",
    year: 2008,
    rating: 9.0,
    genre: "Боевик, Криминал",
    poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
    description: "Когда угроза, известная как Джокер, наносит хаос жителям Готэма, Бэтмен должен принять один из самых сложных психологических тестов.",
    duration: "2ч 32мин",
    director: "Кристофер Нолан",
    actors: ["Кристиан Бэйл", "Хит Леджер", "Аарон Экхарт"]
  },
  {
    id: "5",
    title: "Начало",
    year: 2010,
    rating: 8.8,
    genre: "Фантастика, Боевик",
    poster: "https://images.unsplash.com/photo-1489599558564-0c4b671e3866?w=300&h=400&fit=crop",
    description: "Вор, который крадет корпоративные секреты через использование технологии обмена снами, получает обратную задачу.",
    duration: "2ч 28мин",
    director: "Кристофер Нолан",
    actors: ["Леонардо ДиКаприо", "Мэрион Котийяр", "Том Харди"]
  },
  {
    id: "6",
    title: "Матрица",
    year: 1999,
    rating: 8.7,
    genre: "Фантастика, Боевик",
    poster: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=400&fit=crop",
    description: "Компьютерный хакер узнает от таинственных повстанцев об истинной природе его реальности и своей роли в войне против ее контролеров.",
    duration: "2ч 16мин",
    director: "Лана и Лилли Вачовски",
    actors: ["Киану Ривз", "Лоуренс Фишберн", "Кэрри-Энн Мосс"]
  }
];

export const trendingMovies: Movie[] = [
  {
    id: "7",
    title: "Опенгеймер",
    year: 2023,
    rating: 8.4,
    genre: "Биография, Драма",
    poster: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=400&fit=crop",
    description: "История американского ученого Роберта Оппенгеймера и его роли в разработке атомной бомбы.",
    duration: "3ч 0мин",
    director: "Кристофер Нолан",
    actors: ["Киллиан Мерфи", "Эмили Блант", "Мэтт Деймон"]
  },
  {
    id: "8",
    title: "Аватар: Путь воды",
    year: 2022,
    rating: 7.6,
    genre: "Фантастика, Боевик",
    poster: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=300&h=400&fit=crop",
    description: "Джейк Салли живет с новой семьей на планете Пандора. Когда знакомая угроза возвращается, Джейк должен работать с Нейтири.",
    duration: "3ч 12мин",
    director: "Джеймс Кэмерон",
    actors: ["Сэм Уортингтон", "Зои Салдана", "Сигурни Уивер"]
  }
];

let savedMovieIds: string[] = [];

export const getSavedMovies = (): Movie[] => {
  const allMovies = [...recommendedMovies, ...trendingMovies];
  return allMovies.filter(movie => savedMovieIds.includes(movie.id));
};

export const toggleSavedMovie = (movieId: string): boolean => {
  const index = savedMovieIds.indexOf(movieId);
  if (index > -1) {
    savedMovieIds.splice(index, 1);
    return false;
  } else {
    savedMovieIds.push(movieId);
    return true;
  }
};

export const isMovieSaved = (movieId: string): boolean => {
  return savedMovieIds.includes(movieId);
};
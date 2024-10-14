const numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?');

const personalMovieDB = {
    count: numberOfFilms,
    movies: {}
    };

for (let i = 0; i < 2; i++) {
    let movieName;
    let movieRating;

        while (true) {
            movieName = prompt('Один из последних просмотренных фильмов?');
            if (movieName === null || movieName.length > 50 || movieName.trim() === '') {
                alert('Введите корректное название');
                continue;
            }
            break;
        }

        while (true) {
            movieRating = +prompt('На сколько оцените данный фильм?');
            if (movieRating === null) {
                alert('Введите корректную оценку');
                continue;
            }
            break;
        }
         
        personalMovieDB.movies[movieName] = movieRating;
        
    }

console.log(personalMovieDB);
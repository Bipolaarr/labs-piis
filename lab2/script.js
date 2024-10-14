const personalMovieDB = {
    private: false,
    movies: {
        'Пила': 7,
        'Опенгеймер': 9,
        '2+2': 8,
    }
}

function buildTable(movies) {

    if (!personalMovieDB.private) {
        const tableContainer = document.getElementById('table');
        let table = '<table><tr><th>Название</th><th>Оценка</th></tr>'
        for (const [title, rating] of Object.entries(movies)) {
            table += `<tr><td>${title}</td><td>${rating}</td></tr>`;
        }
        table += '</table>'; 
        tableContainer.innerHTML = table;
    } else return;
    
}

buildTable(personalMovieDB.movies); 


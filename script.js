document.getElementById('searchButton').addEventListener('click', searchMovies)

let api_key = '4974a1800bf9b456bebf72611be10dd0'
let urlBase = 'https://api.themoviedb.org/3/search/movie'
let urlImg = 'https://image.tmdb.org/t/p/w200'

let resultContainer = document.getElementById('results')

function searchMovies() {
    resultContainer.innerHTML = 'Searching...'
    let searchInput = document.getElementById('searchInput').value
    fetch(`${urlBase}?api_key=${api_key}&query=${searchInput}`)
        .then(response => response.json())
        .then(response => displayMovies(response.results))
}


function displayMovies(movies) {
    resultContainer.innerHTML = ''

    if (movies.length === 0) {
        resultContainer.innerHTML = '<h2>No se encontraron resultados para tu búsqueda </h2>'
        return
    }

    movies.forEach(movie => {
        let movieDiv = document.createElement('div')
        movieDiv.classList.add('movie')

        let title = document.createElement('h2')
        title.textContent = movie.title

        let releaseDate = document.createElement('p')
        releaseDate.textContent = `Release date: ${movie.release_date}`

        let overview = document.createElement('p')
        overview.textContent = movie.overview

        let posterPath = urlImg + movie.poster_path
        let poster = document.createElement('img')
        poster.src = posterPath

        let rating = document.createElement('h4')
        rating.textContent = `Score ${Math.round(movie.vote_average * 10) / 10}/10`

        movieDiv.appendChild(poster)
        movieDiv.appendChild(title)
        movieDiv.appendChild(releaseDate)
        movieDiv.appendChild(overview)
        movieDiv.appendChild(rating)

        resultContainer.appendChild(movieDiv)

    })

}

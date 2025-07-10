const searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('searchbtn')
const listMovie = document.getElementById('listmovie')
searchBtn.addEventListener("click", async (e) => {
  e.preventDefault()
  const movieTitle = searchInput.value.trim()
  if (movieTitle === "") {
    listMovie.innerHTML = `<p class="error">⚠️ Please enter a movie title.</p>`
    return
  }
  listMovie.innerHTML = "Loading......"

  try {
    const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=c01be623`)
    const movieData = await response.json()
    console.log(movieData)
    if (movieData.Response === 'True') {
      showMovieData(movieData)
       // Clear input after success
       searchInput.value = ""
    } else {
      listMovie.innerHTML = `<p class="error">❌ Movie not found. Please try another title.</p>`
    }
  }
  catch (error) {
    listMovie.innerHTML = `<p class="error">⚠️ Something went wrong. Please try again later.</p>`
    console.error(error)
  }
})
//Function to show movie details on screen
const showMovieData = (movieData) => {
  listMovie.innerHTML = " "
  const { Title, imdbRating, Genre, Year, Actors, Plot, Poster } = movieData
  const movieElement = document.createElement('div')
  movieElement.classList.add('movie-info')
  movieElement.innerHTML = `
      <h2>${Title}</h2>
      <p><strong>Rating : &#11088</strong>${imdbRating}</p>
      `
  const movieGenreElement = document.createElement('div')
  movieGenreElement.classList.add('movie-genre')
  const genres = Genre.split(",");

  for (let i = 0; i < genres.length; i++) {
    const p = document.createElement('p');
    p.innerHTML = genres[i];
    movieGenreElement.appendChild(p);
  }

  movieElement.appendChild(movieGenreElement)
  movieElement.innerHTML += `
      <p><strong>Year :</strong>${Year}</p>
      <p><strong>Cast :</strong>${Actors}</p>
      <p><strong>Plot :</strong>${Plot}</p>
      `
  //creating a div for movie poster
  const moviePosterElement = document.createElement('div')
  moviePosterElement.classList.add('movie-poster')
  moviePosterElement.innerHTML = `<img src="${Poster}"/>`

  listMovie.appendChild(moviePosterElement)
  listMovie.appendChild(movieElement)
}

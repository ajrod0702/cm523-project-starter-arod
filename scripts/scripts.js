/* WRITE YOUR JS HERE... YOU MAY REQUIRE MORE THAN ONE JS FILE. IF SO SAVE IT SEPARATELY IN THE SCRIPTS DIRECTORY */

const showButton = document.getElementById('showBtn');
showButton.addEventListener('click', getDecade);

function getDecade(){
    const decadeStart = '2010';
    const decadeEnd = '2019';
   // const genres = 

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNGViZmE4ZDMyOGI5NDE4MWM3NDFjMDZlYzRlMzVjMyIsInN1YiI6IjY1MTlmNWM3MDcyMTY2MDBjNTY3MzhlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Uz_x_wySAAudc6w2U5Wppxt8RFW29XExCwRxxe1zgZk'
    }
  };
  
  fetch(`https://api.themoviedb.org/3/discover/tv?first_air_date.gte=${decadeStart}&first_air_date.lte=${decadeEnd}&with_original_language=en`, options)
    .then(response => response.json())
    .then(response => response.results)
    .then(response => console.log(response))
    .catch(err => console.error(err));
}
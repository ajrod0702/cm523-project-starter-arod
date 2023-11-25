/* WRITE YOUR JS HERE... YOU MAY REQUIRE MORE THAN ONE JS FILE. IF SO SAVE IT SEPARATELY IN THE SCRIPTS DIRECTORY */

const showButton = document.getElementById('showBtn');
showButton.addEventListener('click', getInfo);

function getInfo() {

  // Get Runtime
  const selectedRuntimeStart = document.querySelector('input[name="runtime"]:checked').value;
  console.log(selectedRuntimeStart);

  let selectedRuntimeEnd = parseInt(selectedRuntimeStart) + 29;
  selectedRuntimeEnd = String(selectedRuntimeEnd);
  console.log(selectedRuntimeEnd);

  // Get Decade
  const selectedDecadeStart = document.querySelector('input[name="decade"]:checked').value;
  console.log(selectedDecadeStart);

  let selectedDecadeEnd = parseInt(selectedDecadeStart) + 9;
  selectedDecadeEnd = String(selectedDecadeEnd);
  console.log(selectedDecadeEnd);

  // Get Genre
  let selectedGenres = Array.from(document.querySelectorAll('input[name="genre"]'));
  
  let genres = [];
  selectedGenres.forEach(function(choice){
    if (choice.checked) {
      genres.push(choice.value);
    }
    return genres;
  });

  const userGenres =  genres.toString().replace(",", "|");
  console.log(userGenres);

  // Get Streaming Services
  let selectedServices = Array.from(document.querySelectorAll('input[name="service"]'));

  let services = [];
  selectedServices.forEach(function(choice){
    if (choice.checked) {
      services.push(choice.value);
    }
    return services;
  });

  const userServices =  services.toString().replace(",", "|");
  console.log(userServices);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNGViZmE4ZDMyOGI5NDE4MWM3NDFjMDZlYzRlMzVjMyIsInN1YiI6IjY1MTlmNWM3MDcyMTY2MDBjNTY3MzhlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Uz_x_wySAAudc6w2U5Wppxt8RFW29XExCwRxxe1zgZk'
    }
  };

  fetch(`https://api.themoviedb.org/3/discover/tv?first_air_date.gte=${selectedDecadeStart}&first_air_date.lte=${selectedDecadeEnd}&with_original_language=en&with_runtime.gte=${selectedRuntimeStart}&with_runtime.lte=${selectedRuntimeEnd}&with_genres
=${userGenres}`, options)
    .then(response => response.json())
    .then(response => response.results)
    .then(response => console.log(response))
    .catch(err => console.error(err));
}
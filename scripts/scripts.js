/* WRITE YOUR JS HERE... YOU MAY REQUIRE MORE THAN ONE JS FILE. IF SO SAVE IT SEPARATELY IN THE SCRIPTS DIRECTORY */

const hamburger = document.querySelector(".hamburger");
const navOptions = document.querySelector(".navOptions");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navOptions.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
  hamburger.classList.remove("active");
  navOptions.classList.remove("active");
}))

/* the Find Shows button has the id 'showBtn'. Whenever the Find Shows button is 
  clicked, we call the function loadShowsPage */
const showButton = document.getElementById('showBtn');
if (showButton) {
  showButton.addEventListener('click', getUserFilters);
}

const favsButton = document.getElementById('favsBtn');
if (favsButton) {
  favsButton.addEventListener('click', getFavorites);
}

function getFavorites() {

  const options2 = {
      method: 'GET',
      headers: {
          accept: 'application/json',
          Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNGViZmE4ZDMyOGI5NDE4MWM3NDFjMDZlYzRlMzVjMyIsInN1YiI6IjY1MTlmNWM3MDcyMTY2MDBjNTY3MzhlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Uz_x_wySAAudc6w2U5Wppxt8RFW29XExCwRxxe1zgZk',
      },
  };

  fetch(
      'https://api.themoviedb.org/3/account/20520115/favorite/tv?language=en-US&page=1&sort_by=created_at.asc',
      options2
  )
      .then((response) => response.json())
      .then((response) => response.results)
      .then((response) => {
          console.log(response);
          window.sessionStorage.setItem('response', JSON.stringify(response));
          window.location.href = 'starred.html';
      })
      .catch((err) => console.error(err));
}

function getUserFilters() {
  const form = document.getElementById('content');

  // Get user input runtime from preferences.html
  const selectedRuntimeStart = document.querySelector('input[name="runtime"]:checked').value;
  // console.log(selectedRuntimeStart);

  let selectedRuntimeEnd = parseInt(selectedRuntimeStart) + 29;
  selectedRuntimeEnd = String(selectedRuntimeEnd);
  // console.log(selectedRuntimeEnd);

  // Get user input decade from preferences.html
  const selectedDecadeStart = document.querySelector('input[name="decade"]:checked').value;
  // console.log(selectedDecadeStart);

  let selectedDecadeEnd = parseInt(selectedDecadeStart) + 9;
  selectedDecadeEnd = String(selectedDecadeEnd);
  // console.log(selectedDecadeEnd);

  // Get user input genre from preferences.html
  let selectedGenres = Array.from(document.querySelectorAll('input[name="genre"]'));

  /* Go through each checkbox for genres to see which ones are selected. If selected,
    we get the value and add it to the array. */
  let genres = [];
  selectedGenres.forEach(function (choice) {
    if (choice.checked) {
      genres.push(choice.value);
    }
    return genres;
  });

  /* genres array examples: ["1234", "99"]
    toString returns "1234, 99" but API needs #s separated by | for OR and , for AND
  userGenres format is "1234 | 99" */
  const userGenres = genres.toString().replace(',', '|');
  // console.log(userGenres);

  // Get user input streaming services from preferences.html
  let selectedService = parseInt(document.querySelector('input[name="service"]:checked').value);
  console.log(selectedService);

  window.sessionStorage.setItem('filterRuntimeStart', selectedRuntimeStart);
  window.sessionStorage.setItem('filterRuntimeEnd', selectedRuntimeEnd);
  window.sessionStorage.setItem('filterDecadeStart', selectedDecadeStart);
  window.sessionStorage.setItem('filterDecadeEnd', selectedDecadeEnd);
  window.sessionStorage.setItem('filterGenres', userGenres);
  window.sessionStorage.setItem('filterProviders', selectedService);

  window.location.href = 'shows.html';
}
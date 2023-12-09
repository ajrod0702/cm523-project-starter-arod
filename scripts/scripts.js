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

function getUserFilters() {
  const form = document.getElementById('content');

  // Get user input runtime from preferences.html
  let selectedRuntimeStart = document.querySelector('input[name="runtime"]:checked');
  console.log(selectedRuntimeStart);
  let selectedDecadeStart = document.querySelector('input[name="decade"]:checked');
  console.log(selectedDecadeStart);
  let selectedGenres = Array.from(document.querySelectorAll('input[name="genre"]'));
  console.log(selectedGenres);
  let selectedService = document.querySelector('input[name="service"]:checked');
  console.log(selectedService);
  if (selectedRuntimeStart && selectedDecadeStart && selectedGenres && selectedService) {
    selectedRuntimeStart = document.querySelector('input[name="runtime"]:checked').value;
    let selectedRuntimeEnd = parseInt(selectedRuntimeStart) + 29;
    selectedRuntimeEnd = String(selectedRuntimeEnd);
    selectedDecadeStart = document.querySelector('input[name="decade"]:checked').value;
    let selectedDecadeEnd = parseInt(selectedDecadeStart) + 9;
    selectedDecadeEnd = String(selectedDecadeEnd);

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
    let userGenres = genres.toString().replace(',', '|');
    selectedService = parseInt(document.querySelector('input[name="service"]:checked').value);

    window.sessionStorage.setItem('filterRuntimeStart', selectedRuntimeStart);
    window.sessionStorage.setItem('filterRuntimeEnd', selectedRuntimeEnd);
    window.sessionStorage.setItem('filterDecadeStart', selectedDecadeStart);
    window.sessionStorage.setItem('filterDecadeEnd', selectedDecadeEnd);
    window.sessionStorage.setItem('filterGenres', userGenres);
    window.sessionStorage.setItem('filterProviders', selectedService);

    window.location.href = 'shows.html';
  } else {
    alert("Make selections before you proceed");
  }
}
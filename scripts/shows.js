/* WRITE YOUR JS HERE... YOU MAY REQUIRE MORE THAN ONE JS FILE. IF SO SAVE IT SEPARATELY IN THE SCRIPTS DIRECTORY */
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNGViZmE4ZDMyOGI5NDE4MWM3NDFjMDZlYzRlMzVjMyIsInN1YiI6IjY1MTlmNWM3MDcyMTY2MDBjNTY3MzhlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Uz_x_wySAAudc6w2U5Wppxt8RFW29XExCwRxxe1zgZk',
    },
};

const GENRE_CODES = {
    10759: 'Action & Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    18: 'Drama',
    10751: 'Family',
    9648: 'Mystery',
    10764: 'Reality',
    10765: 'Sci-Fi & Fantasy',
};

const SERVICE_CODES = {
    8: 'Netflix',
    15: 'Hulu',
    9: 'Amazon Prime Video',
    337: 'Disney Plus',
    350: 'Apple TV Plus',
    1899: 'Max',
    387: 'Peacock Premium',
    531: 'Paramount Plus',
    192: 'YouTube',
};

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

window.onload = setupInitialShowsPage();

/*
 * Global variables
 */

// global variable to hold current card displayed
let cardNumber = 0;

// global variable to hold current page displayed
let pageNumber = 1;

// All the shows requested from the api using the user filters
let showDetailsArray = null;

// streaming services selected by the user
let streamingServices = null;

// list of shows liked by the user
let likedShows = [];

/**
 * Advance the current card number by 1 and displays the new
 * tv show data to the user
 */
function advanceCard() {
    if (cardNumber === 19) {
        pageNumber += 1;
        cardNumber = 0;
        getShowDetailsUsingUserInput(pageNumber);
    } else {
        cardNumber += 1;
        if (showDetailsArray.length === cardNumber) {
            alert("Ran out of shows, get your list now!")
        }
        displayTVShowData();
    }
}

/**
 * Add listeners to the round buttons (Like, Dislike, Dash)
 */
function addRoundButtonListeners() {
    const likeButton = document.getElementById('likeBtn');
    if (likeButton) {
        likeButton.addEventListener('click', addShowToList);
    }
    const dislikeButton = document.getElementById('dislikeBtn');
    if (dislikeButton) {
        dislikeButton.addEventListener('click', advanceCard);
    }
    const dashButton = document.getElementById('dashBtn');
    if (dashButton) {
        dashButton.addEventListener('click', advanceCard);
    }
    const listButton = document.getElementById('listBtn');
    if (listButton) {
        listButton.addEventListener('click', getShowList);
    }
}


/**
 * Add user selected shows to a list.
 * user will be able to print or display when desired
 */
function addShowToList() {
    // add code to add the TV data to a variable to hold until user
    // wants to see/print the data
    likedShows.push(showDetailsArray[cardNumber]['name']);
    advanceCard();
}

/**
 * Add user selected shows to a list.
 * user will be able to print or display when desired
 */
function displayTVShowData() {
    let show_name = '';
    let show_desc = '';
    let show_pic_url = '';
    let show_rating = '';
    let show_genres = '';
    let service = '';

    const tvId = showDetailsArray[cardNumber]['id'];
    show_name = showDetailsArray[cardNumber]['name'];
    show_desc = showDetailsArray[cardNumber]['overview'];
    show_pic_url =
        'http://image.tmdb.org/t/p/original' + showDetailsArray[cardNumber]['poster_path'];
    show_rating = showDetailsArray[cardNumber]['vote_average'];

    fetch(`https://api.themoviedb.org/3/tv/${tvId}/account_states`, options)
    .then((response) => response.json())
    .then((response) => {
        console.log(show_name + '/' + tvId + '    ' + response.favorite);
        if (response.favorite) {
            document.getElementById('star').src = "images/star.png";
        } else {
            document.getElementById('star').src = "";
        }
    })
    .catch((err) => console.error(err));

    for (let i = 0; i < showDetailsArray[cardNumber]['genre_ids'].length; i++) {
        if (showDetailsArray[cardNumber]['genre_ids'][i] in GENRE_CODES) {
            show_genres += GENRE_CODES[showDetailsArray[cardNumber]['genre_ids'][i]] + ', ';
        }
    }
    const removeEndComma = show_genres.length - 2;
    show_genres = show_genres.substring(0, removeEndComma);

    if (streamingServices in SERVICE_CODES) {
        service = SERVICE_CODES[streamingServices];
        window.sessionStorage.setItem('service', service);
    }

    document.getElementById('name').innerHTML = show_name;
    document.getElementById('show-description').innerHTML = '<b><i>Description:</i></b> ' + show_desc;
    document.getElementById('show-rating').innerHTML = '<b><i>Rating:</i></b> ' + show_rating + '/10';
    document.getElementById('show-pic').src = show_pic_url;
    document.getElementById('show-genres').innerHTML = '<b><i>Genres:</i></b> ' + show_genres;
    document.getElementById('show-service').innerHTML = '<b><i>Streaming Service:</i></b> ' + service;
}

/**
 * Gets the User selected data send from preferences.html via sessionStorage
 * calls API with the user data to retrieve a list of TVs
 * stores the response data in a global variable for use by other functions
 */
function getShowDetailsUsingUserInput(page) {
    // Get user input to pass into the API call to filter down TV show data
    const selectedRuntimeStart = window.sessionStorage.getItem('filterRuntimeStart');
    const selectedRuntimeEnd = window.sessionStorage.getItem('filterRuntimeEnd');
    const selectedDecadeStart = window.sessionStorage.getItem('filterDecadeStart');
    const selectedDecadeEnd = window.sessionStorage.getItem('filterDecadeEnd');
    const userGenres = window.sessionStorage.getItem('filterGenres');
    const userServices = window.sessionStorage.getItem('filterProviders');

    /*
     * response returns an array of shows and the information about them, so we want
     * to loop through the array of shows an pick out the details we want. We pick out
     * the show name and the show description to display on shows.html
     */
    fetch(
        `https://api.themoviedb.org/3/discover/tv?first_air_date.gte=${selectedDecadeStart}&first_air_date.lte=${selectedDecadeEnd}&with_original_language=en&with_runtime.gte=${selectedRuntimeStart}&with_runtime.lte=${selectedRuntimeEnd}&with_genres=${userGenres}&with_watch_providers=${userServices}&page=${page}`,
        options
    )
        .then((response) => response.json())
        .then((response) => response.results)
        .then((response) => {
            console.log(response);

            // pageNumber = response.page;

            // save API response to global variable so advance card function can access show details
            showDetailsArray = response;

            // save user selected streaming services to a global variable since it is not in Response data
            streamingServices = userServices;

            // call displayTVShowData to display the 1st TV show data in from the response to user
            displayTVShowData();
            return response;
        })
        .catch((err) => console.error(err));
}

function getShowList() {
    window.sessionStorage.setItem('likedShows', JSON.stringify(likedShows));
    window.location.href = 'list.html';
}

/**
 * called after the HTML page is setup
 * add listeners and call API to get
 */
function setupInitialShowsPage() {
    let page = 1;
    addRoundButtonListeners();
    getShowDetailsUsingUserInput(page);
}
/* WRITE YOUR JS HERE... YOU MAY REQUIRE MORE THAN ONE JS FILE. IF SO SAVE IT SEPARATELY IN THE SCRIPTS DIRECTORY */

/* the Find Shows button has the id 'showBtn'. Whenever the Find Shows button is 
  clicked, we call the function loadShowsPage */
  const showButton = document.getElementById('showBtn');
  showButton.addEventListener('click', loadShowsPage);

  let cardNumber = 0;
  
  // const dislikeButton = document.getElementById('dislike');
  // showButton.addEventListener('click', increaseCardNum(1));
  
  // const dashButton = document.getElementById('dash');
  // showButton.addEventListener('click', increaseCardNum(1));
  
  // const likeButton = document.getElementById('like');
  // showButton.addEventListener('click', increaseCardNum(1));
  
  
  // function increaseCardNum(increment) {
  //   cardNumber += increment;
  //   loadShowsPage();
  // }
  
  
  function loadShowsPage() {
  
      // Get user input runtime from questions.html
      const selectedRuntimeStart = document.querySelector('input[name="runtime"]:checked').value;
      console.log(selectedRuntimeStart);
    
      let selectedRuntimeEnd = parseInt(selectedRuntimeStart) + 29;
      selectedRuntimeEnd = String(selectedRuntimeEnd);
      console.log(selectedRuntimeEnd);
    
      // Get user input decade from questions.html
      const selectedDecadeStart = document.querySelector('input[name="decade"]:checked').value;
      console.log(selectedDecadeStart);
    
      let selectedDecadeEnd = parseInt(selectedDecadeStart) + 9;
      selectedDecadeEnd = String(selectedDecadeEnd);
      console.log(selectedDecadeEnd);
    
      // Get user input genre from questions.html
      let selectedGenres = Array.from(document.querySelectorAll('input[name="genre"]'));
      
      /* Go through each checkbox for genres to see which ones are selected. If selected,
       we get the value and add it to the array. */
      let genres = [];
      selectedGenres.forEach(function(choice){
        if (choice.checked) {
          genres.push(choice.value);
        }
        return genres;
      });
    
      /* genres array examples: ["1234", "99"]
       toString returns "1234, 99" but API needs #s separated by | for OR and , for AND
      userGenres format is "1234 | 99" */
      const userGenres =  genres.toString().replace(",", "|");
      console.log(userGenres);
    
      // Get user input streaming services from questions.html
      let selectedServices = Array.from(document.querySelectorAll('input[name="service"]'));
    
      /* Go through each checkbox for genres to see which ones are selected. If selected,
       we get the value and add it to the array. */
      let services = [];
      selectedServices.forEach(function(choice){
        if (choice.checked) {
          services.push(choice.value);
        }
        return services;
      });
    
      /* services array examples: ["1234", "99"]
      toString returns "1234, 99" but API needs #s separated by | for OR and , for AND
      userServices format is "1234 | 99" */
      const userServices =  services.toString().replace(",", "|");
      console.log(userServices);
   
   // here, we fetch the shows.html page
    fetch('shows.html')
      .then(response => response.text())
      .then(html => {
        // Replace the content of the current page (questions.html) with the content of shows.html
        document.getElementById('content').innerHTML = html;
  
        // Now we want to call the API, which getInfo does. We pass the variables we defined into getInfo so that we can pass them into the API
        getInfo(selectedRuntimeStart, selectedRuntimeEnd, selectedDecadeStart, selectedDecadeEnd, userGenres, userServices); 
      })
      .catch(error => console.error('Error loading shows.html:', error));
  }
  
  //this function calls the API
  function getInfo(selectedRuntimeStart, selectedRuntimeEnd, selectedDecadeStart, selectedDecadeEnd, userGenres, userServices) {
  
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNGViZmE4ZDMyOGI5NDE4MWM3NDFjMDZlYzRlMzVjMyIsInN1YiI6IjY1MTlmNWM3MDcyMTY2MDBjNTY3MzhlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Uz_x_wySAAudc6w2U5Wppxt8RFW29XExCwRxxe1zgZk'
      }
    };
  
    fetch(`https://api.themoviedb.org/3/discover/tv?first_air_date.gte=${selectedDecadeStart}&first_air_date.lte=${selectedDecadeEnd}&with_original_language=en&with_runtime.gte=${selectedRuntimeStart}&with_runtime.lte=${selectedRuntimeEnd}&with_genres=${userGenres}&with_watch_providers=${userServices}`, options)
      .then(response => response.json())
      .then(response => response.results)
      .then((response) => {
        console.log(response);
        return response;
      })
      .then((response) => {
        let show_name = "";
        let show_desc = "";
        let show_pic_url = "";
        let show_rating = "";
        let show_genres = "";
        /* response returns an array of shows and the information about them, so we want
        to loop through the array of shows an pick out the details we want. We pick out
        the show name and the show description to display on shows.html
        */
       
       // for (let i = 0; i < response.length; i++) {
          show_name = response[cardNumber]["name"];
          show_desc = response[cardNumber]["overview"];
          show_pic_url = "http://image.tmdb.org/t/p/original" + response[cardNumber]["poster_path"];
          show_rating = response[cardNumber]["vote_average"];
          show_genres = response[cardNumber]["genre_ids"];
  
          // data.push(show_name, show_desc);
        //}
        /* calling the paragraph tag with the id 'name' and inputting the data array into it
        so that shows.html will display the new info */
        document.getElementById("name").innerHTML = show_name;
        document.getElementById("show-description").innerHTML = "Description: " + show_desc;
        document.getElementById("show-rating").innerHTML = "Rating: " + show_rating;
        document.getElementById("show-pic").src = show_pic_url;
        document.getElementById("show-genres").innerHTML = "Genres: " + show_genres;
      })
      .catch(err => console.error(err));
  }


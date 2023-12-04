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

window.onload = showList();

function showList() {
    const service = window.sessionStorage.getItem('service');
    document.getElementById('service').innerHTML = 'Your Show List From ' + service;

    const likedShows = JSON.parse(window.sessionStorage.getItem('likedShows'));
    let cardDisplay = document.getElementById('user-list');

    for (let i = 0; i < likedShows.length; i++) {
        const item = document.createElement('p');
        item.classList.add(`list${i}`);
        item.innerHTML = likedShows[i];
        cardDisplay.appendChild(item);
    }
}
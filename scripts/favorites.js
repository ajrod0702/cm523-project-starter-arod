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


// Modal Buttons:

document.getElementById('starredCardDetails').addEventListener("click", function () {
    document.querySelector('.bg-modal').style.display = 'flex';
});

document.querySelector('.close').addEventListener("click", function () {
    document.querySelector('.bg-modal').style.display = 'none';
});

document.getElementById('starredCardDetails2').addEventListener("click", function () {
    document.querySelector('.bg-modal2').style.display = 'flex';
});

document.querySelector('.close2').addEventListener("click", function () {
    document.querySelector('.bg-modal2').style.display = 'none';
});
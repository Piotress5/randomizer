const menu = document.querySelector("nav");
const body_height = document.body.scrollHeight;
const home_video = document.querySelector("video#frontback");
const settings_btn = document.querySelector("svg#zebatka");
const settings_panel = document.querySelector("div.settingspage");
const settings_cross = document.querySelector("svg#cross");
const settings_frontpage = document.querySelector("section");
let activator = body_height * 0.2;

//zmiana menu
window.addEventListener("scroll", function() {
    if (document.documentElement.scrollTop > activator) {
        menu.classList.add("scrolled");
    } else {
        menu.classList.remove("scrolled");
    }
});

//wstrzymywanie tła
document.addEventListener("visibilitychange", function() {
    // if (document["hidden"]) {
    if (document.visibilityState == "hidden") {
        home_video.pause();
    } else {
        home_video.play();
    }
});
// widok = document.visibilityState;
//     licznik3.innerText = widok;

//ustawienia
settings_btn.addEventListener("click", function() {
    settings_panel.classList.toggle("settings_visible");
});

settings_cross.addEventListener("click", function() {
    settings_panel.classList.remove("settings_visible");
});

settings_frontpage.addEventListener("click", function() {
    settings_panel.classList.remove("settings_visible");
});
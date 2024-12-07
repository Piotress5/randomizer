const menu = document.querySelector("nav");
const body_height = document.body.scrollHeight;
let activator = body_height * 0.2;

//zmiana menu
window.addEventListener("scroll", function(){
    if (document.body.scrollTop > activator || document.documentElement.scrollTop > activator) {
        menu.classList.add("scrolled");
    } else {
        menu.classList.remove("scrolled");
    }
});

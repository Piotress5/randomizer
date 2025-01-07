const menu = document.querySelector("nav");
const body_height = document.body.scrollHeight;
const home_video = document.querySelector("video#frontback");
const menu_app = document.querySelectorAll("li.application");
const settings_btn = document.querySelector("svg#zebatka");
const settings_panel = document.querySelector("div.settingspage");
const settings_cross = document.querySelector("svg#cross");
const animation_control = document.querySelector('input[name="animations"]');
const sounds_control = document.querySelector('input[name="sounds"]');
const frontpage = document.querySelector("section");
const footer = document.querySelector("footer");
const appcards = document.querySelectorAll("div.appcard");
const app_buttons = document.querySelectorAll("div.appcard button");
const app_generator = document.querySelector("div.generator");
const app_return_btn = document.querySelector("div.return");
const alert_box = document.querySelector("div.alert");
const rng_title = document.querySelector('input[name="rng-title"]');
const rng_title_header = document.querySelector("h1.rng-title");
const rng_settings = document.querySelectorAll("div.rng-option");
const rng_radio = document.querySelectorAll('input[name="generated-value"]');
const rng_number_min = document.querySelector('input[name="number-min"]');
const rng_number_max = document.querySelector('input[name="number-max"]');
const rng_texts = document.querySelector('textarea[name="rng-texts"]');
const rng_yes_no = document.querySelector('input[name="rng-yes-no"]');
const rng_reset_btn = document.querySelector("button.rng-reset");
const rng_apply_btn = document.querySelector("button.rng-apply");
const rng_generate = document.querySelector("button.rng-generate");
const rng_result = document.querySelector("p.rng-result-value");
const rng_counter = document.querySelector("p.rng-counter");
let activator = body_height * 0.2;
let rng_value1, rng_value2, rng_stats = [0, 0];
let rng_mode = 0;
let rng_sound = new Audio('media/click.mp3');

//zmiana menu
window.addEventListener("scroll", function() {
    if (document.documentElement.scrollTop > activator &&
        frontpage.classList.contains("hidden") == false) {
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

//ustawienia
settings_btn.addEventListener("click", function() {
    settings_panel.classList.toggle("settings_visible");
});

function close_settings() {
    settings_panel.classList.remove("settings_visible");
}

settings_cross.addEventListener("click", close_settings);
frontpage.addEventListener("click", close_settings);
app_generator.addEventListener("click", close_settings);

//alert
function alert_info(text, color) {
    alert_box.innerText = text;
    alert_box.classList.remove("alert-visible", "alert-red", "alert-green");
    alert_box.classList.add("alert-visible", color);
    setTimeout(() => {
        alert_box.classList.remove("alert-visible");
    }, 2000);
    setTimeout(() => {
        alert_box.classList.remove(color);
    }, 2300);
}

//przejście pomiędzy aplikacjami
menu_app[1].addEventListener("click", () => {
    app_generator_start(app_generator, 1);
});
app_buttons[1].addEventListener("click", () => {
    app_generator_start(app_generator, 1);
});

app_return_btn.addEventListener("click", () => {
    app_generator_end(app_generator);
});

function app_generator_start(application, app_index) {
    frontpage.classList.add("hidden");
    appcards[app_index].style.scale = "1.2";
    menu.classList.add("hidden");
    setTimeout(() => {
        application.style.display = "flex";
        application.style.animationName = "fade-in";
        appcards[app_index].style.scale = "1";
        frontpage.style.display = "none";
        footer.style.display = "none";
        window.scrollTo(0, 0);
        settings_btn.classList.add("app");
    }, 1500);
}

function app_generator_end(application) {
    application.classList.add("application_end");
    frontpage.classList.remove("hidden");
    settings_btn.classList.remove("app");
    application.style.animationName = "fade-out";
    setTimeout(() => {
        application.style.display = "none";
        application.classList.remove("application_end");
    }, 900);
    menu.classList.remove("hidden");
    frontpage.style.display = "inline";
    footer.style.display = "grid";
    window.scrollTo(0, 0);
}

//generator RNG
rng_radio.forEach(function(rng_settings_view) {
    rng_settings_view.addEventListener("click", rng_change_mode);
    function rng_change_mode() {
        if (rng_radio[0].checked == true) {
            rng_reset();
            rng_settings[1].classList.remove("rng-disabled");
            rng_number_min.disabled = false;
            rng_number_max.disabled = false;
            rng_mode = 1;
        } else if (rng_radio[1].checked == true) {
            rng_reset();
            rng_settings[3].classList.remove("rng-disabled");
            rng_texts.disabled = false;
            rng_mode = 2;
        } else if (rng_radio[2].checked == true) {
            rng_reset();
            rng_settings[5].classList.remove("rng-disabled");
            rng_yes_no.disabled = false;
            rng_mode = 3;
        }
    }
});

function rng_reset() {
    rng_settings[1].classList.add("rng-disabled");
    rng_settings[3].classList.add("rng-disabled");
    rng_settings[5].classList.add("rng-disabled");
    rng_number_min.disabled = true;
    rng_number_max.disabled = true;
    rng_texts.disabled = true;
    rng_yes_no.disabled = true;
    rng_number_min.value = 0;
    rng_number_max.value = 0;
    rng_texts.value = "";
    rng_yes_no.checked = false;
    rng_counter.style.visibility = "hidden";
}

rng_reset_btn.addEventListener("click", () => {
    rng_reset();
    rng_radio[0].checked = false;
    rng_radio[1].checked = false;
    rng_radio[2].checked = false;
    rng_title.value = "";
    rng_mode = 0;
});

rng_apply_btn.addEventListener("click", rng_apply);
function rng_apply() {
    if (rng_mode == 0) {
        alert_info("No mode selected!", "alert-red");
    } else {
        alert_info("Successfully applied!", "alert-green");
        rng_title_header.innerText = rng_title.value;
    }
}

rng_yes_no.addEventListener("click", () => {
    if (rng_yes_no.checked == true) {
        rng_counter.style.visibility = "visible";
        rng_counter.innerText = "Yes: 0 No: 0";
        rng_stats = [0, 0];
    }
    else {rng_counter.style.visibility = "hidden";}
})

rng_generate.addEventListener("click", rng_randomize);
function rng_randomize() {
    if (sounds_control.checked == true) {
        rng_sound.play();
    }
    switch (rng_mode) {
        case 0:
            alert_info("No mode selected!", "alert-red");
            break;
        case 1:
            if (rng_number_min.value == rng_number_max.value) {
                alert_info("Numbers can't be same!", "alert-red");
                break;
            }
            if (rng_number_min.value < rng_number_max.value) {
                rng_value1 = parseFloat(rng_number_min.value);
                rng_value2 = parseFloat(rng_number_max.value);
            } else if (rng_number_min.value > rng_number_max.value) {
                rng_value2 = parseFloat(rng_number_min.value);
                rng_value1 = parseFloat(rng_number_max.value);
            }
            rng_result.innerText = Math.floor(Math.random() * (rng_value2 - rng_value1 + 1) ) + rng_value1;
            break;
        case 2:
            rng_value1 =  rng_texts.value;
            if (rng_value1.includes(";") == false) {
                alert_info("Not enough data!", "alert-red");
                break;
            } else if (rng_value1.length < 2) {
                alert_info("Not enough data!", "alert-red");
                break;
            }
            rng_value2 = rng_value1.split(';');
            rng_result.innerText = rng_value2[Math.floor(Math.random() * rng_value2.length)];
            break;
        case 3:
            rng_value1 = "Yes/No";
            rng_value2 = rng_value1.split('/');
            rng_value1 = rng_value2[Math.floor(Math.random() * 2)];
            rng_result.innerText = rng_value1;
            if (rng_yes_no.checked == true) {
                if (rng_value1 == "Yes") {rng_stats[0]++}
                else if (rng_value1 == "No") {rng_stats[1]++}
                rng_counter.innerText = "Yes: " + rng_stats[0] + " No: " + rng_stats[1];
            }
            break;
        default:
            break;
    }
}

// app_generator_start(app_generator, 1);
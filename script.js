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
const app_return_btn = document.querySelector("div.return");
const alert_box = document.querySelector("div.alert");
const app_wheel = document.querySelector("div.wheel");
const app_generator = document.querySelector("div.generator");
const wheel_title = document.querySelector('input[name="wheel-title"]');
const wheel_title_text = document.querySelector("h1.wheel-title");
const wheel_elements = document.querySelector("div.wheel-elements");
const wheel_num_of_options = document.querySelector('input[name="wheel-options-number"]');
const wheel_set_btn = document.querySelector("button.wheel-set");
const wheel_plus_btn = document.querySelector("button.wheel-plus");
const wheel_minus_btn = document.querySelector("button.wheel-minus");
const wheel_apply_btn = document.querySelector("button.wheel-apply");
const wheel_paste_btn = document.querySelector("button.wheel-paste-list");
const wheel_colors_btn = document.querySelector("button.wheel-edit-colors");
const wheel_options = document.querySelector("div.wheel-options");
const wheel_spin_btn = document.querySelector("button.wheel-spin");
const wheel_result_block = document.querySelector("div.wheel-result");
const wheel_paste_block = document.querySelector("div.wheel-paste");
const wheel_paste_apply_btn = document.querySelector("button.wheel-paste-apply");
const wheel_paste_close_btn = document.querySelector("button.wheel-paste-close");
const wheel_colors_block = document.querySelector("div.wheel-colors");
const wheel_colors_apply_btn = document.querySelector("button.wheel-colors-apply");
const rng_title = document.querySelector('input[name="rng-title"]');
const rng_title_text = document.querySelector("h1.rng-title");
const rng_settings = document.querySelectorAll("div.rng-option");
const rng_radio = document.querySelectorAll('input[name="generated-value"]');
const rng_number_min = document.querySelector('input[name="rng-number-min"]');
const rng_number_max = document.querySelector('input[name="rng-number-max"]');
const rng_texts = document.querySelector('textarea[name="rng-texts"]');
const rng_yes_no = document.querySelector('input[name="rng-yes-no"]');
const rng_reset_btn = document.querySelector("button.rng-reset");
const rng_apply_btn = document.querySelector("button.rng-apply");
const rng_generate = document.querySelector("button.rng-generate");
const rng_result = document.querySelector("p.rng-result-value");
const rng_counter = document.querySelector("p.rng-counter");
let activator = body_height * 0.2;
let app_value = 0;
let wheel_colors = ["#a7c3db", "#06447e", "#43739c", "#3e82bd"];
let wheel_inputs = document.querySelectorAll('input[name="wheel-option"]');
let wheel_divide = 0;
let wheel_limiter = 0;
let wheel_background = "";
let wheel_result = "";
let wheel_pasted = document.querySelector('textarea[name="wheel-paste-options"]');
let wheel_colors_inputs = document.querySelectorAll('input[name="wheel-color"]');
// let wheel_animation_frame = window.requestAnimationFrame;
// let wheel_temp1, wheel_temp2;
// let wheel_style = "";
let rng_value1, rng_value2, rng_stats = [0, 0];
let rng_mode = 0;
let rng_sound = new Audio('media/click.mp3');
let wheel_result_sound = new Audio('media/wheel_result.mp3');
// let wheel_spintick_sound = new Audio('media/wheel_spin.mp3');

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
app_wheel.addEventListener("click", close_settings);
app_wheel.addEventListener("click", close_wheel_result);

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
menu_app[0].addEventListener("click", () => {
    application_start(app_wheel, 0);
});
app_buttons[0].addEventListener("click", () => {
    application_start(app_wheel, 0);
});

menu_app[1].addEventListener("click", () => {
    application_start(app_generator, 1);
});
app_buttons[1].addEventListener("click", () => {
    application_start(app_generator, 1);
});

app_return_btn.addEventListener("click", () => {
    switch (app_value) {
        case 1:
            application_end(app_wheel);
            break;
        case 2:
            application_end(app_generator);
            break;
        default:
            break;
    }
});

function application_start(application, app_index) {
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
        app_return_btn.style.display = "flex";
        app_return_btn.style.opacity = 1;
        app_return_btn.style.animationName = "return-appear";
        settings_btn.classList.add("app");
    }, 1500);
    app_value = app_index + 1;
}

function application_end(application) {
    application.classList.add("application_end");
    frontpage.classList.remove("hidden");
    settings_btn.classList.remove("app");
    app_return_btn.style.animationName = "return-disappear";
    application.style.animationName = "fade-out";
    setTimeout(() => {
        app_return_btn.style.display = "none";
        app_return_btn.style.opacity = 0;
        application.style.display = "none";
        application.classList.remove("application_end");
    }, 900);
    menu.classList.remove("hidden");
    frontpage.style.display = "inline";
    footer.style.display = "grid";
    window.scrollTo(0, 0);
}

//koło fortuny
wheel_set_btn.addEventListener("click", () => {
    wheel_set_options(wheel_num_of_options, wheel_num_of_options.value);
});

function wheel_set_options(source, limit, text) {
    if (limit > 100 || limit < 2) {
        alert_info("Limit exceeded!", "alert-red");
        if (source == wheel_num_of_options) {
            wheel_num_of_options.value = 3;
        }
        return;
    }
    while (wheel_options.hasChildNodes()) {
        wheel_options.removeChild(wheel_options.firstChild);
    }
    for (let i = 0; i < limit; i++) {
        let wheel_index = i + 1;
        let option = document.createElement("input");
        option.type = "text";
        option.name = "wheel-option";
        option.classList.add("wheel-option");
        option.spellcheck = false;
        option.placeholder = "Option " + wheel_index;
        // option.value = text;
        if (source == wheel_pasted) {
            option.value = wheel_pasted[i];
        }
        wheel_options.appendChild(option);
    }
}

wheel_plus_btn.addEventListener("click", () => {
    let wheel_inputs = document.querySelectorAll('input[name="wheel-option"]');
    let option = document.createElement("input");
    option.type = "text";
    option.name = "wheel-option";
    option.classList.add("wheel-option");
    option.spellcheck = false;
    option.placeholder = "Option " + (wheel_inputs.length + 1);
    wheel_options.appendChild(option);
});

wheel_minus_btn.addEventListener("click", () => {
    let wheel_inputs = document.querySelectorAll('input[name="wheel-option"]');
    if (wheel_inputs.length > 2) {
        wheel_options.removeChild(wheel_options.lastElementChild);
    } else {
        alert_info("Can't delete more options!", "alert-red");
    }
});

wheel_apply_btn.addEventListener("click", wheel_apply);
function wheel_apply() {
    alert_info("Successfully applied!", "alert-green");
    wheel_title_text.innerText = wheel_title.value;
    let wheel_inputs = document.querySelectorAll('input[name="wheel-option"]');
    while (wheel_elements.hasChildNodes()) {
        wheel_elements.removeChild(wheel_elements.firstChild);
    }
    for (let i = 0; i < wheel_inputs.length; i++) {
        wheel_divide = (-90) + (180 / wheel_inputs.length)
        + (360 / wheel_inputs.length * i);
        let element = document.createElement("div");
        element.classList.add("wheel-element");
        element.innerText = wheel_inputs[i].value;
        if (window.innerWidth > 1000) {
            element.style.transform = "rotate(" + wheel_divide + "deg) translate(175px)";
        } else { // na małe urządzenia
            element.style.transform = "rotate(" + wheel_divide + "deg) translate(75px)";
        }
        wheel_elements.appendChild(element);
    }
    wheel_divide = (360 / wheel_inputs.length);
    if (wheel_inputs.length % 4 != 1) {
        wheel_background = "conic-gradient(" + (wheel_colors[0]) + " 0deg"; 
        while (wheel_limiter < wheel_inputs.length) {
            wheel_divide = (360 / wheel_inputs.length) * (wheel_limiter + 1);
            wheel_background += ", " + wheel_colors[wheel_limiter % 4] + " " +
            wheel_divide + "deg, " + wheel_colors[(wheel_limiter + 1) % 4] + " " +
            wheel_divide + "deg";
            wheel_limiter++;
        }
    } else { // wyjątek
        wheel_background = "conic-gradient(" + (wheel_colors[1]) + " 0deg, "
        + wheel_colors[1] + " " + wheel_divide + "deg, " + wheel_colors[0]
        + " " + wheel_divide + "deg" + " " + (wheel_divide * 2) + "deg, "
        + wheel_colors[2] + " " + (wheel_divide * 2) + "deg";
        wheel_limiter += 2;
        while (wheel_limiter < wheel_inputs.length) {
            wheel_divide = (360 / wheel_inputs.length) * (wheel_limiter + 1);
            wheel_background += ", " + wheel_colors[wheel_limiter % 4] + " " +
            wheel_divide + "deg, " + wheel_colors[(wheel_limiter + 1) % 4] + " " +
            wheel_divide + "deg";
            wheel_limiter++;
        }
    } 
    wheel_background += ")";
    wheel_elements.style.background = wheel_background;
    wheel_elements.style.transform = "rotate(0deg)";
    wheel_elements.style.animationName = "none";
    wheel_limiter = 0;
}

wheel_spin_btn.addEventListener("click", wheel_spin);
function wheel_spin() {
    let wheel_inputs = document.querySelectorAll('input[name="wheel-option"]');
    if (wheel_divide != 0) {
        wheel_spin_btn.style.animationName = "text-color-out";
        wheel_spin_btn.style.animationFillMode = "forwards";
        wheel_spin_btn.disabled = true;
        wheel_spin_btn.style.cursor = "not-allowed";
        rng_value1 = wheel_divide / wheel_inputs.length;
        wheel_result = rng_value1;
        rng_value2 = (Math.floor(Math.random() * (rng_value1 - 1) + 1));
        rng_value1 = (Math.floor(Math.random() * (wheel_inputs.length) + 1))
        * wheel_result;
        rng_value2 += rng_value1 + 3600;
        wheel_elements.animate([
            {transform: 'rotate(0deg)'},
            // {transform: 'rotate(3600deg)'}
            {transform: 'rotate(' + rng_value2 + 'deg)'}
        ], {
            duration: 8000,
            fill: "forwards",
            iterations: 1,
            easing: 'cubic-bezier(0.42, 0, 0.04, 1)'
        });
        // wheel_animation_frame = window.requestAnimationFrame;
        // wheel_animation_frame(wheel_update);   
        // function wheel_update() {
        //     wheel_style = getComputedStyle(wheel_elements).transform;
        //     wheel_temp1 = wheel_style.slice(7, 11);
        //     wheel_temp2 = wheel_style.slice(7, 11);
        //     // tymczasowa.includes("0.99");
        //     // console.log("Jeden: " + tymczasowa + " i dwa: " + tymczasowa2);
        //     if (wheel_temp1 == "0.99" || wheel_temp2 == "-0.5") {
        //         wheel_spintick_sound.play();
        //         // wheel_play();
        //     } 
        //     // else if (wheel_temp2 == "-0.5") {
        //     //     wheel_spintick_sound.play();
        //     //     // wheel_play();
        //     // }
        //     wheel_animation_frame(wheel_update);
        // }
        wheel_result = Math.abs((rng_value1 / wheel_result) - wheel_inputs.length);
        if (wheel_result == 0) {
            wheel_result_block.innerText = "Result:\n" + wheel_inputs[wheel_inputs.length - 1].value;
        } else {
            wheel_result_block.innerText = "Result:\n" + wheel_inputs[wheel_result - 1].value;
        }
        setTimeout(() => {
            wheel_spin_btn.style.animationName = "text-color-in";
            wheel_spin_btn.disabled = false;
            wheel_spin_btn.style.cursor = "pointer";
            wheel_result_block.classList.add("wheel-result-visible");
            if (sounds_control.checked == true) {
                wheel_result_sound.play();
            }
            // wheel_temp1 = "";
            // wheel_temp2 = "";
        }, 8000);
    }
}

// function wheel_play() {
//     if (sounds_control.checked == false) {
//         return;
//     }
//     // wheel_spintick_sound.preload = 'auto';
//     // wheel_spintick_sound.load();
//     let click = wheel_spintick_sound.cloneNode();
//     click.volume = 0.3;
//     click.play();
// }

function close_wheel_result() {
    wheel_result_block.classList.remove("wheel-result-visible");
}

wheel_paste_btn.addEventListener("click", () => {
    wheel_paste_block.classList.toggle("wheel-paste-visible");
    wheel_colors_block.classList.remove("wheel-colors-visible");
});

wheel_paste_close_btn.addEventListener("click", () => {
    wheel_paste_block.classList.remove("wheel-paste-visible");
});

wheel_paste_apply_btn.addEventListener("click", () => {
    wheel_pasted = document.querySelector('textarea[name="wheel-paste-options"]');
    wheel_pasted = wheel_pasted.value;
    wheel_pasted = wheel_pasted.split('\n');
    wheel_set_options(wheel_pasted, wheel_pasted.length);
});

wheel_colors_btn.addEventListener("click", () => {
    wheel_colors_block.classList.toggle("wheel-colors-visible");
    wheel_paste_block.classList.remove("wheel-paste-visible");
});

wheel_colors_apply_btn.addEventListener("click", () => {
    for (let i = 0; i < wheel_colors.length; i++) {
        wheel_colors[i] = wheel_colors_inputs[i].value;
        alert_info("Successfully applied!", "alert-green");
    }
});

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
        rng_title_text.innerText = rng_title.value;
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

// application_start(app_wheel, 0);
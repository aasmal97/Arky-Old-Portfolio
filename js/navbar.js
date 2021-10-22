import urlUpdate from "./urlUpdate.js"
import { smoothScroll, hrefRegex } from "./smoothScroll.js"
import { imgThemeLoad } from "./lazyLoad.js"
import { aboutScrollLock, timelineObserver } from "./about.js"
import {toggleSkills, skills} from "./techSkills.js"
//Dark mode toggler
const themeBtn = document.querySelector("#themeBtn")
const lightMode = document.querySelectorAll(".lightMode")
//navToggler for dropdown navigation
const navbar = document.querySelector("#navbar")
const navToggler = document.querySelector("#navToggler")
const navLinkContainer = document.querySelector("#navLinkContainer")
const navLinks = navbar.querySelectorAll("a")

//For changing images accordingly
let darkBtnDisabled  = false 
const changeTheme = () =>{
    if(darkBtnDisabled!=true){
        //disabling Button for performance
        darkBtnDisabled = true;
        //changing classes for dark or light mode
        if (lightMode[0].classList.contains("lightMode")){
            for (let key in lightMode){
                if (parseInt(key)>=0){
                    lightMode[key].classList.add("darkMode")
                    lightMode[key].classList.remove("lightMode")
                }
            }
            //to change icon on toggler
               document.querySelector(".fa-sun-o").style.display= "inline"
               document.querySelector(".fa-moon-o").style.display= "none"
        } else {
            for (let key in lightMode){
                if (parseInt(key)>=0){
                    lightMode[key].classList.remove("darkMode")
                    lightMode[key].classList.add("lightMode")
                }
            }
            //to change icon on toggler
               document.querySelector(".fa-sun-o").style.display= "none"
               document.querySelector(".fa-moon-o").style.display= "inline"
        }

        //lazyLoading new images
        imgThemeLoad()

        //adding classes to js generated lines for timeline
        //This is because variable assignment of lightMode to capture this, 
        //does not work since querySelectorAll only returns a static list
        let timeLines = document.querySelectorAll(".lines")
        for (let line in Object.keys(timeLines)){
            if (timeLines[line].classList.contains("lightMode")){
                timeLines[line].classList.add("darkMode")
                timeLines[line].classList.remove("lightMode")
            } else {
                timeLines[line].classList.remove("darkMode")
                timeLines[line].classList.add("lightMode")
            }
        }
    }
    setTimeout(function(){
        darkBtnDisabled = false;
    }, 700)
}

function showNav(){
    navLinkContainer.classList.add("show")
    navLinkContainer.classList.remove("hidden")
    //used so link text does not lag behind height animation
    for (let key in navLinks){
        if (parseInt(key)>=0){
            navLinks[key].classList.add("show")
            navLinks[key].classList.remove("hidden")
        }
    }
} 

function hideNav(){
    navLinkContainer.classList.remove("show")
    navLinkContainer.classList.add("hidden")
    //used so link text does not lag behind height animation
    for (let key in navLinks){
        if (parseInt(key)>=0){
            navLinks[key].classList.remove("show")
            navLinks[key].classList.add("hidden")
        }
    }
}

function navOnLoad(){
    if(window.innerWidth>1025){
        showNav()
    } else{
        hideNav()
    }
    if (window.scrollY>30){
        navLinkContainer.style.top = "55px"
        navbar.style.height = "25px"
    } else {
        navLinkContainer.style.top = "70px"
        navbar.style.height = "40px"
    }
}
function navOnClick () {
    if(navLinkContainer.classList.contains("hidden")){
        showNav()
    } else{
        hideNav()
    }
}

function navOnScroll(){
    if (window.scrollY>30){
        navLinkContainer.style.top = "55px"
        navbar.style.height = "25px"
    } else {
        navLinkContainer.style.top = "70px"
        navbar.style.height = "40px"
    }
    //navbar collapsing when scrolling
    hideNav();
}
function navLinksScroll(e){
    let newFocus = e.target.href.match(hrefRegex)[0];
    e.preventDefault()
    if(newFocus !== "#about"){
        //Allows for scrolling smoothly without scroll being disabled
        document.querySelector("body").classList.remove("stopScroll")
        aboutScrollLock.unobserve(document.querySelector("#about"));

    }
    //For skill btn only, it unhides the list first since its under a .4s transition
    if(newFocus==="#skillsBtn" && skills.classList.contains("hidden")){
        toggleSkills()
        setTimeout(function(){
            smoothScroll(e);
        }, 520)
        setTimeout(()=>{
            urlUpdate(newFocus, e)
        }, 1000)
    } else{
        smoothScroll(e);
        setTimeout(()=>{
            urlUpdate(newFocus, e)
        }, 1000)
    }
    //hides Navbar
    hideNav();

    //restores observer function after scroll
    timelineObserver();
}

export {
    navOnScroll as navOnScroll,
    navOnClick as navOnClick,
    navOnLoad as navOnLoad,
    changeTheme as changeTheme,
    navLinksScroll as navLinksScroll,
    navToggler as navToggler,
    themeBtn as themeBtn,
    navLinks as navLinks
}
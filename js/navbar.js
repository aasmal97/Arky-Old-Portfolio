"use-strict";

//Dark mode toggler
const themeBtn = document.querySelector("#themeBtn")
const themeToggler = document.querySelector(".themeToggler")
const lightMode = document.querySelectorAll(".lightMode")

//For changing images accordingly
let darkBtnDisabled  = false
themeBtn.addEventListener("click", function(e){
    e.preventDefault();
    if(darkBtnDisabled!=true){
        //disabling Button for performance
        darkBtnDisabled = true;
        //changing classes for dark or light mode
        if (lightMode[0].classList.contains("lightMode")){
            for (key in lightMode){
                if (parseInt(key)>=0){
                    lightMode[key].classList.add("darkMode")
                    lightMode[key].classList.remove("lightMode")
                }
            }
            //to change icon on toggler
                this.querySelector(".fa-sun-o").style.display= "inline"
                this.querySelector(".fa-moon-o").style.display= "none"
        } else {
            for (key in lightMode){
                if (parseInt(key)>=0){
                    lightMode[key].classList.remove("darkMode")
                    lightMode[key].classList.add("lightMode")
                }
            }
            //to change icon on toggler
                this.querySelector(".fa-sun-o").style.display= "none"
                this.querySelector(".fa-moon-o").style.display= "inline"
        }

        //lazyLoading new images
        imgThemeLoad()

        //popContainer
        popupContent(e)

        //adding classes to js generated lines for timeline
        //This is because variable assignment of lightMode to capture this, 
        //does not work since querySelectorAll only returns a static list
        let timeLines = document.querySelectorAll(".lines")
        for (line in Object.keys(timeLines)){
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
    }, 1000)
})


//navToggler for dropdown navigation
const navbar = document.querySelector("#navbar")
const navToggler = document.querySelector("#navToggler")
const navLinkContainer = document.querySelector("#navLinkContainer")
const navLinks = navbar.querySelectorAll("a")

function showNav(){
    navLinkContainer.classList.add("show")
    navLinkContainer.classList.remove("hidden")
    //used so link text does not lag behind height animation
    for (key in navLinks){
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
    for (key in navLinks){
        if (parseInt(key)>=0){
            navLinks[key].classList.remove("show")
            navLinks[key].classList.add("hidden")
        }
    }
}

function navBehavior(){
    if(this.innerWidth>1025){
        showNav()
    } else{
        hideNav()
    }
}

//navbar behavior when clicking toggler button
navToggler.addEventListener("click", function(e){
    e.preventDefault()
    //Wanted nav to ALWAYS collapse when resizing
    //IF navBehavior() were used, this wouldnt happen
    if(navLinkContainer.classList.contains("hidden")){
        showNav()
    } else{
        hideNav()
    }
})

//navbar behavior when resizing and load
window.addEventListener("load", navBehavior());
window.addEventListener("resize",function(){
    //within a function so EVERYTIME resizing happens, this is called. 
    //If not, this is only triggered once
    navBehavior()
})

// navbar resizing on scroll
window.addEventListener("scroll", function(e){
    if (window.scrollY>0){
        navLinkContainer.style.top = "60px"
        navbar.style.height = "30px"
    } else {
        navLinkContainer.style.top = "90px"
        navbar.style.height = "60px"
    }
    //navbar collapsing when scrolling
    hideNav();
});

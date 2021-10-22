import {generateLines, timeline, timelineAnimate, aboutScrollLock, determineAge} from "../src/about/about.js"
import { createPopUp, hidePopUp, showPopUp, generatePopUpContent } from "../src/navbar/darkPopup.js";
import {toggleSkills, skillsBtn} from "../src/skills/techSkills.js"
import {navLinks, navLinksScroll, themeBtn, navToggler, navOnClick, navOnLoad, navOnScroll, changeTheme} from "../src/navbar/navbar.js"
import {imagesOnLoad} from "../src/general/lazyLoad.js"
import {smoothScroll} from "../src/general/smoothScroll.js"
//inserts lines connecting timeline automatically 
document.addEventListener("DOMContentLoaded", function() {
    createPopUp();
    generateLines();
});

document.addEventListener("wheel", function(e){
    timelineAnimate(e)
})
document.addEventListener("keyup", (e)=>{
    if(e.key==="ArrowDown"||"ArrowUp"){
        timelineAnimate(e)
    }
})

document.addEventListener("scroll", function() {
    hidePopUp();
    navOnScroll();
});

window.addEventListener("load", function(e){
    determineAge()
    navOnLoad()
    imagesOnLoad();
})

window.addEventListener("resize",function(){
    navOnLoad();
})


themeBtn.addEventListener("mouseenter", function(){
    showPopUp();
})
themeBtn.addEventListener("mouseleave", function(e){
    hidePopUp(e);
})

themeBtn.addEventListener("click", function(e){
    e.preventDefault();
    changeTheme(e);
    generatePopUpContent(e)
})

navToggler.addEventListener("click", function(e){
    e.preventDefault()
    navOnClick();
})

let scrollKeyDisabled = false
//nav link event listeners
for(let key in Object.keys(navLinks)){
    navLinks[key].addEventListener("click", function(e){
        navLinksScroll(e)
    })

    navLinks[key].addEventListener("keyup", function(e){
        if(e.key==="Enter" && scrollKeyDisabled != true){
            navLinksScroll(e)
            scrollKeyDisabled = true
        }
        setTimeout(()=>{
            scrollKeyDisabled = false
        }, 400)
    })
}

//for links in profile pic
const storyLink= document.getElementById("bgProfilePic").querySelector("a")
storyLink.addEventListener("click", (e) => {
    e.preventDefault()
    smoothScroll(e)
})

skillsBtn.addEventListener("click", function(e){
    e.preventDefault()  
    toggleSkills(e);
})

timeline.addEventListener("touchend", function(e){
    timelineAnimate(e)
})


//intersection observers 
aboutScrollLock.observe(document.querySelector("#about"));
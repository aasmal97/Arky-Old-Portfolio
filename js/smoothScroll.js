//for links in navbar
//scroll action
const hrefRegex = /#\w*/
//created the following regex for matching hashes, but was not needed
/*const directoryRegex = /\/#.*/

let scrollKeyDisabled = false
function smoothScroll(e=0){
    e.preventDefault();
    const targetElement = document.querySelector(e.target.href.match(hrefRegex)[0]).getBoundingClientRect()
    let offSet = window.pageYOffset
    window.scrollTo({
        top: targetElement.top + offSet - navbar.offsetHeight,
        behavior: 'smooth',
    })
}
//updating page url for backspace, and focus accessibility
function urlUpdate(newFocus=0, e=0){
    document.querySelector(newFocus).tabIndex = 0
    document.querySelector(newFocus).focus({
        //prevent scrolling, since smooth scroll will handle this
        preventScroll: true
      })
    
    window.history.pushState("", newFocus, e.target.href)
}
function navLinksScroll(e=0){
    let newFocus = e.target.href.match(hrefRegex)[0];
    e.preventDefault()
    if(newFocus !== "#about"){
        //Allows for scrolling smoothly without scroll being disabled
        document.querySelector("body").classList.remove("stopScroll")
        scrollLock.unobserve(document.querySelector("#about"));
        scrollDisabled = false
    }
    //For skill btn only, it unhides the list first since its under a .4s transition
    if(newFocus==="#skillsBtn" && skills.classList.contains("hidden")){
        showSkills()
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
    setTimeout(function(){
        if(timelineCounter>=timeItemsLength){
            scrollLock.unobserve(document.querySelector("#about"));
        } else{
            scrollLock.observe(document.querySelector("#about"));
        }
    },1500)
}

//Event Listeners
for(key in Object.keys(navLinks)){
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
    smoothScroll(e)
})


//for links in navbar
//scroll action
let hrefRegex = /#\w*/
function smoothScroll(e=0){
    e.preventDefault();
    const targetElement = document.querySelector(e.target.href.match(hrefRegex)[0]).getBoundingClientRect()
    let offSet = window.pageYOffset
    window.scrollTo({
        top: targetElement.top + offSet - navbar.offsetHeight,
        behavior: 'smooth',
    })
}

for(key in Object.keys(navLinks)){
    navLinks[key].addEventListener("click", function(e){
        if(this.href.match(hrefRegex)[0] !== "#about"){
            document.querySelector("body").classList.remove("stopScroll")
            scrollDisabled = false
        }
        //For skill btn only, it unhides the list first since its under a .4s transition
        if(e.target.href.match(hrefRegex)[0]==="#skillsBtn" && skills.classList.contains("hidden")){
            showSkills()
            setTimeout(function(){
                smoothScroll(e);
            }, 520)
        } else{
            smoothScroll(e);
        }
        //hides Navbar
        hideNav();
    })
}

//for links in profile pic
const storyLink= document.getElementById("bgProfilePic").querySelector("a")
storyLink.addEventListener("click", (e) => {
    smoothScroll(e)
})
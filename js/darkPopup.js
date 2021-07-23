//equal to jquery document ready
const body = document.querySelector("body")
document.addEventListener("DOMContentLoaded", function() {
    let popupContainer = document.createElement("div")
    let darkPopup = document.createElement("div")
    let paragraph= document.createElement("p")

    popupContainer.id= "popupContainer"
    darkPopup.id = "darkPopup"
    darkPopup.classList.add("focusContainer", "darkPopup")
    paragraph.textContent = "Try Dark Mode!" 

    darkPopup.append(paragraph)
    popupContainer.append(darkPopup)

    themeBtn.append(popupContainer)
});

document.addEventListener("scroll", function() {
    if (window.scrollY>0){
        popupContainer.classList.add("hidden")
    } 
});

themeBtn.addEventListener("mouseenter", function(){
    popupContainer.classList.remove("hidden")
    if (window.scrollY>0){
        popupContainer.style.top = "40px";
    } else {
        popupContainer.style.top = "65px";
    }
})
themeBtn.addEventListener("mouseleave", function(){
    popupContainer.classList.add("hidden")
})

setTimeout(function(){
    popupContainer.classList.add("hidden") 
}, 13000)

themeBtn.addEventListener("click", function(e){
    //target both icon and button
    if(e.target.classList.contains("darkMode")||e.target.classList.contains("fa-moon-o")){
        popupContainer.firstChild.firstChild.textContent = "Back to Normal"
    } else{
        popupContainer.firstChild.firstChild.textContent = "Try Dark Mode"
    }
})
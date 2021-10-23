//equal to jquery document ready
const createPopUp = () =>{
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
    setTimeout(function(){
        popupContainer.classList.add("hidden") 
    }, 13000)
}
const hidePopUp = (e) => {
    if (window.scrollY>0 || e.type==="mouseleave"){
        popupContainer.classList.add("hidden")
    } 
}
const showPopUp = () =>{
    popupContainer.classList.remove("hidden")
    if (window.scrollY>0){
        popupContainer.style.top = "40px";
    } else {
        popupContainer.style.top = "65px";
    }
   
}
const  generatePopUpContent = (e) =>{
     //target both icon and button
     if(e.target.classList.contains("darkMode")||e.target.classList.contains("fa-moon-o")){
        popupContainer.firstChild.firstChild.textContent = "Back to Normal"
    } else{
        popupContainer.firstChild.firstChild.textContent = "Try Dark Mode"
    }
}

export {
    createPopUp as createPopUp, 
    hidePopUp as hidePopUp, 
    showPopUp as showPopUp, 
    generatePopUpContent as generatePopUpContent
}


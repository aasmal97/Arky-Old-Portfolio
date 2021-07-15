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
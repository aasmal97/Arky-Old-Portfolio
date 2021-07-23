const timeline = document.getElementById("timeline")
const timelineBlock= timeline.querySelectorAll("div")
document.addEventListener("DOMContentLoaded", function() {
    for (key in Object.keys(timelineBlock)){
        let lines = document.createElement("div")
        lines.classList.add("lines", "hidden")
        if((parseInt(key)+1)%2 === 0){
            lines.classList.add("verLines")
        } else if((parseInt(key))%4 === 0){
            lines.classList.add("rightHorLines")
        } else {
            lines.classList.add("leftHorLines")
        }
        timeline.insertBefore(lines, timelineBlock[key].nextElementSibling)
        console.log(timelineBlock[key].nextElementSibling)
    }
});
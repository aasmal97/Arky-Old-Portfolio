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
    }
});
let timelineCounter = 0
const observer = new IntersectionObserver(function(entries) {
    let el = entries[0].target.getBoundingClientRect()
	// isIntersecting is true when element and viewport are overlapping
	// isIntersecting is false when element and viewport don't overlap
        if(entries[0].isIntersecting === true){
            
            document.querySelector("body").classList.add("stopScroll")
            //declaring offset here gives the MOST updated number
            //after scrolling is disabled
            // If not, the accuracy of offset diminshes
            //setTimeout is set to 100 for the same reason. 
            let offset = window.pageYOffset
            console.log("stop")
            
            setTimeout(function(){
                window.scrollTo({
                    top: el.top + offset - navbar.offsetHeight,
                    behavior: 'smooth',
                }) 
                console.log("hello")
            },100)
        } 
    }, { threshold: [1] });

observer.observe(document.querySelector("#about"));
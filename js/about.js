const timeline = document.getElementById("timeline")
const timelineBlock= timeline.querySelectorAll("div")

//inserts lines connecting timeline automatically 
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

let scrollDisabled = false;
const scrollLock = new IntersectionObserver(function(entries) {
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
            setTimeout(function(){
                window.scrollTo({
                    top: el.top + offset - navbar.offsetHeight,
                    behavior: 'smooth',
                }) 
            },100)

            //signal timeline animations can start playing
            scrollDisabled = true
        } 
    }, { threshold: [1] });

let timelineCounter = 0
let timeItems = document.getElementById("timeline").querySelectorAll(".item")
let timeItemsLength = Object.keys(timeItems).length

function timelineAnimate(){
    
    if (scrollDisabled === true){
        //tracks how many animations
        timelineCounter = timelineCounter + 1

        //continue scrolling, and stop observing, if animations are done
        if(timelineCounter>=timeItemsLength){
            document.querySelector("body").classList.remove("stopScroll")
            scrollLock.unobserve(document.querySelector("#about"));
        }

        //disable firing too fast, for performance and animation complete
        scrollDisabled = false
        setTimeout(function(){
            scrollDisabled = true
        },400)
    }
}

scrollLock.observe(document.querySelector("#about"));

document.addEventListener("wheel", function(e){
    timelineAnimate()
})

document.addEventListener("touchend", function(e){
    timelineAnimate()
})
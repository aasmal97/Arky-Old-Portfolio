const timeline = document.getElementById("timeline")
const timelineBlock= timeline.querySelectorAll(".itemRow")
const timeItems = timeline.querySelectorAll(".item")

//inserts lines connecting timeline automatically 
document.addEventListener("DOMContentLoaded", function() {

    for (i = 0; i<Object.keys(timelineBlock).length*2-1; i++){
        let linesContainer = document.createElement("div")
        let lines = document.createElement("div")
        linesContainer.classList.add("linesContainer")
        lines.classList.add("lines", "hidden", "lightMode")
        linesContainer.append(lines)
        if((i+1)%2 === 0){
            linesContainer.classList.add("verLines")
            timeline.insertBefore(linesContainer, timelineBlock[(i+1)/2])
        } else if((i)%4 === 0){
            linesContainer.classList.add("rightHorLines")
            timelineBlock[i/2].insertBefore(linesContainer, timelineBlock[i/2].firstElementChild.nextElementSibling)

        } else {
            linesContainer.classList.add("leftHorLines")
            timelineBlock[i/2].insertBefore(linesContainer, timelineBlock[i/2].firstElementChild.nextElementSibling)
        }
        //reverses direction for odd number rows
        if(i<Object.keys(timelineBlock).length && i%2!= 0){
            timelineBlock[i].style = "flex-direction: row-reverse"
        }
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
            //Show first timeline item
            timeItems[timelineCounter].classList.remove("hidden")
            timeItems[timelineCounter].classList.add("show")
            //signal timeline animations can start playing
            scrollDisabled = true
        }
    }, { threshold: [1] });

let timelineCounter = 0
let timeItemsLength = Object.keys(timeItems).length 

function timelineAnimate(){
    let timeLines = document.querySelectorAll(".lines")
    //activates only when about section is in viewport
    if (scrollDisabled){
        //tracks how many animations
        timelineCounter = timelineCounter + 1
        //continue scrolling, and stop observing, if animations are done
        if(timelineCounter>=timeItemsLength){
            document.querySelector("body").classList.remove("stopScroll")
            scrollLock.unobserve(document.querySelector("#about"));
            scrollDisabled = false;
        } else{
            //reveals the next timeline item
            timeItems[timelineCounter].classList.remove("hidden")
            timeItems[timelineCounter].classList.add("show")
            //reveals the line
            timeLines[timelineCounter-1].classList.remove("hidden")
            timeLines[timelineCounter-1].classList.add("show")
            //disable firing too fast, for performance and animation complete
            scrollDisabled = false
            setTimeout(function(){
                scrollDisabled = true
            },500)
        }
    }
}

scrollLock.observe(document.querySelector("#about"));

document.addEventListener("wheel", function(e){
    timelineAnimate(e)
})

document.addEventListener("touchend", function(e){
    timelineAnimate(e)
})

document.addEventListener("keyup", (e)=>{
    if(e.key==="ArrowDown"||"ArrowUp"){
        timelineAnimate(e)
    }
})
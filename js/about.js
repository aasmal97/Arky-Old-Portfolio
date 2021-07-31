//Time and Date variables
const date = new Date
const currentYear = date.getFullYear().toString()
const birthDate = new Date('1997/11/3')
const age = Math.floor(Math.abs(date - birthDate)/31536000000).toString()

//Timeline variables
const timeline = document.getElementById("timeline")
const timelineRow= timeline.querySelectorAll(".itemRow")
const timeItems = timeline.querySelectorAll(".item")

//Disable scroll
let scrollDisabled = false;
let timelineCounter = 0
let timeItemsLength = Object.keys(timeItems).length 

const scrollLock = new IntersectionObserver(function(entries) {
    let el = entries[0].target.getBoundingClientRect()
    let remainder = (timelineCounter+1)%4
    let nearFourth = timelineCounter - remainder + 1
    let row = timelineRow[nearFourth/2].getBoundingClientRect()
    
    console.log(timelineCounter)
	// isIntersecting is true when element and viewport are overlapping
	// isIntersecting is false when element and viewport don't overlap
        if(entries[0].isIntersecting === true){
            document.querySelector("body").classList.add("stopScroll")
            //declaring offset here gives the MOST updated number
            //after scrolling is disabled
            // If not, the accuracy of offset diminshes
            //setTimeout is set to 100 for the same reason. 
            let offset = window.pageYOffset
            if(timelineCounter+1<4){
                setTimeout(function(){
                    window.scrollTo({
                        top: el.top + offset - navbar.offsetHeight,
                        behavior: 'smooth',
                    }) 
                },100)
            } else {
                setTimeout(()=>{
                    window.scrollTo({
                        top: row.top + offset - navbar.offsetHeight-10,
                        behavior: 'smooth',
                    }) 
                }, 100)
            }
            //Show first timeline item
            timeItems[0].classList.remove("hidden")
            timeItems[0].classList.add("show")
            //signal timeline animations can start playing
            scrollDisabled = true
        }
    }, { threshold: [0.3] });

function timelineAnimate(){
    let timeLines = document.querySelectorAll(".lines")
    let offset = window.pageYOffset
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

            //scrolls down after 4 timeline items (2 rows)
            if(timelineCounter%4===0){
                let el = timelineRow[timelineCounter/2].getBoundingClientRect()
                window.scrollTo({
                    top: el.top + offset - navbar.offsetHeight - 10,
                    behavior: 'smooth',
                })
            }  
            //disable firing too fast, for performance and animation complete
            scrollDisabled = false
            setTimeout(function(){
                scrollDisabled = true
            },500)
        }
    }
}

//inserts lines connecting timeline automatically 
document.addEventListener("DOMContentLoaded", function() {
    for (i = 0; i<Object.keys(timelineRow).length*2-1; i++){
        let linesContainer = document.createElement("div")
        let lines = document.createElement("div")
        linesContainer.classList.add("linesContainer")
        lines.classList.add("lines", "hidden", "lightMode")
        linesContainer.append(lines)
        if((i+1)%2 === 0){
            linesContainer.style = (i+1)%4 === 0 ? "align-self: flex-start" : "align-self: flex-end;";
            linesContainer.classList.add("verLines")
            timeline.insertBefore(linesContainer, timelineRow[(i+1)/2])
        } else if((i)%4 === 0){
            linesContainer.classList.add("rightHorLines")
            timelineRow[i/2].insertBefore(linesContainer, timelineRow[i/2].firstElementChild.nextElementSibling)

        } else {
            linesContainer.classList.add("leftHorLines")
            timelineRow[i/2].insertBefore(linesContainer, timelineRow[i/2].firstElementChild.nextElementSibling)
        }
        //reverses direction for odd number rows
        if(i<Object.keys(timelineRow).length && i%2!= 0){
            timelineRow[i].style = "flex-direction: row-reverse"
        }
    }
});

//inserts age and final year of timeline
window.addEventListener("load", function(e){
    timeItems[0].lastElementChild.textContent = timeItems[0].lastElementChild.textContent+ " " + age 
})

document.addEventListener("wheel", function(e){
    timelineAnimate(e)
})

timeline.addEventListener("touchend", function(e){
    timelineAnimate(e)
})

document.addEventListener("keyup", (e)=>{
    if(e.key==="ArrowDown"||"ArrowUp"){
        timelineAnimate(e)
    }
})

scrollLock.observe(document.querySelector("#about"));
//Time and Date variables
const date = new Date
const birthDate = new Date('1997/11/3')
const age = Math.floor(Math.abs(date - birthDate)/31536000000).toString()

//Timeline variables
const timeline = document.getElementById("timeline")
const timelineRow= timeline.querySelectorAll(".itemRow")
const timeItems = timeline.querySelectorAll(".item")
const $body = document.querySelector("body");

//Disable scroll
let scrollDisabled = false;
let timelineCounter = 0
let timeItemsLength = Object.keys(timeItems).length 

const disableScoll =()=>{
    $body.style.overflow = "hidden";
    $body.style.width = "100%";
    scrollDisabled = true
}
const enableScoll = () =>{ 
    $body.style.removeProperty("overflow");
    $body.style.removeProperty("width");
    scrollDisabled = false
}
const scrollLock = new IntersectionObserver(function(entries) {
    let remainder = (timelineCounter+1)%4
    let nearFourth = timelineCounter - remainder + 1
    let row = timelineRow[nearFourth/2].getBoundingClientRect()
	// isIntersecting is true when element and viewport are overlapping
	// isIntersecting is false when element and viewport don't overlap
        if(entries[0].isIntersecting === true){
            let el = entries[0].target.getBoundingClientRect()
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
                    disableScoll();
                },200)
            } else {
                enableScoll();
                setTimeout(()=>{
                    window.scrollTo({
                        top: row.top + offset - navbar.offsetHeight-10,
                        behavior: 'smooth',
                    }) 
                    disableScoll();
                }, 200)
            }
            //Show first timeline item
            timeItems[0].classList.remove("hidden")
            timeItems[0].classList.add("show")
            //signal timeline animations can start playing
        } else {
            enableScoll();
        }
    }, { threshold: [0.3] });

const timelineAnimate = () =>{
    const navbar = document.querySelector("#navbar")
    let timeLines = document.querySelectorAll(".lines")
    let offset = window.pageYOffset
    //activates only when about section is in viewport
    if (scrollDisabled){
        //tracks how many animations
        timelineCounter = timelineCounter + 1
        //continue scrolling, and stop observing, if animations are done
        if(timelineCounter>=timeItemsLength){
            enableScoll();
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
                 //disable firing too fast, for performance and animation complete
                enableScoll()
                window.scrollTo({
                    top: el.top + offset - navbar.offsetHeight - 10,
                    behavior: 'smooth',
                })

            }  
        
            setTimeout(function(){
                disableScoll()
            },500)
        }
    }
}

const generateLines = () =>{
    for (let i = 0; i<Object.keys(timelineRow).length*2-1; i++){
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
}

const determineAge=()=>{
    timeItems[0].lastElementChild.textContent = timeItems[0].lastElementChild.textContent+ " " + age 
}
const timlineObserver = () => {
    setTimeout(function(){
        if(timelineCounter>=timeItemsLength){
            scrollLock.unobserve(document.querySelector("#about"));
        } else{
            scrollLock.observe(document.querySelector("#about"));
        }
    },1500)
}

export {
    timeline as timeline,
    scrollLock as aboutScrollLock, 
    generateLines as generateLines, 
    timelineAnimate as timelineAnimate,  
    determineAge as determineAge,
    timlineObserver as timelineObserver,
    enableScoll as enableScoll
}
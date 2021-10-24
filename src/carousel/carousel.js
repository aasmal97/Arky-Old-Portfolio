//carousel behavior
const carousel = document.querySelector("#carousel-items")
const caroItems = document.querySelectorAll(".caro-item")
const caroBtns = document.querySelectorAll(".caro-btns")
const maxCaroIndex = caroItems.length - 1;
let prevCaroIndex = 0;
let currCaroIndex = 1;
let caroClickDisabled = false;


const caroIndicators = document.querySelector("#caroIndicators")
for (let i=0; i<=maxCaroIndex; i++){
    //Carousel Indicator Creation 
    let node = document.createElement("button")
    let indicator = document.createElement("span")
    indicator.classList.add("dot")
    node.classList.add("caroIndicators")
    node.append(indicator)
    caroIndicators.append(node)

    //generate initial translate properties for all items in carousel
    if(i===prevCaroIndex) caroItems[i].style.transform = `translate(-100vw)`
    else caroItems[i].style.transform = `translate(${(i-1)*100}vw)`
}
const allCaroIndicators = caroIndicators.querySelectorAll(".caroIndicators")

function caroClassBehavior(){
    caroItems[prevCaroIndex].classList.add("hidden");
    caroItems[prevCaroIndex].classList.remove("show");
    caroItems[currCaroIndex].classList.remove("hidden");
    caroItems[currCaroIndex].classList.add("show");
    caroItems[currCaroIndex].classList.remove("no-width");
    caroItems[prevCaroIndex].classList.add("no-width");
}
function caroMoveRight(e=0){
    if (caroClickDisabled == false){
        caroClickDisabled = true;
        if(e!=0) e.preventDefault();
        prevCaroIndex = currCaroIndex;
        currCaroIndex =  currCaroIndex >=  maxCaroIndex ? 0 :currCaroIndex + 1;
        //correct animation direction
        for(let index=0; index<=maxCaroIndex; index++){
            const translateX = caroItems[index].style.transform.replace(/[^-?\d.]/g, '');
            caroItems[index].style.transform = `translate(${translateX-100}vw)`
        }
        caroClassBehavior();

        //append next element to end, and adjust translate value accordingly
        const isMax = currCaroIndex+1 > maxCaroIndex
        caroItems[isMax ? 0: currCaroIndex+1].style.transform = `translate(100vw)`
        setTimeout(()=>{
            carousel.insertBefore(caroItems[isMax ? 0: currCaroIndex+1], caroItems[currCaroIndex].nextElementSibling)
        }, 250)

        //disable clicks until animation completes
        setTimeout(function(){caroClickDisabled = false;}, 550)
        //update indicators
        allCaroIndicators[currCaroIndex].firstChild.classList.add("active")
        allCaroIndicators[prevCaroIndex].firstChild.classList.remove("active")
    }
}

function caroMoveLeft(e=0){
    if (caroClickDisabled == false){
        caroClickDisabled = true;
        if(e!=0) e.preventDefault();
        prevCaroIndex = currCaroIndex;
        currCaroIndex = currCaroIndex<= 0? maxCaroIndex : currCaroIndex - 1;
        //correct animation direction
        for(let index=0; index<=maxCaroIndex; index++){
            const translateX = caroItems[index].style.transform.replace(/[^-?\d.]/g, '');
            caroItems[index].style.transform = `translate(${parseInt(translateX) + 100}vw)`
        }
        caroClassBehavior()

        //append next element to start, and adjust translate value accordingly
        //only works when current is not the very first node in the tree 
        //(i.e when user has click right first, then left)
        //cannot hold 2 items. Must hold 1 or more.
        const isStart = currCaroIndex-1 < 0
        caroItems[isStart ? maxCaroIndex: currCaroIndex-1].style.transform = `translate(-100vw)`
        setTimeout(()=>{
            carousel.insertBefore(caroItems[isStart ? maxCaroIndex: currCaroIndex-1], caroItems[prevCaroIndex-1])
        }, 250)

        //disable clicks until animation completes
        setTimeout(function(){caroClickDisabled = false;}, 550) 
        allCaroIndicators[currCaroIndex].firstChild.classList.add("active")
        allCaroIndicators[prevCaroIndex].firstChild.classList.remove("active")
    }
}


/* Note, setInterval must be defined as variable (lets clearInterval work)
variable containing setInterval should also be defined within 
a variable. This is due to scope, else if this doesnt happen 
it causes the creation of multiple timers, breaking the carousel */
let caroTimerInterval;
const timerSpeed = 6000;

// let caroTimer = () => { 
//     caroTimerInterval = setInterval(() => {
//         caroMoveRight()
//     }, timerSpeed);
// };

// //starts timer for caro items to move right
// // caroTimer(); 

/* wrote the following to restart timer after a click.
    however, determined this would not be good because it may not give user
    time to focus on content. Opted for restarting timer when user left div
    const resetCaroTimer = () => {
    clearInterval(caroTimerInterval);
    caroTimer();
}*/

//stops movement when mouse enters
const caroContainer = document.getElementById("carousel")
const carouselNodes = caroContainer.children
for (i in Object.keys(carouselNodes)){
    carouselNodes[i].addEventListener("mouseenter", () => {
        clearInterval(caroTimerInterval);
    })
}

caroContainer.addEventListener("mouseenter", () => {
    clearInterval(caroTimerInterval);
})

//restores movement when mouse leaves
caroContainer.addEventListener("mouseleave", () => {
    caroTimer();
})

//Carousel Behavior when arrows are clicked
caroBtns[0].addEventListener("click", function(e){
    caroMoveLeft(e)
})

caroBtns[1].addEventListener("click", function(e){
    caroMoveRight(e)
})

//Carousel Indicator Behavior
allCaroIndicators[currCaroIndex].firstChild.classList.add("active")
for (i in Object.keys(allCaroIndicators)){
    allCaroIndicators[i].addEventListener("click", function(){

        const currIndicator = Object.keys(allCaroIndicators).find(key=> allCaroIndicators[key] === this)
        prevCaroIndex = currCaroIndex
        currCaroIndex = parseInt(currIndicator);

        //restores orginial order so transitions make sense
        for (i in Object.keys(caroItems)){
            carousel.append(caroItems[i])
        }     

        setTimeout(function(){
            caroClassBehavior()
        },0);

        //selects appropriate indicator
        this.firstChild.classList.add("active")
        if(allCaroIndicators[prevCaroIndex]!=this){
            allCaroIndicators[prevCaroIndex].firstChild.classList.remove("active")
        }
        
    })
}

//makes indicators reappear
caroContainer.addEventListener("mouseenter", () => {
        caroBtns[0].classList.remove("hidden")
        caroBtns[1].classList.remove("hidden")
})

caroContainer.addEventListener("mouseleave", ()=>{
    caroBtns[0].classList.add("hidden")
    caroBtns[1].classList.add("hidden")
})
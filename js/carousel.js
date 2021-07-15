"use-strict";

//carousel behavior
const carousel = document.querySelector("#carousel-items")
const caroItems = document.querySelectorAll(".caro-item")
const caroBtns = document.querySelectorAll(".caro-btns")
const maxCaroIndex = caroItems.length - 1;
let prevCaroIndex = maxCaroIndex;
let currCaroIndex = 0;
let caroClickDisabled = false;

//Carousel Indicator Creation 
const caroIndicators = document.querySelector("#caroIndicators")
for (i=0; i<=maxCaroIndex; i++){
    let node = document.createElement("button")
    let indicator = document.createElement("span")
    indicator.classList.add("dot")
    node.classList.add("caroIndicators")
    node.append(indicator)
    caroIndicators.append(node)
}
const allCaroIndicators = caroIndicators.querySelectorAll(".caroIndicators")

function caroClassBehavior(){
    caroItems[prevCaroIndex].classList.add("hidden");
    caroItems[prevCaroIndex].classList.remove("show");
    caroItems[currCaroIndex].classList.remove("hidden");
    caroItems[currCaroIndex].classList.add("show");
}

function caroMoveLeft(e){
    if (caroClickDisabled == false){
        e.preventDefault();
        prevCaroIndex = currCaroIndex;
        currCaroIndex = currCaroIndex<= 0? maxCaroIndex : currCaroIndex - 1;
        //correct animation direction
       carousel.insertBefore(caroItems[currCaroIndex], caroItems[prevCaroIndex])
        
        setTimeout(function(){ 
            caroClassBehavior()
        }, 1)

        caroClickDisabled = true;

        //disable clicks until animation completes
        setTimeout(function(){caroClickDisabled = false;}, 400) 

        allCaroIndicators[currCaroIndex].firstChild.classList.add("active")
        allCaroIndicators[prevCaroIndex].firstChild.classList.remove("active")
    }
}

function caroMoveRight(e=0){
    if (caroClickDisabled == false){
        if(e!=0){
            e.preventDefault();
        }
        prevCaroIndex = currCaroIndex;
        currCaroIndex =  currCaroIndex >=  maxCaroIndex ? 0 :currCaroIndex + 1;
        //correct animation direction
        carousel.insertBefore(caroItems[currCaroIndex], caroItems[prevCaroIndex].nextSibling)
        setTimeout(function(){ 
            caroClassBehavior();
        }, 1)

        caroClickDisabled = true;
        //disable clicks until animation completes
        setTimeout(function(){caroClickDisabled = false;}, 400)

        allCaroIndicators[currCaroIndex].firstChild.classList.add("active")
        allCaroIndicators[prevCaroIndex].firstChild.classList.remove("active")
    }
}


/* Note, setInterval must be defined as variable (lets clearInterval work)
variable containing setInterval should also be defined within 
a variable. This is due to scope, else if this doesnt happen 
it causes the creation of multiple timers, breaking the carousel */
let caroTimerInterval;
const timerSpeed = 7000;

let caroTimer = () => { 
    caroTimerInterval = setInterval(() => {
        caroMoveRight()
    }, timerSpeed);
};

//resets timer. 
const resetCaroTimer = () => {
    clearInterval(caroTimerInterval);
    caroTimer();
}

//starts timer for caro items to move right

caroTimer(); 


//moves carousel when arrows are clicked
caroBtns[0].addEventListener("click", function(e){
    caroMoveLeft(e)
    resetCaroTimer()
})

caroBtns[1].addEventListener("click", function(e){
    caroMoveRight(e)
    resetCaroTimer()
})

//stop automatic carousel movement when mouse is over it
carousel.addEventListener("mouseenter", () => {
    clearInterval(caroTimerInterval);
})

//restores movement when mouse leaves
carousel.addEventListener("mouseleave", () => {
    caroTimer()
})

//Carousel Indicator Behavior
allCaroIndicators[0].firstChild.classList.add("active")
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
        resetCaroTimer()
    })
}
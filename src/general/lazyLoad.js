let highResRegex = /.*images(.*)/
let lowResRegex = /.*imgBlur(.*)/
let lightImgRegex = /light(.*)/ 
let darkImgRegex = /dark(.*)/
const allImages = document.querySelectorAll("img")
const lazyLoad = new IntersectionObserver(function(entries) {
        if(entries[0].isIntersecting === true){
            let el = entries[0].target
            let photo 
            lazyLoad.unobserve(el);
            //High res image directory added
            setTimeout(function(){
                photo = el.src.match(lowResRegex)[1];
                el.src = "images" + photo
                //tells me if image loaded
                el.onload = function(){
                    if(highResRegex.test(el.src)){
                        el.classList.remove("blur")
                    }
                }
            }, 150)
        } 
    }, { threshold: [0] });

//Changes images if they have a dark version to them.
//checks for image state, and matches new image appropriately. 
function imgThemeLoad(){
    for(let i in Object.keys(allImages)){
        let parentElClass = allImages[i].parentElement.classList
        let photo = allImages[i].src;
        //checks if two versions exist since they will have light or dark at the beginning
        if(lightImgRegex.test(photo)||darkImgRegex.test(photo)){
            //variables only have correct value when correct class is active
            let lightPair =  parentElClass.contains("darkMode")? "imgBlur"+"/dark"+photo.match(lightImgRegex)[1] : 0
            let darkPair = parentElClass.contains("lightMode") ? "imgBlur"+"/light"+photo.match(darkImgRegex)[1] : 0
            const addBlur = allImages[i].classList.add("blur")
            
            switch(true){
                //Simply replaces low res image. No blur, because they already have it. 
                case lightImgRegex.test(photo) && lowResRegex.test(photo):
                        allImages[i].src = lightPair
                    break;
                case darkImgRegex.test(photo) && lowResRegex.test(photo):
                    allImages[i].src = darkPair
                    break;
                //Blurs high res images again while replacing them
                case lightImgRegex.test(photo) && highResRegex.test(photo):
                    addBlur
                    setTimeout(()=>{
                        allImages[i].src = lightPair
                    },10)
                    break;
                case darkImgRegex.test(photo) && highResRegex.test(photo):
                    addBlur
                    setTimeout(()=>{
                        allImages[i].src = darkPair
                    },10)
                    break;
                default:
                    console.log("something went wrong")
            }
            //reattaches observer to images
            setTimeout(function(){
                lazyLoad.observe(allImages[i]);
            }, 150)
        }
    }     
}

const imagesOnLoad = () =>{
    for (let i in Object.keys(allImages)){
        //only observes images that are initally loaded in as Low Resolution
        if(lowResRegex.test(allImages[i].src)){
            allImages[i].classList.add("blur")
            lazyLoad.observe(allImages[i]);
        }
    }    
}

export {
    imagesOnLoad as imagesOnLoad, 
    imgThemeLoad as imgThemeLoad
}
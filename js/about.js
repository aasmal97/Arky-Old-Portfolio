//Time and Date variables
const date = new Date
const currentYear = date.getFullYear().toString()
const birthDate = new Date('1997/11/3')
const age = Math.floor(Math.abs(date - birthDate)/31536000000).toString()


//inserts age and final year of timeline
window.addEventListener("load", function(e){
    timeItems[0].lastElementChild.textContent = timeItems[0].lastElementChild.textContent+ " " + age 
})
const skillsBtn = document.querySelector("#skillsBtn")
const skills = document.querySelector("#skills")
let skillClickDisabled = true

skillsBtn.addEventListener("click", function(e){    
    if (skillClickDisabled){
        e.preventDefault()
        if(skills.classList.contains("show")){
            skills.classList.add("hidden")
            skills.classList.remove("show")
            skillsBtn.firstElementChild.textContent = "Show List of Skills"
        }
        else{
            skills.classList.remove("hidden")
            skills.classList.add("show")
            skillsBtn.firstElementChild.textContent = "Hide List of Skills"
        }
        skillClickDisabled = false
    }

    setTimeout(function(){
        skillClickDisabled = true
    }, 500)
    
})
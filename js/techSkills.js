const skillsBtn = document.querySelector("#skillsBtn")
const skills = document.querySelector("#skills")
let skillClickDisabled = true;
function hideSkills(){
    skills.classList.add("hidden")
    skills.classList.remove("show")
    skillsBtn.firstElementChild.textContent = "Show List of Skills"
}

function showSkills(){
    skills.classList.remove("hidden")
    skills.classList.add("show")
    skillsBtn.firstElementChild.textContent = "Hide List of Skills"
}

function toggleSkills(e=0){
    if(e!==0){
        e.preventDefault()
    }
    if (skillClickDisabled){    
        if(skills.classList.contains("show")){
            hideSkills()
        }
        else{
            showSkills()
        }
        skillClickDisabled = false
    }
    setTimeout(function(){
        skillClickDisabled = true
    }, 500)
}

skillsBtn.addEventListener("click", function(e){  
    toggleSkills(e);
})
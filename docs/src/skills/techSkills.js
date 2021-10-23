const skillsBtn = document.getElementById("skillsBtn")
const skills = document.getElementById("skillsList")
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

function toggleSkills(){
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
export {
    toggleSkills as toggleSkills, 
    skillsBtn as skillsBtn,
    skills as skills
}

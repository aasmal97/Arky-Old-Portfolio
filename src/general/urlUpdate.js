//updating page url for backspace, and focus accessibility
function urlUpdate(newFocus, e){
    document.querySelector(newFocus).tabIndex = 0
    document.querySelector(newFocus).focus({
        //prevent scrolling, since smooth scroll will handle this
        preventScroll: true
      })
    
    window.history.pushState("", newFocus, e.target.href)
}
export default urlUpdate
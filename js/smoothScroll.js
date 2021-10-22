//for links in navbar
//scroll action
const hrefRegex = /#\w*/
//created the following regex for matching hashes, but was not needed
/*const directoryRegex = /\/#.*/

function smoothScroll(e){
    e.preventDefault();
    const targetElement = document.querySelector(e.target.href.match(hrefRegex)[0]).getBoundingClientRect()
    let offSet = window.pageYOffset
    window.scrollTo({
        top: targetElement.top + offSet - navbar.offsetHeight,
        behavior: 'smooth',
    })
}
export {smoothScroll as smoothScroll, hrefRegex as hrefRegex}
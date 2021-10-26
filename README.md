# Overview:
This is my portofilo page, meant to display all of my projects, skills, and a little bit of my life story. It was built using Vanilla JS, SCSS and HTML.
I purposely did not use any frameworks, like React, jQuery, Vue, Bootstrap etc, or unneccesary libraries because this was a challenge to myself. I wanted to test how difficult it was to build a modern-looking single page site, solely using native Javascript and mostly native CSS. SCSS (CSS Preprocesser) was used to compile and organize CSS.

# Limitations
1. Ensuring compability on Safari was difficult as I do not own an Apple Device (phone or laptop). 
    - To amend this, Browerstack was used but despite testing, some bugs may still be persistent. 

2. This page does not contain a backend (no database or API). 
    - To update content on this page, I must directly manipulate the HTML and push the changes. However, since this is a personal page, meant to be maintained by me, this was considered a non-issue

3. This page is hosted on Github Pages. 
    - This page is not meant to handle an incredible amount of traffic (greater than 50,000 page loads a month)

4. There are no automated tests to test functionality or content loading, aside from Github Pages own build tests. 
    - This was not considered a serious issue since this a single static page. Manual testing was considered the more time efficient solution in this scenario. 

# Breaking Issues Encountered and Fixes
1. Scroll locking on Safari would not work as intended
   - Fix: Use body-scroll-lock library. 
        - This augments overflow: hidden styling on body, styling like position fixed, and event listeners to lock scroll behavior on all browsers. 
  
2. Smooth scrolling on Safari would not work as intended
   - Use smooth scrolling polyfill library. 
        - This replaces behavior: smooth, to request Animation Frame on browers that don't support behavior: scroll (i.e Safari)
3. Resizing too fast caused page layout to break due to missing timings
   - Use debounce function from lodash library
        - For an interval, prevents functions  to run, in window resize listners after event is fired. After the interval, the lastest event that was fired in that interval, is the one that runs. 
# Libraries used: 
1. [body-scroll-lock](https://github.com/willmcpo/body-scroll-lock)
2. [Smooth Scrolling Polyfill](https://github.com/iamdustan/smoothscroll)
3. [lodash](https://lodash.com)

# End Verdict
This was tougher than I imagined. 

Even though Vanilla JS (using ES6) and CSS3 have come a long way in making modern web development easier, using powerful tools like React, Bootstrap, Vue, etc, are essential to developing web applications quickly, despite potentially sacrificing some performance along the way. This can also make complex web development much easier as code can be more modular and maintainable, as despite my attempts to make this site's code modular, it was still not as a modular as the aforementioned frameworks.

However, developing in native JS and CSS, were great for learning and strengthing my knowledge of the fundamentals. I now understand the aforementioned tools more in depth and makes using them incredibly easy.

Check out how this portfolio site looks [here](https://www.arkyasmal.com)

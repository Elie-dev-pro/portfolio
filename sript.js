
const words = [
    " Photographer",
    " Designer",
    " Web Developer",
    " UI/UX Designer",
    " Graphic Designer"
];

let wordIndex = 0;
let letterIndex = 0;
let deleting = false;

const typing = document.getElementById("typing");

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typing.textContent = currentWord.substring(0, letterIndex + 1);
        letterIndex++;

        if (letterIndex === currentWord.length) {
            deleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }

    } else {

        typing.textContent = currentWord.substring(0, letterIndex - 1);
        letterIndex--;

        if (letterIndex === 0) {
            deleting = false;
            wordIndex++;

            if (wordIndex >= words.length) {
                wordIndex = 0;
            }
        }
    }

    setTimeout(typeEffect, deleting ? 60 : 120);
}

typeEffect();


 function animateCount(el, duration = 1500) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const start = performance.now();
 
    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic for a nice deceleration at the end
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
 
      el.textContent = value + suffix;
 
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target + suffix; // ensure it lands exactly on target
      }
    }
    requestAnimationFrame(tick);
  }
 
  // Only trigger the animation once the stats scroll into view
  const numbers = document.querySelectorAll('.stat-number');
 
 
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        obs.unobserve(entry.target); // run once only
      }
    });
  }, { threshold: 0.4 });
 
  numbers.forEach(num => observer.observe(num));
  function toggleMenu(){
    document.querySelector("aside").classList.toggle("active");
}
const sections = document.querySelectorAll("section, main");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight) {

            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});



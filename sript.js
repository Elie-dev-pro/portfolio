
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
const filterButtons = document.querySelectorAll(".filter");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const category = btn.textContent.trim().toLowerCase();

        portfolioItems.forEach(item => {
            const categories = (item.dataset.category || "").split(" ");
            const show = category === "all" || categories.includes(category);
            item.classList.toggle("hide", !show);
        });
    });
});
/* ===== Resume animations ===== */
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

    const resumeObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;

            if (el.classList.contains("reveal")) {
                el.classList.add("show");
            }

            if (el.classList.contains("skill-item")) {
                const bar = el.querySelector(".skill-progress");
                const pct = el.querySelector(".skill-percent");
                const delay = Number(el.dataset.delay);

                setTimeout(() => {
                    bar.style.width = bar.dataset.width;
                    animateCount(pct, 1400);
                }, delay);
            }

            obs.unobserve(el);
        });
    }, { threshold: 0.25 });

    // Education (left) and Experience (right) cards
    document.querySelectorAll(".resume-column").forEach((column, colIndex) => {
        column.querySelectorAll(".column-title, .resume-item").forEach((el, i) => {
            el.classList.add("reveal", colIndex === 0 ? "from-left" : "from-right");
            el.style.transitionDelay = (i * 0.15) + "s";
            resumeObserver.observe(el);
        });
    });

    // Skill bars
    document.querySelectorAll(".skill-item").forEach((item, i) => {
        const bar = item.querySelector(".skill-progress");
        const pct = item.querySelector(".skill-percent");

        bar.dataset.width = bar.style.width;           // remember target, e.g. "85%"
        bar.style.width = "0%";                        // start empty

        pct.dataset.target = parseInt(pct.textContent, 10);
        pct.dataset.suffix = "%";
        pct.textContent = "0%";

        item.dataset.delay = (i % 3) * 150;            // small stagger
        resumeObserver.observe(item);
    });
}
/* ===== Letter-by-letter writing (About paragraph) ===== */
const pp = document.querySelector(".one .pp");

if (pp) {
    const nodes = Array.from(pp.childNodes);
    pp.textContent = "";
    const letters = [];

    nodes.forEach(node => {
        if (node.nodeName === "BR") {
            pp.appendChild(document.createElement("br"));
            return;
        }

        node.textContent.split(/\s+/).filter(Boolean).forEach(word => {
            const wordSpan = document.createElement("span");
            wordSpan.className = "word";

            word.split("").forEach(ch => {
                const c = document.createElement("span");
                c.className = "c";
                c.textContent = ch;
                wordSpan.appendChild(c);
                letters.push(c);
            });

            pp.appendChild(wordSpan);
            pp.appendChild(document.createTextNode(" "));
        });
    });

    const pen = document.createElement("span");
    pen.className = "pen";

    function writeLetters() {
        let i = 0;
        const timer = setInterval(() => {
            letters[i].classList.add("on");
            letters[i].after(pen);              // pen follows the last letter
            i++;

            if (i >= letters.length) {
                clearInterval(timer);
                setTimeout(() => pen.remove(), 800);   // pen disappears at the end
            }
        }, 25);                                 // speed: lower = faster
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        letters.forEach(c => c.classList.add("on"));
    } else {
        const writeObserver = new IntersectionObserver((entries, obs) => {
            if (entries[0].isIntersecting) {
                writeLetters();
                obs.disconnect();               // run once only
            }
        }, { threshold: 0.3 });

        writeObserver.observe(pp);
    }
}



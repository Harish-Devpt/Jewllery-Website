function loco() {
    gsap.registerPlugin(ScrollTrigger);


const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, 
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh();

}

loco() 

let cursor = document.querySelector("#cursor");
let position = { x: 0, y: 0 };     
let mouse = { x: 0, y: 0 };   

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

gsap.ticker.add(() => {
  position.x += (mouse.x - position.x) * 0.2; 
  position.y += (mouse.y - position.y) * 0.2;

  gsap.set(cursor, {
    x: position.x,
    y: position.y
  });
});


document.querySelectorAll("a, button, .hover-target").forEach(el => {
  el.addEventListener("mouseenter", () => {
    gsap.to(cursor, { scale: 2, backgroundColor: "#fff", duration: 0.3 });
  });
  el.addEventListener("mouseleave", () => {
    gsap.to(cursor, { scale: 1, backgroundColor: "rgb(250,219,219)", duration: 0.3 });
  });
});




let circle = document.querySelector("#circle");


circle.addEventListener("mouseenter", () => {
  gsap.to("#cursor", { scale: 2, duration: 0.3, ease: "power2.out" });
});

circle.addEventListener("mouseleave", () => {
  gsap.to("#cursor", { scale: 1, duration: 0.3, ease: "power2.out" });
});


circle.addEventListener("mousemove", e => {
  let rect = circle.getBoundingClientRect();
  let relX = e.clientX - (rect.left + rect.width / 2);
  let relY = e.clientY - (rect.top + rect.height / 2);

  gsap.to(circle, {
    x: relX * 0.7, 
    y: relY * 0.7,
    duration: 0.3,
    ease: "power2.out"
  });
});

circle.addEventListener("mouseleave", () => {
  gsap.to(circle, { x: 0, y: 0, duration: 0.4, ease: "elastic.out(1, 0.4)" });
});




let tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#page-1",
    scroller: "#main",   
    start: "top top",
    end: "+=220%",     
    scrub: 1.5,
    pin: true,
    anticipatePin: 1,
  }
});

tl.to("#page-1 h1", {
  x: "-18vw",
  opacity: 0.5,
  filter: "blur(4px)",
  ease: "power2.out"
}, 0)
.to("#page-1 h2", {
  x: "18vw",
  opacity: 0.5,
  filter: "blur(4px)",
  ease: "power2.out"
}, 0)


.to("#page-1 #image img", {
  y: "-76vh",      
  scale: 1.9,
  ease: "power2.out"
}, 0.05);



let time1 = gsap.timeline({
  scrollTrigger: {
    trigger: "#page-2",
    scroller: "#main",
    start: "top 70%",
    end: "top 10%",
    scrub: 1,
  }
});

time1.to("#main", {
  backgroundColor: "#fff",   
  color: "#000",             
  duration: 1
});


gsap.from("#page-2 #lft .contains", {
  x: -200,              
  opacity: 0,           
  duration: 2,
  stagger: 0.5,         
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#page-2 #contain",
    scroller: "#main",
    start: "top 80%",   
    end: "top 40%",
    scrub: false,      
  
  }
});

gsap.to("#page-2 #rgt img", {
  y: -20,
  rotate: 2,           
  duration: 4,
  ease: "power1.inOut",
  repeat: -1,
  yoyo: true
});


gsap.utils.toArray("#page-3 img").forEach((img, i) => {
  gsap.from(img, {
    scrollTrigger: {
      trigger: img,
      scroller: "#main", 
      start: "top 85%",  
      end: "top 60%",
      scrub: 1,
    },
    opacity: 0,
    y: 100,        
    scale: 0.9,    
    duration: 1,
    ease: "power2.out"
  });
});


let tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: "#page-4",
    scroller: "#main",
    start: "top 95%", 
    end: "bottom 90%",
    scrub: true,
  }
});

tl2.fromTo("#page-4", 
  { backgroundColor: "#fff", color: "#000" }, 
  { backgroundColor: "#000", color: "#fff", duration: 0.5 } 
);




document.querySelectorAll("#page-4 .elements").forEach(card => {
  const text = card.querySelector(".text");
  const imgs = card.querySelectorAll(".left img, .right img");

  let floats = [];

  text.addEventListener("mouseenter", () => {
    imgs.forEach(img => {
      // intro fade-in
      gsap.to(img, {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 0.6,
        ease: "power2.out"
      });

      // floating animation
      let floatAnim = gsap.to(img, {
        y: -15,
        rotation: 1.5,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      floats.push(floatAnim);
    });
  });

  text.addEventListener("mouseleave", () => {
    // stop floating tweens
    floats.forEach(f => f.kill());
    floats = [];

    // reset + fade out
    gsap.to(imgs, {
      y: 0,
      rotation: 0,
      opacity: 0,   // 🔥 fade out on leave
      duration: 0.5,
      ease: "power2.out"
    });
  });
});


function TextAnimation() {
  document.querySelectorAll('.elements .text').forEach(textBox => {
  textBox.addEventListener('mouseenter', () => {
    textBox.parentElement.classList.add('active');
  });
  textBox.addEventListener('mouseleave', () => {
    textBox.parentElement.classList.remove('active');
  });
});
}

TextAnimation();




let clients = document.querySelectorAll("#page-5 #clients");

clients.forEach(elem => {
  elem.addEventListener("mouseenter", () => {
    let attribute = elem.getAttribute("data-image");

    cursor.classList.add("show-img"); 
    cursor.style.backgroundImage = `url(${attribute})`;

    gsap.to(cursor, {
      width: 400,
      height: 400,
      borderRadius: 0,
      duration: 0.4,
      ease: "power3.out"
    });
  });

  elem.addEventListener("mouseleave", () => {
    cursor.classList.remove("show-img"); 
    cursor.style.backgroundImage = "none";

    gsap.to(cursor, {
      width: 30,
      height: 30,
      borderRadius: "50%",
      duration: 0.4,
      ease: "power3.inOut"
    });
  });
});

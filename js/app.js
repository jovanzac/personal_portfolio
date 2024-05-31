// Set up vars
var panels = document.querySelectorAll('.panel'),
    panelsY = []
    isScrolling = false;


const parallax_el = document.querySelectorAll(".parallax");

const main_tag = document.querySelector("main");

let xValue=0, 
    yValue=0;
let rotateDegree = 0;

var mousemove = 0,
    scroll = 0;


// Cache position of each panel
Array.prototype.forEach.call(panels, function(el, i) {
    panelsY.push(el.offsetTop);
    console.log(`panel ${i} offsetTop: ${el.offsetTop}`);
    console.log(`panelsY: ${panelsY}`);
});


// Update the window
function updateWindow() {
    console.log(`updating window on scroll. scrollTop: ${window.scrollY}  scrollHeight: ${main_tag.scrollHeight}`);
    var y = window.scrollY;
    // Loop through our panel positions
    for (i = 0, l = panels.length; i < l; i++) {
        if ((i === l - 1) || (y >= panelsY[i] && y <= panelsY[i+1])) {
            break;
        }
    };
    // Update classes
    Array.prototype.forEach.call(panels, function(el, j) {
        if (j !== i) {
            el.classList.remove('panel-fixed');
        } else {
            el.classList.add('panel-fixed');
        }
    });
};


function update(cursorParameter) {
    if (!isScrolling){
        console.log(`In mousemove update function`)
        parallax_el.forEach((el)=>{
            let speedx = el.dataset.speedx;
            let speedy = el.dataset.speedy;
            let speedz = el.dataset.speedz;
            let rotationSpeed = el.dataset.rotation;

            let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth/2 ? 1 : -1;
            let scalingFactor = 0.1;
            let zValue = (cursorParameter - parseFloat(getComputedStyle(el).left)) * isInLeft * scalingFactor;

            el.style.transform = `translateX(calc(-50% + ${-xValue * speedx}px)) 
                                rotateY(${rotateDegree * rotationSpeed}deg) translateY(calc(-50% + ${yValue * speedy}px))
                                perspective(2300px) translateZ(${zValue * speedz}px)`;
        });
    }
}

// Bind our function to window scroll
window.addEventListener('scroll', function() {
    console.log(`inside event listener for scroll counter: ${scroll++}`)
    updateWindow();
});

window.addEventListener("mousemove", (e)=>{
    console.log(`mouse move event count: ${mousemove++}`);
    xValue = e.clientX - window.innerWidth/2;
    yValue = e.clientY - window.innerHeight/2;

    rotateDegree = (xValue / (window.innerWidth/2)) * 20;

    update(e.clientX);
    
})

update(0);
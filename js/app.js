const parallax_el = document.querySelectorAll(".parallax");

let xValue=0, 
    yValue=0;
let rotateDegree = 0;

function update(cursorParameter) {
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

update(0);

window.addEventListener("mousemove", (e)=>{
    xValue = e.clientX - window.innerWidth/2;
    yValue = e.clientY - window.innerHeight/2;

    rotateDegree = (xValue / (window.innerWidth/2)) * 20;

    update(e.clientX);
    
})
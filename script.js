const cursor = document.getElementById("cursor");
let cursorPosition = { x: 0, y: 0 };
const translate3d = (x, y) => `translate3d(${x}px, ${y}px, 0)`;
const handleMouseMove = (e) => {
    cursorPosition.x = e.clientX;
    cursorPosition.y = e.clientY;
    cursor.style.transform = translate3d(
        cursorPosition.x,
        cursorPosition.y
    );
};

const mouseMoveHandler = (e) => {
    window.requestAnimationFrame(() => handleMouseMove(e));
};
window.addEventListener("mousemove", mouseMoveHandler);



const splitTypesHero = document.querySelectorAll('.reveal-hero');
splitTypesHero.forEach((char, i) => {
    const textHeor = new SplitType(char, { types: 'lines' });
    textHeor.lines.forEach((line) => {
        gsap.fromTo(
            line, 
            {
                opacity: 0,
                top: 100,
                ease: "power1.in",
            },
            {
                top: 0,
                opacity: 1,
                duration: 1,
                ease: "power1.out",
                onStart: function() {
                    char.style.visibility = 'visible';
                }
            }
        );
    });
});

const splitTypes = document.querySelectorAll('.reveal');
splitTypes.forEach((char, i) => {
    const text = new SplitType(char, { types: 'lines' });
    text.lines.forEach((line) => {
        gsap.fromTo(
            line, 
            {
                opacity: 0,
                top: 50,
            },
            {
                top: 0,
                opacity: 1,
                duration: 0.3,
                scrollTrigger: {
                    trigger: line,
                    start: 'top 90%',
                    end: 'top 75%',
                    scrub: true,
                    // markers: true,
                    // toggleActions: 'play play reverse reverse'
                }
            }
        );
    });
});


const lenis = new Lenis()
lenis.on('scroll', (e) => {
    console.log(e)
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)
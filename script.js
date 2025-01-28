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

// GSAP Blur Plugin
(function () {
    const blurProperty = gsap.utils.checkPrefix("filter"),
    blurExp = /blur\((.+)?px\)/,
    getBlurMatch = (target) =>
    (gsap.getProperty(target, blurProperty) || "").match(blurExp) || [];

    gsap.registerPlugin({
        name: "blur",
        get(target) {
            return +getBlurMatch(target)[1] || 0;
        },
        init(target, endValue) {
            let data = this,
            filter = gsap.getProperty(target, blurProperty),
            endBlur = "blur(" + endValue + "px)",
            match = getBlurMatch(target)[0],
            index;
            if (filter === "none") {
                filter = "";
            }
            if (match) {
                index = filter.indexOf(match);
                endValue =
                filter.substr(0, index) +
                endBlur +
                filter.substr(index + match.length);
            } else {
                endValue = filter + endBlur;
                filter += filter ? " blur(0px)" : "blur(0px)";
            }
            data.target = target;
            data.interp = gsap.utils.interpolate(filter,endValue);
        },
        render(progress, data) {
            data.target.style[blurProperty] = data.interp(progress);
        }
    });
})();

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
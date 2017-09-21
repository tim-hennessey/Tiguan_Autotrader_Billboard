var app = app || {};


app.Animation = (function () {

    var tl1 = new TimelineMax();

    var curtain;
    var txt1;
    var hero;
    var hero2;
    var vignette;
    var buttonExit;
    var cta_arrow;
    var txt2;
    var learnMore;
    var learnMoreArrow;

    // --------------------------------------------------------------------------------------
    // set default properties
    function initialize() {
        curtain = document.getElementById('curtain');
        txt1 = document.getElementById('txt1');
        hero = document.getElementById('hero');
        hero2 = document.getElementById('hero2');
        vignette = document.getElementById('vignette');
        buttonExit = document.getElementById('expand-button');
        cta_arrow = document.getElementById('cta_arrow');
        txt2 = document.getElementById('txt2');
        learnMore = document.getElementById('learnMore');
        learnMoreArrow = document.getElementById('learnMoreArrow');


        buttonExit.addEventListener('mouseover', function () {
            TweenMax.to(cta_arrow, .25, {y: 5, ease: Sine.easeOut});
            TweenMax.to(cta_arrow, .25, {y: 0, delay: .25, ease: Sine.easeIn});

            TweenMax.to(learnMoreArrow, .25, {x: 5, ease: Sine.easeOut});
            TweenMax.to(learnMoreArrow, .25, {x: 0, delay: .25, ease: Sine.easeIn});
        });
    }

    // --------------------------------------------------------------------------------------
    // Starts the animation
    function start() {
        TweenMax.to(hero, 4, {scale:1, ease: Sine.easeOut});

        tl1.to(curtain, .5, {opacity: 0})
            .to(vignette, 2, {opacity: 1, x:"+=500", ease: Sine.easeOut}, "-=.5")
            .to(txt1, 1, {opacity: 1}, "-=1.75")
            .to(cta, .5, {opacity: 1}, "-=.5")

            .to(txt1, .5, {opacity: 0}, "+=8")
            .to(txt2, .5, {opacity: 1})
            .to(hero, .5, {opacity:0}, "-=.5")
            .to(learnMore, .5, {opacity: 1}, "-=.5")
            .to(learnMoreArrow, .5, {opacity: 1}, "-=.5");
    }

    // --------------------------------------------------------------------------------------
    // Stops the animation
    function stop() {
        console.log("stopping animation");
    }

    // --------------------------------------------------------------------------------------
    // Publicly accessible methods and properties
    return {
        initialize: initialize,
        start: start,
        stop: stop
    }

})();

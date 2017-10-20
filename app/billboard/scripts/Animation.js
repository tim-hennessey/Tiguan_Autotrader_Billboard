var app = app || {};


app.Animation = (function () {

    var tl1 = new TimelineMax();
    var curtain;
    var knobArrowLeft;
    var knobArrowRight;
    var knob;
    var buttonExit;
    var cta_arrow;

    var $dragMe = $("#dragme");
    var $beforeAfter = $("#before-after");
    var $viewAfter = $(".view-after");


    // --------------------------------------------------------------------------------------
    // set default properties
    function initialize() {
        curtain = document.getElementById('curtain');
        knobArrowLeft = document.getElementById('knobArrowLeft');
        knobArrowRight = document.getElementById('knobArrowRight');
        knob = document.getElementById('knob');
        buttonExit = document.getElementById('button-exit');
        cta_arrow = document.getElementById('cta_arrow');

        buttonExit.addEventListener('mouseover', function () {
            TweenMax.to(cta_arrow, .2, {x: "+=5", ease: Power1.easeOut});
            TweenMax.to(cta_arrow, .2, {x: "-=5", ease: Power1.easeIn, delay:".2"});
        });

    }

    // --------------------------------------------------------------------------------------
    // Starts the animation
    function start() {

        TweenMax.set($dragMe, {x: 404, onUpdate: updateImages});

        TweenMax.to(curtain, .5, {opacity: 0});

        tl1.to($dragMe, 1, {x: "+=200", ease: Power2.easeInOut, onUpdate: updateImages}, "+=1")
            .to($dragMe, 2, {x: "-=400", ease: Power2.easeInOut, onUpdate: updateImages})
            .to($dragMe, 2, {x: "+=200", ease: Power2.easeInOut, onUpdate: updateImages, onComplete: introEnd});

        function updateImages() {
            TweenMax.set($viewAfter, {width: $dragMe[0]._gsTransform.x});
        }

        function killKnobTween() {
            TweenMax.killTweensOf(knobArrowLeft);
            TweenMax.killTweensOf(knobArrowRight);
            TweenMax.to(knobArrowLeft, .25, {x: 0, ease: Power2.easeInOut});
            TweenMax.to(knobArrowRight, .25, {x: 0, ease: Power2.easeInOut});
        }

        function introEnd() {
            TweenMax.to(knobArrowLeft, .2, {x: "-=3", repeat: 51, yoyo: true, ease: Power1.easeOut});
            TweenMax.to(knobArrowRight, .2, {x: "+=3", repeat: 51, yoyo: true, ease: Power1.easeOut});

            Draggable.create($dragMe, {
                type: "x",
                bounds: $beforeAfter,
                edgeResistance: 1,
                dragResistance: 0,
                throwProps: true,
                onDrag: updateImages,
                onThrowUpdate: updateImages,
                overshootTolerance: 0,
                onDragEnd: function () {
                    console.log("stopped")
                },
                onDragStart: function () {
                    killKnobTween();
                }
            });

            var draggable = Draggable.get($dragMe);

            $beforeAfter.on("click", function (event) {
                if (draggable.isDragging || draggable.isThrowing) return;

                var eventLeft = event.clientX - $beforeAfter.offset().left;
                animateTo(eventLeft);
                killKnobTween();
            });
        }

        function animateTo(x) {
            TweenMax.to($dragMe, 1, {x: x, onUpdate: updateImages});
        }
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

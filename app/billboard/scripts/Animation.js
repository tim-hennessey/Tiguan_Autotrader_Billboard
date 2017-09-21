var app = app || {};


app.Animation = (function () {

    var tl1 = new TimelineMax();
    var tl2 = new TimelineMax();
    var tl3 = new TimelineMax();
    var curtain;
    var introText;
    var txt1;
    var txt2;
    var meTime;
    var introTime;
    var collapse;
    var resolve;
    var hero;
    var resolve_txtb;
    var resolve_cta;
    var myBool;
    var knobArrowLeft;
    var knobArrowRight;
    var knob;
    var buttonExit;
    var intro_cta_arrow;
    var light1;
    var light2;
    var light3;
    var light4;
    var light5;
    var light6;
    var light7;
    var light8;
    var light9;
    var myLightArray;
    var sign1;
    var sign2;
    var sign3;
    var tree;
    var flowers;
    var flowers2;

    var $dragMe = $("#dragme");
    var $beforeAfter = $("#before-after");
    var $viewAfter = $(".view-after");


    // --------------------------------------------------------------------------------------
    // set default properties
    function initialize() {
        myBool = true;
        curtain = document.getElementById('curtain');
        introText = document.getElementById('introText');
        txt1 = document.getElementById('txt1');
        txt2 = document.getElementById('txt2');
        collapse = document.getElementById('collapse');
        resolve = document.getElementById('resolve');
        hero = document.getElementById('hero');
        resolve_txtb = document.getElementById('resolve_txtb');
        resolve_cta = document.getElementById('resolve_cta');
        knobArrowLeft = document.getElementById('knobArrowLeft');
        knobArrowRight = document.getElementById('knobArrowRight');
        knob = document.getElementById('knob');
        buttonExit = document.getElementById('button-exit');
        intro_cta_arrow = document.getElementById('intro_cta_arrow');
        light1 = document.getElementById('light1');
        light2 = document.getElementById('light2');
        light3 = document.getElementById('light3');
        light4 = document.getElementById('light4');
        light5 = document.getElementById('light5');
        light6 = document.getElementById('light6');
        light7 = document.getElementById('light7');
        light8 = document.getElementById('light8');
        light9 = document.getElementById('light9');
        sign1 = document.getElementById('sign1');
        sign2 = document.getElementById('sign2');
        sign3 = document.getElementById('sign3');
        tree = document.getElementById('tree');
        flowers = document.getElementById('flowers');
        flowers2 = document.getElementById('flowers2');

        TweenMax.set(flowers2, {rotationZ:-2, transformOrigin:"50% 100%", transformPerspective:1000, transformStyle:"preserve-3d"});
        TweenMax.to(flowers2, 2, {rotationZ:+2 , repeat: -1, yoyo: true, ease: Power1.easeInOut});

        TweenMax.set(flowers, {rotationZ:-10, transformOrigin:"50% 100%", transformPerspective:1000, transformStyle:"preserve-3d"});
        TweenMax.to(flowers, 1, {rotationZ:+10 , repeat: -1, yoyo: true, ease: Power1.easeInOut});

        TweenMax.set(tree, {rotationX:-5, transformOrigin:"50% 100%", transformPerspective:1000, transformStyle:"preserve-3d"});
        TweenMax.to(tree, 1, {rotationX:+5 , repeat: -1, yoyo: true, ease: Power1.easeInOut});

        TweenMax.set(sign1, {rotationX:-15, transformOrigin:"50% 0%", transformPerspective:1000, transformStyle:"preserve-3d"});
        TweenMax.to(sign1, 1, {rotationX:+15 , repeat: -1, yoyo: true, ease: Power1.easeInOut});

        TweenMax.set(sign2, {rotationX:-5, transformOrigin:"50% 0%", transformPerspective:1000, transformStyle:"preserve-3d"});
        TweenMax.to(sign2, 1.5, {delay:.3, rotationX:+5 , repeat: -1, yoyo: true, ease: Power1.easeInOut});

        TweenMax.set(sign3, {rotationX:-15, transformOrigin:"50% 0%", transformPerspective:1000, transformStyle:"preserve-3d"});
        TweenMax.to(sign3, 1, {delay:.6, rotationX:+15 , repeat: -1, yoyo: true, ease: Power1.easeInOut});


        myLightArray = [light1, light2, light3, light4, light5, light6, light7, light8, light9];

        buttonExit.addEventListener('mouseover', function () {
            TweenMax.to(intro_cta_arrow, .25, {x: 5, ease: Sine.easeOut});
            TweenMax.to(intro_cta_arrow, .25, {x: 0, delay: .25, ease: Sine.easeIn});
            TweenMax.to(resolve_cta, .25, {backgroundColor:"#1072af"});
        });

        buttonExit.addEventListener('mouseout', function() {
            TweenMax.to(resolve_cta, .25, {backgroundColor:"#00b1eb"});
        });
    }

    // --------------------------------------------------------------------------------------
    // Starts the animation
    function start() {
        myLightArray.sort(function() {return 0.5-Math.random()});
        TweenMax.staggerTo(myLightArray,.5, {opacity:0, scale:1, ease:Sine.easeInOut, repeat:-1,yoyo:true}, .1);

        TweenMax.set($dragMe, {x: 485, onUpdate: updateImages});

        tl1.to(curtain, .5, {opacity: 0})
            .to(collapse, .5, {opacity: 1}, "-=.5");

        tl2.to($dragMe, 1, {x: "+=200", ease: Power2.easeInOut, onUpdate: updateImages}, "+=1")
            .to($dragMe, 2, {x: "-=400", ease: Power2.easeInOut, onUpdate: updateImages})
            .to($dragMe, 2, {x: "+=200", ease: Power2.easeInOut, onUpdate: updateImages, onComplete: introEnd})
            .to(introText, 1, {opacity: 1}, "-=.5")
            .to(txt1, 1, {opacity: 1}, "-=.5")
            .to(txt2, 1, {opacity: 1}, "-=1")
            .addLabel("myLabel", "+=3")
            .to(introText, .5, {opacity: 0, onComplete: function(){myBool = false;}}, "+=3");

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
            TweenMax.to(knobArrowLeft, .2, {x: "-=3", repeat: -1, yoyo: true, ease: Power1.easeOut});
            TweenMax.to(knobArrowRight, .2, {x: "+=3", repeat: -1, yoyo: true, ease: Power1.easeOut});

            introTime = setTimeout(resolveFunc, 10000);

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
                    meTime = setTimeout(resolveFunc, 3000);
                },
                onDragStart: function () {
                    clearTimeout(meTime);
                    clearTimeout(introTime);
                    killKnobTween();
                    if (myBool){
                        tl2.seek("myLabel");
                        myBool = false;
                    }

                }
            });

            var draggable = Draggable.get($dragMe);

            $beforeAfter.on("click", function (event) {
                if (draggable.isDragging || draggable.isThrowing) return;

                var eventLeft = event.clientX - $beforeAfter.offset().left;
                animateTo(eventLeft);
                clearTimeout(meTime);
                clearTimeout(introTime);
                killKnobTween();
                if (myBool){
                    tl2.seek("myLabel");
                    myBool = false;
                }
            });
        }

        function animateTo(x) {
            TweenMax.to($dragMe, 1, {x: x, onUpdate: updateImages, onComplete: stopFunc});
        }

        function stopFunc() {
            console.log("stopped");
            meTime = setTimeout(resolveFunc, 3000);
        }

        function resolveFunc() {
            clearTimeout(meTime);
            clearTimeout(introTime);
            Draggable.get($dragMe).disable();
            $beforeAfter.off();
            TweenMax.set(buttonExit, {zIndex:1000});
            tl3.to(resolve, 1, {opacity: 1})
                .to($dragMe, 1, {autoAlpha: 0}, "-=1")
                .to(hero, 3, {scale: 1, x:"+=50", ease: Power1.easeOut}, "-=1")
                .to(resolve_txtb, .5, {opacity:1})
                .to(resolve_cta, .5, {opacity:1}, "+=.5");
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

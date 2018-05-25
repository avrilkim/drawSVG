var drawSVG = drawSVG || (function(){

    var _public = {}, posX, posY, current,
        isMove = true, once = true, detector = undefined,
        device, previousDevice, handleOrientation, orientationEvent,
        thickPath1, thickPath2, thickPath3, thickPath4, thickPath5, thickPath6, thickPath7, thickPath8,
        flipPath1, flipPath2, flipPath3, flipPath4, flipPath5, flipPath6, flipPath7, flipPath8, flipPath9, flipPath10,
        pinkPath1, pinkPath2, pinkPath3, pinkPath4, pinkPath5, pinkPath6, pinkPath7, pinkPath8, pinkPath9, pinkPath10,
        tl, tl2, tl3, tl4, pl, pl2, palmPath, pspd = "0.4";

    function init (){
        console.log('init');
        sizeDetect();

        tl = new TimelineLite();
        tl2 = new TimelineLite();
        tl3 = new TimelineLite();
        tl4 = new TimelineLite();
        pl = new TimelineLite();
        pl2 = new TimelineLite();
    }

	/* size detect start */
	function sizeDetect(){
        previousDevice = window.device;
        device = {};
        window.device = device;

        device.showPc = function(){return (window.innerWidth) > 959;}
        device.showTablet = function(){return (window.innerWidth) > 513}
        device.noConflict = function () {window.device = previousDevice;return this;}

        handleOrientation = function () {
            if (device.showPc()) {
                detector = 'pc'
            } else if(device.showTablet()){
                detector ='tablet'
            } else{
                detector ='mobile'
            }
        };

        if (Object.prototype.hasOwnProperty.call(window, "onorientationchange")) orientationEvent = "orientationchange";
        else orientationEvent = "resize";
        if (window.addEventListener)  window.addEventListener(orientationEvent, handleOrientation, false);
        else if (window.attachEvent)  window.attachEvent(orientationEvent, handleOrientation);
        else window[orientationEvent] = handleOrientation;

        handleOrientation();

        if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
            define(function() {return device;});
        } else if (typeof module !== 'undefined' && module.exports) {
            module.exports = device;
        } else {
            window.device = device;
        }
    }

    function onPenpath (){
        isMove = true;
        $('.drawingTool li img').hide();
        $('.pointer').css('opacity','1');
    }

    function switchPenSVG (){
        console.log(current + "   " + isMove);
        if(current =='0' && isMove){ //thin pen
            isMove = false;
            $('.thinpen').appendTo('.container').css('opacity', 1);
            $('.container').removeClass('pink');
            $('.pencil').show();

            if(detector == 'pc'){
                flipPath1 = MorphSVGPlugin.pathDataToBezier(".thin1");
                flipPath2 = MorphSVGPlugin.pathDataToBezier(".thin2");
                flipPath3 = MorphSVGPlugin.pathDataToBezier(".thin3");
                flipPath4 = MorphSVGPlugin.pathDataToBezier(".thin4");
                flipPath5 = MorphSVGPlugin.pathDataToBezier(".thin5");
                flipPath6 = MorphSVGPlugin.pathDataToBezier(".thin6");
                flipPath7 = MorphSVGPlugin.pathDataToBezier(".thin7");
                flipPath8 = MorphSVGPlugin.pathDataToBezier(".thin8");
                flipPath9 = MorphSVGPlugin.pathDataToBezier(".thin9");
                flipPath10 = MorphSVGPlugin.pathDataToBezier(".thin10");
            }else if(detector =='tablet'){
                flipPath1 = MorphSVGPlugin.pathDataToBezier(".mthin1");
                flipPath2 = MorphSVGPlugin.pathDataToBezier(".mthin2");
                flipPath3 = MorphSVGPlugin.pathDataToBezier(".mthin3");
                flipPath4 = MorphSVGPlugin.pathDataToBezier(".mthin4");
                flipPath5 = MorphSVGPlugin.pathDataToBezier(".mthin5");
                flipPath6 = MorphSVGPlugin.pathDataToBezier(".mthin6");
                flipPath7 = MorphSVGPlugin.pathDataToBezier(".mthin7");
                flipPath8 = MorphSVGPlugin.pathDataToBezier(".mthin8");
                flipPath9 = MorphSVGPlugin.pathDataToBezier(".mthin9");
                flipPath10 = MorphSVGPlugin.pathDataToBezier(".mthin10");
            }else if(detector=='mobile'){
                flipPath1 = MorphSVGPlugin.pathDataToBezier(".sthin1");
                flipPath2 = MorphSVGPlugin.pathDataToBezier(".sthin2");
                flipPath3 = MorphSVGPlugin.pathDataToBezier(".sthin3");
                flipPath4 = MorphSVGPlugin.pathDataToBezier(".sthin4");
                flipPath5 = MorphSVGPlugin.pathDataToBezier(".sthin5");
                flipPath6 = MorphSVGPlugin.pathDataToBezier(".sthin6");
                flipPath7 = MorphSVGPlugin.pathDataToBezier(".sthin7");
                flipPath8 = MorphSVGPlugin.pathDataToBezier(".sthin8");
                flipPath9 = MorphSVGPlugin.pathDataToBezier(".sthin9");
                flipPath10 = MorphSVGPlugin.pathDataToBezier(".sthin10");
            }

            TweenLite.to(".thinDraw", 0, {drawSVG:"0% 0%"});

            tl2.to(".thin1", 0.3, {drawSVG:"0% 100%"});
            tl2.to(".thin2", pspd, {drawSVG:"0% 100%"});
            tl2.to(".thin3", pspd, {drawSVG:"0% 100%"});
            tl2.to(".thin4", 0.2, {drawSVG:"0% 100%"});
            tl2.to(".thin5", pspd, {drawSVG:"0% 100%"});
            tl2.to(".thin6", pspd, {drawSVG:"0% 100%"});
            tl2.to(".thin7", 0.3, {drawSVG:"0% 100%"});
            tl2.to(".thin8", 0.1, {drawSVG:"0% 100%"});
            tl2.to(".thin9", 0.2, {drawSVG:"0% 100%"});
            tl2.to(".thin10", 0.3, {drawSVG:"0% 100%"});

            tl.to(".pencil", 0.3, {bezier:{values:flipPath1, type:"cubic"}});
            tl.to(".pencil",pspd, {bezier:{values:flipPath2, type:"cubic"}});
            tl.to(".pencil", pspd, {bezier:{values:flipPath3, type:"cubic"}});
            tl.to(".pencil", 0.2, {bezier:{values:flipPath4, type:"cubic"}});
            tl.to(".pencil", pspd, {bezier:{values:flipPath5, type:"cubic"}});
            tl.to(".pencil", pspd, {bezier:{values:flipPath6, type:"cubic"}});
            tl.to(".pencil", 0.3, {bezier:{values:flipPath7, type:"cubic"}});
            tl.to(".pencil", 0.1, {bezier:{values:flipPath8, type:"cubic"}});
            tl.to(".pencil", 0.2, {bezier:{values:flipPath9, type:"cubic"}});
            tl.to(".pencil", 0.3, {bezier:{values:flipPath10, type:"cubic"},onComplete:onPenpath});

            tl.play();
            tl2.play();

        }else if(current =='1' && isMove){ //thick pen
            isMove = false;
            $('.thickpen').appendTo('.container').css('opacity',1);
            $('.slimpen').show();

            if(detector=='pc'){
                thickPath1=MorphSVGPlugin.pathDataToBezier(".hl1");
                thickPath2=MorphSVGPlugin.pathDataToBezier(".hl2");
                thickPath3=MorphSVGPlugin.pathDataToBezier(".hl3");
                thickPath4=MorphSVGPlugin.pathDataToBezier(".hl4");
                thickPath5=MorphSVGPlugin.pathDataToBezier(".hl5");
                thickPath6=MorphSVGPlugin.pathDataToBezier(".hl6");
                thickPath7=MorphSVGPlugin.pathDataToBezier(".hl7");
                thickPath8=MorphSVGPlugin.pathDataToBezier(".hl8");

            }else if(detector=='tablet'){
                thickPath1=MorphSVGPlugin.pathDataToBezier(".mh1");
                thickPath2=MorphSVGPlugin.pathDataToBezier(".mh2");
                thickPath3=MorphSVGPlugin.pathDataToBezier(".mh3");
                thickPath4=MorphSVGPlugin.pathDataToBezier(".mh4");
                thickPath5=MorphSVGPlugin.pathDataToBezier(".mh5");
                thickPath6=MorphSVGPlugin.pathDataToBezier(".mh6");
                thickPath7=MorphSVGPlugin.pathDataToBezier(".mh7");
                thickPath8=MorphSVGPlugin.pathDataToBezier(".mh8");
            }else if(detector=='mobile'){
                thickPath1=MorphSVGPlugin.pathDataToBezier(".sh1");
                thickPath2=MorphSVGPlugin.pathDataToBezier(".sh2");
                thickPath3=MorphSVGPlugin.pathDataToBezier(".sh3");
                thickPath4=MorphSVGPlugin.pathDataToBezier(".sh4");
                thickPath5=MorphSVGPlugin.pathDataToBezier(".sh5");
                thickPath6=MorphSVGPlugin.pathDataToBezier(".sh6");
                thickPath7=MorphSVGPlugin.pathDataToBezier(".sh7");
                thickPath8=MorphSVGPlugin.pathDataToBezier(".sh8");
            }


            TweenLite.to(".thickDraw", 0, {drawSVG:"0% 0%"});
            tl4.to(".hl1", 0.3, {drawSVG:"0% 100%"});
            tl4.to(".hl2", 0.5, {drawSVG:"0% 100%"});
            tl4.to(".hl3", 0.3, {drawSVG:"0% 100%"});
            tl4.to(".hl8", 0.1, {drawSVG:"0% 100%"});
            tl4.to(".hl7", 0.1, {drawSVG:"0% 100%"});
            tl4.to(".hl6", 0.1, {drawSVG:"0% 100%"});
            tl4.to(".hl5", 0.1, {drawSVG:"0% 100%"});
            tl4.to(".hl4", 0.1, {drawSVG:"0% 100%"});

            tl3.to(".slimpen", 0.3, {bezier:{values:thickPath1, type:"cubic"}});
            tl3.to(".slimpen", 0.5, {bezier:{values:thickPath2, type:"cubic"}});
            tl3.to(".slimpen", 0.3, {bezier:{values:thickPath3, type:"cubic"}});
            tl3.to(".slimpen", 0.1, {bezier:{values:thickPath8, type:"cubic"}});
            tl3.to(".slimpen", 0.1, {bezier:{values:thickPath7, type:"cubic"}});
            tl3.to(".slimpen", 0.1, {bezier:{values:thickPath6, type:"cubic"}});
            tl3.to(".slimpen", 0.1, {bezier:{values:thickPath5, type:"cubic"}});
            tl3.to(".slimpen", 0.1, {bezier:{values:thickPath4, type:"cubic"},onComplete:onPenpath});

            tl3.play();

        }else if(current == '2' && isMove){ //fine erase
            isMove = false;
            $('.slim').appendTo('.container').css('opacity', 1);
            $('.finger').show();

            TweenLite.fromTo("#path", 1.8, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%"});
            var fingerPath;
            if(detector=='pc'){
                fingerPath = MorphSVGPlugin.pathDataToBezier("#path", {offsetX:0,offsetY:0});
            }else if(detector =='tablet'){
                fingerPath = MorphSVGPlugin.pathDataToBezier("#mpath", {offsetX:0,offsetY:0});
            }else if(detector =='mobile'){
                fingerPath= MorphSVGPlugin.pathDataToBezier("#spath", {offsetX:0,offsetY:0});
            }

            TweenLite.to(".finger", 1.8, {bezier:{values:fingerPath, type:"cubic"},onComplete:onPenpath});

        }else if(current =='3' && isMove){ // area erase
            isMove = false;
            $('.bold').appendTo('.container').css( 'opacity', 1);
            $('.palm').show();

            if(detector=='pc'){
                palmPath = MorphSVGPlugin.pathDataToBezier("#boldpath", {offsetX:-20,offsetY:-20});
            }else if(detector=='tablet'){
                palmPath = MorphSVGPlugin.pathDataToBezier("#mboldpath", {offsetX:-20,offsetY:-20});
            }else if(detector=='mobile'){
                palmPath = MorphSVGPlugin.pathDataToBezier("#sboldpath", {offsetX:-20,offsetY:-20});
            }

            TweenLite.fromTo("#boldpath", 3, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%"});
            TweenLite.to(".palm", 3, {bezier:{values:palmPath, type:"cubic"},onComplete:onPenpath}); //bezierPath
        }else if(current =='4' && isMove){ //pink pen
            isMove = false;
            $('.pinkpen').appendTo('.container').css( 'opacity', 1);
            $('.pencil').show();
            $('.container').addClass('pink');

            if(detector == 'pc'){
                pinkPath1 = MorphSVGPlugin.pathDataToBezier(".pink1");
                pinkPath2 = MorphSVGPlugin.pathDataToBezier(".pink2");
                pinkPath3 = MorphSVGPlugin.pathDataToBezier(".pink3");
                pinkPath4 = MorphSVGPlugin.pathDataToBezier(".pink4");
                pinkPath5 = MorphSVGPlugin.pathDataToBezier(".pink5");
                pinkPath6 = MorphSVGPlugin.pathDataToBezier(".pink6");
                pinkPath7 = MorphSVGPlugin.pathDataToBezier(".pink7");
                pinkPath8 = MorphSVGPlugin.pathDataToBezier(".pink8");
                pinkPath9 = MorphSVGPlugin.pathDataToBezier(".pink9");
                pinkPath10 = MorphSVGPlugin.pathDataToBezier(".pink10");

            }else if(detector =='tablet'){
                pinkPath1 = MorphSVGPlugin.pathDataToBezier(".mthin1");
                pinkPath2 = MorphSVGPlugin.pathDataToBezier(".mthin2");
                pinkPath3 = MorphSVGPlugin.pathDataToBezier(".mthin3");
                pinkPath4 = MorphSVGPlugin.pathDataToBezier(".mthin4");
                pinkPath5 = MorphSVGPlugin.pathDataToBezier(".mthin5");
                pinkPath6 = MorphSVGPlugin.pathDataToBezier(".mthin6");
                pinkPath7 = MorphSVGPlugin.pathDataToBezier(".mthin7");
                pinkPath8 = MorphSVGPlugin.pathDataToBezier(".mthin8");
                pinkPath9 = MorphSVGPlugin.pathDataToBezier(".mthin9");
                pinkPath10 = MorphSVGPlugin.pathDataToBezier(".mthin10");

            }else if(detector=='mobile'){
                pinkPath1 = MorphSVGPlugin.pathDataToBezier(".sthin1");
                pinkPath2 = MorphSVGPlugin.pathDataToBezier(".sthin2");
                pinkPath3 = MorphSVGPlugin.pathDataToBezier(".sthin3");
                pinkPath4 = MorphSVGPlugin.pathDataToBezier(".sthin4");
                pinkPath5 = MorphSVGPlugin.pathDataToBezier(".sthin5");
                pinkPath6 = MorphSVGPlugin.pathDataToBezier(".sthin6");
                pinkPath7 = MorphSVGPlugin.pathDataToBezier(".sthin7");
                pinkPath8 = MorphSVGPlugin.pathDataToBezier(".sthin8");
                pinkPath9 = MorphSVGPlugin.pathDataToBezier(".sthin9");
                pinkPath10 = MorphSVGPlugin.pathDataToBezier(".sthin10");

            }

            TweenLite.to(".pinkDraw", 0, {drawSVG:"0% 0%"});

            pl2.to(".pink1", 0.3, {drawSVG:"0% 100%"});
            pl2.to(".pink2", pspd, {drawSVG:"0% 100%"});
            pl2.to(".pink3", pspd, {drawSVG:"0% 100%"});
            pl2.to(".pink4", 0.2, {drawSVG:"0% 100%"});
            pl2.to(".pink5", pspd, {drawSVG:"0% 100%"});
            pl2.to(".pink6", pspd, {drawSVG:"0% 100%"});
            pl2.to(".pink7", 0.3, {drawSVG:"0% 100%"});
            pl2.to(".pink8", 0.1, {drawSVG:"0% 100%"});
            pl2.to(".pink9", 0.2, {drawSVG:"0% 100%"});
            pl2.to(".pink10", 0.3, {drawSVG:"0% 100%"});

            pl.to(".pencil", 0.3, {bezier:{values:pinkPath1, type:"cubic"}});
            pl.to(".pencil",pspd, {bezier:{values:pinkPath2, type:"cubic"}});
            pl.to(".pencil", pspd, {bezier:{values:pinkPath3, type:"cubic"}});
            pl.to(".pencil", 0.2, {bezier:{values:pinkPath4, type:"cubic"}});
            pl.to(".pencil", pspd, {bezier:{values:pinkPath5, type:"cubic"}});
            pl.to(".pencil", pspd, {bezier:{values:pinkPath6, type:"cubic"}});
            pl.to(".pencil", 0.3, {bezier:{values:pinkPath7, type:"cubic"}});
            pl.to(".pencil", 0.1, {bezier:{values:pinkPath8, type:"cubic"}});
            pl.to(".pencil", 0.2, {bezier:{values:pinkPath9, type:"cubic"}});
            pl.to(".pencil", 0.3, {bezier:{values:pinkPath10, type:"cubic"}, onComplete:onPenpath});

            pl.play();
            pl2.play();

        }

    }

    //board event
    $('.container').on('click', function(e){

        posX = $(this).offset().left;
        posY = $(this).offset().top;

        if(isMove){
            $('.drawingTool li img ').hide();
            $('.pointer').css('opacity','0');
        }
        switchPenSVG();
    });

    function movePointer (){
        $('.pointer').show();
        if(detector !== 'mobile'){
            $('.container').mousemove(function(e) {
                $('.pointer').offset({
                    left: e.pageX,
                    top: e.pageY + 20
                });
            });
        }
    }

    //temporary function
    $('.menu li').on('click', function(){
        current = $(this).index();
        if(once){
            movePointer();
            once = false;
        }
        $('.menu li').removeClass('on').eq(current).addClass('on');
        if(current==0 || current==4){
            $('.pointer').attr('src','../img/img_present_ca_pen.png');
        }else if(current ==1){
            $('.pointer').attr('src','../img/img_present_ca_pencil.png');
        }else if(current==2){
            $('.pointer').attr('src','../img/img_present_ca_finger.png');
        }else if(current==3){
            $('.pointer').attr('src','../img/img_write_area.png');
        }
    });

    _public.init = init;

    return _public;

})();

drawSVG.init();

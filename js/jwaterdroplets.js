/*
 * HTML5 Water Droplets Effect
 * Author : Capjo
 * For sale on codecanyon
 * support@capjo.com
 * Jan 2012
 */

// 

// Version 1.1 Changes - Starts
// ****************************************************************************
var applyEffectToAnElement=false;
// Set it to true, if you want to add this effect to only one element
// Mention element's id below to add droplets effect on it.
// ex: img or div and so on. 
// Water droplets will be automatically added to the element
// if the flag above is set to true, ignore these two parameters
// id you want to add the effect to whole page
var elementId='map';
// ****************************************************************************
// Version 1.1 Changes - Ends

// Main Configuration Section
var jWaterDropsNumberOfWaterDroplets=30;
// Number of droplets that should be loaded at the screen
var jWaterDropsStyles=[1,2,3,4,5,6,7,8,9,10,11,12,13,14];
// Styles used for drawing droplets
var jWaterDropsEnableLoopForFall=true;
// Loop the falling of droplets

// Tweaking Section - Advanced
// Minimun and maximum sizes of the droplets
var jWaterDropsMinSizePercentage='100';
var jWaterDropsMaxSizePercentage='150';

var jWaterDropsBorderColorStop1="rgba(0,0,0,0.8)";
var jWaterDropsBorderColorStop2="rgba(25,25,25,0.8)";
var jWaterDropsBorderColorStop3="rgba(25,25,25,0.3)";
var jWaterDropsBorderColorStop4='transparent';

var jWaterDropsColorForShade='rgba(0,0,0,0.6)';
// Shade color - This color will be utilized to shade
// the first 40% of the droplet shape

// Parametes for the shadows
var jWaterDropsShadowColor="rgba(0,0,0,0.6)";
var jWaterDropsShadowBlur="2";  
var jWaterDropsColorAlpha=1;


// Other needed parameters
var jWaterDropsTransparent='transparent';
// Color stops for the gradient that needs to be applied on the 
// strokes of water droplet border
var jWaterDropsLightReflectionColor="rgba(255,255,255,1)";
// The color of the light reflection on top of the droplets

// DO NOT CHANGE AFTER THIS LINE
// DO NOT CHANGE AFTER THIS LINE
// DO NOT CHANGE AFTER THIS LINE

var jWaterDropsStandardDropCanvasSize=30;
// DO NOT CHANGE THIS PARAMETER
// Line width of the stroke
var jWaterDropslinewidth='1';
// DO NOT CHANGE THIS PARAMETER
// as it is optimized for the browsers

// Chrome displays a different behaviour when the 
// shadow blur is used. If the shadow is used in chrome
// The effect is not properly anti aliased. Rather
// it spreads across the whole region

// This behaviour is avoided there by making the stroke
// size of 150% with no shadow for the stroke
var jWaterDropsBorderIsChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
if(jWaterDropsBorderIsChrome)
jWaterDropslinewidth="1.5";
// DO NOT CHANGE THIS PARAMETER
// The jWaterDropslinewidth is set to 1.5 to make the script compatible with chrome

var jWaterDropletsviewportwidth=800;
var jWaterDropletsviewportheight=400;
var jWaterDropletsTimers = new Array();

// Version 1.1 Changes - Starts
var offSetLeft=0;
var offSetTop=0;
// Version 1.1 Changes - Ends

// All the functions starts here
var jWaterDropsBubble1 = function(ctx,scalevalue) {
    
    ctx.save();

    ctx.lineWidth=jWaterDropslinewidth;
    // Set the jWaterDropslinewidth here
    
    var lineargradient = ctx.createLinearGradient(25*scalevalue,25*scalevalue,1*scalevalue,1*scalevalue);
    lineargradient.addColorStop(0,jWaterDropsBorderColorStop1);
    lineargradient.addColorStop(0.30,jWaterDropsBorderColorStop2);
    lineargradient.addColorStop(0.60,jWaterDropsBorderColorStop3);
    lineargradient.addColorStop(0.9,jWaterDropsBorderColorStop4);
    ctx.strokeStyle=lineargradient;
    // Set the gradient for the stroke
    
    if(!jWaterDropsBorderIsChrome){
        var blur = jWaterDropsShadowBlur;
        ctx.shadowColor = jWaterDropsShadowColor;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = blur;    
        // Set the shadow style for the droplet
    }
         
    ctx.globalAlpha = jWaterDropsColorAlpha;
    // Begin plotting the coordinates and draw the bezier curves in order to render a droplet
    ctx.beginPath();
    ctx.moveTo(9.36*scalevalue,8.18*scalevalue);
    ctx.bezierCurveTo(13.89*scalevalue,6.99*scalevalue,19.4*scalevalue,7.74*scalevalue,22.83*scalevalue,11.14*scalevalue);
    ctx.bezierCurveTo(25.05*scalevalue,13.59*scalevalue,25.75*scalevalue,17.36*scalevalue,24.51*scalevalue,20.42*scalevalue);
    ctx.bezierCurveTo(20.34*scalevalue,25.48*scalevalue,11.11*scalevalue,25.06*scalevalue,7.8*scalevalue,19.21*scalevalue);
    ctx.bezierCurveTo(5.59*scalevalue,15.96*scalevalue,4.72*scalevalue,9.72*scalevalue,9.36*scalevalue,8.18*scalevalue);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
    // Draw the necessary curves to see the droplet
    // with shadows
    
    // Clip the region and draw a shade
    ctx.globalAlpha = jWaterDropsColorAlpha;
    // Begin plotting the coordinates and draw the bezier curves in order to render a droplet
    ctx.beginPath();
    ctx.moveTo(9.36*scalevalue,8.18*scalevalue);
    ctx.bezierCurveTo(13.89*scalevalue,6.99*scalevalue,19.4*scalevalue,7.74*scalevalue,22.83*scalevalue,11.14*scalevalue);
    ctx.bezierCurveTo(25.05*scalevalue,13.59*scalevalue,25.75*scalevalue,17.36*scalevalue,24.51*scalevalue,20.42*scalevalue);
    ctx.bezierCurveTo(20.34*scalevalue,25.48*scalevalue,11.11*scalevalue,25.06*scalevalue,7.8*scalevalue,19.21*scalevalue);
    ctx.bezierCurveTo(5.59*scalevalue,15.96*scalevalue,4.72*scalevalue,9.72*scalevalue,9.36*scalevalue,8.18*scalevalue);
    ctx.closePath();
    ctx.restore();
    
    var lineargradientfoshade = ctx.createLinearGradient(25*scalevalue,24*scalevalue,16*scalevalue,4*scalevalue);
    lineargradientfoshade.addColorStop(0,jWaterDropsColorForShade);
    lineargradientfoshade.addColorStop(0.40,jWaterDropsTransparent);
    lineargradientfoshade.addColorStop(0.80,jWaterDropsTransparent);
    lineargradientfoshade.addColorStop(0.9,jWaterDropsTransparent);
    ctx.strokeStyle=jWaterDropsTransparent;
    ctx.fillStyle=lineargradientfoshade;    
    ctx.fill();
    // This part of the code is to add a shade at borders
 
    ctx.strokeStyle = jWaterDropsLightReflectionColor;
    ctx.beginPath();
    var startangle=0.25*Math.PI;
    var endangle=1*Math.PI;
    ctx.arc(11*scalevalue,12*scalevalue,1,startangle,endangle,true);
    ctx.closePath();
    ctx.stroke();
    // Draw the light reflection on the top of 
    // the droplet
    
   
};

var jWaterDropsBubble2 = function(ctx,scalevalue) {
    
    ctx.save();

    ctx.lineWidth=jWaterDropslinewidth;

    if(!jWaterDropsBorderIsChrome){
        var blur = jWaterDropsShadowBlur;
        ctx.shadowColor = jWaterDropsShadowColor;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = blur;    
    }

    var lineargradient = ctx.createLinearGradient(24*scalevalue,24*scalevalue,4*scalevalue,4*scalevalue);
    lineargradient.addColorStop(0,jWaterDropsBorderColorStop1);
    lineargradient.addColorStop(0.30,jWaterDropsBorderColorStop2);
    lineargradient.addColorStop(0.60,jWaterDropsBorderColorStop3);
    lineargradient.addColorStop(0.9,jWaterDropsBorderColorStop4);
    ctx.strokeStyle=lineargradient;
    
    ctx.globalAlpha = jWaterDropsColorAlpha;
    // Begin plotting the coordinates and draw the bezier curves in order to render a droplet
    ctx.beginPath();
    ctx.moveTo(12.55*scalevalue,8.27*scalevalue);
    ctx.bezierCurveTo(18.74*scalevalue,6.12*scalevalue,26.22*scalevalue,12.91*scalevalue,23.53*scalevalue,19.25*scalevalue);
    ctx.bezierCurveTo(20.82*scalevalue,25.33*scalevalue,11.25*scalevalue,25.13*scalevalue,7.52*scalevalue,20.17*scalevalue);
    ctx.bezierCurveTo(5.11*scalevalue,15.87*scalevalue,7.88*scalevalue,9.68*scalevalue,12.55*scalevalue,8.27*scalevalue);
    ctx.closePath();

    ctx.stroke();
    ctx.restore();

    ctx.globalAlpha = jWaterDropsColorAlpha;
    // Begin plotting the coordinates and draw the bezier curves in order to render a droplet
    ctx.beginPath();
    ctx.moveTo(12.55*scalevalue,8.27*scalevalue);
    ctx.bezierCurveTo(18.74*scalevalue,6.12*scalevalue,26.22*scalevalue,12.91*scalevalue,23.53*scalevalue,19.25*scalevalue);
    ctx.bezierCurveTo(20.82*scalevalue,25.33*scalevalue,11.25*scalevalue,25.13*scalevalue,7.52*scalevalue,20.17*scalevalue);
    ctx.bezierCurveTo(5.11*scalevalue,15.87*scalevalue,7.88*scalevalue,9.68*scalevalue,12.55*scalevalue,8.27*scalevalue);
    ctx.closePath();
    
    var lineargradientfoshade = ctx.createLinearGradient(15*scalevalue,26*scalevalue,15*scalevalue,6*scalevalue);
    lineargradientfoshade.addColorStop(0,jWaterDropsColorForShade);
    lineargradientfoshade.addColorStop(0.40,jWaterDropsTransparent);
    lineargradientfoshade.addColorStop(0.80,jWaterDropsTransparent);
    lineargradientfoshade.addColorStop(0.9,jWaterDropsTransparent);
    ctx.strokeStyle=jWaterDropsTransparent;
    ctx.fillStyle=lineargradientfoshade;    
    ctx.fill();    
    // Draw the required gradient for shades
    
    ctx.strokeStyle = jWaterDropsLightReflectionColor;
    ctx.beginPath();
    var startangle=0.25*Math.PI;
    var endangle=1*Math.PI;
    ctx.arc(15*scalevalue,12*scalevalue,1,startangle,endangle,true);
    ctx.closePath();
    ctx.stroke();    
};

var jWaterDropsBubble3 = function(ctx,scalevalue) {
    
    ctx.save();

    ctx.lineWidth=jWaterDropslinewidth;

    if(!jWaterDropsBorderIsChrome){
        var blur = jWaterDropsShadowBlur;
        ctx.shadowColor = jWaterDropsShadowColor;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = blur;    
    }

    var lineargradient = ctx.createLinearGradient(5*scalevalue,5*scalevalue,16*scalevalue,34*scalevalue);
    lineargradient.addColorStop(0,jWaterDropsBorderColorStop1);
    lineargradient.addColorStop(0.30,jWaterDropsBorderColorStop2);
    lineargradient.addColorStop(0.60,jWaterDropsBorderColorStop3);
    lineargradient.addColorStop(0.9,jWaterDropsBorderColorStop4);
    ctx.strokeStyle=lineargradient; 
    
    ctx.globalAlpha = jWaterDropsColorAlpha;
    // Begin plotting the coordinates and draw the bezier curves in order to render a droplet
    ctx.beginPath();
    ctx.moveTo(15.57*scalevalue,7.52*scalevalue);
    ctx.bezierCurveTo(17.94*scalevalue,6.23*scalevalue,20.74*scalevalue,7.96*scalevalue,22.09*scalevalue,9.96*scalevalue);
    ctx.bezierCurveTo(25.03*scalevalue,13.96*scalevalue,24.11*scalevalue,20.11*scalevalue,20.2*scalevalue,23.12*scalevalue);
    ctx.bezierCurveTo(14.43*scalevalue,26.27*scalevalue,5.99*scalevalue,20.77*scalevalue,6.9*scalevalue,14.25*scalevalue);
    ctx.bezierCurveTo(9.42*scalevalue,11.6*scalevalue,12.47*scalevalue,9.44*scalevalue,15.57*scalevalue,7.52*scalevalue);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();


    ctx.beginPath();
    // Begin plotting the coordinates and draw the bezier curves in order to render a droplet
    ctx.moveTo(15.57*scalevalue,7.52*scalevalue);
    ctx.bezierCurveTo(17.94*scalevalue,6.23*scalevalue,20.74*scalevalue,7.96*scalevalue,22.09*scalevalue,9.96*scalevalue);
    ctx.bezierCurveTo(25.03*scalevalue,13.96*scalevalue,24.11*scalevalue,20.11*scalevalue,20.2*scalevalue,23.12*scalevalue);
    ctx.bezierCurveTo(14.43*scalevalue,26.27*scalevalue,5.99*scalevalue,20.77*scalevalue,6.9*scalevalue,14.25*scalevalue);
    ctx.bezierCurveTo(9.42*scalevalue,11.6*scalevalue,12.47*scalevalue,9.44*scalevalue,15.57*scalevalue,7.52*scalevalue);
    ctx.closePath();
    
    var lineargradientfoshade = ctx.createLinearGradient(25*scalevalue,28*scalevalue,1*scalevalue,1*scalevalue);
    lineargradientfoshade.addColorStop(0,jWaterDropsColorForShade);
    lineargradientfoshade.addColorStop(0.40,jWaterDropsTransparent);
    lineargradientfoshade.addColorStop(0.80,jWaterDropsTransparent);
    lineargradientfoshade.addColorStop(0.9,jWaterDropsTransparent);
    ctx.strokeStyle=jWaterDropsTransparent;
    ctx.fillStyle=lineargradientfoshade;    
    ctx.fill();      
    // Draw the required gradient for the droplet
    
    ctx.strokeStyle = jWaterDropsLightReflectionColor;
    ctx.beginPath();
    var startangle=0.25*Math.PI;
    var endangle=1*Math.PI;
    ctx.arc(18*scalevalue,11*scalevalue,1,startangle,endangle,true);
    ctx.closePath();
    ctx.stroke();        
    // Draw the necessary reflection on top of the bubble
};

var jWaterDropsBubble4 = function(ctx,scalevalue) {
    
    ctx.save();

    ctx.lineWidth=jWaterDropslinewidth;

    if(!jWaterDropsBorderIsChrome){
        var blur = jWaterDropsShadowBlur;
        ctx.shadowColor = jWaterDropsShadowColor;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = blur;    
    }
    
    var lineargradient = ctx.createLinearGradient(18*scalevalue,0*scalevalue,0*scalevalue,29*scalevalue);
    lineargradient.addColorStop(0,jWaterDropsBorderColorStop1);
    lineargradient.addColorStop(0.30,jWaterDropsBorderColorStop2);
    lineargradient.addColorStop(0.60,jWaterDropsBorderColorStop3);
    lineargradient.addColorStop(0.9,jWaterDropsBorderColorStop4);
    ctx.strokeStyle=lineargradient;


    ctx.globalAlpha = jWaterDropsColorAlpha;
    // Begin plotting the coordinates and draw the bezier curves in order to render a droplet
    ctx.beginPath();
    ctx.moveTo(14.52*scalevalue,7.42*scalevalue);
    ctx.bezierCurveTo(18.74*scalevalue,5.57*scalevalue,24.06*scalevalue,9.99*scalevalue,22.43*scalevalue,14.48*scalevalue);
    ctx.bezierCurveTo(20.33*scalevalue,20.11*scalevalue,13.59*scalevalue,24.12*scalevalue,7.66*scalevalue,22.48*scalevalue);
    ctx.bezierCurveTo(5.06*scalevalue,16.6*scalevalue,8.25*scalevalue,9.17*scalevalue,14.52*scalevalue,7.42*scalevalue);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();


    ctx.beginPath();
    // Begin plotting the coordinates and draw the bezier curves in order to render a droplet
    ctx.moveTo(14.52*scalevalue,7.42*scalevalue);
    ctx.bezierCurveTo(18.74*scalevalue,5.57*scalevalue,24.06*scalevalue,9.99*scalevalue,22.43*scalevalue,14.48*scalevalue);
    ctx.bezierCurveTo(20.33*scalevalue,20.11*scalevalue,13.59*scalevalue,24.12*scalevalue,7.66*scalevalue,22.48*scalevalue);
    ctx.bezierCurveTo(5.06*scalevalue,16.6*scalevalue,8.25*scalevalue,9.17*scalevalue,14.52*scalevalue,7.42*scalevalue);
    ctx.closePath();
    
    var lineargradientfoshade = ctx.createLinearGradient(10*scalevalue,28*scalevalue,20*scalevalue,2*scalevalue);
    lineargradientfoshade.addColorStop(0,jWaterDropsColorForShade);
    lineargradientfoshade.addColorStop(0.40,jWaterDropsTransparent);
    lineargradientfoshade.addColorStop(0.80,jWaterDropsTransparent);
    lineargradientfoshade.addColorStop(0.9,jWaterDropsTransparent);
    ctx.strokeStyle=jWaterDropsTransparent;
    ctx.fillStyle=lineargradientfoshade;    
    ctx.fill();      
    // Gradient for the bubble
    
    ctx.strokeStyle = jWaterDropsLightReflectionColor;
    ctx.beginPath();
    var startangle=0.25*Math.PI;
    var endangle=1*Math.PI;
    ctx.arc(18*scalevalue,11*scalevalue,1,startangle,endangle,true);
    ctx.closePath();
    ctx.stroke();    
    // Draw the reflection on top of the image
};

var jWaterDropsBubble5 = function(ctx,scalevalue) {
    
    ctx.save();      
    ctx.lineWidth=jWaterDropslinewidth;

    if(!jWaterDropsBorderIsChrome){
        var blur = jWaterDropsShadowBlur;
        ctx.shadowColor = jWaterDropsShadowColor;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = blur;    
    }

    var lineargradient = ctx.createLinearGradient(15*scalevalue,29*scalevalue,5*scalevalue,3*scalevalue);
    lineargradient.addColorStop(0,jWaterDropsBorderColorStop1);
    lineargradient.addColorStop(0.30,jWaterDropsBorderColorStop2);
    lineargradient.addColorStop(0.60,jWaterDropsBorderColorStop3);
    lineargradient.addColorStop(0.9,jWaterDropsBorderColorStop4);
    ctx.strokeStyle=lineargradient;

    ctx.globalAlpha = jWaterDropsColorAlpha;
    // Begin plotting the coordinates and draw the bezier curves in order to render a droplet
    ctx.beginPath();
    ctx.moveTo(12.51*scalevalue,7.43*scalevalue);
    ctx.bezierCurveTo(19.75*scalevalue,5.77*scalevalue,24.2*scalevalue,14.39*scalevalue,22.77*scalevalue,20.51*scalevalue);
    ctx.bezierCurveTo(19.81*scalevalue,24.07*scalevalue,13.7*scalevalue,23.65*scalevalue,11.3*scalevalue,19.65*scalevalue);
    ctx.bezierCurveTo(8.27*scalevalue,16.31*scalevalue,7.42*scalevalue,9.21*scalevalue,12.51*scalevalue,7.43*scalevalue);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
    

    ctx.beginPath();
    // Begin plotting the coordinates and draw the bezier curves in order to render a droplet
    ctx.moveTo(12.51*scalevalue,7.43*scalevalue);
    ctx.bezierCurveTo(19.75*scalevalue,5.77*scalevalue,24.2*scalevalue,14.39*scalevalue,22.77*scalevalue,20.51*scalevalue);
    ctx.bezierCurveTo(19.81*scalevalue,24.07*scalevalue,13.7*scalevalue,23.65*scalevalue,11.3*scalevalue,19.65*scalevalue);
    ctx.bezierCurveTo(8.27*scalevalue,16.31*scalevalue,7.42*scalevalue,9.21*scalevalue,12.51*scalevalue,7.43*scalevalue);
    ctx.closePath();

    var lineargradientfoshade = ctx.createLinearGradient(24*scalevalue,25*scalevalue,7*scalevalue,7*scalevalue);
    lineargradientfoshade.addColorStop(0,jWaterDropsColorForShade);
    lineargradientfoshade.addColorStop(0.40,jWaterDropsTransparent);
    lineargradientfoshade.addColorStop(0.80,jWaterDropsTransparent);
    lineargradientfoshade.addColorStop(0.9,jWaterDropsTransparent);
    ctx.strokeStyle=jWaterDropsTransparent;
    ctx.fillStyle=lineargradientfoshade;    
    ctx.fill();
    // Draw the gradient for the bubble shade
    
    ctx.strokeStyle = jWaterDropsLightReflectionColor;
    ctx.beginPath();
    var startangle=0.25*Math.PI;
    var endangle=1*Math.PI;
    ctx.arc(14*scalevalue,11*scalevalue,1,startangle,endangle,true);
    ctx.closePath();
    ctx.stroke();    
    // Create a white dot on top of the droplet
};

var jWaterDropsBubble6 = function(ctx,scalevalue) {
    
    ctx.save();
    ctx.lineWidth=jWaterDropslinewidth;

    if(!jWaterDropsBorderIsChrome){
        var blur = jWaterDropsShadowBlur;
        ctx.shadowColor = jWaterDropsShadowColor;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = blur;    
    }
    
    var lineargradient = ctx.createLinearGradient(5*scalevalue,5*scalevalue,25*scalevalue,31*scalevalue);
    lineargradient.addColorStop(0,jWaterDropsBorderColorStop1);
    lineargradient.addColorStop(0.30,jWaterDropsBorderColorStop2);
    lineargradient.addColorStop(0.60,jWaterDropsBorderColorStop3);
    lineargradient.addColorStop(0.9,jWaterDropsBorderColorStop4);
    ctx.strokeStyle=lineargradient;
    
    ctx.globalAlpha = jWaterDropsColorAlpha;
    // Begin plotting the coordinates and draw the bezier curves in order to render a droplet
    ctx.beginPath();
    ctx.moveTo(8.82*scalevalue,16.95*scalevalue);
    ctx.bezierCurveTo(7.7*scalevalue,12.58*scalevalue,11.85*scalevalue,7.16*scalevalue,16.51*scalevalue,8.43*scalevalue);
    ctx.bezierCurveTo(18.49*scalevalue,8.88*scalevalue,18.74*scalevalue,11.17*scalevalue,19.56*scalevalue,12.68*scalevalue);
    ctx.bezierCurveTo(20.32*scalevalue,14.73*scalevalue,22.09*scalevalue,16.15*scalevalue,23.04*scalevalue,18.09*scalevalue);
    ctx.bezierCurveTo(22.25*scalevalue,21.06*scalevalue,19.3*scalevalue,23.93*scalevalue,16.03*scalevalue,23.33*scalevalue);
    ctx.bezierCurveTo(12.54*scalevalue,23.09*scalevalue,9.2*scalevalue,20.57*scalevalue,8.82*scalevalue,16.95*scalevalue);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    ctx.beginPath();
    // Begin plotting the coordinates and draw the bezier curves in order to render a droplet
    ctx.moveTo(8.82*scalevalue,16.95*scalevalue);
    ctx.bezierCurveTo(7.7*scalevalue,12.58*scalevalue,11.85*scalevalue,7.16*scalevalue,16.51*scalevalue,8.43*scalevalue);
    ctx.bezierCurveTo(18.49*scalevalue,8.88*scalevalue,18.74*scalevalue,11.17*scalevalue,19.56*scalevalue,12.68*scalevalue);
    ctx.bezierCurveTo(20.32*scalevalue,14.73*scalevalue,22.09*scalevalue,16.15*scalevalue,23.04*scalevalue,18.09*scalevalue);
    ctx.bezierCurveTo(22.25*scalevalue,21.06*scalevalue,19.3*scalevalue,23.93*scalevalue,16.03*scalevalue,23.33*scalevalue);
    ctx.bezierCurveTo(12.54*scalevalue,23.09*scalevalue,9.2*scalevalue,20.57*scalevalue,8.82*scalevalue,16.95*scalevalue);
    ctx.closePath();

    var lineargradientfoshade = ctx.createLinearGradient(22*scalevalue,24*scalevalue,15*scalevalue,4*scalevalue);
    lineargradientfoshade.addColorStop(0,jWaterDropsColorForShade);
    lineargradientfoshade.addColorStop(0.40,jWaterDropsTransparent);
    lineargradientfoshade.addColorStop(0.80,jWaterDropsTransparent);
    lineargradientfoshade.addColorStop(0.9,jWaterDropsTransparent);
    ctx.strokeStyle=jWaterDropsTransparent;
    ctx.fillStyle=lineargradientfoshade;    
    ctx.fill();       
    // Draw the gradient in order to create the shine effect
    
    ctx.strokeStyle = jWaterDropsLightReflectionColor;
    ctx.beginPath();
    var startangle=0.25*Math.PI;
    var endangle=1*Math.PI;
    ctx.arc(15*scalevalue,12*scalevalue,1,startangle,endangle,true);
    ctx.closePath();
    ctx.stroke();     
    // Create a white dot on top for light reflection
};

var jWaterDropsBubble7 = function(ctx,scalevalue) {
    
    ctx.save();

    ctx.lineWidth=jWaterDropslinewidth;

    if(!jWaterDropsBorderIsChrome){
        var blur = jWaterDropsShadowBlur;
        ctx.shadowColor = jWaterDropsShadowColor;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = blur;    
    }
    
    var lineargradient = ctx.createLinearGradient(5*scalevalue,5*scalevalue,19*scalevalue,30*scalevalue);
    lineargradient.addColorStop(0,jWaterDropsBorderColorStop1);
    lineargradient.addColorStop(0.30,jWaterDropsBorderColorStop2);
    lineargradient.addColorStop(0.60,jWaterDropsBorderColorStop3);
    lineargradient.addColorStop(0.9,jWaterDropsBorderColorStop4);
    ctx.strokeStyle=lineargradient;
   
    
    ctx.globalAlpha = jWaterDropsColorAlpha;
    ctx.beginPath();
    // Begin plotting the coordinates and draw the bezier curves in order to render a droplet
    ctx.moveTo(11.52*scalevalue,9.25*scalevalue);
    ctx.bezierCurveTo(16.85*scalevalue,7.55*scalevalue,25.59*scalevalue,11.7*scalevalue,23.42*scalevalue,18.18*scalevalue);
    ctx.bezierCurveTo(20.67*scalevalue,25.9*scalevalue,8.87*scalevalue,24.13*scalevalue,5.83*scalevalue,17.6*scalevalue);
    ctx.bezierCurveTo(4.43*scalevalue,13.75*scalevalue,7.83*scalevalue,9.91*scalevalue,11.52*scalevalue,9.25*scalevalue);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
      
    ctx.beginPath();
    // Begin plotting the coordinates and draw the bezier curves in order to render a droplet
    ctx.moveTo(11.52*scalevalue,9.25*scalevalue);
    ctx.bezierCurveTo(16.85*scalevalue,7.55*scalevalue,25.59*scalevalue,11.7*scalevalue,23.42*scalevalue,18.18*scalevalue);
    ctx.bezierCurveTo(20.67*scalevalue,25.9*scalevalue,8.87*scalevalue,24.13*scalevalue,5.83*scalevalue,17.6*scalevalue);
    ctx.bezierCurveTo(4.43*scalevalue,13.75*scalevalue,7.83*scalevalue,9.91*scalevalue,11.52*scalevalue,9.25*scalevalue);
    ctx.closePath();    
    
    var lineargradientfoshade = ctx.createLinearGradient(26*scalevalue,21*scalevalue,7*scalevalue,5*scalevalue);
    lineargradientfoshade.addColorStop(0,jWaterDropsColorForShade);
    lineargradientfoshade.addColorStop(0.40,jWaterDropsTransparent);
    lineargradientfoshade.addColorStop(0.80,jWaterDropsTransparent);
    lineargradientfoshade.addColorStop(0.9,jWaterDropsTransparent);
    ctx.strokeStyle=jWaterDropsTransparent;
    ctx.fillStyle=lineargradientfoshade;    
    ctx.fill();     
    // Create the shine with the help of gradient
    
    ctx.strokeStyle = jWaterDropsLightReflectionColor;
    ctx.beginPath();
    var startangle=0.25*Math.PI;
    var endangle=1*Math.PI;
    ctx.arc(17*scalevalue,13*scalevalue,1,startangle,endangle,true);
    ctx.closePath();
    ctx.stroke();         
    // Create a white dot on top of the droplet
};

var jWaterDropsBubble8 = function(ctx,scalevalue) {
    
    ctx.save();

    ctx.lineWidth=jWaterDropslinewidth;

    if(!jWaterDropsBorderIsChrome){
        var blur = jWaterDropsShadowBlur;
        ctx.shadowColor = jWaterDropsShadowColor;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = blur;    
    }

    var lineargradient = ctx.createLinearGradient(15*scalevalue,29*scalevalue,5*scalevalue,5*scalevalue);
    lineargradient.addColorStop(0,jWaterDropsBorderColorStop1);
    lineargradient.addColorStop(0.30,jWaterDropsBorderColorStop2);
    lineargradient.addColorStop(0.60,jWaterDropsBorderColorStop3);
    lineargradient.addColorStop(0.9,jWaterDropsBorderColorStop4);
    ctx.strokeStyle=lineargradient;      
    
    ctx.globalAlpha = jWaterDropsColorAlpha;
    ctx.beginPath();
    // Begin plotting the coordinates and draw the bezier curves in order to render a droplet
    ctx.moveTo(10.59*scalevalue,8.39*scalevalue);
    ctx.bezierCurveTo(14.5*scalevalue,7.36*scalevalue,18.84*scalevalue,8.77*scalevalue,21.88*scalevalue,11.31*scalevalue);
    ctx.bezierCurveTo(24.05*scalevalue,12.9*scalevalue,22.94*scalevalue,15.93*scalevalue,22.1*scalevalue,17.96*scalevalue);
    ctx.bezierCurveTo(20.87*scalevalue,20.61*scalevalue,18.46*scalevalue,23.75*scalevalue,15.17*scalevalue,23.19*scalevalue);
    ctx.bezierCurveTo(11.26*scalevalue,22.1*scalevalue,7.83*scalevalue,18.76*scalevalue,7.03*scalevalue,14.73*scalevalue);
    ctx.bezierCurveTo(6.47*scalevalue,12.12*scalevalue,7.98*scalevalue,9.17*scalevalue,10.59*scalevalue,8.39*scalevalue);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
    
    ctx.beginPath();
    // Begin plotting the coordinates and draw the bezier curves in order to render a droplet
    ctx.moveTo(10.59*scalevalue,8.39*scalevalue);
    ctx.bezierCurveTo(14.5*scalevalue,7.36*scalevalue,18.84*scalevalue,8.77*scalevalue,21.88*scalevalue,11.31*scalevalue);
    ctx.bezierCurveTo(24.05*scalevalue,12.9*scalevalue,22.94*scalevalue,15.93*scalevalue,22.1*scalevalue,17.96*scalevalue);
    ctx.bezierCurveTo(20.87*scalevalue,20.61*scalevalue,18.46*scalevalue,23.75*scalevalue,15.17*scalevalue,23.19*scalevalue);
    ctx.bezierCurveTo(11.26*scalevalue,22.1*scalevalue,7.83*scalevalue,18.76*scalevalue,7.03*scalevalue,14.73*scalevalue);
    ctx.bezierCurveTo(6.47*scalevalue,12.12*scalevalue,7.98*scalevalue,9.17*scalevalue,10.59*scalevalue,8.39*scalevalue);
    ctx.closePath();    
    
    var lineargradientfoshade = ctx.createLinearGradient(23*scalevalue,23*scalevalue,15*scalevalue,5*scalevalue);
    lineargradientfoshade.addColorStop(0,jWaterDropsColorForShade);
    lineargradientfoshade.addColorStop(0.40,jWaterDropsTransparent);
    lineargradientfoshade.addColorStop(0.80,jWaterDropsTransparent);
    lineargradientfoshade.addColorStop(0.9,jWaterDropsTransparent);
    ctx.strokeStyle=jWaterDropsTransparent;
    ctx.fillStyle=lineargradientfoshade;    
    ctx.fill();      
    // Create the shining effect with the help of the gradient
    
    ctx.strokeStyle = jWaterDropsLightReflectionColor;
    ctx.beginPath();
    var startangle=0.25*Math.PI;
    var endangle=1*Math.PI;
    ctx.arc(19*scalevalue,14*scalevalue,1,startangle,endangle,true);
    ctx.closePath();
    ctx.stroke();      
    // Draw a white dot on top of the droplet
};

var jWaterDropsBubble9 = function(ctx,scalevalue) {
    
    ctx.save();
    ctx.lineWidth=jWaterDropslinewidth;

    if(!jWaterDropsBorderIsChrome){
        var blur = jWaterDropsShadowBlur;
        ctx.shadowColor = jWaterDropsShadowColor;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = blur;    
    }

    var lineargradient = ctx.createLinearGradient(5*scalevalue,5*scalevalue,15*scalevalue,31*scalevalue);
    lineargradient.addColorStop(0,jWaterDropsBorderColorStop1);
    lineargradient.addColorStop(0.30,jWaterDropsBorderColorStop2);
    lineargradient.addColorStop(0.60,jWaterDropsBorderColorStop3);
    lineargradient.addColorStop(0.9,jWaterDropsBorderColorStop4);
    ctx.strokeStyle=lineargradient;  
    
    ctx.globalAlpha = jWaterDropsColorAlpha;
    ctx.beginPath();
    // Begin plotting the coordinates and draw the bezier curves in order to render a droplet
    ctx.moveTo(12.57*scalevalue,9.21*scalevalue);
    ctx.bezierCurveTo(17.05*scalevalue,7.43*scalevalue,23.17*scalevalue,9.15*scalevalue,24.29*scalevalue,14.32*scalevalue);
    ctx.bezierCurveTo(25.53*scalevalue,18.2*scalevalue,21.63*scalevalue,20.92*scalevalue,18.41*scalevalue,21.88*scalevalue);
    ctx.bezierCurveTo(13.94*scalevalue,23.35*scalevalue,7.73*scalevalue,21.38*scalevalue,6.37*scalevalue,16.53*scalevalue);
    ctx.bezierCurveTo(5.6*scalevalue,12.77*scalevalue,9.4*scalevalue,10.11*scalevalue,12.57*scalevalue,9.21*scalevalue);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    ctx.beginPath();
    // Begin plotting the coordinates and draw the bezier curves in order to render a droplet
    ctx.moveTo(12.57*scalevalue,9.21*scalevalue);
    ctx.bezierCurveTo(17.05*scalevalue,7.43*scalevalue,23.17*scalevalue,9.15*scalevalue,24.29*scalevalue,14.32*scalevalue);
    ctx.bezierCurveTo(25.53*scalevalue,18.2*scalevalue,21.63*scalevalue,20.92*scalevalue,18.41*scalevalue,21.88*scalevalue);
    ctx.bezierCurveTo(13.94*scalevalue,23.35*scalevalue,7.73*scalevalue,21.38*scalevalue,6.37*scalevalue,16.53*scalevalue);
    ctx.bezierCurveTo(5.6*scalevalue,12.77*scalevalue,9.4*scalevalue,10.11*scalevalue,12.57*scalevalue,9.21*scalevalue);
    ctx.closePath();
    
    var lineargradientfoshade = ctx.createLinearGradient(22*scalevalue,25*scalevalue,23*scalevalue,5*scalevalue);
    lineargradientfoshade.addColorStop(0,jWaterDropsColorForShade);
    lineargradientfoshade.addColorStop(0.40,jWaterDropsTransparent);
    lineargradientfoshade.addColorStop(0.80,jWaterDropsTransparent);
    lineargradientfoshade.addColorStop(0.9,jWaterDropsTransparent);
    ctx.strokeStyle=jWaterDropsTransparent;
    ctx.fillStyle=lineargradientfoshade;    
    ctx.fill();      
    // Create a shining effect with the help of the gradient
    
    ctx.strokeStyle = jWaterDropsLightReflectionColor;
    ctx.beginPath();
    var startangle=0.25*Math.PI;
    var endangle=1*Math.PI;
    ctx.arc(17*scalevalue,12*scalevalue,1,startangle,endangle,true);
    ctx.closePath();
    ctx.stroke();    
    // Draw a white dot on top of the bubble
};

var jWaterDropsBubble10 = function(ctx,scalevalue) {
    
    ctx.save();

    ctx.lineWidth=jWaterDropslinewidth;

    if(!jWaterDropsBorderIsChrome){
        var blur = jWaterDropsShadowBlur;
        ctx.shadowColor = jWaterDropsShadowColor;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = blur;    
    }
    
    var lineargradient = ctx.createLinearGradient(5*scalevalue,5*scalevalue,17*scalevalue,31*scalevalue);
    lineargradient.addColorStop(0,jWaterDropsBorderColorStop1);
    lineargradient.addColorStop(0.30,jWaterDropsBorderColorStop2);
    lineargradient.addColorStop(0.60,jWaterDropsBorderColorStop3);
    lineargradient.addColorStop(0.9,jWaterDropsBorderColorStop4);
    ctx.strokeStyle=lineargradient;
 
    
    ctx.globalAlpha = jWaterDropsColorAlpha;
    // Begin plotting the coordinates and draw the bezier curves in order to render a droplet
    ctx.beginPath();
    ctx.moveTo(13.47*scalevalue,7.45*scalevalue);
    ctx.bezierCurveTo(17.83*scalevalue,5.58*scalevalue,23.27*scalevalue,9.25*scalevalue,23.12*scalevalue,14.02*scalevalue);
    ctx.bezierCurveTo(23.85*scalevalue,18.3*scalevalue,19.51*scalevalue,20.65*scalevalue,16.41*scalevalue,22.46*scalevalue);
    ctx.bezierCurveTo(12.61*scalevalue,24.19*scalevalue,9.26*scalevalue,19.86*scalevalue,8.45*scalevalue,16.56*scalevalue);
    ctx.bezierCurveTo(7.11*scalevalue,12.7*scalevalue,9.88*scalevalue,8.75*scalevalue,13.47*scalevalue,7.45*scalevalue);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    ctx.beginPath();
    // Begin plotting the coordinates and draw the bezier curves in order to render a droplet
    ctx.moveTo(13.47*scalevalue,7.45*scalevalue);
    ctx.bezierCurveTo(17.83*scalevalue,5.58*scalevalue,23.27*scalevalue,9.25*scalevalue,23.12*scalevalue,14.02*scalevalue);
    ctx.bezierCurveTo(23.85*scalevalue,18.3*scalevalue,19.51*scalevalue,20.65*scalevalue,16.41*scalevalue,22.46*scalevalue);
    ctx.bezierCurveTo(12.61*scalevalue,24.19*scalevalue,9.26*scalevalue,19.86*scalevalue,8.45*scalevalue,16.56*scalevalue);
    ctx.bezierCurveTo(7.11*scalevalue,12.7*scalevalue,9.88*scalevalue,8.75*scalevalue,13.47*scalevalue,7.45*scalevalue);
    ctx.closePath();
    
    var lineargradientfoshade = ctx.createLinearGradient(23*scalevalue,26*scalevalue,26*scalevalue,1*scalevalue);
    lineargradientfoshade.addColorStop(0,jWaterDropsColorForShade);
    lineargradientfoshade.addColorStop(0.40,jWaterDropsTransparent);
    lineargradientfoshade.addColorStop(0.80,jWaterDropsTransparent);
    lineargradientfoshade.addColorStop(0.9,jWaterDropsTransparent);
    ctx.strokeStyle=jWaterDropsTransparent;
    ctx.fillStyle=lineargradientfoshade;    
    ctx.fill();      
    // Use the gradient to create the shining effect
    
    ctx.strokeStyle =jWaterDropsLightReflectionColor;
    ctx.beginPath();
    var startangle=0.25*Math.PI;
    var endangle=1*Math.PI;
    ctx.arc(15*scalevalue,11*scalevalue,1,startangle,endangle,true);
    ctx.closePath();
    ctx.stroke();        
    // Draw a white dot on top of the bubble in order to create the effect 
};


var jWaterDropsBubble11 = function(ctx,scalevalue) {
    
    ctx.save();

    ctx.lineWidth=jWaterDropslinewidth;

    if(!jWaterDropsBorderIsChrome){
        var blur = jWaterDropsShadowBlur;
        ctx.shadowColor = jWaterDropsShadowColor;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = blur;    
    }

    var lineargradient = ctx.createLinearGradient(15*scalevalue,29*scalevalue,5*scalevalue,5*scalevalue);
    lineargradient.addColorStop(0,jWaterDropsBorderColorStop1);
    lineargradient.addColorStop(0.30,jWaterDropsBorderColorStop2);
    lineargradient.addColorStop(0.60,jWaterDropsBorderColorStop3);
    lineargradient.addColorStop(0.9,jWaterDropsBorderColorStop4);
    ctx.strokeStyle=lineargradient;
  
    
    ctx.globalAlpha = jWaterDropsColorAlpha;
    ctx.beginPath();
    // Begin plotting the coordinates and draw the bezier curves in order to render a droplet
    ctx.moveTo(13.56*scalevalue,8.12*scalevalue);
    ctx.bezierCurveTo(17.86*scalevalue,6.78*scalevalue,23.01*scalevalue,9.82*scalevalue,23.63*scalevalue,14.34*scalevalue);
    ctx.bezierCurveTo(24.09*scalevalue,18.56*scalevalue,21.21*scalevalue,23.34*scalevalue,16.74*scalevalue,23.76*scalevalue);
    ctx.bezierCurveTo(11.87*scalevalue,24.53*scalevalue,7.56*scalevalue,19.78*scalevalue,7.78*scalevalue,15.08*scalevalue);
    ctx.bezierCurveTo(7.8*scalevalue,11.77*scalevalue,10.49*scalevalue,8.99*scalevalue,13.56*scalevalue,8.12*scalevalue);
    ctx.closePath();

    ctx.stroke();
    ctx.restore();

    ctx.beginPath();
    // Begin plotting the coordinates and draw the bezier curves in order to render a droplet
    ctx.moveTo(13.56*scalevalue,8.12*scalevalue);
    ctx.bezierCurveTo(17.86*scalevalue,6.78*scalevalue,23.01*scalevalue,9.82*scalevalue,23.63*scalevalue,14.34*scalevalue);
    ctx.bezierCurveTo(24.09*scalevalue,18.56*scalevalue,21.21*scalevalue,23.34*scalevalue,16.74*scalevalue,23.76*scalevalue);
    ctx.bezierCurveTo(11.87*scalevalue,24.53*scalevalue,7.56*scalevalue,19.78*scalevalue,7.78*scalevalue,15.08*scalevalue);
    ctx.bezierCurveTo(7.8*scalevalue,11.77*scalevalue,10.49*scalevalue,8.99*scalevalue,13.56*scalevalue,8.12*scalevalue);
    ctx.closePath();

    var lineargradientfoshade = ctx.createLinearGradient(23*scalevalue,28*scalevalue,24*scalevalue,0*scalevalue);
    lineargradientfoshade.addColorStop(0,jWaterDropsColorForShade);
    lineargradientfoshade.addColorStop(0.40,jWaterDropsTransparent);
    lineargradientfoshade.addColorStop(0.80,jWaterDropsTransparent);
    lineargradientfoshade.addColorStop(0.9,jWaterDropsTransparent);
    ctx.strokeStyle=jWaterDropsTransparent;
    ctx.fillStyle=lineargradientfoshade;    
    ctx.fill();  
    // Use the gradient to create a shining effect on the canvas

    ctx.strokeStyle = jWaterDropsLightReflectionColor;
    ctx.beginPath();
    var startangle=0.25*Math.PI;
    var endangle=1*Math.PI;
    ctx.arc(15*scalevalue,12*scalevalue,1,startangle,endangle,true);
    ctx.closePath();
    ctx.stroke();     
    // Draw a white dot to create a reflection on top of the bubble
};

var jWaterDropsBubble12 = function(ctx,scalevalue) {
    
    ctx.save();
    ctx.lineWidth=jWaterDropslinewidth;

    if(!jWaterDropsBorderIsChrome){
        var blur = jWaterDropsShadowBlur;
        ctx.shadowColor = jWaterDropsShadowColor;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = blur;    
    }

    var lineargradient = ctx.createLinearGradient(25*scalevalue,2*scalevalue,0*scalevalue,29*scalevalue);
    lineargradient.addColorStop(0,jWaterDropsBorderColorStop1);
    lineargradient.addColorStop(0.30,jWaterDropsBorderColorStop2);
    lineargradient.addColorStop(0.60,jWaterDropsBorderColorStop3);
    lineargradient.addColorStop(0.9,jWaterDropsBorderColorStop4);
    ctx.strokeStyle=lineargradient;  
    
    ctx.globalAlpha = jWaterDropsColorAlpha;
    ctx.beginPath();
    // Begin plotting the coordinates and draw the bezier curves in order to render a droplet
    ctx.moveTo(10.32*scalevalue,10.25*scalevalue);
    ctx.bezierCurveTo(12.27*scalevalue,7.25*scalevalue,16.15*scalevalue,6.43*scalevalue,19.5*scalevalue,6.44*scalevalue);
    ctx.bezierCurveTo(22.95*scalevalue,12.22*scalevalue,20.77*scalevalue,20.81*scalevalue,14.46*scalevalue,23.63*scalevalue);
    ctx.bezierCurveTo(11.86*scalevalue,24.85*scalevalue,9.01*scalevalue,22.91*scalevalue,7.65*scalevalue,20.74*scalevalue);
    ctx.bezierCurveTo(6.91*scalevalue,17.07*scalevalue,8.35*scalevalue,13.3*scalevalue,10.32*scalevalue,10.25*scalevalue);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
    
    ctx.beginPath();
    // Begin plotting the coordinates and draw the bezier curves in order to render a droplet
    ctx.moveTo(10.32*scalevalue,10.25*scalevalue);
    ctx.bezierCurveTo(12.27*scalevalue,7.25*scalevalue,16.15*scalevalue,6.43*scalevalue,19.5*scalevalue,6.44*scalevalue);
    ctx.bezierCurveTo(22.95*scalevalue,12.22*scalevalue,20.77*scalevalue,20.81*scalevalue,14.46*scalevalue,23.63*scalevalue);
    ctx.bezierCurveTo(11.86*scalevalue,24.85*scalevalue,9.01*scalevalue,22.91*scalevalue,7.65*scalevalue,20.74*scalevalue);
    ctx.bezierCurveTo(6.91*scalevalue,17.07*scalevalue,8.35*scalevalue,13.3*scalevalue,10.32*scalevalue,10.25*scalevalue);
    ctx.closePath();

    var lineargradientfoshade = ctx.createLinearGradient(23*scalevalue,28*scalevalue,27*scalevalue,1*scalevalue);
    lineargradientfoshade.addColorStop(0,jWaterDropsColorForShade);
    lineargradientfoshade.addColorStop(0.40,jWaterDropsTransparent);
    lineargradientfoshade.addColorStop(0.80,jWaterDropsTransparent);
    lineargradientfoshade.addColorStop(0.9,jWaterDropsTransparent);
    ctx.strokeStyle=jWaterDropsTransparent;
    ctx.fillStyle=lineargradientfoshade;    
    ctx.fill();      
    // Create the shine using the gradient
    
    ctx.strokeStyle = jWaterDropsLightReflectionColor;
    ctx.beginPath();
    var startangle=0.25*Math.PI;
    var endangle=1*Math.PI;
    ctx.arc(17*scalevalue,9*scalevalue,1,startangle,endangle,true);
    ctx.closePath();
    ctx.stroke();        
    // Add a white dot on top
};

var jWaterDropsBubble13 = function(ctx,scalevalue) {
    
    ctx.save();

    ctx.lineWidth=jWaterDropslinewidth;

    if(!jWaterDropsBorderIsChrome){
        var blur = jWaterDropsShadowBlur;
        ctx.shadowColor = jWaterDropsShadowColor;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = blur;    
    }

    var lineargradient = ctx.createLinearGradient(5*scalevalue,24*scalevalue,20*scalevalue,2*scalevalue);
    lineargradient.addColorStop(0,jWaterDropsBorderColorStop1);
    lineargradient.addColorStop(0.30,jWaterDropsBorderColorStop2);
    lineargradient.addColorStop(0.60,jWaterDropsBorderColorStop3);
    lineargradient.addColorStop(0.9,jWaterDropsBorderColorStop4);
    ctx.strokeStyle=lineargradient;
        
    
    ctx.globalAlpha = jWaterDropsColorAlpha;
    ctx.beginPath();
    // Begin plotting the coordinates and draw the bezier curves in order to render a droplet
    ctx.moveTo(9.47*scalevalue,8.55*scalevalue);
    ctx.bezierCurveTo(10.4*scalevalue,5.58*scalevalue,14.42*scalevalue,5.65*scalevalue,15.88*scalevalue,8.11*scalevalue);
    ctx.bezierCurveTo(18.52*scalevalue,12.5*scalevalue,18.59*scalevalue,17.92*scalevalue,17.93*scalevalue,22.85*scalevalue);
    ctx.bezierCurveTo(15.52*scalevalue,24.07*scalevalue,12.11*scalevalue,23.98*scalevalue,10.79*scalevalue,21.24*scalevalue);
    ctx.bezierCurveTo(9.26*scalevalue,17.27*scalevalue,8.4*scalevalue,12.73*scalevalue,9.47*scalevalue,8.55*scalevalue);
    ctx.closePath();

    ctx.stroke();
    ctx.restore();

    ctx.beginPath();
    // Begin plotting the coordinates and draw the bezier curves in order to render a droplet
    ctx.moveTo(9.47*scalevalue,8.55*scalevalue);
    ctx.bezierCurveTo(10.4*scalevalue,5.58*scalevalue,14.42*scalevalue,5.65*scalevalue,15.88*scalevalue,8.11*scalevalue);
    ctx.bezierCurveTo(18.52*scalevalue,12.5*scalevalue,18.59*scalevalue,17.92*scalevalue,17.93*scalevalue,22.85*scalevalue);
    ctx.bezierCurveTo(15.52*scalevalue,24.07*scalevalue,12.11*scalevalue,23.98*scalevalue,10.79*scalevalue,21.24*scalevalue);
    ctx.bezierCurveTo(9.26*scalevalue,17.27*scalevalue,8.4*scalevalue,12.73*scalevalue,9.47*scalevalue,8.55*scalevalue);
    ctx.closePath();

    var lineargradientfoshade = ctx.createLinearGradient(25*scalevalue,26*scalevalue,23*scalevalue,3*scalevalue);
    lineargradientfoshade.addColorStop(0,jWaterDropsColorForShade);
    lineargradientfoshade.addColorStop(0.40,jWaterDropsTransparent);
    lineargradientfoshade.addColorStop(0.80,jWaterDropsTransparent);
    lineargradientfoshade.addColorStop(0.9,jWaterDropsTransparent);
    ctx.strokeStyle=jWaterDropsTransparent;
    ctx.fillStyle=lineargradientfoshade;    
    ctx.fill();      
    // Create the shining effect with the help of the gradient
    
    ctx.strokeStyle = jWaterDropsLightReflectionColor;
    ctx.beginPath();
    var startangle=0.25*Math.PI;
    var endangle=1*Math.PI;
    ctx.arc(13*scalevalue,10*scalevalue,1,startangle,endangle,true);
    ctx.closePath();
    ctx.stroke();          
    // Add a white drop of top of the droplet
};

var jWaterDropsBubble14 = function(ctx,scalevalue) {
    
    ctx.save();

    ctx.lineWidth=jWaterDropslinewidth;

    if(!jWaterDropsBorderIsChrome){
        var blur = jWaterDropsShadowBlur;
        ctx.shadowColor = jWaterDropsShadowColor;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = blur;    
    }

    var lineargradient = ctx.createLinearGradient(9*scalevalue,23*scalevalue,20*scalevalue,2*scalevalue);
    lineargradient.addColorStop(0,jWaterDropsBorderColorStop1);
    lineargradient.addColorStop(0.30,jWaterDropsBorderColorStop2);
    lineargradient.addColorStop(0.60,jWaterDropsBorderColorStop3);
    lineargradient.addColorStop(0.9,jWaterDropsBorderColorStop4);
    ctx.strokeStyle=lineargradient;
      
    ctx.globalAlpha = jWaterDropsColorAlpha;
    ctx.beginPath();
    // Begin plotting the coordinates and draw the bezier curves in order to render a droplet
    ctx.moveTo(9.56*scalevalue,13.44*scalevalue);
    ctx.bezierCurveTo(10.45*scalevalue,9.42*scalevalue,14.23*scalevalue,7.03*scalevalue,17.88*scalevalue,5.82*scalevalue);
    ctx.bezierCurveTo(20.92*scalevalue,8.84*scalevalue,22.4*scalevalue,13.34*scalevalue,21.69*scalevalue,17.57*scalevalue);
    ctx.bezierCurveTo(20.49*scalevalue,20.46*scalevalue,17.27*scalevalue,22.3*scalevalue,14.21*scalevalue,22.42*scalevalue);
    ctx.bezierCurveTo(11.41*scalevalue,20.43*scalevalue,9.02*scalevalue,17.02*scalevalue,9.56*scalevalue,13.44*scalevalue);
    ctx.closePath();

    ctx.stroke();
    ctx.restore();

    ctx.beginPath();
    // Begin plotting the coordinates and draw the bezier curves in order to render a droplet
    ctx.moveTo(9.56*scalevalue,13.44*scalevalue);
    ctx.bezierCurveTo(10.45*scalevalue,9.42*scalevalue,14.23*scalevalue,7.03*scalevalue,17.88*scalevalue,5.82*scalevalue);
    ctx.bezierCurveTo(20.92*scalevalue,8.84*scalevalue,22.4*scalevalue,13.34*scalevalue,21.69*scalevalue,17.57*scalevalue);
    ctx.bezierCurveTo(20.49*scalevalue,20.46*scalevalue,17.27*scalevalue,22.3*scalevalue,14.21*scalevalue,22.42*scalevalue);
    ctx.bezierCurveTo(11.41*scalevalue,20.43*scalevalue,9.02*scalevalue,17.02*scalevalue,9.56*scalevalue,13.44*scalevalue);
    ctx.closePath();

    var lineargradientfoshade = ctx.createLinearGradient(19*scalevalue,27*scalevalue,25*scalevalue,4*scalevalue);
    lineargradientfoshade.addColorStop(0,jWaterDropsColorForShade);
    lineargradientfoshade.addColorStop(0.40,jWaterDropsTransparent);
    lineargradientfoshade.addColorStop(0.80,jWaterDropsTransparent);
    lineargradientfoshade.addColorStop(0.9,jWaterDropsTransparent);
    ctx.strokeStyle=jWaterDropsTransparent;
    ctx.fillStyle=lineargradientfoshade;    
    ctx.fill();      
    // add shine
    
    ctx.strokeStyle = jWaterDropsLightReflectionColor;

    ctx.beginPath();
    var startangle=0.25*Math.PI;
    var endangle=1*Math.PI;
    ctx.arc(17*scalevalue,10*scalevalue,1,startangle,endangle,true);
    ctx.closePath();
    ctx.stroke();       
    // Create a pin light reflection
};
                
function getANumber(min, max){
    // Function to return a number among two numbers
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function move(ide){
    
    var theelement=document.getElementById(ide);
     if (theelement==undefined) return;
    var currleft=theelement.style.left;
    var currtop=theelement.style.top;
    // Get the position coordinates of the droplets
    
    currtop = currtop.replace(/px/g,"");
    currleft = currleft.replace(/px/g,"");         
    // Clear the values px to empty string
    
    if(!currleft)
        currleft=getANumber(1+offSetLeft, offSetLeft+jWaterDropletsviewportwidth);
    // If the left position for the element is not yet set
    // Set it with a random value
    
    if(!currtop)
        currtop=1+offSetTop;
    else 
        currtop=parseFloat(currtop)+3;
    // Set the top value of the droplet

    if(currtop>=(jWaterDropletsviewportheight+offSetTop)){
        currtop=1+offSetTop;
        currleft=getANumber(1+offSetLeft, offSetLeft+jWaterDropletsviewportwidth);      
        // Assign a random position to the droplet
        // once it reaches the bottom of the viewport
        if(jWaterDropsEnableLoopForFall==true){
            theelement.style.display='inline';
            theelement.style.position='absolute';
            theelement.style.left=currleft+'px';
            theelement.style.top=currtop+'px';
            jWaterDropletsTimers.push(setTimeout(function(){move(ide);},21));        
        } else {
            // If the looping is set to false
            // Then stop the bubble from motion
            // and make it invisible
            theelement.style.display='none';
        }
    } else {
        // Set the positions of the droplet with 
        // values that are assigned to them
        theelement.style.display='inline';
        theelement.style.position='absolute';
        theelement.style.left=currleft+'px';
        theelement.style.top=currtop+'px';
        jWaterDropletsTimers.push(setTimeout(function(){move(ide);},21));           
    }

}
function stopRain(){
	jWaterDropsEnableLoopForFall=false;
	for(var counti=0;counti<jWaterDropsNumberOfWaterDroplets;counti++){
		var currentCanvas=document.getElementById('jwaterDropsDropCanvas'+counti);
		if (currentCanvas != null){
		// currentCanvas.style.display='none';
		 document.body.removeChild(currentCanvas);
		}
   }
}
function startRain(){
	jWaterDropsEnableLoopForFall=true;
	initRain();
	for(var counti=0;counti<jWaterDropsNumberOfWaterDroplets;counti++){
		var currentCanvas=document.getElementById('jwaterDropsDropCanvas'+counti);
		// currentCanvas.style.display='inline';
		 idforcontainer='jwaterDropsDropCanvas'+counti;
		 prepareAndMove(idforcontainer);
   }

}
function showRain(param){
	if (param) 
		startRain();
	else 
		stopRain();
}

window.onload= function(){
	initRain();
	
}
function initRain( ){
    if(!!!document.createElement('canvas').getContext){
        return;
    }    
    // Get viewport size and width
    // Draw these canvases at random places and random sizes marked by
    // the settings jWaterDropsMinSizePercentage and jWaterDropsMaxSizePercentage
    jWaterDropletsviewportwidth = window.innerWidth;
    jWaterDropletsviewportheight = window.innerHeight;
    jWaterDropletsviewportheight-=Math.floor((jWaterDropsMaxSizePercentage/100)*jWaterDropsStandardDropCanvasSize);
    jWaterDropletsviewportwidth-=Math.floor((jWaterDropsMaxSizePercentage/100)*jWaterDropsStandardDropCanvasSize);
    
    // If the droplets effect needs to added to a div
    // Version 1.1 Changes - Starts    
    if(applyEffectToAnElement==true){
        var backgroundElement=document.getElementById(elementId);
        jWaterDropletsviewportwidth = getWidth(backgroundElement);
        jWaterDropletsviewportheight = getHeight(backgroundElement);
        jWaterDropletsviewportheight-=Math.floor((jWaterDropsMaxSizePercentage/100)*jWaterDropsStandardDropCanvasSize);
        jWaterDropletsviewportwidth-=Math.floor((jWaterDropsMaxSizePercentage/100)*jWaterDropsStandardDropCanvasSize);        
    }
    // Version 1.1 Changes - Ends
    
    // Render all the water droplets and assign properties for them
    for(var counti=0;counti<jWaterDropsNumberOfWaterDroplets;counti++){
        var canvas=document.createElement('canvas');
        // Create the canvas to be used
        var dimension=getANumber(Math.floor((jWaterDropsMinSizePercentage/100)*jWaterDropsStandardDropCanvasSize),
                        Math.floor((jWaterDropsMaxSizePercentage/100)*jWaterDropsStandardDropCanvasSize));
        // Set the dimension for the water droplet based on the size settings
                        
        canvas.setAttribute('id', 'jwaterDropsDropCanvas'+counti);
        canvas.setAttribute('width', dimension);
        canvas.setAttribute('height', dimension);
        canvas.setAttribute('class', 'jWaterDroplets');
        canvas.setAttribute('data-sizeratio', dimension/jWaterDropsStandardDropCanvasSize);
        canvas.style.display='inline';
        // Set all the attributes for the canvas that was created
        // Version 1.1 Changes - Starts
        if(applyEffectToAnElement==false){
            canvas.style.position='absolute';
            canvas.style.left=getANumber(0,jWaterDropletsviewportwidth)+'px';
            canvas.style.top=getANumber(0,(jWaterDropletsviewportheight-dimension))+'px';
            canvas.onmouseover=function(){prepareAndMove(this.id)};
            canvas.style.zIndex=9999;
        } else {
            var backgroundElement=document.getElementById(elementId);
            var posi=getPosition(backgroundElement);
            var eleLeft=posi[0];
            var eleTop=posi[1];
            offSetLeft=eleLeft;
            offSetTop=eleTop;
            canvas.style.position='absolute';
            canvas.style.left=eleLeft+getANumber(0,jWaterDropletsviewportwidth)+'px';
            canvas.style.top=eleTop+getANumber(0,(jWaterDropletsviewportheight-dimension))+'px';
            canvas.onmouseover=function(){prepareAndMove(this.id)};
            canvas.style.zIndex=9999;            
        }
        // Version 1.1 Changes - Ends
        document.body.appendChild(canvas);
        // Set the positions
        // Add a mouse over event
        // Add the element to the body of the website
        
        var currentCanvas=document.getElementById('jwaterDropsDropCanvas'+counti).getContext("2d") ;
        var randomstyle=getANumber(0, jWaterDropsStyles.length);        
        randomstyle=jWaterDropsStyles[randomstyle];
        // Get the canvas that was created and assign a style of droplet to
        // the canvas in order to rendered

        // Render the canvas based on the style and the scale value that
        // is chosen by the random size function
        var scaleValue=dimension/jWaterDropsStandardDropCanvasSize;
        if(randomstyle==1)
            jWaterDropsBubble1(currentCanvas,scaleValue);
        if(randomstyle==2)
            jWaterDropsBubble2(currentCanvas,scaleValue);
        if(randomstyle==3)
            jWaterDropsBubble3(currentCanvas,scaleValue);
        if(randomstyle==4)
            jWaterDropsBubble4(currentCanvas,scaleValue);
        if(randomstyle==5)
            jWaterDropsBubble5(currentCanvas,scaleValue);
        if(randomstyle==6)
            jWaterDropsBubble6(currentCanvas,scaleValue);
        if(randomstyle==7)
            jWaterDropsBubble7(currentCanvas,scaleValue);
        if(randomstyle==8)
            jWaterDropsBubble8(currentCanvas,scaleValue);
        if(randomstyle==9)
            jWaterDropsBubble9(currentCanvas,scaleValue);
        if(randomstyle==10)
            jWaterDropsBubble10(currentCanvas,scaleValue);
        if(randomstyle==11)
            jWaterDropsBubble11(currentCanvas,scaleValue);
        if(randomstyle==12)
            jWaterDropsBubble12(currentCanvas,scaleValue);
        if(randomstyle==13)
            jWaterDropsBubble13(currentCanvas,scaleValue);
        if(randomstyle==14)
            jWaterDropsBubble14(currentCanvas,scaleValue);                                                                    
    }       
};

function prepareAndMove(ide){  
    // We could have directly called move function
    // We have placed it in another function
    // for extensibility
    move(ide);
}

function getPosition(obj) {
        var eleLeft = 0;
        var eleTop= 0;

        if (obj.offsetParent) {
                eleLeft = obj.offsetLeft
                eleTop = obj.offsetTop
                while (obj = obj.offsetParent) {
                        eleLeft += obj.offsetLeft
                        eleTop += obj.offsetTop
                }
        }
        return [eleLeft,eleTop];
}

function getWidth(obj){
           if (typeof obj.clip !== "undefined") {
              return obj.clip.width;
           } else {
              if (obj.style.pixelWidth) {
                 return obj.style.pixelWidth;
              } else {
                 return obj.offsetWidth;
              }
           }                
}

function getHeight(obj){
           if (typeof obj.clip !== "undefined") {
              return obj.clip.height;
           } else {
              if (obj.style.pixelHeight) {
                 return obj.style.pixelHeight;
              } else {
                 return obj.offsetHeight;
              }
           }                
}

// End of File - Good luck

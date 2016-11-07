var scene;
var camera;
var renderer;
var geometry;
var material;
var mesh;
var Colors = {
    red:0xf25346,
    blue:0x68c3c0,
    brown:0x59332e,
    pink:0xF5986E,
    white:0xd8d0d1,
    brownDark:0x23190f
};

$(document).ready(function(){
init();
});


function init(){
    // set up the scene, camera and the renderer
        createScene();
    // add the lights
        createLights();
    // add the objects
        createPlane();
        createSea();
        createSky();


    // start a Loop that will update the objects positions
    // and render the scene on each frame
    loop();
}

function createScene(){
    console.log("Building a Scene");
}


function createLights(){
    console.log("Creating some Lights");
}

function createPlane (){
    console.log("Make a plane");
}

function createSea(){
    console.log("Water water everywhere, but not a drop to drink");
}

function createSky(){
    console.log("Slip the Surly bonds of earth");
}

function loop(){
    console.log("You Spin me right round baby right round, like a record baby");
}


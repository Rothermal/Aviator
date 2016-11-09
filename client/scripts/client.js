var scene;
var fieldOfView;
var aspectRatio;
var nearPlane;
var farPlane;
var HEIGHT;
var WIDTH;
var container;
var camera;
var renderer;
var hemisphereLight;
var shadowLight;
var geometry;
var material;
var mesh;
var sea;
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
    //get the width and height of the screen,
    // use tem to set up the aspect ratio of the camera
    // and the size of the renderer
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;

    // create the scene
    scene = new THREE.Scene();

    //Add a fog effect to the scene; same color as the
    // background color used in the style sheet
    scene.fog = new THREE.Fog(0xf7d9aa,100,950);

    //create the camera
    aspectRatio = WIDTH/HEIGHT;
    fieldOfView = 60;
    nearPlane = 1;
    farPlane = 10000;

    camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearPlane,
        farPlane
    );
    // set position of the camera
    camera.position.x = 0;
    camera.position.z = 200;
    camera.position.y = 100;

    // create the renderer
    renderer = new THREE.WebGLRenderer({
        // allow transparency to show the gradient background
        // we defined in the css
        alpha : true,
        // activate anti alsiasing, this is less performant,
        // but, as our project is low poly based, it should be fine
        antialias: true
    });
    renderer.setSize(WIDTH,HEIGHT);
    // enable shadow rendering
    renderer.shadowMap.enabled = true;
    // add a dom element of the rendere to the container
    // we created in the html
    container = document.getElementById('world');
    container.appendChild(renderer.domElement);

    // listen to the screen: if a user resizes it
    // we have to update the camera and the renderer size
    window.addEventListener('resize',handleWindowResize,false);

}
function handleWindowResize (){
    // update height and width of the renderer and the camera
    console.log('hit window resize');
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    renderer.setSize(WIDTH,HEIGHT);
    camera.aspect = WIDTH/HEIGHT;
    camera.updateProjectionMatrix();
}


function createLights(){
    console.log("Creating some Lights");
    // a hemisohere light is a gradient colored light;
    // the first parameter is the sky color, the second parameter is the ground color
    // the third parameter is the intensity of the light
    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x0000000, '.9');

    // a directional light shines from a specific direction
    // it acts like the sun that means that all the rays produced are parallel
    // assuming first parameter is color and second parameter is intensity...
    shadowLight = new THREE.DirectionalLight(0xffffff, '.9');

    // set the posistion of the light
    shadowLight.position.set(150,350,350);

    // allow shadow casting
    shadowLight.castShadow = true;

    //define the visible area of the projected shadow
    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;

    // define the resolution of the shadow; the higher the better,
    // but also the more expensive and less performant
    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;

    // to activate the lights, add them to the scene
    scene.add(hemisphereLight);
    scene.add(shadowLight);

}

function createPlane (){
    console.log("Make a plane");
}



function createSea(){
    console.log("Water water everywhere, but not a drop to drink");
    // first lets define a sea object
    sea = new Sea();

    // push it a little bit at the bottom of the scene
    sea.mesh.position.y = -600;

    // add it to the scene;
    scene.add(sea.mesh);

}

function createSky(){
    console.log("Slip the Surly bonds of earth");
}

function loop(){
    console.log("You Spin me right round baby right round, like a record baby");
}


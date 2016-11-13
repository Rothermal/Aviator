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

        renderer.render(scene, camera);

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
    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x0000000, (9/10));

    // a directional light shines from a specific direction
    // it acts like the sun that means that all the rays produced are parallel
    // assuming first parameter is color and second parameter is intensity...
    shadowLight = new THREE.DirectionalLight(0xffffff, (9/10));

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
var Airplane = function(){

    this.mesh = new THREE.Object3D();

    // create the cabin
    var geomCockpit = new THREE.BoxGeometry(60,50,50,1,1,1);
    var matCockpit = new THREE.MeshPhongMaterial({
        color:Colors.red,
        shading:THREE.FlatShading
    });
    var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
    cockpit.castShadow = true;
    cockpit.receiveShadow = true;
    this.mesh.add(cockpit);

    // create the engine
    var geomEngine = new THREE.BoxGeometry(20,50,50,1,1,1);
    var matEngine = new THREE.MeshPhongMaterial({
       color:Colors.white,
       shading : THREE.FlatShading
    });
    var engine = new THREE.Mesh(geomEngine, matEngine);
    engine.position.x = 40;
    engine.castShadow = true;
    engine.recieveShadow = true;
    this.mesh.add(engine);

    // create the tail
    var geomTailPlane = new THREE.BoxGeometry(15,20,5,1,1,1);
    var matTailPlane = new THREE.MeshPhongMaterial({
        color:Colors.red,
        shading : THREE.FlatShading
    });
    var tailPlane = new THREE.Mesh(geomTailPlane,matTailPlane);
    tailPlane.position.set(-35,25,0);
    tailPlane.castShadow = true;
    tailPlane.receiveShadow = true;
    this.mesh.add(tailPlane);

    // creat the wing
    var geomSideWing = new THREE.BoxGeometry(40,8,150,1,1,1);
    var matSideWing = new THREE.MeshPhongMaterial({
        color:Colors.red,
        shading : THREE.FlatShading
    });
    var sideWing = new THREE.Mesh(geomSideWing,matSideWing);
    sideWing.castShadow = true;
    sideWing.receiveShadow = true;
    this.mesh.add(sideWing);
    // propeller
    var geomPropeller = new THREE.BoxGeometry(20,10,10,1,1,1);
    var matPropeller = new THREE.MeshPhongMaterial({
        color:Colors.brown,
        shading:THREE.FlatShading
    });
    this.propeller = new THREE.Mesh(geomPropeller,matPropeller);
    this.propeller.castShadow = true;
    this.propeller.receiveShadow = true;

    // blades
    var geomBlade = new THREE.BoxGeometry(1,100,20,1,1,1);
    var matBlade = new THREE.MeshPhongMaterial({
        color:Colors.brownDark,
        shading:THREE.FlatShading
    });

    var blade = new THREE.Mesh(geomBlade,matBlade);
    blade.position.set(8,0,0);
    blade.castShadow = true;
    blade.receiveShadow = true;
    this.propeller.add(blade);
    this.propeller.position.set(50,0,0);
    this.mesh.add(this.propeller);
};

var airplane;

function createPlane (){
    console.log("Make a plane");
    airplane = new Airplane();
    airplane.mesh.scale.set((1/4),(1/4),(1/4));
    airplane.mesh.position.y = 100;
    scene.add(airplane.mesh);
}

Sea = function(){

    // create the geomtery (shape) of the cylinder;
    // the parameters are:
    // radius top, radius bottom, height, number of segments on the radius,
    // number of segments vertically
    var geom = new THREE.CylinderGeometry(600,600,800,40,10);

    // rotate teh geometry on the x axis
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));

    // create the material
    var mat = new THREE.MeshPhongMaterial({
       color: Colors.blue,
       transparent: true,
       opacity: (6/10),
       shading:THREE.FlatShading
    });
    // to create an object in THREE.js we have to create a mesh
    // which is a combo of geometry and some material
    this.mesh = new THREE.Mesh(geom,mat);

    // allow the sea to recieve shadows
    this.mesh.receiveShadow = true;

};

function createSea(){
    console.log("Water water everywhere, but not a drop to drink");
    // first lets define a sea object
    sea = new Sea();

    // push it a little bit at the bottom of the scene
    sea.mesh.position.y = -600;

    // add it to the scene;
    scene.add(sea.mesh);

}

Cloud = function(){
    // Create an empty container that will hold the different parts of the cloud
    this.mesh = new THREE.Object3D();

    // create a cube geometry;
    // this shape will be duplicated to create the cloud
    var geom = new THREE.BoxGeometry(20,20,20);

    // create a material; a simple white material will do the trick
    var mat = new THREE.MeshPhongMaterial({
        color:Colors.white
    });

    // duplicate the geometry a random number of times
    var nBlocs = 3+Math.floor(Math.random()*3);
    for (var i=0; i<nBlocs; i++ ){

        // create the mesh by cloning the geometry
        var m = new THREE.Mesh(geom, mat);

        // set the position and the rotation of each cube randomly
        m.position.x = i*15;
        m.position.y = Math.random()*10;
        m.position.z = Math.random()*10;
        m.rotation.z = Math.random()*Math.PI*2;
        m.rotation.y = Math.random()*Math.PI*2;

        // set the size of the cube randomly
        var s = (1/10) + Math.random()*(9/10);
        m.scale.set(s,s,s);

        // allow each cube to cast and to receive shadows
        m.castShadow = true;
        m.receiveShadow = true;

        // add the cube to the container we first created
        this.mesh.add(m);
    }
};
Sky = function(){
    // Create an empty container
    this.mesh = new THREE.Object3D();

    // choose a number of clouds to be scattered in the sky
    this.nClouds = 20;

    // To distribute the clouds consistently,
    // we need to place them according to a uniform angle
    var stepAngle = Math.PI*2 / this.nClouds;

    // create the clouds
    for(var i=0; i<this.nClouds; i++){
        var c = new Cloud();

        // set the rotation and the position of each cloud;
        // for that we use a bit of trigonometry
        var a = stepAngle*i; // this is the final angle of the cloud
        var h = 750 + Math.random()*200; // this is the distance between the center of the axis and the cloud itself

        // Trigonometry!!! I hope you remember what you've learned in Math :)
        // in case you don't:
        // we are simply converting polar coordinates (angle, distance) into Cartesian coordinates (x, y)
        c.mesh.position.y = Math.sin(a)*h;
        c.mesh.position.x = Math.cos(a)*h;

        // rotate the cloud according to its position
        c.mesh.rotation.z = a + Math.PI/2;

        // for a better result, we position the clouds
        // at random depths inside of the scene
        c.mesh.position.z = -400-Math.random()*400;

        // we also set a random scale for each cloud
        var s = 1+Math.random()*2;
        c.mesh.scale.set(s,s,s);

        // do not forget to add the mesh of each cloud in the scene
        this.mesh.add(c.mesh);
    }
};

// Now we instantiate the sky and push its center a bit
// towards the bottom of the screen

var sky;


function createSky(){
    console.log("Slip the Surly bonds of earth");
    sky = new Sky();
    sky.mesh.position.y = -600;
    scene.add(sky.mesh);
}

function loop(){
    console.log("You Spin me right round baby right round, like a record baby");
}


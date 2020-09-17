import * as THREE from './threejs/three.module.js';

// frame per second
var fps = 30;

var camera, scene, renderer;
var cube;

//mouse
var mouseX = 0,
  mouseY = 0;
var targetMouseX = 0,
  targetMouseY = 0;
var lastMouseX = 0,
  lastMouseY = 0;
var rotationX = 0,
  rotationY = 0;


// var windowWidthOffset = 20;
// var windowHeightOffset = 100;
var windowWidthOffset = 0;
var windowHeightOffset = 0;
var windowWidth; // = window.innerWidth-windowWidthOffset;
var windowHeight; // = window.innerHeight-windowHeightOffset;

var windowHalfX = windowWidth / 2.0;
var windowHalfY = windowHeight / 2.0;


var sizeCube = 100;


var isDragging = false;
var previousMousePosition = {
  x: 0,
  y: 0
};
var deltaMove = {
  x: 1,
  y: 0
};

init();
animate();

function init() {

  // renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true // transparency
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(document.body.clientWidth, document.body.clientHeight);
  document.body.appendChild(renderer.domElement);
  //renderer.setClearColor(0xAAAAAA, 1.0);
  renderer.clear();
  windowWidth = window.innerWidth - windowWidthOffset;
  windowHeight = window.innerHeight - windowHeightOffset;

  // camera
  camera = new THREE.PerspectiveCamera(45, windowWidth / windowHeight, 1, 10000);
  camera.position.z = 300;

  // scene
  scene = new THREE.Scene();

  // texture Loader
  var textureLoader = new THREE.TextureLoader().setPath("/assets/img/");


  // geometry (cube)
  var geometry = new THREE.BoxBufferGeometry(sizeCube * 1.6, sizeCube, sizeCube);

  // material with texture
  //var texture = textureLoader.load( 'img/Couché de soleil.jpg' );
  var material = new THREE.MeshFaceMaterial([
    new THREE.MeshBasicMaterial({
      //color: 0x0000ff
      //map: textureLoader.load( 'ordi.jpg' )
      map: textureLoader.load('Asus_ROG_STRIX_G.jpg'),
      alphaTest: 0.5
    }),
    new THREE.MeshBasicMaterial({
      map: textureLoader.load('IKEA PS 2014.jpg'),
      alphaTest: 0.5
    }),
    new THREE.MeshBasicMaterial({
      map: textureLoader.load('Hirondelles.png'),
      alphaTest: 0.5
    }),
    new THREE.MeshBasicMaterial({
      map: textureLoader.load('Gare de Limoges.jpg'),
      alphaTest: 0.5
    }),
    new THREE.MeshBasicMaterial({
      map: textureLoader.load('Couché de soleil.jpg'),
      alphaTest: 0.5
    }),
    new THREE.MeshBasicMaterial({
      map: textureLoader.load('Falcon9.jpg'),
      alphaTest: 0.5
    })
  ]);

  // associat geometry and material
  cube = new THREE.Mesh(geometry, material);
  // add boder to cube
  var box = new THREE.BoxHelper(cube, 0x000000);
  //cube.add( box );
  // change init rotations
  cube.rotation.x = toRadians(20);
  cube.rotation.y = toRadians(-45);
  // add cube to scene
  scene.add(cube);



  // add listeners
  window.addEventListener('resize', onWindowResize, false);

  document.addEventListener('mousemove', function(e) {

    if (isDragging) {
      deltaMove = {
        x: e.offsetX - previousMousePosition.x,
        y: e.offsetY - previousMousePosition.y
      };


      var deltaRotationQuaternion = new THREE.Quaternion()
        .setFromEuler(new THREE.Euler(
          toRadians(deltaMove.y * 0.25),
          toRadians(deltaMove.x * 0.25),
          0,
          'XYZ'
        ));

      cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);


    }
    previousMousePosition = {
      x: e.offsetX,
      y: e.offsetY
    };

  }, false);
  document.addEventListener('mousedown', function(e) {
    isDragging = true;
  }, false);
  document.addEventListener('mouseup', function(e) {
    isDragging = false;
  }, false);

}

function onWindowResize() {
  windowWidth = window.innerWidth - windowWidthOffset;
  windowHeight = window.innerHeight - windowHeightOffset;


  windowHalfX = windowWidth / 2.0;
  windowHalfY = windowHeight / 2.0;

  camera.aspect = windowWidth / windowHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(windowWidth, windowHeight);
  render();

}

function animate() {

  if (!isDragging) {

    var deltaRotationQuaternion = new THREE.Quaternion()
      .setFromEuler(new THREE.Euler(
        toRadians(deltaMove.y * 0.25),
        toRadians(deltaMove.x * 0.25),
        0,
        'XYZ'
      ));

    cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);
  }

  setTimeout(function() {
    // Keep the animation going
    requestAnimationFrame(animate);
  }, 1000 / fps);

  render();

}

function render() {
  renderer.render(scene, camera);

}


function toRadians(angle) {
  return angle * (Math.PI / 180);
}

function toDegrees(angle) {
  return angle * (180 / Math.PI);
}
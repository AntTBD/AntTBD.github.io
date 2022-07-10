import * as THREE from './threejs/three.module.js';


// frame per second
var fps = 30;

var camera, scene, renderer;
var cube;
var group;

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
const particlesData = [];
let positions, colors;
let particles;
let pointCloud;
let particlePositions;
let linesMesh;
var particlesMaterial;

const maxParticleCount = 500;
let particleCount = 500;
const r = 1900;
const rHalf = r / 2;

const effectController = {
  showDots: true,
  showLines: true,
  minDistance: 150,
  limitConnections: false,
  maxConnections: 20,
  particleCount: 80,
  particulesColor: 0x303030,
  backgroundColor: 0xffffff,
  particulesSpeedMin: -0.2,
  particulesSpeedMax: 0.2
};

var darkMode = false;

function checkDarkMode() {
  if (localStorage.hasOwnProperty("darkSwitch") && localStorage.getItem("darkSwitch") === "dark") {
    if (darkMode === false) { // si changement de mode
      console.log("threejs change to darkMode");
      effectController.particulesColor = 0xffffff;
      effectController.backgroundColor = 0x303030;

      pointCloud.material.color.setHex(effectController.particulesColor);

      darkMode = true;
    }
  } else {
    if (darkMode === true) { // si changement de mode
      console.log("threejs change to lightMode");
      effectController.particulesColor = 0x303030;
      effectController.backgroundColor = 0xffffff;

      pointCloud.material.color.setHex(effectController.particulesColor);

      darkMode = false;
    }
  }
}


init();
animate();

function initCube() {
  // texture Loader
  var textureLoader = new THREE.TextureLoader().setPath("./assets/img/threejs/");


  // geometry (cube)
  var geometryCube = new THREE.BoxBufferGeometry(sizeCube * 1.6, sizeCube, sizeCube);

  // material with texture
  //var texture = textureLoader.load( 'img/Couché de soleil.jpg' );
  var materialCube = [
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
      map: textureLoader.load('Hirondelles.jpg'),
      alphaTest: 0.5
    }),
    new THREE.MeshBasicMaterial({
      map: textureLoader.load('Couché de soleil Chicoutimi.jpg'),
      alphaTest: 0.5
    }),
    new THREE.MeshBasicMaterial({
      map: textureLoader.load('Gare de Limoges.jpg'),
      alphaTest: 0.5
    }),
    new THREE.MeshBasicMaterial({
      map: textureLoader.load('Falcon9.jpg'),
      alphaTest: 0.5
    })
  ];

  // associat geometry and material
  cube = new THREE.Mesh(geometryCube, materialCube);
  // add boder to cube
  var box = new THREE.BoxHelper(cube, 0x000000);
  //cube.add( box );
  // change init rotations
  cube.rotation.x = toRadians(20);
  cube.rotation.y = toRadians(-45);
  // add cube to scene
  scene.add(cube);
}

function random(min, max) {
  return min + Math.random() * (max - min);
}

// https://threejs.org/examples/?q=buffer#webgl_buffergeometry_drawrange
function initNetWorkBackground() {
  // network lines background
  group = new THREE.Group();
  group.position.z = -800;
  scene.add(group);

  const segments = maxParticleCount * maxParticleCount;

  positions = new Float32Array(segments * 3);
  colors = new Float32Array(segments * 3);

  particlesMaterial = new THREE.PointsMaterial({
    color: effectController.particulesColor,
    size: 3,
    blending: THREE.AdditiveBlending,
    transparent: true,
    sizeAttenuation: false
  });

  particles = new THREE.BufferGeometry();
  particlePositions = new Float32Array(maxParticleCount * 3);

  for (let i = 0; i < maxParticleCount; i++) {

    const x = Math.random() * r - r / 2;
    const y = Math.random() * r - r / 2;
    const z = Math.random() * r / 3 - r / 2 / 3;

    particlePositions[i * 3] = x;
    particlePositions[i * 3 + 1] = y;
    particlePositions[i * 3 + 2] = z;

    // add it to the geometry
    particlesData.push({
      velocity: new THREE.Vector3(random(effectController.particulesSpeedMin, effectController.particulesSpeedMax), random(effectController.particulesSpeedMin, effectController.particulesSpeedMax), random(effectController.particulesSpeedMin, effectController.particulesSpeedMax)),
      numConnections: 0
    });

  }

  particles.setDrawRange(0, particleCount);
  particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3).setUsage(THREE.DynamicDrawUsage));

  // create the particle system
  pointCloud = new THREE.Points(particles, particlesMaterial);
  group.add(pointCloud);

  const geometry = new THREE.BufferGeometry();

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage));

  geometry.computeBoundingSphere();

  geometry.setDrawRange(0, 0);

  const material = new THREE.LineBasicMaterial({
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    transparent: true
  });

  linesMesh = new THREE.LineSegments(geometry, material);
  group.add(linesMesh);


}

function init() {

  // renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true // transparency
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  //  renderer.outputEncoding = THREE.sRGBEncoding;
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


  initCube();
  initNetWorkBackground();



  // add listeners
  window.addEventListener('resize', onWindowResize, false);

  document.addEventListener('mousemove', function(e) {

    // si la souris bouge et qu'elle est appuyée alors on change la rotation du cube
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

    // small move of background net graph
    group.position.x += (e.offsetX - previousMousePosition.x) * 0.01;
    group.position.y += (e.offsetY - previousMousePosition.y) * 0.01;


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

// https://threejs.org/examples/?q=buffer#webgl_buffergeometry_drawrange
function animateBackgroundLines() {

  checkDarkMode();

  let vertexpos = 0;
  let colorpos = 0;
  let numConnected = 0;

  for (let i = 0; i < particleCount; i++)
    particlesData[i].numConnections = 0;

  for (let i = 0; i < particleCount; i++) {

    // get the particle
    const particleData = particlesData[i];

    particlePositions[i * 3] += particleData.velocity.x;
    particlePositions[i * 3 + 1] += particleData.velocity.y;
    particlePositions[i * 3 + 2] += particleData.velocity.z;

    if (particlePositions[i * 3 + 1] < -rHalf || particlePositions[i * 3 + 1] > rHalf)
      particleData.velocity.y = -particleData.velocity.y;

    if (particlePositions[i * 3] < -rHalf || particlePositions[i * 3] > rHalf)
      particleData.velocity.x = -particleData.velocity.x;

    if (particlePositions[i * 3 + 2] < -rHalf / 2 || particlePositions[i * 3 + 2] > rHalf / 2)
      particleData.velocity.z = -particleData.velocity.z;

    if (effectController.limitConnections && particleData.numConnections >= effectController.maxConnections)
      continue;

    // Check collision
    for (let j = i + 1; j < particleCount; j++) {

      const particleDataB = particlesData[j];
      if (effectController.limitConnections && particleDataB.numConnections >= effectController.maxConnections)
        continue;

      const dx = particlePositions[i * 3] - particlePositions[j * 3];
      const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
      const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < effectController.minDistance) {

        particleData.numConnections++;
        particleDataB.numConnections++;

        let alpha = clamp((2 * (1 - dist / effectController.minDistance)), 0, 1);
        let color = new THREE.Color(effectController.backgroundColor).lerp(new THREE.Color(effectController.particulesColor), alpha);

        positions[vertexpos++] = particlePositions[i * 3];
        positions[vertexpos++] = particlePositions[i * 3 + 1];
        positions[vertexpos++] = particlePositions[i * 3 + 2];

        positions[vertexpos++] = particlePositions[j * 3];
        positions[vertexpos++] = particlePositions[j * 3 + 1];
        positions[vertexpos++] = particlePositions[j * 3 + 2];

        colors[colorpos++] = color.r;
        colors[colorpos++] = color.g;
        colors[colorpos++] = color.b;

        colors[colorpos++] = color.r;
        colors[colorpos++] = color.g;
        colors[colorpos++] = color.b;

        numConnected++;

      }

    }

  }


  linesMesh.geometry.setDrawRange(0, numConnected * 2);
  linesMesh.geometry.attributes.position.needsUpdate = true;
  linesMesh.geometry.attributes.color.needsUpdate = true;

  pointCloud.geometry.attributes.position.needsUpdate = true;


}

function animate() {
  animateBackgroundLines();

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

  render();

  setTimeout(function() {
    // Keep the animation going
    requestAnimationFrame(animate);
  }, 1000 / fps);

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

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
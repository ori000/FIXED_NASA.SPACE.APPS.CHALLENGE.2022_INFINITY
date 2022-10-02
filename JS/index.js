import * as THREE from "../node_modules/three/build/three.module.js";
import { EffectComposer } from "../node_modules/three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "../node_modules/three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "../node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js";


let camera;
let renderer;
let renderer2;
const canvas = document.getElementById("c1");
const canvas2 = document.getElementById("c2");



//const canvas = document.getElementsByTagName("canvas")[0];
const scene = new THREE.Scene();
const fov = 60;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

//camera
camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 8;
camera.position.x = 0;
scene.add(camera);

//default renderer
renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer2 = new THREE.WebGLRenderer({
    canvas: canvas2,
    antialias: true,
  });
renderer.autoClear = false;
renderer.setSize(window.innerWidth/4, window.innerHeight/4);
renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
renderer.setClearColor(0x000000, 0.0);

renderer2.autoClear = false;
renderer2.setSize(window.innerWidth/4, window.innerHeight/4);
renderer2.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
renderer2.setClearColor(0x000000, 0.0);

//bloom renderer
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth/4, window.innerHeight/4),
  1.5,
  0.4,
  0.85
);
const bloomPass2 = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth/4, window.innerHeight/4),
  1.5,
  0.4,
  0.85
);
bloomPass.threshold = 0;
bloomPass.strength = 2; //intensity of glow
bloomPass.radius = 0;

bloomPass2.threshold = 0;
bloomPass2.strength = 2; //intensity of glow
bloomPass2.radius = 0;

const bloomComposer = new EffectComposer(renderer);
const bloomComposer2 = new EffectComposer(renderer2);
bloomComposer.setSize(window.innerWidth/4, window.innerHeight/4);
bloomComposer.renderToScreen = true;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

bloomComposer2.setSize(window.innerWidth/4, window.innerHeight/4);
bloomComposer2.renderToScreen = true;
bloomComposer2.addPass(renderScene);
bloomComposer2.addPass(bloomPass2);

//sun object
const color = new THREE.Color("#FDB813");
const geometry = new THREE.IcosahedronGeometry(1, 15);
const material = new THREE.MeshBasicMaterial({ color: color });
const sphere = new THREE.Mesh(geometry, material);
sphere.position.set(0, 0, 0);
sphere.layers.set(1);
scene.add(sphere);

// galaxy geometry
const starGeometry = new THREE.SphereGeometry(80, 64, 64);

// galaxy material
const starMaterial = new THREE.MeshBasicMaterial({
  map: THREE.ImageUtils.loadTexture("texture/galaxy1.png"),
  side: THREE.BackSide,
  transparent: true,
});

// galaxy mesh
const starMesh = new THREE.Mesh(starGeometry, starMaterial);
starMesh.layers.set(1);
scene.add(starMesh);

//ambient light
const ambientlight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientlight);

//resize listner
window.addEventListener(
  "resize",
  () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth/4, window.innerHeight/4);
    renderer2.setSize(window.innerWidth/4, window.innerHeight/4);
    bloomComposer.setSize(window.innerWidth/4, window.innerHeight/4);
    bloomComposer2.setSize(window.innerWidth/4, window.innerHeight/4);
  },
  false
);

let rate;

rate=0.4;
var x=0;
//animation loop
const animate = () => {

  //bloomPass.strength = 2; //intensity of glow
  requestAnimationFrame(animate);
  
  if(bloomPass.strength>10)
    rate=-0.1 ;
  else if(bloomPass.strength<2)
    rate=0.1;
  bloomPass.strength+=0.5*Math.cos(x);
  bloomPass2.strength-=0.5*Math.cos(x);
  x+=(0.05) + multiplier.value/1000;
 
  starMesh.rotation.y += 0.01;
  camera.layers.set(1);
  bloomComposer.render();
  bloomComposer2.render();

  //bloomPass.strength+=1;
  
  //print(bloomPass.strength)
  
  
};
var multiplier = document.getElementById("slider");
function changeRate(){
    multiplier.nextElementSibling.value= multiplier.value;
    rate= rate * multiplier.value + 0.01;
    console.log(multiplier.value);
}

animate();

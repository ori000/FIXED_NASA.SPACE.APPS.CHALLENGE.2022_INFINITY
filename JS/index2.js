import * as THREE from "../node_modules/three/build/three.module.js";
import { EffectComposer } from "../node_modules/three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "../node_modules/three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "../node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js";


let camera;
let renderer;
const canvas = document.getElementById("c1");



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

renderer.autoClear = false;
renderer.setSize(window.innerWidth/4, window.innerHeight/4);
renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
renderer.setClearColor(0x000000, 0.0);



//bloom renderer
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth/4, window.innerHeight/4),
  1.5,
  0.4,
  0.85
);

bloomPass.threshold = 0;
bloomPass.strength = 2; //intensity of glow
bloomPass.radius = 0;



const bloomComposer = new EffectComposer(renderer);

bloomComposer.setSize(window.innerWidth/4, window.innerHeight/4);
bloomComposer.renderToScreen = true;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);



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
    bloomComposer.setSize(window.innerWidth/4, window.innerHeight/4);
  },
  false
);

let rate;

rate=0.4;
var x=0;
var y=0;
var t=0;
//animation loop
const animate = () => {
  requestAnimationFrame(animate);
  
  bloomPass.strength=Math.abs(y);
  t+=0.005* multiplier.value/10
  y=cepheidRate(t,5)*10;
  starMesh.rotation.y += 0.01;
  camera.layers.set(1);
  bloomComposer.render();
 
  
  
};

function cepheidRate( t,w){
  return 0.418*Math.sin(w*t-20.76)+0.1419*Math.sin(2*w*t-63.76)    
  +0.0664*Math.sin(3*w*t-91.57)+0.0354*Math.sin(4*w*t-112.62)  
  +0.020*Math.sin(5*w*t-129.47) ;

}
var multiplier = document.getElementById("slider");
function changeRate(){
    multiplier.nextElementSibling.value= multiplier.value;
    rate= rate * multiplier.value + 0.01;
    console.log(multiplier.value);
}

animate();

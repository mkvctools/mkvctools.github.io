import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

document.querySelector("#app").innerHTML = `
  <div class="bg-red-100 w-full h-full">
  <h1 class="bigger">Test</h1>
  </div>
`;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
scene.background = 'red';
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor( 0x000000, 0 ); // the default

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  Fog: true,
});

let min = -3;
let max = 3;
let x = 0;
const cubeArray = [];
for (let i = min; i <= max; i++) {
  let y_pos = i * 1.6;
  for (let j = min; j <= max; j++) {
    let cube = new THREE.Mesh(geometry, material);
    cube.position.x = j * 1.6;
    cube.position.y = y_pos;
    cubeArray.push(cube);
  }
}

for (let i = 0; i < cubeArray.length; i++) {
  scene.add(cubeArray[i]);
}

camera.position.z = 13;
camera.position.x = 0;

const frontLight = new THREE.PointLight(0xEA5600, 1, 1000); // soft white light
frontLight.position.z = 5;
const backLight = new THREE.PointLight(0x0A1032, 1, 1000);
backLight.position.z = -5;

scene.add(frontLight);
scene.add(backLight);

function animate() {
  requestAnimationFrame(animate);
    for (let i = 0; i < cubeArray.length; i++) {
      cubeArray[i].rotation.x += Math.random() * (0.01 - 0.005) + 0.005;
      cubeArray[i].rotation.y += Math.random() * (0.01 - 0.005) + 0.005;
      //camera.rotation.z += 0.00005;

    }
  
  renderer.render(scene, camera);
}

animate();

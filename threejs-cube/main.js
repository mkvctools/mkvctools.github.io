import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


document.querySelector('#app').innerHTML = `
  <div class="bg-red-100 w-full h-full">
  <h1 class="bigger">Test</h1>
  </div>
`


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshPhysicalMaterial( { 
  color: 0xEA5600,
  Fog: true,


 } );

for(let i = -3; i<=3;i++){
let y_pos = i * 1.5;
  for(let j = -3; j<=3; j++){
  let cube = new THREE.Mesh(geometry,material);

  cube.position.x = j*1.5;
  cube.position.y = y_pos;
  scene.add(cube);
  }
}


camera.position.z = 10;
camera.position.x = 0;

const light = new THREE.PointLight( 0xff0000, 1, 1000 );// soft white light
light.position.z = 5;

scene.add( light );

function animate() {
	requestAnimationFrame( animate );
  
  renderer.render( scene, camera );
}


animate();

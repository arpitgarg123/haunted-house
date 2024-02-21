import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js"
import { TextGeometry} from "three/examples/jsm/geometries/TextGeometry.js";

const canvas = document.querySelector("#myCanvas");

const size = {
    width: window.innerWidth,
    height: window.innerHeight
}
// resize
window.addEventListener("resize",function(){
size.width = window.innerWidth;
size.height = window.innerHeight;   
camera.aspect = size.width / size.height;
camera.updateProjectionMatrix();
renderer.setSize(size.width,size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
})
// texture
const textureLoader = new THREE.TextureLoader()
// grass texture
const grassColorTexture = textureLoader.load("static/textures/grass/color.jpg")
const grassaoTexture = textureLoader.load('static/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('static/textures/grass/normal.jpg')
const grassroughnessTexture = textureLoader.load("static/textures/grass/roughness.jpg")
grassColorTexture.repeat.set(8, 8)
grassaoTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassroughnessTexture.repeat.set(8, 8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassaoTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassroughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassaoTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassroughnessTexture.wrapT = THREE.RepeatWrapping

// brick texture
const bricksaoTexture = textureLoader.load('static/textures/bricks/ambientOcclusion.jpg')
const bricksColorTexture = textureLoader.load("static/textures/bricks/color.jpg")
const bricksNormalTexture = textureLoader.load('static/textures/bricks/normal.jpg')
const bricksroughnessTexture = textureLoader.load("static/textures/bricks/roughness.jpg")
// door texture
const doorAlphaTexture = textureLoader.load('static/textures/door/alpha.jpg')
const dooraoTexture = textureLoader.load('static/textures/door/ambientOcclusion.jpg')
const doorColorTexture = textureLoader.load("static/textures/door/color.jpg")
const doorheightTexture = textureLoader.load("static/textures/door/height.jpg")
const doormetalnessTexture = textureLoader.load("static/textures/door/metalness.jpg")
const doorNormalTexture = textureLoader.load('static/textures/door/normal.jpg')
const doorroughnessTexture = textureLoader.load("static/textures/door/roughness.jpg")
// scene
const scene = new THREE.Scene();
// fog

const fog = new THREE.Fog("#262837",1,15);
scene.fog = fog;
// camera 

const camera = new THREE.PerspectiveCamera(45,size.width/size.height,.1,1000);
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera);
// plane

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20,20),
    new THREE.MeshStandardMaterial({
        map : grassColorTexture,
        transparent : true,
        aoMap : grassaoTexture,
        normalMap : grassNormalTexture,
        roughnessMap : grassroughnessTexture,
    })
);
floor.geometry.setAttribute(
    'uv2',
new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
)

floor.rotation.x = -( Math.PI * 0.5);
floor.position.y = 0;

scene.add(floor);
// house 
const house = new THREE.Group();
scene.add(house);
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4,2.5,4),
    new THREE.MeshStandardMaterial({
        map : bricksColorTexture,
        transparent : true,
        aoMap : bricksaoTexture,
        normalMap : bricksNormalTexture,
        roughnessMap : bricksroughnessTexture,

    })
)
walls.geometry.setAttribute(
    'uv2',
new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
)
walls.position.y = 2.5 / 2
house.add(walls);
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5,1,4),
    new THREE.MeshStandardMaterial({color: "#b35f45"})
)
roof.position.y = 2.5 + 0.5;
roof.rotation.y = Math.PI * .25;
house.add(roof)

const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2,2),
    new THREE.MeshStandardMaterial({
        map : doorColorTexture,
        transparent : true,
        alphaMap : doorAlphaTexture,
        aoMap : dooraoTexture,
        displacementMap : doorheightTexture,
        displacementScale : .1,
        metalnessMap : doormetalnessTexture,
        normalMap : doorNormalTexture,
        roughnessMap : doorroughnessTexture,
        // side: THREE.DoubleSide,
    })
)
door.geometry.setAttribute(
    'uv2',
new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
)
door.position.y = .9;
door.position.z = 2 + .001;
house.add(door)

const bushGeometry = new THREE.SphereGeometry(1,16,16)
const bushMaterial = new THREE.MeshStandardMaterial({color: "#89c854"})
const bush1 = new THREE.Mesh(bushGeometry,bushMaterial);
bush1.scale.set(0.5,0.5,0.5)
bush1.position.set(.8,.2, 2.5)
const bush2 = new THREE.Mesh(bushGeometry,bushMaterial);
bush2.scale.set(0.25,0.25,0.25)
bush2.position.set(1.4,.1, 2.1)
const bush3 = new THREE.Mesh(bushGeometry,bushMaterial);
bush3.scale.set(0.4,0.4,0.4)
bush3.position.set( - 0.8,.1, 2.2)
const bush4 = new THREE.Mesh(bushGeometry,bushMaterial);
bush4.scale.set(0.15,0.15,0.15)
bush4.position.set( -1,0.05, 2.6)
house.add(bush1,bush2,bush3,bush4);
// text
const font = new FontLoader();

font.load("/fonts/helvetiker_regular.typeface.json",
(font) =>{
  const textGeometry = new TextGeometry(
    "The Dark house"
    ,{
        font : font,
        size : .5,
        height : .2,
        curveSegments : 5,
        bevelEnabled : true,
        bevelThickness : 0.03,
        bevelSize : 0.02,
        bevelOffset : 0,
        bevelSegments : 3,
    }
  );
  textGeometry.center()
    const material = new THREE.MeshMatcapMaterial({color : "white"});
  //   material.wireframe = true;
  
    const text = new THREE.Mesh(textGeometry, material); 
  text.position.y = 2.5 + 1.5
    scene.add(text);
})
// graves

const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.6 ,0.8 ,0.2);
const graveMaterial = new THREE.MeshStandardMaterial({color: "#b2b6b1"})

for(let i = 0; i < 50 ;i++){

    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 6
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
const grave  = new THREE.Mesh(graveGeometry, graveMaterial);
grave.position.set(x, .3, z);
grave.rotation.z = (Math.random() - 0.5) * 0.4;
grave.rotation.x = (Math.random() - 0.5) * 0.4;
grave.castShadow = true;
graves.add(grave);
}

// lights

const AmbientLight = new THREE.AmbientLight("#b9d5ff", 0.12);
scene.add(AmbientLight);
const moonlight = new THREE.DirectionalLight("#b9d5ff", 0.12)
scene.add(moonlight);

const doorLight = new THREE.PointLight("#ff7d46",1, 7);

doorLight.position.set(0,2.2,2.7);
house.add(doorLight);
// ghost 

const ghost1 = new THREE.PointLight("#ff00ff",2,3);
scene.add(ghost1);
const ghost2 = new THREE.PointLight("#00ffff",2,3);
scene.add(ghost2);
const ghost3 = new THREE.PointLight("#ffff00",2,3);
scene.add(ghost3);
// controls

const controls = new OrbitControls(camera,canvas);
controls.enableDamping = true;
// renderer
const renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setSize(size.width,size.height);
renderer.setPixelRatio(2);
renderer.setClearColor("#262837");
renderer.render(scene,camera);
// shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap 

moonlight.castShadow = true;
doorLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

walls.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;

floor.receiveShadow = true;
moonlight.shadow.mapSize.width = 256;
moonlight.shadow.mapSize.height = 256;
moonlight.shadow.camera.far = 15

doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7
ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 7

// animator
const clock = new THREE.Clock()

const tick = ()=>{
    const ElapsedTime = clock.getElapsedTime();
    // update ghost 
    const ghost1Angle = ElapsedTime * 0.5;
    ghost1.position.x = Math.cos(ghost1Angle) * 4;
    ghost1.position.z = Math.sin(ghost1Angle) * 4;
    ghost1.position.y = Math.sin(ElapsedTime * 3);
    const ghost2Angle = - ElapsedTime * 0.32;
    ghost2.position.x = Math.cos(ghost2Angle) * 5;
    ghost2.position.z = Math.sin(ghost2Angle) * 5;
    ghost2.position.y = Math.sin(ElapsedTime * 4) + Math.sin(ElapsedTime * 2.5);
    const ghost3Angle = ElapsedTime * 0.18;
    ghost3.position.x = Math.cos(ghost3Angle)  * (7 + Math.sin(ElapsedTime * .32));
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(ElapsedTime * .5));
    ghost3.position.y = Math.sin(ElapsedTime * 4) + Math.sin(ElapsedTime * 2.5);

    renderer.render(scene,camera);
    controls.update();
    window.requestAnimationFrame(tick);
}
tick();
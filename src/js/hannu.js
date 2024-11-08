import * as THREE from 'three'; 

// creating a scene and camera
const scene = new THREE.Scene(); 
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 ); 
camera.position.z = 10;



// creating a renderer
const renderer = new THREE.WebGLRenderer(); 
renderer.setSize( window.innerWidth, window.innerHeight ); 
document.body.appendChild( renderer.domElement );


// making a sphere object to test the scene
const geometry = new THREE.SphereGeometry( 1, 32, 32, WireframeGeometry );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );



function animate() {
    requestAnimationFrame( animate );
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    renderer.render( scene, camera );
}


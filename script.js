let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

let geometry = new THREE.SphereGeometry(1, 32, 32);
let texture = new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/8/80/Earth_Western_Hemisphere_transparent_background.png');
let material = new THREE.MeshBasicMaterial({ map: texture });
let sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
camera.position.z = 2.5;

function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.01;
    renderer.render(scene, camera);
}

window.onload = () => {
    animate();
    setTimeout(() => {
        document.getElementById("container").style.display = "none";
        document.getElementById("map").style.display = "block";
        let map = L.map('map').setView([45, 25], 3);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    }, 5000);
};

// Inițializare Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('scene') });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crearea sferei Pământului
const geometry = new THREE.SphereGeometry(2, 32, 32);
const textureLoader = new THREE.TextureLoader();
const earthMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load('earth_texture.jpg') // Adaugă o textură de Pământ
});
const mapMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load('map_texture.jpg') // Adaugă o textură de hartă
});
const earth = new THREE.Mesh(geometry, earthMaterial);
scene.add(earth);

// Poziționarea camerei
camera.position.z = 5;

// Animația de rotație și mărire
let scale = 1;
let transitionComplete = false;

function animate() {
    requestAnimationFrame(animate);
    earth.rotation.y += 0.01; // Rotația Terrei

    if (!transitionComplete) {
        if (scale < 10) { // Mărirea progresivă
            earth.scale.set(scale, scale, scale);
            scale += 0.02;
        } else {
            // Schimbare în hartă după ce se mărește complet
            earth.material = mapMaterial;
            transitionComplete = true;
        }
    }

    renderer.render(scene, camera);
}

animate();

// Ajustare canvas la redimensionarea ferestrei
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

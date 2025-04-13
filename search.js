
// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

// Three.js Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('.threejs-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Add Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Add Geometry
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ 
    color: 0xff,
    metalness: 0.5,
    roughness: 0.1
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

camera.position.z = 25;

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

// GSAP Animations
gsap.from('.search-container', {
    duration: 1,
    y: -100,
    opacity: 0,
    ease: 'power3.out'
});

// Image Search Functionality
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const gallery = document.getElementById('gallery');

searchButton.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (query) {
        const images = await searchImages(query);
        displayImages(images);
    }
});

async function searchImages(query) {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=OezXcG4gd-BiEPl84da9I1fq_DlXR-aZPzdCit5aZpQ`);
    const data = await response.json();
    return data.results.map(image => image.urls.regular);
}

function displayImages(images) {
    gallery.innerHTML = '';
    images.forEach(url => {
        const container = document.createElement('div');
        container.className = 'image-container';
        const img = document.createElement('img');
        img.src = url;
        container.appendChild(img);
        gallery.appendChild(container);
    });
    
    // GSAP ScrollTrigger for each image
    gsap.utils.toArray('.image-container').forEach((container, i) => {
        gsap.from(container, {
            scrollTrigger: {
                trigger: container,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: i * 0.1
        });
    });
}

// Initial Load
window.onload = async () => {
    const initialImages = await searchImages('nature');
    displayImages(initialImages);
};

// Window Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
// SIDEBAR ELEMENTS
const sideBar = document.querySelector('.sidebar');
const menuButton = document.querySelector('.menu-icon');
const closeButton = document.querySelector('.close-icon');

// OPEN SIDEBAR
menuButton.addEventListener("click", function(){
    sideBar.classList.remove('close-sidebar')
    sideBar.classList.add('open-sidebar')
})

closeButton.addEventListener("click", function(){
    sideBar.classList.remove('open-sidebar')
    sideBar.classList.add('close-sidebar')
})
document.addEventListener("mousemove", (event) => {
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;

    document.querySelectorAll(".parallax").forEach((element) => {
        const speed = element.getAttribute("data-speed");
        element.style.transform = `translate(${x * speed * 20}px, ${y * speed * 20}px)`;
    })
})

// SIGNIN PAGE OPEN AND CLOSE ANIMATION

const signinButton = document.getElementById('signinButton');
const signinPage = document.getElementById('signinPage');
const closeIcon = document.getElementById('closeIcon');

signinButton.addEventListener('click', function(){
    signinPage.classList.remove('closeSignin');
    signinPage.classList.add("openSignin")
});

closeIcon.addEventListener('click', function(){
    signinPage.classList.remove("openSignin");
    signinPage.classList.add('closeSignin');
})


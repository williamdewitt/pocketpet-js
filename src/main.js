import * as THREE from 'three';
    import { GUI } from 'lil-gui';
    import { Pet } from './pet';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const pet = new Pet(scene);

    const gui = new GUI();
    gui.add(pet, 'feed');
    gui.add(pet, 'play');
    gui.add(pet, 'sleep');
    const statusFolder = gui.addFolder('Status');

    function formatValue(value) {
      return value.toFixed(2).replace('.', ',');
    }

    statusFolder.add(pet, 'hunger').listen().name('Hunger').onFinishChange(() => {
      gui.__controllers.forEach(controller => {
        if (controller.property === 'hunger') {
          controller.domElement.querySelector('.c').textContent = formatValue(pet.hunger);
        }
      });
    });

    statusFolder.add(pet, 'playfulness').listen().name('Playfulness').onFinishChange(() => {
      gui.__controllers.forEach(controller => {
        if (controller.property === 'playfulness') {
          controller.domElement.querySelector('.c').textContent = formatValue(pet.playfulness);
        }
      });
    });

    statusFolder.add(pet, 'energy').listen().name('Energy').onFinishChange(() => {
      gui.__controllers.forEach(controller => {
        if (controller.property === 'energy') {
          controller.domElement.querySelector('.c').textContent = formatValue(pet.energy);
        }
      });
    });

    statusFolder.open();

    // Add a slider to adjust the decrement rate
    const settings = { decrementRateMultiplier: 1 };
    gui.add(settings, 'decrementRateMultiplier', 0.1, 3, 0.1).name('Decrement Rate').onChange(value => {
      pet.setDecrementRateMultiplier(value);
    });

    // Set camera position for isometric view
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);

    // Add a floor
    const floorGeometry = new THREE.PlaneGeometry(10, 10);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // Add a back wall
    const backWallGeometry = new THREE.PlaneGeometry(10, 5);
    const backWallMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
    const backWall = new THREE.Mesh(backWallGeometry, backWallMaterial);
    backWall.position.z = -5;
    backWall.position.y = 2.5;
    scene.add(backWall);

    // Add a side wall
    const sideWallGeometry = new THREE.PlaneGeometry(10, 5);
    const sideWallMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
    const sideWall = new THREE.Mesh(sideWallGeometry, sideWallMaterial);
    sideWall.rotation.y = Math.PI / 2;
    sideWall.position.x = -5;
    sideWall.position.y = 2.5;
    scene.add(sideWall);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    function animate() {
      requestAnimationFrame(animate);
      pet.update();
      renderer.render(scene, camera);
    }

    animate();

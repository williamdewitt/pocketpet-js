import * as THREE from 'three';

    export class Pet {
      constructor(scene) {
        this.scene = scene;
        this.hunger = 100;
        this.playfulness = 100;
        this.energy = 100;
        this.decrementRateMultiplier = 1;

        // Create an egg-like shape using SphereGeometry
        this.geometry = new THREE.SphereGeometry(0.5, 32, 32);
        this.material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.scale.set(1, 1.5, 1); // Scale to create an egg shape
        this.mesh.position.y = 0.75; // Position the pet on the floor
        this.scene.add(this.mesh);

        this.clock = new THREE.Clock();
      }

      setDecrementRateMultiplier(value) {
        this.decrementRateMultiplier = value;
      }

      feed() {
        this.hunger = Math.min(this.hunger + 10, 100);
        console.log('Feeding pet. Hunger:', this.hunger);
      }

      play() {
        this.playfulness = Math.min(this.playfulness + 10, 100);
        const playDecrementRate = (100 / 3600) / 2 * this.decrementRateMultiplier; // Half of the usual rate
        this.hunger = Math.max(this.hunger - playDecrementRate, 0);
        this.energy = Math.max(this.energy - playDecrementRate, 0);
        console.log('Playing with pet. Playfulness:', this.playfulness, 'Hunger:', this.hunger, 'Energy:', this.energy);
      }

      sleep() {
        this.energy = Math.min(this.energy + 10, 100);
        console.log('Putting pet to sleep. Energy:', this.energy);
      }

      update() {
        const delta = this.clock.getDelta();
        const decrementRate = delta * (100 / 3600) * this.decrementRateMultiplier; // 1-hour decrease rate

        this.hunger = Math.max(this.hunger - decrementRate, 0);
        this.playfulness = Math.max(this.playfulness - decrementRate, 0);
        this.energy = Math.max(this.energy - decrementRate, 0);

        // Removed rotational movement
      }
    }

import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import Stats from 'three/examples/jsm/libs/stats.module.js'

// Debug
const gui = new dat.GUI()

// Stats
const stats = Stats()
document.body.appendChild(stats.dom)

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x333333)
scene.fog = new THREE.Fog('lightblue', 1, 10)

// Util functions
const random = (min, max) => {
	return Math.floor(Math.random() * (max - min) + min)
}

const randomHex = () => {
	let n = (Math.random() * 0xfffff * 1000000).toString(16);
	return '#' + n.slice(0, 6);
};

const degreesToRadians = (degrees) => {
	return degrees * (Math.PI / 180)
}

// Objects
const geometry = new THREE.PlaneGeometry(50, 50, 1, 1);
geometry.rotateX(degreesToRadians(90))

// Materials
const material = new THREE.MeshLambertMaterial({
	color: '#a6a6a6',
	wireframe: false,
	side: THREE.DoubleSide
})

// Mesh
const plane = new THREE.Mesh(geometry, material);
plane.castShadow = true
plane.receiveShadow = true
plane.position.y = -2.8
scene.add(plane)

// Lights
const lightDirectional = new THREE.DirectionalLight(0xffffff, 1)
scene.add(lightDirectional)
lightDirectional.position.set(5, 5, 5)

const lightAmbient = new THREE.AmbientLight(0x9eaeff, 0.2)
scene.add(lightAmbient)

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
}

window.addEventListener('resize', () => {
	// Update sizes
	sizes.width = window.innerWidth
	sizes.height = window.innerHeight

	// Update camera
	camera.aspect = sizes.width / sizes.height
	camera.updateProjectionMatrix()

	// Update renderer
	renderer.setSize(sizes.width, sizes.height)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.5, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 25
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas,
	antialias: true,
	alpha: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// GUI method
const createDataGui = function() {
	const gui = new GUI();
	gui.add(manageControls, "addBuilding");
}

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () => {

	const elapsedTime = clock.getElapsedTime()

	// Update objects


	// Update Orbital Controls
	controls.update()

	// Render
	renderer.render(scene, camera)

	// Call tick again on the next frame
	window.requestAnimationFrame(tick)
}

tick()
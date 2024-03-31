import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RectAreaLightHelper} from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()
// Gui Practice
const debugObject = { }

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// ----------------------------------------------
/**
 * Lights
 */

debugObject.ambientColor = 0xffffff;

// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, .5)
scene.add(ambientLight)

// Adding properties to the gui
const ambientTweaks = gui.addFolder('Ambient Light')
ambientTweaks.add(ambientLight, 'visible')
ambientTweaks.addColor(ambientLight, `color`)
ambientTweaks.add(ambientLight, 'intensity').min(0).max(3).step(.001)
ambientTweaks.close();

// ------------

// Directional Light
const directionalLight = new THREE.DirectionalLight(0xfffffc, .9)
scene.add(directionalLight)

// Helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionalLightHelper)


// Tweaks
const directionalTweaks = gui.addFolder('Directional Lights')
directionalTweaks.add(directionalLight, 'visible')
directionalTweaks.addColor(directionalLight,'color')
directionalTweaks.add(directionalLight,'intensity').min(0).max(20).step(.0001)
directionalTweaks.add(directionalLight.position, 'x').min(-5).max(5).step(.001)
directionalTweaks.add(directionalLight.position, 'y').min(-5).max(5).step(.001)
directionalTweaks.add(directionalLight.position, 'z').min(-5).max(5).step(.001)
directionalTweaks.add(directionalLightHelper, 'visible').name("Helper")
directionalTweaks.close();

// --------
// Hemisphere Light
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0xff0000, .9)
scene.add(hemisphereLight)

// Helper
const hemiHelper = new THREE.HemisphereLightHelper(hemisphereLight, .2)
scene.add(hemiHelper)

// Tweaks
const hempisphereTweaks = gui.addFolder('Hemisphere Light')
hempisphereTweaks.add(hemisphereLight, `visible`)
hempisphereTweaks.addColor(hemisphereLight, `color`)
hempisphereTweaks.addColor(hemisphereLight, `groundColor`)
hempisphereTweaks.add(hemisphereLight, 'intensity').min(0).max(3).step(.001)
hempisphereTweaks.add(hemiHelper, `visible`).name("Helper")

hempisphereTweaks.close();

// ---------
// RectArea Light
const rectColor = 0x4e00ff; // color
const rectIntensity = 6; // intensity
const rectWidth = 1; // width
const rectHeight = 1; // height
const rectAreaLight = new THREE.RectAreaLight(rectColor, rectIntensity, rectWidth, rectHeight)
scene.add(rectAreaLight)

// Helper
const rectHelper = new RectAreaLightHelper(rectAreaLight)
scene.add(rectHelper)


// Tweaks
const rectAreaTweaks = gui.addFolder('RectArea Light')
rectAreaTweaks.add(rectAreaLight, 'visible')
rectAreaTweaks.addColor(rectAreaLight,'color')
rectAreaTweaks.add(rectAreaLight,'width').min(0).max(5).step(.0001)
rectAreaTweaks.add(rectAreaLight,'height').min(0).max(5).step(.0001)
rectAreaTweaks.add(rectAreaLight,'intensity').min(0).max(10).step(.0001)
rectAreaTweaks.add(rectAreaLight.position, 'x').min(-5).max(5).step(.001)
rectAreaTweaks.add(rectAreaLight.position, 'y').min(-5).max(5).step(.001)
rectAreaTweaks.add(rectAreaLight.position, 'z').min(-5).max(5).step(.001)
rectAreaTweaks.add(rectAreaLight.rotation, 'x').min(0).max(359).step(1)
rectAreaTweaks.add(rectAreaLight.rotation, 'y').min(0).max(359).step(1)
rectAreaTweaks.add(rectAreaLight.rotation, 'z').min(0).max(359).step(1)
rectAreaTweaks.close()
// --------
// Spot Light
// color, intensity, distance, angle, penumbra, decay
const spotColor = 0x78ff00
const spotIntensity = 4.5
const spotDistance = 10
const spotAngle = Math.PI * 0.1
const spotPenumbra = 0.25
const spotDecay = 1
const spotLight = new THREE.SpotLight(spotColor, spotIntensity, spotDistance, spotAngle, spotPenumbra, spotDecay)
spotLight.position.set(0,2,3)
scene.add(spotLight)

const spotTweaks = gui.addFolder('Spot Light')
spotTweaks.add(spotLight, 'visible')
spotTweaks.addColor(spotLight,'color').min(0).max(20).step(.0001)
spotTweaks.add(spotLight,'intensity').min(0).max(20).step(.0001)
spotTweaks.add(spotLight,'distance').min(0).max(20).step(.0001)
spotTweaks.add(spotLight,'angle').min(0).max(2.5).step(.0001)
spotTweaks.add(spotLight,'penumbra').min(0).max(3).step(.0001)
spotTweaks.add(spotLight,'decay').min(0).max(4).step(.0001)
spotTweaks.add(spotLight.position, 'x').min(-5).max(5).step(.001)
spotTweaks.add(spotLight.position, 'y').min(-5).max(5).step(.001)
spotTweaks.add(spotLight.position, 'z').min(-5).max(5).step(.001)
spotTweaks.close();

// gui.close()
// ----------------------------------------------

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

const modelTweaks = gui.addFolder('Models')
modelTweaks.add(sphere, 'visible').name("Sphere")
modelTweaks.add(cube, 'visible').name("Cube")
modelTweaks.add(torus, 'visible').name("Torus")
modelTweaks.add(plane, 'visible').name("Plane")
modelTweaks.close();


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
/**
 * Three.js
 * https://threejs.org/
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
init();
async function init() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // 床
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 1000),
    // 光を反射するマテリアル
    new THREE.MeshStandardMaterial({
      color: 0xf4f4f4,
      side: THREE.DoubleSide,
    })
  );

  /**
   * 2023/05/04 three.js 0.152.0 対応
   * Three.jsのバージョンアップ（0.152.0）に伴い、THREE.MathをTHREE.MathUtilsに変更しています。
   */
  floor.rotation.x = THREE.MathUtils.degToRad(90);
  floor.position.y = -50;
  scene.add(floor);

  // メッシュ作成
  const geometry = new THREE.TorusKnotGeometry(5, 1.5, 100, 100);
  const basic = new THREE.MeshBasicMaterial({ color: 0x3f7b9d });
  // 光を必要とするマテリアル
  const lambert = new THREE.MeshLambertMaterial({ color: 0x3f7b9d });
  // 光沢のあるマテリアルでroughnessで指定でき、0だとてかてか
  const standard = new THREE.MeshStandardMaterial({
    color: 0x3f7b9d,
    roughness: 0,
  });

  const mesh1 = new THREE.Mesh(geometry, basic);
  mesh1.position.x -= 20;

  const mesh2 = new THREE.Mesh(geometry, lambert);

  const mesh3 = new THREE.Mesh(geometry, standard);
  mesh3.position.x += 20;

  scene.add(mesh1, mesh2, mesh3);

  // 軸ヘルパー
  const axis = new THREE.AxesHelper(20);
  scene.add(axis);

  camera.position.z = 30;

  const control = new OrbitControls(camera, renderer.domElement);

  // ライト
  // 均等に照らすライト
  // const amlight = new THREE.AmbientLight(0xffffff);
  // scene.add(amlight);

  // 平行に光を照らすライト
  const directionLight = new THREE.DirectionalLight(0xffffff, 1);
  directionLight.position.set(0, 4, 10);
  // directionLight.target.position.set(0, 10, 5);
  const dhelper = new THREE.DirectionalLightHelper(directionLight);
  scene.add(directionLight, directionLight.target, dhelper);

  // 点光源
  const plight = new THREE.PointLight(0xffffff, 1, 100);
  const spherical = new THREE.Spherical(20, 0, 0);
  plight.position.setFromSpherical(spherical);
  const pHelper = new THREE.PointLightHelper(plight);
  scene.add(plight, pHelper);

  let i = 0;
  function animate() {
    requestAnimationFrame(animate);
    spherical.phi += 0.01;
    plight.position.setFromSpherical(spherical);
    // pHelper.update();
    control.update();

    renderer.render(scene, camera);
  }

  animate();
}

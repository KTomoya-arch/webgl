import * as THREE from "three";

init();
async function init() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // 立方体のジオメトリを作成
  const geometry = new THREE.BoxGeometry(5, 5, 5);

  // テクスチャの設定
  const textureLoader = new THREE.TextureLoader();
  const texture = await textureLoader.loadAsync("/img/header_spla.jpeg");

  // テクスチャフィルタリングを設定して画質向上
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  const material = new THREE.MeshBasicMaterial({ map: texture });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 15;

  // ライトを追加
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(10, 10, 10);
  scene.add(light);

  let rotationSpeed = 0.01;

  // アニメーションの中で回転と色の変化を行う
  function animate() {
    requestAnimationFrame(animate);

    // 立方体を回転させる
    cube.rotation.x += rotationSpeed;
    cube.rotation.y += rotationSpeed;

    // パーティクルの色をランダムに変更
    const randomColor = Math.random() * 0xffffff;
    cube.material.color.set(randomColor);

    renderer.render(scene, camera);
  }

  animate();

  // クリックした時に回転速度を変更
  document.addEventListener("click", () => {
    rotationSpeed += 0.01;
  });
}

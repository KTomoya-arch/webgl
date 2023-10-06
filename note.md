- 色や画像 ⇨ マテリアル
- 形 ⇨ ジオメトリ

これらを組み合わせてメッシュとする
メッシュを複数とライトを組み合わせて、シーンというものを構成する

シーンをレンダラーに追加する(html の canvas に 3D を描写するための API)

- parcel
  es6,es7 の JS を es5 に変化させたり、複数の js を一つのモジュールファイルにする

- ジオメトリ
  ジオメトリは色んなやつがある ⇨Three.js の公式ドキュメント参照すること。
  三角形でできている。
- マテリアル
  Three.js で画像を読み込みたい場合にはテクスチャー(texture)に画像を変換してマテリアルに突っ込む。

### 学び

- material の clone()をしなければならない理由

```
const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const material2 = material1.clone();
```

上記で material2 に material1 の clone()を渡している。
clone を渡すのではなく、const material2 = material1 を代入すると maetrial1 オブジェクトの参照を渡すことになるので material2 の色も material1 の色を変えると変わってしまう。

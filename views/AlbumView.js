// views/AlbumView.js

const AlbumView = {
  template: `
    <div class="container py-4">
      <h3>アルバム（サンプル）</h3>
      <p>ここに生成済みの日記・絵本サムネイルをカード表示します。</p>
      <div class="row row-cols-1 row-cols-md-3 g-3">
        <div class="col" v-for="n in 6" :key="n">
          <div class="card h-100">
            <svg class="bd-placeholder-img card-img-top" width="100%" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder"
                 preserveAspectRatio="xMidYMid slice" focusable="false">
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#868e96"></rect>
              <text x="50%" y="50%" fill="#dee2e6" dy=".3em" text-anchor="middle">Diary #{{n}}</text>
            </svg>
            <div class="card-body">
              <p class="card-text small">わんちゃんとの思い出を振り返ろう！</p>
              <a href="#" class="stretched-link">開く</a>
            </div>
          </div>
        </div>
      </div>
    </div>`
};

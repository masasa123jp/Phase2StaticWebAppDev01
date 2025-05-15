// views/AlbumView.js

const AlbumView = {
  setup() {
    const photos = Vue.reactive([
      // ダミーデータ
      { id:1, date:'2025-05-01', tags:['散歩'], src:'https://picsum.photos/300/200?random=1' },
      { id:2, date:'2025-05-03', tags:['ご飯'], src:'https://picsum.photos/300/200?random=2' },
      /* ... 合計12件程度 ... */
    ]);
    const filterDate = Vue.ref('');
    const filterTag = Vue.ref('');
    const currentPage = Vue.ref(1);
    const perPage = 6;

    const filtered = Vue.computed(() => {
      return photos.filter(p => {
        return (!filterDate.value || p.date===filterDate.value)
            && (!filterTag.value || p.tags.includes(filterTag.value));
      });
    });
    const paged = Vue.computed(() => {
      const start = (currentPage.value-1)*perPage;
      return filtered.value.slice(start, start+perPage);
    });
    function openModal(src) {
      const img = document.getElementById('albumModalImg');
      img.src = src;
      new bootstrap.Modal(document.getElementById('albumModal')).show();
    }
    function changePage(n){ currentPage.value = n; }

    return { filterDate, filterTag, paged, filtered, currentPage, perPage, photos, openModal, changePage };
  },
  template: `
    <div class="container py-4">
      <h3>フォトアルバム</h3>
      <!-- フィルター -->
      <div class="row gy-2 gx-2 mb-3">
        <div class="col-md-4">
          <input type="date" class="form-control" v-model="filterDate" />
        </div>
        <div class="col-md-4">
          <select class="form-select" v-model="filterTag">
            <option value="">タグでフィルター</option>
            <option v-for="t in ['散歩','ご飯','お風呂']">{{t}}</option>
          </select>
        </div>
        <div class="col-md-4 text-end">
          <button class="btn btn-secondary" @click="filterDate='';filterTag=''">クリア</button>
        </div>
      </div>

      <!-- ギャラリー -->
      <div class="row row-cols-1 row-cols-md-3 g-3">
        <div class="col" v-for="p in paged" :key="p.id">
          <div class="card h-100">
            <img :src="p.src" class="card-img-top" style="cursor:pointer"
                 @click="openModal(p.src)" />
            <div class="card-body">
              <p class="card-text small text-muted">{{p.date}} / {{p.tags.join(', ')}}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ページネーション -->
      <nav class="mt-3">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage===1 }">
            <a class="page-link" @click.prevent="changePage(currentPage-1)">前へ</a>
          </li>
          <li class="page-item" 
              v-for="n in Math.ceil(filtered.length/perPage)" 
              :key="n" :class="{ active: currentPage===n }">
            <a class="page-link" @click.prevent="changePage(n)">{{n}}</a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage*perPage>=filtered.length }">
            <a class="page-link" @click.prevent="changePage(currentPage+1)">次へ</a>
          </li>
        </ul>
      </nav>

      <!-- プレビュー用モーダル -->
      <div class="modal fade" id="albumModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content bg-transparent border-0">
            <img id="albumModalImg" class="img-fluid rounded" />
          </div>
        </div>
      </div>
    </div>`
};

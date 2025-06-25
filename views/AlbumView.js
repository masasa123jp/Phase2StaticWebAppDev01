// views/AlbumView.js

import { defineComponent, reactive, ref, computed, nextTick } from 'vue';
import * as bootstrap from 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js';

export default defineComponent({
  name: 'AlbumView',
  setup() {
    // ダミーデータ（合計12件程度）
    const photos = reactive([
      { id: 1,  date: '2025-05-01', tags: ['散歩'], src: 'https://picsum.photos/300/200?random=1' },
      { id: 2,  date: '2025-05-03', tags: ['ご飯'], src: 'https://picsum.photos/300/200?random=2' },
      { id: 3,  date: '2025-05-05', tags: ['お風呂'], src: 'https://picsum.photos/300/200?random=3' },
      { id: 4,  date: '2025-05-07', tags: ['散歩'], src: 'https://picsum.photos/300/200?random=4' },
      { id: 5,  date: '2025-05-10', tags: ['ご飯'], src: 'https://picsum.photos/300/200?random=5' },
      { id: 6,  date: '2025-05-12', tags: ['お風呂'], src: 'https://picsum.photos/300/200?random=6' },
      { id: 7,  date: '2025-05-14', tags: ['散歩'], src: 'https://picsum.photos/300/200?random=7' },
      { id: 8,  date: '2025-05-16', tags: ['ご飯'], src: 'https://picsum.photos/300/200?random=8' },
      { id: 9,  date: '2025-05-18', tags: ['お風呂'], src: 'https://picsum.photos/300/200?random=9' },
      { id: 10, date: '2025-05-20', tags: ['散歩'], src: 'https://picsum.photos/300/200?random=10' },
      { id: 11, date: '2025-05-22', tags: ['ご飯'], src: 'https://picsum.photos/300/200?random=11' },
      { id: 12, date: '2025-05-24', tags: ['お風呂'], src: 'https://picsum.photos/300/200?random=12' }
    ]);

    const filterDate  = ref('');
    const filterTag   = ref('');
    const currentPage = ref(1);
    const perPage     = 6;

    const filtered = computed(() =>
      photos.filter(p =>
        (!filterDate.value || p.date === filterDate.value) &&
        (!filterTag.value  || p.tags.includes(filterTag.value))
      )
    );

    const paged = computed(() => {
      const start = (currentPage.value - 1) * perPage;
      return filtered.value.slice(start, start + perPage);
    });

    function openModal(src) {
      nextTick(() => {
        const imgEl = document.getElementById('albumModalImg');
        if (imgEl) imgEl.src = src;
        const modalEl = document.getElementById('albumModal');
        if (modalEl) new bootstrap.Modal(modalEl).show();
      });
    }

    function changePage(n) {
      currentPage.value = n;
    }

    return {
      filterDate,
      filterTag,
      paged,
      filtered,
      currentPage,
      perPage,
      openModal,
      changePage
    };
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
            <option v-for="t in ['散歩','ご飯','お風呂']" :key="t">{{ t }}</option>
          </select>
        </div>
        <div class="col-md-4 text-end">
          <button class="btn btn-secondary" @click="filterDate=''; filterTag=''">クリア</button>
        </div>
      </div>

      <!-- ギャラリー -->
      <div class="row row-cols-1 row-cols-md-3 g-3">
        <div class="col" v-for="p in paged" :key="p.id">
          <div class="card h-100">
            <img
              :src="p.src"
              class="card-img-top"
              style="cursor:pointer"
              @click="openModal(p.src)"
            />
            <div class="card-body">
              <p class="card-text small text-muted">
                {{ p.date }} / {{ p.tags.join(', ') }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- ページネーション -->
      <nav class="mt-3">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" @click.prevent="changePage(currentPage - 1)">前へ</a>
          </li>
          <li
            class="page-item"
            v-for="n in Math.ceil(filtered.length / perPage)"
            :key="n"
            :class="{ active: currentPage === n }"
          >
            <a class="page-link" @click.prevent="changePage(n)">{{ n }}</a>
          </li>
          <li
            class="page-item"
            :class="{ disabled: currentPage * perPage >= filtered.length }"
          >
            <a class="page-link" @click.prevent="changePage(currentPage + 1)">次へ</a>
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
    </div>
  `
});

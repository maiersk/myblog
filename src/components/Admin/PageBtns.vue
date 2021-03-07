<template>
  {{pagelist}}
  <div class="page_btn flex justify-center align-center" 
    v-if="paging && list.value?.data?.length"
  >
    <base-btn class="prev_btn" btnValue="Prev"
      :disabled="page === 0 ? true : false"
      @click.prevent="prevPage()"
    ></base-btn>
    <ul class="c_ul flex" v-if="list.value?.total_pages ?? false">
      <li v-for="i in pagelist[pagelistidx]" :key="i">
        <base-btn
          btnClass="p_btn" :btnValue="''+i"
          :disabled="page === i - 1 ? true : false"
          @click.prevent="selectPage(i - 1)"
        >
        </base-btn>
      </li>
    </ul>
    <span>page: {{page + 1}}</span>
    <base-btn class="next_btn" btnValue="Next"
      :disabled="page + 1 === list.value.total_pages ? true : false"
      @click.prevent="nextPage()"
    ></base-btn>
  </div>
</template>

<script>
import BaseBtn from "../BaseButton";

export default {
  components: {
    BaseBtn,
  },
  emits: {
    getAll: null
  },
  inject: ['list', 'page'],
  props: {
    paging: {
      type: Boolean,
      defalut: false
    },
    pagecount: {
      type: Number,
      defalut: 0
    }
  },
  data() {
    return {
      pagelist: [],
      pagelistidx: 0,
    }
  },
  methods: {
    selectPage(i) {
      this.page = i
      this.$emit('getAll')
    },
    prevPage() {
      if (this.page <= 0) return
      if (this.page % this.pagecount === 0) {
        this.pagelistidx -= 1
      }
      this.page -= 1
      this.$emit('getAll')
    },
    nextPage() {
      if (this.page >= this.list?.total_pages ?? false) return
      if ((this.page + 1) % this.pagecount === 0) {
        this.pagelistidx += 1
      }
      this.page += 1
      this.$emit('getAll')
    },
    initPage() {
      if (this.pagelist.length) this.pagelist = []
      if (!this.list?.total_pages ?? false) return
      let arr = new Array(this.list.total_pages)
        .fill().map((_, i) => {return i+1})
      console.log(arr);
      arr.some(() => {
        this.pagelist.push(arr.splice(0, this.pagecount))
      })
      if (arr.length !== 0) {
        this.pagelist.push(arr)
      }
      console.log(this.pagelist)
    },
  }
}
</script>

<style lang="scss" scoped>
.page_btn {
  ul {
    flex-shrink: 1;

    li {
      .p_btn {
        width: 2rem;
        height: 2rem;
      }
    }
  }
  > span {
    display: none;
  }
  .prev_btn {
    width: 2rem;
    height: 2rem;
    font-size: 10px;
    font-weight: normal;
    flex-shrink: 1;
  }

  .next_btn {
    @extend .prev_btn;
  }
}

@media (max-width: 768px) {
  .page_btn {
    > span {
      display: block !important;
    }
    > ul {
      display: none !important;
    }
  }
}
</style>
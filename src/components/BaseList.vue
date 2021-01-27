<template>
  <div class="base_list">
    <div class="list_header">
      <span>{{name}} List</span>

      <slot name="operate">
        <div class="list_operate">
          <a class="c_a add_btn text-c-green"
            @click.prevent="openModal('create')"
          >
            <faIcon :icon="['fas', 'plus']"></faIcon>
          </a>

          <a class="c_a edit_btn text-c-blue"
            @click.prevent="openModal('edit')"
          >
            <faIcon :icon="['fas', 'pen']"></faIcon>
          </a>

          <a class="c_a del_btn text-c-red"
            @click.prevent="openModal('del')"
          >
            <faIcon :icon="['fas', 'times']"></faIcon>
          </a>
        </div>
      </slot>
    </div>
    <slot name="List" :list="list.data">
      <ul class="ul_list c_ul flex flex-warp">
        <span class="m-1 block-center" v-if="!list.data?.length">no item</span>
        <li v-for="item in list.data" :key="item.id">
          <input type="checkbox" :id="`${name}_select_${item.id}`"
            :ref="`${name}_selectRef_${item.id}`"
            @change="select_item(item.id)"
            :checked="selectModels.value.includes(item.id)"
          >
          <label :for="options.selectItems ? `${name}_select_${item.id}` : ''">
            <slot name="c_item" :item="item">
              {{item.name}}
            </slot>
          </label>
        </li>
      </ul>
    </slot>

    <!-- 列表分页 -->
    <div class="page_btn flex justify-center align-center" 
      v-if="options.paging && list.data?.length"
    >
      <base-btn class="prev_btn" btnValue="Prev"
        :disabled="page === 0 ? true : false"
        @click.prevent="prevPage()"
      ></base-btn>
      <ul class="c_ul flex" v-if="list?.total_pages ?? false">
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
        :disabled="page === list.total_pages ? true : false"
        @click.prevent="nextPage()"
      ></base-btn>
    </div>
  </div>

  <teleport to="body">
    <create-model v-show="select_modal === 'create'"
      :name="name" modalName="create"
      @isClick="add()"
    >
      <template #body>
        <slot name="createModel"></slot>
      </template>
    </create-model>
    <edit-model v-show="select_modal === 'edit'"
      :name="name" modalName="edit"
      @selectId="select($event)"
      @isClick="edit()"
      @clean="cleanModel()"
    >
      <template #body>
        <slot name="editModel"></slot>
      </template>
    </edit-model>
    <del-model v-show="select_modal === 'del'"
      :name="name" modalName="del"
      @selectId="select($event)"
      @isClick="del()"
    >
      <template #body>
        <slot name="deleteModel"></slot>
      </template>
    </del-model>
  </teleport>
</template>

<script>
import { computed } from 'vue'
import {axiosReq} from '../plugins/axios'
import createModel from './Modals/createModel'
import editModel from './Modals/editModel'
import delModel from './Modals/delModel'
import BaseBtn from './BaseButton'

export default {
  components: {
    createModel,
    editModel,
    delModel,
    BaseBtn,
  },
  props: {
    name: {
      type: String,
      default: 'List'
    },
    url: {
      type: String,
      default: '/'
    },
    options: {
      type: Object,
      default() {
        return {
          selectItems: false,
          paging: false,
          pagecount: 5,
          count: 10,
        }
      }
    },
  },
  inject: ['model', 'selectModels'],
  provide() {
    return {
      strModal: computed({
        set: (val) => {this.select_modal = val},
        get: () => {return this.select_modal}
      }),
      objModel: computed(() => {return this.model}),
      list: computed(() => {return this.list.data})
    }
  },
  data() {
    return {
      select_modal: '',
      list: {},
      page: 0,
      pagelist: [],
      pagelistidx: 0,
    }
  },
  created() {
    this.getAll()
  },
  beforeUnmount() {
    // 清理选中的models
    if (this.selectModels?.value?.length ?? false) {
      this.selectModels.value.length = 0
    }
  },
  methods: {
    openModal(name) {
      this.select_modal = name
    },
    cleanModel() {
      this.model.value = {}
    },
    select_item(id) {
      const _selectRef = this.$refs[`${this.name}_selectRef_${id}`]
      const _selModels = this.selectModels

      if (_selectRef.checked && !_selModels.value.includes(id)) {
        _selModels.value.push(id)
      } else {
        _selModels.value.splice(_selModels.value.indexOf(id), 1)
      }
    },
    initPage() {
      if (this.pagelist.length) this.pagelist = []
      if (!this.list.total_pages) return
      let arr = new Array(this.list.total_pages + 1)
        .fill().map((_, i) => {return i+1})

      arr.some(() => {
        this.pagelist.push(arr.splice(0, this.options.pagecount))
      })
      if (arr.length !== 0) {
        this.pagelist.push(arr)
      }
    },
    selectPage(i) {
      this.page = i
      this.getAll()
    },
    prevPage() {
      if (this.page <= 0) return
      if (this.page % this.options.pagecount === 0) {
        this.pagelistidx -= 1
      }
      this.page -= 1
      this.getAll()
    },
    nextPage() {
      if (this.page >= this.list.total_pages) return
      if ((this.page + 1) % this.options.pagecount === 0) {
        this.pagelistidx += 1
      }
      this.page += 1
      this.getAll()
    },
    getAll() {
      let url = this.url
      const {paging, count} = this.options
      if (paging) {
        url = `${this.url}?page=${this.page}&count=${count ? count : 10}`
      }

      axiosReq({
        method: 'get',
        url,
      }).then((res) => {
        this.list = res
        this.initPage()
      }).catch((err) => {
        this.$root.openNotifi(false, err.message)
      })
    },
    select(id) {
      axiosReq({
        method: 'get',
        url: `${this.url}/${id}`,
      }).then(({ data }) => {
        this.model.value = data
      }).catch((err) => {
        this.$root.openNotifi(false, err.message)
      })
    },
    add() {
      axiosReq({
        method: 'post',
        url: this.url,
        data: this.model.value,
      }).then(({ data }) => {
        this.list.data.push(data)
        this.cleanModel()
        this.$root.openNotifi(true, 'create success')
      }).catch((err) => {
        this.$root.openNotifi(false, err.message)
      })
    },
    edit() {
      if (this.model.value?.id ?? false) {
        const id = this.model.value.id

        axiosReq({
          method: 'put',
          url: `${this.url}/${id}`,
          data: this.model.value,
        }).then(() => {
          this.getAll()
          this.cleanModel()
          this.$root.openNotifi(true, 'edit success')
        }).catch((err) => {
          this.$root.openNotifi(false, err.message)
        })
      }
    },
    del() {
      if (this.model.value?.id ?? false) {
        const id = this.model.value.id

        axiosReq({
          method: 'delete',
          url: `${this.url}/${id}`,
        }).then(() => {
          this.list.data = this.list.data.filter((item) => { return item.id !== id })
          this.cleanModel()
          this.$root.openNotifi(true, 'delete success')
        }).catch((err) => {
          this.$root.openNotifi(false, err.message)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../public/scss/global.scss";

.base_list {
  margin-top: 0.5rem;
  border: 1px solid #303030;
  background-color: #202020;
  
  > .ul_list {
    li {
      display: flex;
      align-items: center;
      margin: 0.25rem;

      > input {
        display: none;
      }
      > label {
        display: block;
      }
  
      > input:checked + label {
        border-radius: 4px;
        background-color: #ffffff;
      }
    }
  }

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
}

.list_header {
  padding: 0.5rem;
  background-color: $c_second;
  font-weight: 700;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  
  display: flex;
  justify-content: space-between;

  .list_operate {
    max-width: 200px;
    min-width: 150px;
    display: flex;

    > a {
      text-align: center;
      flex-grow: 1;
      > svg {
        width: 16px;
        height: 16px;
        transition: 1s ease;

      }
      > svg:hover {
        color: white;
      }
    } 
  }
}

@media (max-width: 768px) {
  .input_search {
    margin: 0;
    height: 20px;
  }

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

<template>
  <div class="base_list">
    <div class="list_header">
      <span>{{name}} List</span>

      <slot name="operate">
        <!-- 列表管理 -->
        <modalCRUD :name="name">
          <template #createModel>
            <slot name="create"></slot>
          </template>
          <template #editModel>
            <slot name="edit"></slot>
          </template>
          <template #deleteModel>
            <slot name="delete"></slot>
          </template>
        </modalCRUD>
      </slot>
    </div>
    <slot name="List" :list="list.data">
      <ul class="ul_list c_ul" :class="options.row ? 'flex-row' : 'flex-column'">
        <span class="m-1 block-center" v-if="!list.data?.length">no item</span>
        <li v-for="item in list.data" :key="item.id">

          <!-- 选中项目 -->
          <select-model :name="name" :item="item">
            <template #select_dom>
              <slot name="c_item" :item="item">
                {{item.name}}
              </slot>
            </template>
          </select-model>
        </li>
      </ul>
    </slot>

    <!-- 列表分页 -->
    <page-btns :options="options"></page-btns>
  </div>
</template>

<script>
import { computed } from "vue";
import { axiosReq } from "../../plugins/axios";
import selectModel from "./SelectModel";
import pageBtns from "./PageBtns";
import modalCRUD from "./CURD/ModalCRUD";

/**
 * 基础模型CRUD组件
 * inject: model
 * 
 */

export default {
  components: {
    selectModel,
    pageBtns,
    modalCRUD,
  },
  mixins: [
    selectModel,
    pageBtns,
    modalCRUD,
  ],
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
          row: false,
        }
      }
    },
  },
  inject: [],
  provide() {
    return {
      list: computed(() => {return this.list.data}),
    }
  },
  data() {
    return {
      list: {},
    }
  },
  created() {
    console.log(this)
    this.getAll()
  },
  methods: {
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
        if (!res.data.length) {
          this.prevPage()
        }
      }).catch((err) => {
        this.$root.openNotifi(false, err)
      })
    },
    select(id) {
      axiosReq({
        method: 'get',
        url: `${this.url}/${id}`,
      }).then(({ data }) => {
        this.model.value = data
      }).catch((err) => {
        this.$root.openNotifi(false, err)
      })
    },
    add() {
      axiosReq({
        method: 'post',
        url: this.url,
        data: this.model.value,
      }).then(() => {
        this.getAll()
        this.cleanModel()
        this.$root.openNotifi(true, 'create success')
      }).catch((err) => {
        this.$root.openNotifi(false, err)
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
          this.$root.openNotifi(false, err)
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
          this.getAll()
          this.cleanModel()
          this.$root.openNotifi(true, 'delete success')
        }).catch((err) => {
          this.$root.openNotifi(false, err)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../public/scss/global.scss";

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
        width: 100%;
        display: block;
      }
  
      > input:checked + label {
        border-radius: 4px;
        background-color: #ffffff;
      }
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

}

@media (max-width: 768px) {
  .input_search {
    margin: 0;
    height: 20px;
  }
}
</style>

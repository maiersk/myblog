<template>
  <div class="contanier">
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
      <slot name="List" :list="list">
        <ul class="c_ul flex">
          <span class="m-1 block-center" v-if="!list.length">no item</span>
          <li v-for="item in list" :key="item.id">
            <slot name="c_item" :item="item">
              {{item.name}}
            </slot>
          </li>
        </ul>
      </slot>
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
  </div>
</template>

<script>
import { computed } from 'vue'
import {axiosReq} from '../plugins/axios'
import createModel from './Modals/createModel'
import editModel from './Modals/editModel'
import delModel from './Modals/delModel'

export default {
  components: {
    createModel,
    editModel,
    delModel,
  },
  inject: ['model'],
  provide() {
    return {
      strModal: computed({
        set: (val) => {this.select_modal = val},
        get: () => {return this.select_modal}
      }),
      objModel: computed(() => {return this.model}),
      list: computed(() => {return this.list})
    }
  },
  props: {
    name: {
      type: String,
      default: 'List'
    },
    url: {
      type: String,
      default: '/'
    }
  },
  data() {
    return {
      select_modal: '',
      list: [],
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    openModal(name) {
      this.select_modal = name
    },
    getAll() {
      axiosReq({
        method: 'get',
        url: this.url,
      }).then((res) => {
        this.list = res
      }).catch((err) => {
        this.$root.openNotifi(false, err.message)
      })
    },
    select(id) {
      axiosReq({
        method: 'get',
        url: `${this.url}/${id}`,
      }).then((res) => {
        this.model.value = res
      }).catch((err) => {
        this.$root.openNotifi(false, err.message)
      })
    },
    add() {
      axiosReq({
        method: 'post',
        url: this.url,
        data: this.model.value,
      }).then((res) => {
        this.list.push(res)
        this.$root.openNotifi(true, 'create success')
      }).catch((err) => {
        this.$root.openNotifi(false, err.message)
      })
    },
    edit() {
      if (this.model.value?.id ?? false) {
        const id = this.model.value.id
        console.log(this.model.value);
        axiosReq({
          method: 'put',
          url: `${this.url}/${id}`,
          data: this.model.value,
        }).then(() => {
          this.getAll()
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
          this.list = this.list.filter((item) => { return item.id !== id })
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
    min-width: 100px;
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
</style>

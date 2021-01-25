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
    <slot name="List" :list="list">
      <ul class="ul_list c_ul flex flex-warp">
        <span class="m-1 block-center" v-if="!list.length">no item</span>
        <li v-for="item in list" :key="item.id">
          <input type="checkbox" :id="`select_${item.id}`"
            :ref="`${name}_selectRef_${item.id}`"
          >
          <label :for="`select_${item.id}`" @click="select_item()">
            <slot name="c_item" :item="item">
              {{item.name}}
            </slot>  
          </label>
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

export default {
  components: {
    createModel,
    editModel,
    delModel,
  },
  inject: ['model', "selectModel"],
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
    cleanModel() {
      this.model.value = {}
    },
    select_item() {
      if (this.selectModel === undefined) { return }

      this.list.forEach((item) => {
        const _selectRef = this.$refs[`${this.name}_selectRef_${item.id}`]

        if (_selectRef.checked) {
          const id = _selectRef.id.substr(-1)
          if (this.selectModel.value.includes(id)) { return }
          this.selectModel.value.push(id)
        }
      })

      console.log(this.selectModel);
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
        console.log(id);
        axiosReq({
          method: 'delete',
          url: `${this.url}/${id}`,
        }).then(() => {
          this.list = this.list.filter((item) => { return item.id !== id })
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

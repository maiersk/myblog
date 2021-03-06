<template>
  <div class="base_list">
    <div class="list_header">
      <span>{{name}} List</span>

      <slot name="operate">
        <!-- 列表管理 -->
        <div class="modalCRUD">
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
        </div>
      </slot>
    </div>

    <base-list :array="list.data" :row="options.row">
      <template #c_item="d">
        <!-- 选中项目 -->
        <select-model :name="name" :item="d.item" :selectItems="options.selectItems">
          <template #select_dom>
            <slot name="c_item" :item="d.item">
              {{d.item.name}}
            </slot>
          </template>
        </select-model>
      </template>
    </base-list>

    <!-- 列表分页 -->
    <page-btns
      :ref="pageBtnsRef"
      :paging="options.paging"
      :pagecount="options.pagecount"
      @getAll="getAll()"
    ></page-btns>
  </div>
</template>

<script>
import { computed } from 'vue'
import createModel from '../../Modals/createModel'
import editModel from '../../Modals/editModel'
import delModel from '../../Modals/delModel'
import selectModel from "../SelectModel";
import listBaseCRUD from '../listBaseCRUD'

export default {
  components: {
    createModel,
    editModel,
    delModel,
    selectModel,
  },
  mixins: [
    listBaseCRUD
  ],
  inject: ['model'],
  props: {
  },
  provide() {
    return {
      strModal: computed({
        set: (val) => {this.select_modal = val},
        get: () => {return this.select_modal}
      }),
      objModel: computed(() => {return this.model}),
    }
  },
  data() {
    return {
      select_modal: '',
    }
  },
  created() {
    this.pageBtnsRef = `${this.name}_page_btns`
  },
  methods: {
    openModal(name) {
      this.select_modal = name
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../../../public/scss/global.scss";

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

}

.modalCRUD {
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

@media (max-width: 768px) {
  .input_search {
    margin: 0;
    height: 20px;
  }
}
</style>

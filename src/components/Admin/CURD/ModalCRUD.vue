<template>
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
        @isClick="$parent.add()"
      >
        <template #body>
          <slot name="createModel"></slot>
        </template>
      </create-model>
      <edit-model v-show="select_modal === 'edit'"
        :name="name" modalName="edit"
        @selectId="$parent.select($event)"
        @isClick="$parent.edit()"
        @clean="cleanModel()"
      >
        <template #body>
          <slot name="editModel"></slot>
        </template>
      </edit-model>
      <del-model v-show="select_modal === 'del'"
        :name="name" modalName="del"
        @selectId="$parent.select($event)"
        @isClick="$parent.del()"
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
import createModel from '../../Modals/createModel'
import editModel from '../../Modals/editModel'
import delModel from '../../Modals/delModel'

export default {
  components: {
    createModel,
    editModel,
    delModel
  },
  inject: ['model'],
  props: {
    name: {
      type: String,
      default: ''
    }
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
  methods: {
    openModal(name) {
      this.select_modal = name
    },
    cleanModel() {
      this.model.value = {}
    },

  }
}
</script>

<style lang="scss" scoped>
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
</style>
<template>
  <div class="w-100" v-if="selectItems">
    <input type="checkbox" :id="`${name}_select_${item.id}`"
      :ref="`${name}_selectRef_${item.id}`"
      @change="select_item(item.id)"
      :checked="selectModels.value.includes(item.id)"
    >
    <label :for="`${name}_select_${item.id}`">
      <slot name="select_dom">
        item
      </slot>
    </label>
  </div>
  <div class="w-100" v-else>
    <slot name="select_dom">
      item
    </slot>
  </div>
</template>

<script>
export default {
  inject: ['selectModels'],
  props: {
    name: {
      type: String,
      default: ''
    },
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    selectItems: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  beforeUnmount() {
    // 清理选中的models
    if (this.selectModels?.value?.length ?? false) {
      this.selectModels.value.length = 0
    }
  },
  methods: {
    select_item(id) {
      const _selectRef = this.$refs[`${this.name}_selectRef_${id}`]
      const _selModels = this.selectModels

      if (_selectRef.checked && !_selModels.value.includes(id)) {
        _selModels.value.push(id)
      } else {
        _selModels.value.splice(_selModels.value.indexOf(id), 1)
      }
    },
  }
}
</script>

<style scoped>
  input {
    display: none;
  }
  label {
    display: block;
  }

  input:checked + label {
    height: 100%;
    width: 100%;
    border-radius: 4px;
    background-color: #ffffff;
  }
</style>
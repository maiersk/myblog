<template>
  <modalCRUD name="Tags" url="/tags" :options="{
    selectItems: true,
    row: true,
    paging: true,
    pagecount: 4,
    count: 5,
  }">
    <template #c_item="d">
      <tag-model :name="d.item.name" :col="d.item.color"></tag-model>
    </template>

    <template v-slot:createModel>
      <div class="form-group">
        <label>Tag Name:</label>
        <input type="text" class="input_text" 
          id="tag_name" v-model="model.name"
        />
      </div>
      <div class="form-group">
        <label>Tag Color:</label>
        <input type="color" class="input_col"
          id="tag_color" v-model="model.color"
        />
      </div>
    </template>
    <template v-slot:editModel>
      <div class="form-group">
        <label>Tag Name:</label>
        <input type="text" class="input_text"
          id="tag_name" v-model="model.name"
        />
      </div>
      <div class="form-group">
        <label>Tag Color:</label>
        <input type="color" class="input_col"
          id="tag_color" v-model="model.color"
        />
      </div>
    </template>
    <template v-slot:deleteModel>
      <div></div>
    </template>
  </modalCRUD>
</template>

<script>
import tagModel from './Buttons/tagModel'
import modalCRUD from './Admin/CURD/ModalCRUD'
import { computed } from 'vue'

export default {
  components: {
    tagModel,
    modalCRUD
  },
  props: {
    tags: {
      type: Array,
      default() {
        return []
      }
    }
  },
  provide() {
    return {
      model: computed({
        set: (val) => {
          this.model = Object.keys(val).length !== 0 ? val : {
          id: null, name: null, color: "#000000"
        }},
        get: () => {return this.model}
      }),
      // 用于v-model绑定选中的标签
      selectModels: computed({
        // v-model编译后是使用input事件改变值的，只需要emit到父组件即可
        set: (val) => {this.$emit('input:tags', val)},
        get: () => {return this.tags}
      })
    }
  },
  data() {
    return {
      model: {
        id: null,
        name: null,
        color: "#000000",
      },
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../../public/scss/global.scss";

@media (max-width: 768px) {
  // .admin_panel {

  // }
}
</style>
<template>
  <base-list name="Tags" url="/tags">
    <template #c_item="d">
      <tag-btn :name="d.item.name" :col="d.item.color"></tag-btn>
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
  </base-list>
</template>

<script>
import tagBtn from './Buttons/tagBtn'
import BaseList from './BaseList'
import { computed } from 'vue'

export default {
  components: {
    tagBtn,
    BaseList
  },
  provide() {
    return {
      model: computed({
        set: (val) => {this.model = val.length !== 0 ? val : {
          id: null, name: null, color: "#000000"
        }},
        get: () => {return this.model}
      }),
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
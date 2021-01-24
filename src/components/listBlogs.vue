<template>
  <base-list name="Blog" url="/posts">
    <template v-slot:Manage="m_Props">
      <button @click.prevent="m_Props.fn.getAll">update</button>
    </template>
    <template v-slot:List="l_props">
      {{l_props.list}}
    </template>

    <template v-slot:createModel>
      <div class="form-group">
        <label>Post Title:</label>
        <input type="text" class="input_text" 
          id="tag_name" v-model="model.name"
        />
      </div>
      <div class="form-group">
        <label>Post tags:</label>
        <div class="input_div">
          <list-tags></list-tags>
        </div>
      </div>
      <div class="form-group">
        <label>Post content:</label>
        <textarea class="textarea_c" cols="30" rows="35"></textarea>
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
import listTags from './listTags'
import BaseList from './BaseList'
import { computed } from 'vue'

export default {
  components: {
    listTags,
    BaseList
  },
  provide() {
    return {
      model: computed({
        set: (val) => {this.model = val},
        get: () => {return this.model}
      })
    }
  },
  data() {
    return {
      model: {}
    }
  },
  methods: {
    
  }
}
</script>

<style>

</style>
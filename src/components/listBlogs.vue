<template>
  <base-list name="Blog" url="/posts">
    <template #c_item="d">
      <div class="container blog_div">
        <div class="title">{{d.item.title}}</div>
        <div class="tags">{{d.item.tags}}</div>
        <div class="content">{{d.item.content}}</div>
      </div>
    </template>

    <template v-slot:createModel>
      <div class="form-group">
        <label>Post Title:</label>
        <input type="text" class="input_text" 
          id="tag_name" v-model="model.title"
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
        <textarea class="textarea_c" 
          cols="30" rows="35" v-model="model.content"
        ></textarea>
      </div>
    </template>
    <template v-slot:editModel>
      <div class="form-group">
        <label>Post Title:</label>
        <input type="text" class="input_text" 
          id="tag_name" v-model="model.title"
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
        <textarea class="textarea_c" 
          cols="30" rows="35" v-model="model.content"
        ></textarea>
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
        set: (val) => {this.model = val.length !== 0 ? val : {
          id: null, title: null, tags: [], content: null
        }},
        get: () => {return this.model}
      }),
      selectModel: computed({
        set: (val) => {this.tags = val},
        get: () => {return this.tags}
      })
    }
  },
  data() {
    return {
      tags: [],
      model: {
        id: null,
        title: null,
        tags: [],
        content: null,
      }
    }
  },
  methods: {
    
  },
  // watch: {
  //   'model.tags': {
  //     deep: true,
  //     handler(val) {
  //       console.log(val)
  //     }
  //   }
  // }
}
</script>

<style lang="scss" scoped>

</style>
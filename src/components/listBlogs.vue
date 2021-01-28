<template>
  <base-list name="Blog" url="/posts" :options="{
    selectItems: false,
    row: false,
    paging: false,
    pagecount: 4,
    count: 5,
  }">
    <template #c_item="d">
      <div class="container blog_div p-1">
        <div class="title m-1 flex justify-between align-center">
          <span>{{d.item.title}}</span>

          <div class="tags m-s1">
            <ul class="c_ul flex align-center">
              <li v-for="tag in d.item.tags" :key="tag">
                {{tag}}
              </li>
            </ul>
          </div>
        </div>
        <div class="content m-s1">
          <p>
            {{d.item.content}}
          </p>
        </div>
        <div class="operator flex justify-between align-center">
          <div class="comments">
            <span>comments</span>
          </div>
          <div class="time">
            <span>
              {{time(d.item.createdAt)}}
            </span>
          </div>
        </div>
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
          <list-tags v-model:tags="model.tags"></list-tags>
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
          <list-tags v-model:tags="model.tags"></list-tags>
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
  props: {
    posts: {
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
          id: null, title: null, tags: [], content: null
        }},
        get: () => {return this.model}
      }),
      selectModels: computed({
        set: (val) => {this.$emit('input:posts', val)},
        get: () => {return this.posts || []}
      }),
    }
  },
  data() {
    return {
      model: {
        id: null,
        title: null,
        tags: [],
        content: null,
      }
    }
  },
  methods: {
    time(str_time) {
      const date = new Date(str_time)
      let arr = []
      arr.push(date.getFullYear())
      arr.push(date.getMonth() + 1)
      arr.push(date.getDate())

      return arr.join('/') + ` ${date.getHours()}:${date.getMinutes()}` 
    }
  },
}
</script>

<style lang="scss" scoped>
.blog_div {
  background-color: #282828;
  border-bottom: 1px solid #303030;

  .title {

    > span {
      font-size: 24px;
    } 

    .tags {

    }
  }
  .content {

  }
}
</style>
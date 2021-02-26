<template>
  <base-list name="Blog" url="/posts" :options="{
    selectItems: false,
    row: false,
    paging: false,
    pagecount: 4,
    count: 5,
  }">
    <template #c_item="d">
      <div class="container blog_div p-2">
        <div class="top">
          <div class="title_item">
            <span class="title">
              {{d.item.title}}
            </span>
            <span class="time">
              {{time(d.item.createdAt)}}
            </span>
          </div>
        </div>
        <div class="content">
          <p>
            {{d.item.content}}
          </p>
        </div>
        <div class="other_item flex align-center">
          <div class="comments flex align-center border">
            <faIcon :icon="['fas', 'comments']"></faIcon>
            <span class="m-1">{{d.item.comments?.length ?? 0}}</span>
          </div>
          <div class="viewcount flex align-center">
            <faIcon :icon="['fas', 'eye']"></faIcon>
            <span class="m-1">{{d.item?.viewCount ?? 0}}</span>
          </div>

          <span class="m-1">|</span>

          <div class="tags flex align-center">
            <faIcon :icon="['fas', 'tags']"></faIcon>
            <ul class="c_ul m-1 flex">
              <li v-for="tag in d.item.tags" :key="tag">
                <tag-btn :name="tag.name" :col="tag.color"></tag-btn>
              </li>
            </ul>
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
import tagBtn from './Buttons/tagBtn'
import BaseList from './BaseList'
import { computed } from 'vue'

export default {
  components: {
    listTags,
    BaseList,
    tagBtn
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
          // 避免edit model时清理了之前选中的tags
          let _tags = this.model.tags
          // select modal在select tag时，把已有选有的tag显示在列表
          if (val.tags?.length ?? false) {
            _tags = val.tags.map((v) => {return v.id})
          }

          this.model = Object.keys(val).length !== 0 ? {
            ...val, tags: _tags
          } : {
            id: null, title: null, tags: [], content: null
          }
        },
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

      return arr.join('/')
    }
  },
}
</script>

<style lang="scss" scoped>
.blog_div {
  background-color: #282828;
  border-bottom: 1px solid #303030;
  transition: all 0.5s ease;

  .top {
    display: table;
    white-space: nowrap;
    text-align: center;

    .title_item {
      margin: 0 0.5rem;

      .title {
        font-weight: 600;
        font-size: 1.4rem;
        cursor: pointer;
      }
      .time {
        font-size: .5em;
        margin-left: 20px;
      }
    }
  }

  .top::before {
    position: relative;
    display: table-cell;
    border-top: 1px solid #e8e8e8;
    top: 50%;
    width: 5%;
    transform: translateY(50%);
    content: "";
  }
  .top::after {
    @extend .top::before;
    width: 95%;
  }

  .content {
    max-height: 260px;
    margin: 1rem 0;
    padding: 0.5rem;
  }

  .other_item {
    height: 20px;
  }
}
.blog_div:hover {   
  background-color: rgba(255, 178, 69, 0.5);
  box-shadow: 0 1px 10px 2px rgba(0, 0, 0, 0);
}
</style>
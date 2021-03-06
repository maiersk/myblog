<template>
  <modalCRUD name="Blog" url="/posts" :options="{
    selectItems: false,
    row: false,
    paging: false,
    pagecount: 4,
    count: 5,
  }">
  
    <template #c_item="d">
      <div class="container blog_div p-2">
        <div class="top">
          <div class="title_item flex align-center">
            <router-link class="c_a title" 
              :to="{path: '/blog', query: {id: d.item.id}}"
            >
              {{d.item.title}}
            </router-link>
            <span class="time">
              {{$root.format_time(d.item.createdAt, "YYYY-mm-dd")}}
            </span>
          </div>
        </div>
        <router-link class="c_a" 
          :to="{path: '/blog', query: {id: d.item.id}}"
        >
          <div class="content" v-html="$root.markedContent(d.item.content)">
          </div>
        </router-link>
        <div class="other_item flex align-center">
          <div class="comments flex align-center">
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
                <tag-model :name="tag.name" :col="tag.color"></tag-model>
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

  </modalCRUD>
</template>

<script>
import listTags from './listTags'
import tagModel from './Buttons/tagModel'
// import BaseList from './BaseList'
import modalCRUD from './Admin/CURD/ModalCRUD'
import { computed } from 'vue'

export default {
  components: {
    listTags,
    // BaseList,
    modalCRUD,
    tagModel
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
  }
}
</script>

<style lang="scss" scoped>
.blog_div {
  background-color: #282828;
  border-bottom: 1px solid #303030;
  transition: all 0.5s ease;
  margin-bottom: 1.5rem;

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
      .title:hover {
        color: rgb(255, 178, 69);
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
    overflow: hidden;
    color: white;
  }

  .other_item {
    height: 20px;

    .comments {
      margin-right: 0.5rem;
    }
    .viewcount {
      @extend .comments;
    }

    .tags {
      margin: 0 1rem;
    }
  }
}
.blog_div:hover {   
  background-color: rgba(255, 178, 69, 0.5);
  box-shadow: 0 1px 10px 2px rgba(0, 0, 0, 0);
}
</style>
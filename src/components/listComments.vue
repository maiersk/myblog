<template>
  <listBaseCRUD name="Comment" url="/comments" :options="{
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
              {{$root.format_time(d.item.createdAt, "YYYY-MM-dd")}}
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
  </listBaseCRUD>
</template>

<script>
import { computed } from "vue";
import listBaseCRUD from "./Admin/listBaseCRUD";
import tagModel from "../components/Buttons/tagModel";
import listTags from "../components/listTags";
// import BaseList from "./BaseList";

export default {
  components: {
    // BaseList,
    listBaseCRUD,
    tagModel,
    listTags
  },
  props: {
    comments: {
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
          this.model = Object.keys(val).length !== 0 ? { ...val } : {
            id: null,         
            content: null,
            postId: null,
            userId: null,
            replyId: null
          }
        },
        get: () => {return this.model}
      }),
      selectModels: computed({
        set: (val) => {this.$emit('input:comments', val)},
        get: () => {return this.comments || []}
      }),
    }
  },
  data() {
    return {
      model: {
        id: null,
        content: null,
        postId: null,
        userId: null,
        replyId: null
      }
    }
  }
}
</script>

<style>

</style>
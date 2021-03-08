<template>
  <div class="discuss">
    <div class="discuss_header">
      <span>{{0}}</span>条评论
      <div class="c-divider c-divider-horizontal"></div>
    </div>
    <divCRUD name="Comment" url="/comments" :options="{
      selectItems: false,
      row: false,
      paging: false,
      pagecount: 4,
      count: 5,
    }">
      <template #c_operate>
        <div class="">
          <comment-model :send_model="true"></comment-model>
        </div>
      </template>

      <template #c_item="d">
        <comment-model :model="d.item"></comment-model>
      </template>
    </divCRUD>
  </div>
</template>

<script>
import { computed } from "vue";
import divCRUD from "./Admin/CURD/DivCRUD";
import commentModel from "./commentModel";

export default {
  components: {
    divCRUD,
    commentModel,
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

<style lang="scss" scoped>
  .discuss {
    position: relative;
    box-sizing: border-box;

    > .discuss_header {
      > span {
        color: #d78520;
        padding: 0 8px;
      }
    }

    > .send_comment {

    }
  }
</style>
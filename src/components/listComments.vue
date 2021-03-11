<template>
  <div class="discuss">
    <div class="discuss_header">
      <span>{{crudRef?.list?.data?.length ?? 0}}</span>条评论
      <div class="c-divider c-divider-horizontal"></div>
    </div>
    <divCRUD name="Comment" url="/comments" 
      ref="crudRef"
      :options="{
        search: `postId=${postId}`,
        selectItems: false,
        row: false,
        paging: false,
        pagecount: 4,
        count: 5,
      }">
      <template #c_operate>
        <commentModel>
          <template #c_content>
            <textarea class="textarea_c" rows="4"
              v-model="model.content"
            ></textarea>

            <base-btn class="ml-auto"
              btnValue="Send"
              @click.prevent="crudRef.add()"
            ></base-btn>
          </template>
        </commentModel>
      </template>

      <template #c_item="comment">
        <commentModel class="ptb-1" :model="comment.item">
          <template #c_actions>
            <a class="c_a replay mr-1">
              replay
            </a>

            <a class="c_a delete_btn text-c-red"
              @click.prevent="crudRef.del(comment.item.id)"
            >
              <faIcon :icon="['fas', 'trash-alt']"></faIcon>
            </a>
          </template>
        </commentModel>
      </template>
    </divCRUD>
  </div>
</template>

<script>
import { computed } from "vue";
import divCRUD from "./Admin/CURD/DivCRUD";
import commentModel from "./commentModel";
import baseBtn from "./BaseButton";

export default {
  components: {
    divCRUD,
    commentModel,
    baseBtn,
  },
  props: {
    postId: {
      type: Number,
      default: -1
    },
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
        postId: this.postId,
        userId: null,
        replyId: null
      },
      state: this.$store.state,
      comments: [],
      crudRef: null,
    }
  },
  mounted() {
    this.crudRef = this.$refs['crudRef']
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
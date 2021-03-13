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

      <!-- 评论列 -->
      <template #c_item="comment">
        <commentModel class="ptb-1" :model="comment.item">
          <template #c_actions>
            <a class="c_a mr-1"
              @click.prevent="openReply === `reply_${comment.item.id}` ?
                openReply = '' : openReply = `reply_${comment.item.id}`
              "
            >
              reply
            </a>

            <a class="c_a delete_btn text-c-red"
              v-if="state.isLogged"
              @click.prevent="crudRef.del(comment.item.id)"
            >
              <faIcon :icon="['fas', 'trash-alt']"></faIcon>
            </a>
          </template>

          <!-- 外部回复组件 -->
          <template #c_rear>
            <div v-if="openReply === `reply_${comment.item.id}`">
              <commentModel class="reply" :showAvatar="false">
                <template #c_content>
                  <textarea class="textarea_c" rows="4"
                    :ref="`rpy_c_${comment.item.id}`"
                  ></textarea>

                  <base-btn class="ml-auto"
                    btnValue="Send"
                    @click.prevent="add_Reply(comment.item.id,
                      $refs[`rpy_c_${comment.item.id}`].value
                    )"
                  ></base-btn>
                </template>
              </commentModel>
            </div>

            <!-- 回复评论列 -->
            <div v-if="comment.item?.replies?.length !== 0">
              <div class="reply_comment"
                v-for="(reply, i) in comment.item.replies"
                :key="i"
              >
                <commentModel class="ptb-1"
                  :model="reply">
                  <template #c_actions>
                    <a class="c_a mr-1"
                      @click.prevent="openReply === `reply_${reply.id}_inner` ?
                        openReply = '' : openReply = `reply_${reply.id}_inner`
                      "
                    >
                      reply
                    </a>

                    <a class="c_a delete_btn text-c-red"
                      v-if="state.isLogged"
                      @click.prevent="del_Reply(reply.id)"
                    >
                      <faIcon :icon="['fas', 'trash-alt']"></faIcon>
                    </a>
                  </template>

                  <!-- 内部回复组件 -->
                  <template #c_rear>
                    <div v-if="openReply === `reply_${reply.id}_inner`">
                      <commentModel class="reply" :showAvatar="false">
                        <template #c_content>
                          <textarea class="textarea_c" rows="4"
                            :ref="`rpy_c_${i}_inner`"
                          ></textarea>

                          <base-btn class="ml-auto"
                            btnValue="Send"
                            @click.prevent="add_Reply(comment.item.id,
                              $refs[`rpy_c_${i}_inner`].value
                            )"
                          ></base-btn>
                        </template>
                      </commentModel>
                    </div>
                  </template>
                </commentModel>
              </div> 
            </div>
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
import { axiosReq } from "../plugins/axios";

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
      openReply: '',
    }
  },
  mounted() {
    this.crudRef = this.$refs['crudRef']
  },
  methods: {
    add_Reply(commentId, content) {
      axiosReq({
        method: 'post',
        url: '/comments/reply',
        data: {
          commentId,
          content
        }
      }).then((res) => {
        console.log(res)

        this.crudRef.getAll()
        this.$root.openNotifi(true, 'Send success')
      }).catch((err) => {
        this.$root.openNotifi(false, err)
      })
    },
    del_Reply(replyId) {
      axiosReq({
        method: 'delete',
        url: `/comments/reply/${replyId}`,
      }).then((res) => {
        console.log(res)

        this.crudRef.getAll()
        this.$root.openNotifi(true, 'delet success')
      }).catch((err) => {
        this.$root.openNotifi(false, err)
      })
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

    .reply {
      padding: 1rem 0 0 1rem;
    }

    .reply_comment {
      padding: 1rem 0 0 3.5rem;
    }
  }
</style>
<template>
  <modalCRUD name="Comment" url="/comments" :options="{
    selectItems: false,
    row: false,
    paging: false,
    pagecount: 4,
    count: 5,
  }">
    <template #c_item="d">
      <comment-model :model="d.item"></comment-model>
    </template>

    <template v-slot:createModel>
      <div class="form-group">
        <label>Comment content:</label>
        <textarea class="textarea_c" 
          cols="30" rows="35" v-model="model.content"
        ></textarea>
      </div>
    </template>
    <template v-slot:editModel>
      <div class="form-group">
        <label>Comment content:</label>
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
import { computed } from "vue";
import modalCRUD from "./Admin/CURD/ModalCRUD";
import commentModel from "./commentModel";
// import BaseList from "./BaseList";

export default {
  components: {
    // BaseList,
    modalCRUD,
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

<style>

</style>
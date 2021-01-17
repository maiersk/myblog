<template>
  <div class="list_tags_div">
    <div class="add_tag">
      <form ref="formRef" @submit.prevent="addTag()">
        <div>
          <label>Tag Name:</label>
          <input type="text" id="tag_name">
        </div>
        <div>
          <label>Tag Color:</label>
          <input type="color" id="tag_color">
        </div>
        <input class="btn btn-theme" type="submit" value="Add Tag">
      </form>
    </div>
    <div class="list_tags">
      <ul class="c_ul" >
        <li v-for="(tag, i) in tags" :key="i">
          <tag-btn :name="tag.name" :col="tag.color" />
          <a class="c_a"><faIcon :icon="['fas','times']" size="1x"></faIcon></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from '../plugins/axios'
import tagBtn from './Buttons/tagBtn'

export default {
  components: {
    tagBtn
  },
  data() {
    return {
      tags: []
    }
  },
  beforeCreate() {
    axios({
      method: 'get',
      url: '/tags'
    }).then((res) => {
      if (res.data.success && res.data.data) {
        this.tags = res.data.data
      }
    })
  },
  methods: {
    addTag() {
      const addform = this.$refs.formRef
      console.log(addform);
    },
  }
}
</script>

<style lang="scss" scoped>
  .list_tags {
    ul {
      display: flex;
      flex-flow: row wrap;
      flex-grow: 1;
      li {
        display: flex;
        flex-direction: row;
        align-items: center;

        a {
          text-align: center;
        }
        .tag_div {
          
        }
      }
    }
  }
</style>
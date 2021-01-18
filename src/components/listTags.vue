<template>
  <div class="list_tags_div">
    <div class="add_tag">
      <form @submit.prevent="addTag()">
        <div>
          <label>Tag Name:</label>
          <input type="text" id="tag_name" v-model="form.name">
        </div>
        <div>
          <label>Tag Color:</label>
          <input type="color" id="tag_color" v-model="form.color">
        </div>
        <input class="btn btn-theme" type="submit" value="Add Tag">
      </form>
    </div>
    <div class="list_tags">
      <ul class="c_ul">
        <li v-for="(tag) in tags" :key="tag.id" :index="tag.id">
          <tag-btn :name="tag.name" :col="tag.color" />
          <a class="c_a del_Tag"
            @click="delTag(tag.id)"
          >
            <faIcon :icon="['fas','times']" size="1x"></faIcon>
          </a>
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
      tags: [],
      form: {
        name: null,
        color: null,
      },
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
      this.$root.openNotifi(false, 'test notifi')
      console.log(this.$root)

      if (this.form.name && this.form.color) {
        axios({
          method: 'post',
          url: '/tags/',
          data: this.form,
        }).then((res) => {
          if (res.data.success) {
            console.log(res.data);
            this.notifi = {
              message: 'test',
              success: true
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    delTag(id) { 

      axios({
        method: 'delete',
        url: `/tags/${id}`,
      }).then((res) => {
        if (res.data.success) { 
          this.tags = this.tags.filter((tag) => {return tag.id !== id})
        }
      }).catch((err) => {
        console.log(err)
      })
    }
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

        .del_Tag {
          cursor: pointer;
          text-align: center;
          margin-top: auto;
          margin-bottom: auto;
          color: #990000;
        }
      }
    }
  }
</style>
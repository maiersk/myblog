<template>
  <!-- <div class="list_tags_div">
    <div class="admin_panel" v-if="adminmode">
      <div class="list_header">
        Tag Admin
      </div>
      <form class="form-flex">
        <div class="form-group">
          <label>Select Tag:</label>
          <select class="input_select" ref="selectRef"
            @change="selectTag()"
          >
            <option v-for="tag in tags" :key="tag.id" :id="tag.id">
              {{tag.name}}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>Tag Name:</label>
          <input type="text" class="input_text" 
            id="tag_name" v-model="model.name"
          />
        </div>
        <div class="form-group">
          <label>Tag Color:</label>
          <input type="color" class="input_col"
            id="tag_color" v-model="model.color"
          />
        </div>
        <div class="btns block-center">
          <button class="btn btn-theme text-c-green"
            :disabled="!model.id ? false : true"
            @click.prevent="addTag()"
          >
            Add Tag
          </button>
          <button class="btn btn-theme text-c-blue"
            :disabled="model.id ? false : true"
            @click.prevent="editTag()"
          >
            Edit Tag
          </button>
          <button class="btn btn-theme text-c-red"
            :disabled="model.id ? false : true"
            @click.prevent="delTag()"
          >
            Delete Tag
          </button>
        </div>
      </form>
    </div>
    <div class="list_tags">
      <div class="list_header">
        Tag List
      </div>
      <ul class="c_ul">
        <span class="m-1 block-center" v-if="!tags.length">no tag</span>
        <li v-else v-for="(tag) in tags" :key="tag.id">
          <tag-btn :name="tag.name" :col="tag.color"></tag-btn>
        </li>
      </ul>
    </div>
  </div> -->
  <base-list name="Tags" url="/tags">

    <template v-slot:List="l_props">
      <ul class="c_ul flex">
        <span class="m-1 block-center" v-if="!l_props.list.length">no tag</span>
        <li v-for="tag in l_props.list" :key="tag.id">
          <tag-btn :name="tag.name" :col="tag.color"></tag-btn>
        </li>
      </ul>
    </template>

    <template v-slot:createModel>
      <div class="form-group">
        <label>Tag Name:</label>
        <input type="text" class="input_text" 
          id="tag_name" v-model="model.name"
        />
      </div>
      <div class="form-group">
        <label>Tag Color:</label>
        <input type="color" class="input_col"
          id="tag_color" v-model="model.color"
        />
      </div>
    </template>
    <template v-slot:editModel>
      <div class="form-group">
        <label>Tag Name:</label>
        <input type="text" class="input_text"
          id="tag_name" v-model="model.name"
        />
      </div>
      <div class="form-group">
        <label>Tag Color:</label>
        <input type="color" class="input_col"
          id="tag_color" v-model="model.color"
        />
      </div>
    </template>
    <template v-slot:deleteModel>
      <div></div>
    </template>
  </base-list>
</template>

<script>
import axios from '../plugins/axios'
import tagBtn from './Buttons/tagBtn'
import BaseList from './BaseList'
import { computed } from 'vue'

export default {
  components: {
    tagBtn,
    BaseList
  },
  provide() {
    return {
      model: computed({
        set: (val) => {this.model = val},
        get: () => {return this.model}
      })
    }
  },
  data() {
    return {
      adminmode: true,
      tags: [],
      model: {
        id: null,
        name: null,
        color: null,
      },
    }
  },
  created() {
    this.getTags()
  },
  methods: {
    getTags() {
      axios({
        method: 'get',
        url: '/tags'
      }).then((res) => {
        if (res.data.success && res.data.data) {
          this.tags = res.data.data
        }
      })
    },
    addTag() {
      if (this.model.name && this.model.color) {
        axios({
          method: 'post',
          url: '/tags/',
          data: this.form,
        }).then((res) => {
          if (res.data.success && res.data.data) {
            this.tags.push(res.data.data)
            this.$root.openNotifi(true, '创建成功')
          }
        }).catch((err) => {
          this.$root.openNotifi(false, err.message)
        })
      }
    },
    selectTag() {
      const selectRef = this.$refs.selectRef
      const id = selectRef.selectedOptions[0].getAttribute('id')
      axios({
        method: 'get',
        url: `/tags/${id}`,
      }).then((res) => {
        if (res.data.success && res.data.data) {
          const {id, name, color} = res.data.data
          this.form = {id, name, color}
        }
      }).catch((err) => {
        this.$root.openNotifi(false, err.message)
      })
    },
    editTag() {
      if (this.form?.id ?? false) {
        const id = this.model.id

        axios({
          method: 'put',
          url: `/tags/${id}`,
          data: this.form,
        }).then((res) => {
          if (res.data.success && res.data.data) {
            this.getTags()
            this.$root.openNotifi(true, '修改成功')
          }
        }).catch((err) => {
          this.$root.openNotifi(false, err.message)
        }).finally(this.clearFrom)
      }
    },
    delTag() {
      if (this.form?.id ?? false) {
        const id = this.model.id

        axios({
          method: 'delete',
          url: `/tags/${id}`,
        }).then((res) => {
          if (res.data.success) { 
            this.tags = this.tags.filter((tag) => {return tag.id !== id})
            this.$root.openNotifi(true, '删除成功')
          }
        }).catch((err) => {
          this.$root.openNotifi(false, err.message)
        }).finally(this.clearFrom)
      }
    },
    clearFrom() {
      this.$refs.selectRef.value = ''
      this.form = {id: null, name: null, color: null}
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../public/scss/global.scss";

.admin_panel {
  margin-top: 0.5rem;
  flex-grow: 1;
}
// .add_tag {
// }
// .edit_tag {
//   @extend .add_tag;
// }
.list_tags {
  margin-top: 0.5rem;
  border: 1px solid #303030;
  background-color: #202020;
}

.list_header {
  padding: 0.5rem;
  background-color: $c_second;
  font-weight: 700;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  
  display: flex;
  justify-content: space-between;

  .list_operate {
    max-width: 200px;
    min-width: 100px;
    display: flex;

    > a {
      text-align: center;
      flex-grow: 1;
      > svg {
        width: 16px;
        height: 16px;
        transition: 1s ease;

      }
      > svg:hover {
        color: white;
      }
    } 
  }
}

.list_tags {
  ul {
    display: flex;
    flex-flow: row wrap;

    li {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
}

@media (max-width: 768px) {
  // .admin_panel {

  // }
}
</style>
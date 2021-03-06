<script>
import { computed } from "vue";
import { axiosReq } from "../../plugins/axios";
import selectModel from "./SelectModel";
import pageBtns from "./PageBtns";
/**
 * 基础模型CRUD组件
 * inject: model
 * 
 */

export default {
  mixins: [
    selectModel,
    pageBtns,
  ],
  props: {
    name: {
      type: String,
      default: 'List'
    },
    url: {
      type: String,
      default: '/'
    },
    options: {
      type: Object,
      default() {
        return {
          selectItems: false,
          paging: false,
          pagecount: 5,
          count: 10,
          row: false,
        }
      }
    },
  },
  inject: [],
  provide() {
    return {
      list: computed(() => {return this.list.data}),
    }
  },
  data() {
    return {
      list: {},
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    getAll() {
      let url = this.url
      const {paging, count} = this.options
      if (paging) {
        url = `${this.url}?page=${this.page}&count=${count ? count : 10}`
      }

      axiosReq({
        method: 'get',
        url,
      }).then((res) => {
        this.list = res
        this.initPage()
        if (!res.data.length) {
          this.prevPage()
        }
      }).catch((err) => {
        this.$root.openNotifi(false, err)
      })
    },
    select(id) {
      axiosReq({
        method: 'get',
        url: `${this.url}/${id}`,
      }).then(({ data }) => {
        this.model.value = data
      }).catch((err) => {
        this.$root.openNotifi(false, err)
      })
    },
    add() {
      axiosReq({
        method: 'post',
        url: this.url,
        data: this.model.value,
      }).then(() => {
        this.getAll()
        this.cleanModel()
        this.$root.openNotifi(true, 'create success')
      }).catch((err) => {
        this.$root.openNotifi(false, err)
      })
    },
    edit() {
      if (this.model.value?.id ?? false) {
        const id = this.model.value.id

        axiosReq({
          method: 'put',
          url: `${this.url}/${id}`,
          data: this.model.value,
        }).then(() => {
          this.getAll()
          this.cleanModel()
          this.$root.openNotifi(true, 'edit success')
        }).catch((err) => {
          this.$root.openNotifi(false, err)
        })
      }
    },
    del() {
      if (this.model.value?.id ?? false) {
        const id = this.model.value.id

        axiosReq({
          method: 'delete',
          url: `${this.url}/${id}`,
        }).then(() => {
          this.getAll()
          this.cleanModel()
          this.$root.openNotifi(true, 'delete success')
        }).catch((err) => {
          this.$root.openNotifi(false, err)
        })
      }
    }
  }
}
</script>

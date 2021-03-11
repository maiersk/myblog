<script>
import { computed } from "vue";
import { axiosReq } from "../../plugins/axios";
import pageBtns from "./PageBtns";
import BaseList from "../BaseList";

/**
 * 基础模型CRUD组件
 * inject: model
 * 
 */

export default {
  components: {
    pageBtns,
    BaseList,
  },
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
          // url中添加搜索参数
          search: '',
          // 是否开启选中item
          selectItems: false, 
          // 是否开启分页
          paging: false,
          // 分页数
          pagecount: 5,
          // 一页数
          count: 10,
          // 列表使用排，排列
          row: false,
        }
      }
    },
  },
  provide() {
    return {
      list: computed(() => {return this.list}),
      page: computed({
        set: (val) => {this.page = val},
        get: () => {return this.page}
      }),
    }
  },
  data() {
    return {
      list: {},
      page: 0,
      pageBtnsRef: ''
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    cleanModel() {
      this.model.value = {}
    },
    getAll() {
      let url = this.url
      const {paging, count} = this.options
      if (paging) {
        url = `${this.url}?page=${this.page}&count=${count ? count : 10}`
      }
      if (this.options.search !== '') {
        if (!paging) {
          url += `?${this.options.search}`
        } else {
          url += `&${this.options.search}`
        }
      }

      axiosReq({
        method: 'get',
        url,
      }).then((res) => {
        this.list = res
        this.$refs[this.pageBtnsRef].initPage()
        if (!res.data.length) {
          this.$refs[this.pageBtnsRef].prevPage()
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
    edit(id) {
      const _id = id ?? this.model.value.id

      if (_id) {
        axiosReq({
          method: 'put',
          url: `${this.url}/${_id}`,
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
    del(id) {
      const _id = id ?? this.model.value.id

      if (_id) {
        axiosReq({
          method: 'delete',
          url: `${this.url}/${_id}`,
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

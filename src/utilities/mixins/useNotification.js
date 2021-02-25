import { reactive } from 'vue';
import notification from '../../components/Notification';

export default {
  components: {
    notification
  },
  provide() {
    return {
      notifi: reactive(this.notifi)
    }
  },
  data() {
    return {
      notifi: {
        show: false,
        message: '',
        success: false,
      }
    }
  },
  methods: {
    openNotifi(success, errOrstr) {
      if (!this.notifi.timer) {

        this.notifi.show = true
        this.notifi.success = success
        this.notifi.message = errOrstr
        if (!success) {
          this.notifi.message = errOrstr.message
          console.error(errOrstr)
        }

        this.notifi.timer = setTimeout(() => {
          this.notifi.show = false
          this.notifi.timer = null
          this.notifi.message = ''
        }, 1500);
        
      }
    }
  }
}
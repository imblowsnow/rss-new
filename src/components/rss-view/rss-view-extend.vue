<script>
import {defineComponent} from "vue";
import DateUtil from "@/utils/DateUtil";
import Rss from "@/utils/Rss";

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    read: {
      type: Function,
      default: () => {}
    },
  },
  data() {
    return {
      limit: 30,
    };
  },
  computed: {},
  mounted() {

  },
  methods: {
    init(){
      return {
        limit: this.limit
      }
    },
    searchByFrom(from) {
      event.preventDefault();
      console.log(event);
      this.$emit('searchByFrom', from);
    },


    timeDistance(date) {
      return DateUtil.timeDistance(date);
    },
    formatDate(date) {
      return DateUtil.formatDate(date);
    },
    getFromLogo(fromId){
      let subscribe = Rss.getSubscribe(fromId)
      return subscribe && subscribe.icon ? subscribe.icon : './logo.png'
    }
  },
};
</script>

// @vue/component
import {initMenu} from "@/utils/menus";

export default {
    name: 'Home',

    components: {},

    mixins: [],

    props: {},

    data() {
        return {}
    },

    computed: {
        routes() {
            return this.$store.state.routes;
        }
    },

    watch: {},

    created() {
    },

    methods: {
        // this.initMenu();
    }
}

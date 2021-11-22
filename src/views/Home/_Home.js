// @vue/component
import {initMenu} from "@/utils/menus";

export default {
    name: 'Home',

    components: {},

    mixins: [],

    props: {},

    data() {
        return {
            user:JSON.parse(window.sessionStorage.getItem('user'))
        }
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

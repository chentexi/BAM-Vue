// @vue/component
import * as menu from "@/utils/menus";
import * as home from "@/views/Home/_Home";
import * as url from "url";
import {getRequest} from "@/utils/api";
import {formatRoutes} from "@/utils/menus";

export default {
    name: 'Menu',

    components: {},

    mixins: [],

    props: {},

    data() {
        return {
            props: {
                label: 'name',
                children: 'zones'
            },
            data: [],
            defaultProps: {
                children: 'children',
                label: 'menuName',
                id:'menuId'
            },
            count: 1,
            show:false,
            tableData: [],
            nameMenu: '',
            startDate: '',
            endDate: ''
        }
    },

    computed: {},

    watch: {},

    created() {
        this.menuList();
    },

    methods: {
        onSubmit() {
            console.log('submit!');
        },
        handleNodeClick(data, checked, indeterminate) {
            console.log(data, checked, indeterminate);
        },
        menuList(){
            console.log("ss")
            this.getRequest("/menu/menuList").then(data=>{
                if (data){
                    this.data=data.data;
                    this.tableData=data.data;
                }
            })
        },
        menuEdit(index,row){

        },
        menuDelete(index,row){
            var id=row.menuId;
            var url="/menu/delect?id="+id;
            this.getRequest(url).then(data=>{
                this.menuList();
                if (data){

                }
            });

        },
        upadteEnable(callback, row){
            let text = ''
            let flag = false;
            if (callback) {//修改启用之前是否确认修改
                text = '启用'
                row.enable = false
                flag =true
            } else {
                text = '禁用'
                row.enable = true
                flag=false
            }
            this.$confirm(`确认${text}该流程吗`,'提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                iconClass: 'icon-warning',
                customClass:'custom-message-box'
            }).then(res=> {
                row.enable=flag;

            })
        },
        upadteVisible(callback, row){
            let text = ''
            let flag = false;
            if (callback) {//修改启用之前是否确认修改
                text = '显示'
                row.visible = 1
                flag =0
            } else {
                text = '隐藏'
                row.visible = 0
                flag=1
            }
            this.$confirm(`确认${text}该菜单吗`,'提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                iconClass: 'icon-warning',
                customClass:'custom-message-box'
            }).then(res=> {
                row.visible=flag;

            })
        },
    }
}

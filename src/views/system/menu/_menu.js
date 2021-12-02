// @vue/component
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
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1517 弄',
                zip: 200333
            }, {
                date: '2016-05-01',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1519 弄',
                zip: 200333
            }, {
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1516 弄',
                zip: 200333
            }, {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1517 弄',
                zip: 200333
            }, {
                date: '2016-05-01',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1519 弄',
                zip: 200333
            }, {
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1516 弄',
                zip: 200333
            }],
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
        handleNodeClick(data) {
            console.log(data);
        },
        handleCheckChange(data, checked, indeterminate) {
            console.log(data, checked, indeterminate);
        },
        menuList(){
            console.log("ss")
            this.getRequest("/menu/menuList").then(data=>{
                if (data){
                    this.assemblyMenus(data);
                    this.data=data.data;
                }
            })
        },
        assemblyMenus(data) {

        }
    }
}

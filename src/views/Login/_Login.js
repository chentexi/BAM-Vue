// @vue/component
import {postRequest} from "@/utils/api.js";
import {getHHmmssByDate, getPastSevenDays} from "@/utils/dateTime2";

console.log(new Date());
console.log('日期:' + getPastSevenDays() + ' ' + getHHmmssByDate(new Date()));
var captchFlag;
export default {
    name: 'Login',

    components: {},

    mixins: [],

    props: {},

    data() {
        captchFlag = this.$uuid.v1();
        return {
            captchaUrl: '/images/captchaCompute?key=' + captchFlag,
            loginForm: {
                userName: 'admin',
                passWord: '123',
                captcha: '',
                captchFlag: captchFlag
            },
            loading:false,
            checked: true,
            rules: {
                userName: [{
                    required: true, message: '请输入用户名', trigger:
                        'blur'
                }],
                passWord: [{
                    required: true, message: '请输入密码', trigger:
                        'blur'
                }],
                captcha: [{
                    required: true, message: '请输入验证码', trigger:
                        'blur'
                }]
            }
        }
    },

    computed: {},

    watch: {},

    created() {
        // 按下回车执行登录按钮点击事件
        var _self = this
        document.onkeydown = function(e) {
            var key = window.event.keyCode
            if (key == 13) {
                _self.submitLogin();
            }
        }
    },

    methods: {
        updateCaptcha() {
            captchFlag = this.$uuid.v1();
            this.loginForm.captchFlag = captchFlag;
            this.captchaUrl = '/images/captchaCompute?key=' + captchFlag;
        },
        submitLogin() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.loading=true;
                    postRequest('/login', this.loginForm).then(resp => {
                        if (resp.status) {
                            this.loading=false;
                            //存储用户token
                            const tokenStr = resp.data.tokenHead+resp.data.token;
                            window.sessionStorage.setItem('tokenStr', tokenStr);

                            this.$router.replace('/home');
                        } else {
                            this.loading=false
                            this.$message({
                                // showClose: true,
                                message: resp.msg,
                                center: true,
                                type: 'error'
                            });
                            this.updateCaptcha();
                        }
                    })
                } else {
                    this.$message.error('请输入所有字段');
                    return false;
                }
            })
        },
        // sleep(d) {
        //     return new Promise((resolve) => setTimeout(resolve, d))
        // }
        // async test() {
        //     this.$toast.show('正在自动登录')
        //     await this.sleep(1800)
        //     this.$toast.show('登录成功')
        //     await this.sleep(1800)
        //     this.isLoader = false
        // }
    }
}

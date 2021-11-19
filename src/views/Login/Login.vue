<template>
    <div>
        <el-form :rules="rules" ref="loginForm" :model="loginForm"
                 class="loginContainer">
            <h3 class="loginTitle">后台管理系统</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.userName" auto-complete="false"
                          placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.passWord" auto-complete="false"
                          placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="captcha" >
                <el-input size="normal" type="text" v-model="loginForm.captcha"
                          auto-complete="false"
                          placeholder="点击图片更换验证码" style="width: 250px;margin-right: 5px"></el-input>
                <img :src="captchaUrl" @click="updateCaptcha">
                <el-input v-model="loginForm.captchFlag" style="display:none"></el-input>
            </el-form-item>
            <el-checkbox class="loginRemember" v-model="checked">记住我</el-checkbox>
            <el-button type="primary" v-loading.fullscreen.lock="loading" style="width: 100%" @click="submitLogin">
                登录
            </el-button>
        </el-form>
    </div>
</template>


<script src="./_Login.js" lang="js"></script>
<style src="./_Login.less" lang="less"></style>

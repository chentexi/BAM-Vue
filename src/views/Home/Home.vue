<template>
    <el-container>
        <el-header  class="homeHeader nav">
            <div class="title">后台管理系统</div>
            <el-dropdown class="userInfo">
                  <span class="el-dropdown-link">
                    <!--<i><img :src="user.userFace"></i>-->
                     <i><img src="@/icon/user/headPortraits/1637301923-20211122015041705.jpg"></i>
                  </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>设置</el-dropdown-item>
                    <el-dropdown-item>注销</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-header>
        <el-container class="content">
            <el-aside width="200px">
                <!--unique-opened禁止多选打开-->
                <el-menu router>
                    <el-submenu :index="index+''" v-for="(item,index) in routes" v-if="!item.hidden"
                                :key="index">
                        <template slot="title">
                            <i :class="[item.icon]" style="margin-right:6px"></i>
                            <span>{{ item.name }}</span>
                        </template>
                        <el-menu-item :index="children.path" v-for="(children,indexj) in item.children"
                                      :key="indexj">{{ children.name }}
                        </el-menu-item>
                    </el-submenu>
                </el-menu>

            </el-aside>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>

    </el-container>
</template>


<script src="./_Home.js" lang="js"></script>
<style  lang="less" scoped>
  *{margin: 0;padding: 0;}
  .nav{
    height: 100px;
    width: 100%;
    position: fixed;
    top: 0;
  }
  .content{
    height: 100%;
    //background: orange;
    margin-top: 2.8%;
    position: fixed;
  }

  .homeHeader{
    background: #949798;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    box-sizing:border-box;
    margin-left: -8px;
  }
  .homeHeader .title{
    font-size: 30px;
    font-family: 华文楷体;
    color: white;
  }

  //.el-aside {
  //  color: #333;
  //}

  .homeHeader .userInfo{
    cursor: pointer;
  }
  .el-dropdown-link img{
    width: 48px;
    height: 48px;
    border-radius: 24px;
  }
  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
</style>

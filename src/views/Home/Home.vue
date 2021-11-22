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
            <el-aside width="200px" style="margin-left: -9px" default-active="2" class="el-menu-vertical-demo"
                      >
                <!--unique-opened禁止多选打开-->
                <el-menu router background-color="#545c64"
                         text-color="#fff"
                         active-text-color="#ffd04b">
                    <el-submenu :index="index+''" v-for="(item,index) in routes" v-if="!item.hidden"
                                :key="index">
                        <template slot="title">
                            <i :class="[item.icon]" style="margin-right:6px"></i>
                            <span>{{ item.name }}</span>
                        </template>
                        <el-menu-item style="min-width: 179px" :index="children.path" v-for="(children,indexj) in item.children"
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


  .homeHeader{
    background: #545c64;
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
  //侧边
  .content{
    height: 100%;
    //background: orange;
    margin-top: 52px;
    position: fixed;
  }
  .el-menu-vertical-demo::-webkit-scrollbar {
    /*滚动条整体样式*/
    width : 5px;  /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  .el-menu-vertical-demo::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow   : inset 0 0 5px rgba(196, 70, 70, 0.2);
    background   : #545c64;
  }
  .el-menu-vertical-demo::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background   : #eef0f1;
  }
</style>

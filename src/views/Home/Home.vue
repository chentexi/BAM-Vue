<template>
    <div>
        <el-container>
            <el-header class="homeHeader">
                <div class="title">后台管理系统</div>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu router unique-opened>
                        <el-submenu :index="index+''" v-for="(item,index) in this.$store.state.routes" v-if="!item.hidden"
                                    :key="index">
                            <template slot="title">
                                <i :class="[item.icon]"></i>
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
    </div>
</template>


<script src="./_Home.js" lang="js"></script>
<style src="./_Home.less" lang="less"></style>

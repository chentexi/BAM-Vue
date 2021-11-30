<template>
    <div class="menu">
        <div>
            <div class="menu" style=" ">
                <div class="demo-input-suffix">
                    <label> 菜单名称: </label>
                    <el-input class="addPosInput" v-model="nameMenu" placeholder="请输入内容"></el-input>
                    <label> 开始时间: </label>
                    <el-date-picker v-model="startDate" type="datetime" placeholder="选择日期时间"></el-date-picker>
                    <label class="-font"> 结束时间: </label>
                    <el-date-picker v-model="startDate" type="datetime" placeholder="选择日期时间"></el-date-picker>
                    <el-button class="" icon="el-icon-search" size="small" type="primary">查询</el-button>
                </div>
            </div>
            <br/>
            <div class="posManaMain menu">
                <el-table
                        :data="tableData"
                        height="250"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="date"
                            label="日期"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="姓名"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="地址">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script src="./_menu.js" lang="js"></script>
<style src="./_menu.less" lang="less" scoped></style>

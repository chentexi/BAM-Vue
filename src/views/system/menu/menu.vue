<template>

  <div class="menu">
    <el-row :gutter="20">
      <el-col :span="3">
        <div class="treeMenu menu content">
            <el-tree class="" :data="data" node-key="menuId" show-checkbox :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="mianMenu">
          <div class="inquire menu" style=" ">
            <div class="demo-input-suffix">
              <label> 菜单名称: </label>
              <el-input class="addPosInput" v-model="nameMenu" placeholder="请输入内容"></el-input>
              <label> 开始时间: </label>
              <el-date-picker v-model="startDate" type="datetime" placeholder="选择日期时间"></el-date-picker>
              <label class="-font"> 结束时间: </label>
              <el-date-picker v-model="startDate" type="datetime" placeholder="选择日期时间"></el-date-picker>

              <el-button class="inquireBtn" icon="el-icon-search" size="small" type="primary">查询</el-button>
            </div>
          </div>
          <br/>
          <div class="posManaMain menu">
            <el-table
                :data="tableData"
                height="494"
                border
                style="width: 100% ">
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
      </el-col>
    </el-row>
  </div>
</template>

<script src="./_menu.js" lang="js"></script>
<style src="./_menu.less" lang="less" scoped></style>

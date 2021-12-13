<template>

	<div class="menu">
		<el-row :gutter="20">
			<el-col :span="3">
				<div class="treeMenu menu content">
					<el-tree class="fontName" :data="data" node-key="menuId" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
				</div>
			</el-col>
			<el-col :span="20">
				<div class="mianMenu">
					<div class="inquire menu" style=" ">
						<div class="demo-input-suffix">
							<label class="fontName"> 菜单名称: </label>
							<el-input class="addPosInput" v-model="nameMenu" placeholder="请输入内容"></el-input>
							<label class="fontName"> 开始时间: </label>
							<el-date-picker v-model="startDate" type="datetime" placeholder="选择日期时间"></el-date-picker>
							<label class="fontName"> 结束时间: </label>
							<el-date-picker v-model="startDate" type="datetime" placeholder="选择日期时间"></el-date-picker>

							<el-button class="inquireBtn" icon="el-icon-search" size="small" type="primary">查询</el-button>
						</div>
					</div>
					<br/>
					<div class="posManaMain menu ">
						<el-table
								:data="tableData"
								style="width: 100%;margin-bottom: 20px;"
								height="500"
								row-key="menuId"
								border
								:tree-props="{children: 'children', hasChildren: 'hasChildren'}">
							<el-table-column
									prop="menuId"
									label="id"
									sortable
									width="180"
									v-if="show">
							</el-table-column>
							<el-table-column
									prop="menuName"
									label="菜单标题"
									sortable
									width="180">
							</el-table-column>
							<el-table-column
									prop="icon"
									label="图标"
									sortable
									center
									width="110">
								<template slot-scope="scope">
									<i :class="[scope.row.icon]"></i>
								</template>
							</el-table-column>
							<el-table-column
									prop="visible"
									label="菜单状态"
									width="130">
								<template slot-scope="scope">
									<el-switch
											v-model="scope.row.visible==0?true:false"
											active-color="#13ce66"
											inactive-color="#ff4949"
											@change="upadteVisible($event,scope.row)">
									</el-switch>
								</template>
							</el-table-column>
							<el-table-column
									prop="enable"
									label="是否启用"
									width="130">
								<template slot-scope="scope">
									<el-switch
											v-model="scope.row.enable"
											active-color="#13ce66"
											inactive-color="#ff4949"
											@change="upadteEnable($event,scope.row)">
									</el-switch>
								</template>
							</el-table-column>
							<el-table-column
									prop="menuType"
									label="菜单类型"
									width="130">
								<template slot-scope="scope">
									<el-tag  effect="dark" v-if="scope.row.menuType==='M'" >目录</el-tag>
									<el-tag :type="'success'" effect="plain" v-if="scope.row.menuType==='C'">菜单</el-tag>
									<el-tag :type="'warning'" effect="plain" v-if="scope.row.menuType==='F'">按钮</el-tag>
								</template>
							</el-table-column>
							<el-table-column
									prop="orderNum"
									label="显示顺序"
									width="100">
							</el-table-column>
							<el-table-column
									prop="component"
									label="组件地址"
									width="50">
							</el-table-column>
							<el-table-column label="操作">
								<template slot-scope="scope">
									<el-button
											size="mini"
											@click="menuEdit(scope.$index, scope.row)">编辑</el-button>
									<el-button
											size="mini"
											type="danger"
											@click="menuDelete(scope.$index, scope.row)">删除</el-button>
								</template>
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

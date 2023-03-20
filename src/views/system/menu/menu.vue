<template>

	<div class="menu">
		<el-row :gutter="20">
			<el-col :span="3">
				<div class="treeMenu menu content">
					<el-tree class="fontName" :data="dataTree" node-key="menuId" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
				</div>
			</el-col>
			<el-col :span="20">
				<div class="mianMenu">
					<div class="inquire menu" style=" ">
						<div class="demo-input-suffix">
							<label class="fontName"> 菜单名称: </label>
							<el-input class="addPosInput" v-model="nameMenus" placeholder="请输入内容"></el-input>
							<!--<label class="fontName"> 开始时间: </label>-->
							<!--<el-date-picker v-model="startDate" type="datetime" placeholder="选择日期时间"></el-date-picker>-->
							<!--<label class="fontName"> 结束时间: </label>-->
							<!--<el-date-picker v-model="endDate" type="datetime" placeholder="选择日期时间"></el-date-picker>-->

							<el-button class="inquireBtnLeft1" icon="el-icon-search" size="small" type="primary" @click="queryMenu">查询</el-button>
							<el-button class="inquireBtnLeft1" icon="el-icon-search" size="small" type="primary" @click="reset">重置</el-button>
						</div>
					</div>
					<br/>
					<div class="posManaMain menu ">
						<div class="add" style="float: revert;margin-top: -6px;height: 40px">
							<el-button type="primary" size="small" class="small" icon="el-icon-edit" @click="dialogFormVisible = true" round>新增</el-button>
							<el-button-group class="left">
								<el-button size="small" icon="el-icon-refresh" @click="queryMenu"></el-button>
								<el-button size="small" icon="el-icon-s-grid"></el-button>
							</el-button-group>
						</div>
						<div>
							<el-table
									:data="data"
									style="width: 100%;margin-bottom: 20px;"
									height="510"
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
										width="75">
									<template slot-scope="scope">
										<i :class="[scope.row.icon]"></i>
									</template>
								</el-table-column>
								<el-table-column
										prop="visible"
										label="菜单状态"
										width="80">
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
										width="80">
									<template slot-scope="scope">
										<el-switch
												v-model="scope.row.enable==0?false:true"
												active-color="#13ce66"
												inactive-color="#ff4949"
												@change="upadteEnable($event,scope.row)">
										</el-switch>
									</template>
								</el-table-column>
								<el-table-column
										prop="menuType"
										label="菜单类型"
										center
										width="80">
									<template slot-scope="scope">
										<el-tag effect="dark" v-if="scope.row.menuType==='M'">目录</el-tag>
										<el-tag :type="'success'" effect="plain" v-if="scope.row.menuType==='C'">菜单</el-tag>
										<el-tag :type="'warning'" effect="plain" v-if="scope.row.menuType==='F'">按钮</el-tag>
									</template>
								</el-table-column>
								<el-table-column
										prop="orderNum"
										label="显示顺序"
										width="80">
								</el-table-column>
								<el-table-column
										prop="component"
										label="组件地址"
										width="380">
								</el-table-column>
								<el-table-column label="操作">
									<template slot-scope="scope">
										<el-button
												size="mini"
												@click="menuEdit(scope.$index, scope.row)">编辑
										</el-button>
										<el-button
												size="mini"
												type="danger"
												@click="menuDelete(scope.$index, scope.row)">删除
										</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</div>
				</div>
			</el-col>
		</el-row>
		<div>
			<el-dialog class="titleFont frameCenter" :title="whetherUpdate?'菜单编辑':'菜单新增'" :modal="false" :show-close="true" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
				<el-form :rules="rules" ref="addMenu" :model="form" :inline="false" label-width="120px" class="demo-form-inline">
					<el-form-item label="上一级菜单:" prop="text" :inline-message="true">
						<el-popover class="select-tree" placement="bottom-start" width="500" trigger="click"
									v-model="visible" @hide="hidePopover">
							<el-input ref="input" class="inputWithe" slot="reference" placeholder="请选择" v-model="text" size="medium" clearable
									  @input="treeFilter" @clear="clear"/>
							<el-tree ref="addUpdateTree" class="tree" :default-expanded-keys="[0]" :data="allData" node-key="menuId" :props="defaultProps" @node-click="selectHandleNodeClick"/>
						</el-popover>
					</el-form-item>
					<el-form-item label="菜单名称:" prop="menuName" :inline-message="true">
						<el-input placeholder="请输入内容" class="inputWithe" size="medium" v-model="form.menuName"></el-input>
					</el-form-item>
					<el-row :gutter="0">
						<el-col :span="6">
							<el-form-item label="菜单状态:">
								<el-switch style="height: 40px" v-model="form.visible" active-color="#13ce66"
										   inactive-color="#ff4949" active-value="0" inactive-value="1"></el-switch>
							</el-form-item>
						</el-col>
						<el-col :span="3">
							<el-form-item label="是否启用:">
								<el-switch style="height: 40px" v-model="form.enable" active-color="#13ce66"
										   inactive-color="#ff4949" active-value="1" inactive-value="0"></el-switch>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-form-item label="菜单类型:" class="rowMarginTop" prop="menuType" :inline-message="true">
							<el-radio-group v-model="form.menuType">
								<el-radio-button label="M">目录</el-radio-button>
								<el-radio-button label="C">菜单</el-radio-button>
								<el-radio-button label="F">按钮</el-radio-button>
							</el-radio-group>
						</el-form-item>
					</el-row>
					<el-row>
						<el-form-item label="显示顺序:" class="rowMarginTop">
							<el-input class="inputWithe" placeholder="请输入内容" v-model="form.orderNum"></el-input>
						</el-form-item>
					</el-row>
					<el-row>
						<el-form-item label="组件地址:" class="rowMarginTop" prop="component" :inline-message="true">
							<el-input class="inputWithe" placeholder="请输入内容" v-model="form.component"></el-input>
						</el-form-item>
					</el-row>
					<el-row>
						<el-form-item label="路径:" class="rowMarginTop" prop="url" :inline-message="true">
							<el-input class="inputWithe" placeholder="请输入内容" v-model="form.url"></el-input>
						</el-form-item>
					</el-row>
					<el-row>
						<el-form-item label="菜单图标:" class="rowMarginTop">
							<!--<el-input class="inputWithe" placeholder="请输入内容" v-model="form.icon"></el-input>-->
							<icon-picker v-model="form.icon"></icon-picker>
						</el-form-item>
					</el-row>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="addUpdateMenu">确 定</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Menu',

	components: {},

	mixins: [],

	props: {},

	data() {
		var validateText = (rule, value, callback) => {
			var that = this;
			if (that.text === '') {
				callback(new Error('请选择上一级'));
			} else {
				callback();
			}
		};
		return {
			props: {
				label: 'name',
				children: 'zones'
			},
			data: [],
			allData: [],
			dataTree: [],
			defaultProps: {
				children: 'children',
				label: 'menuName',
				id: 'menuId'
			},
			count: 1,
			show: false,
			nameMenus: '',
			startDate: '',
			endDate: '',
			dialogFormVisible: false,//是否显示弹窗
			//form弹窗表单值
			form: {
				menuName: '',
				enable: '1',
				menuType: '',
				visible: '0',
				delivery: false,
				orderNum: '',
				component: '',
				url: '',
				icon: '',
				parentId: ''
			},
			visible: false, // 显示下拉窗
			text: '', // 选中值-中文
			rules: {
				text: [{
					validator: validateText, trigger: 'blur'
				}],
				menuName: [{
					required: true, message: '请输入菜单名称', trigger: 'blur'
				}],
				menuType: [{
					required: true, message: '请选择菜单类型', trigger: 'blur'
				}],
				component: [{
					required: true, message: '请选择菜单类型', trigger: 'blur'
				}],
				url: [{
					required: true, message: '请选择菜单类型', trigger: 'blur'
				}]
			},
			whetherUpdate: false
		}
	},

	computed: {},

	watch: {
		value: function (val) {
			console.log("value", val)
			this.handelSelect()
		},
		allData: function (val) {
			console.log("allData", val)
			this.$nextTick(() => {
				this.handelSelect()
			})
		},

	},

	created() {
		this.menuList();
	},
	mounted() {
		this.handelSelect() //如果是从页面一开始进来，需要从这里触发（因为watch监测不到变化）
	},
	methods: {
		reset() {
			var that = this;
			that.nameMenus = '';
			that.startDate = '';
			that.endDate = '';
		},
		onSubmit() {
			console.log('submit!');
		},
		handleNodeClick(data) {
			var that = this;
			console.log(data);
			var params = {
				menuName: data.menuName
			}
			that.postRequest('/menu/menuLists', params).then(data => {
				if (data) {
					that.data = data.data.data;
				}
			});
		},
		menuList() {
			var that = this;
			var params = {
				menuName: '',
				startDate: '',
				endDate: ''
			}
			that.postRequest('/menu/menuLists', params).then(data => {
				if (data) {
					that.data = data.data.data;
					that.dataTree = data.data.data;
					that.allData = data.data.mainMenu;
				}
			})
		},
		queryMenu() {
			var that = this;
			var params = {
				menuName: that.nameMenus,
				startDate: that.startDate,
				endDate: that.endDate
			}
			that.postRequest('/menu/menuLists', params).then(data => {
				if (data) {
					that.data = data.data.data;
					// that.dataTree = data.data.data;
					// that.allData = data.data.mainMenu;
				}
			})
		},
		menuEdit(index, row) {
			var that = this;
			that.whetherUpdate = true;
			that.dialogFormVisible = true;
			that.form = {
				menuName: row.menuName,
				enable: row.enable,
				menuType: row.menuType,
				visible: row.visible,
				delivery: row.delivery,
				orderNum: row.orderNum,
				component: row.component,
				url: row.url,
				icon: row.icon,
				parentId: row.parentId,
				menuId: row.menuId
			};
			that.handelSelect(row.parentId);
		},
		menuDelete(index, row) {
			var that = this;
			var id = row.menuId;
			var url = "/menu/delect?id=" + id;
			that.getRequest(url).then(data => {
				that.menuList();
				if (data) {

				}
			});
		},
		upadteEnable(callback, row) {
			var that = this;
			let text = ''
			let flag = false;
			if (callback) {//修改启用之前是否确认修改
				text = '启用'
				row.enable = false
				flag = 1
			} else {
				text = '禁用'
				row.enable = true
				flag = 0
			}
			that.$confirm(`确认${text}该菜单吗`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				iconClass: 'icon-warning',
				customClass: 'custom-message-box'
			}).then(res => {
				row.enable = flag;
				var json = that.qs.stringify({
					menuId: row.menuId,
					enable: flag
				})
				that.postRequest('/menu/updateEnable', json).then(data => {
					if (data.status) {
						that.menuList();
					} else {
						that.$message({
							// showClose: true,
							message: data.msg,
							center: true,
							type: 'error'
						});
					}
				})
			})
		},
		upadteVisible(callback, row) {
			var that = this;
			let text = ''
			let flag = false;
			if (callback) {//修改启用之前是否确认修改
				text = '显示'
				row.visible = 1
				flag = 0
			} else {
				text = '隐藏'
				row.visible = 0
				flag = 1
			}
			that.$confirm(`确认${text}该菜单吗`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				iconClass: 'icon-warning',
				customClass: 'custom-message-box'
			}).then(res => {
				var json = that.qs.stringify({
					menuId: row.menuId,
					visible: flag
				})
				that.postRequest('/menu/updateVisible', json).then(data => {
					if (data.status) {
						that.menuList();
						// row.visible=flag;
					} else {
						that.$message({
							message: data.msg,
							center: true,
							type: "error"
						})
					}
				})
			})
		},

		clear() {
			var that = this;
			that.$refs.addUpdateTree.setCurrentKey(null)
			that.text = ''
		},
		treeFilter(val) {
			var that = this;
			that.visible = true
			that.$refs.addUpdateTree.filter(val)
			if (val == '') {
				that.$refs.addUpdateTree.setCurrentKey(null)
			}
		},
		// 下拉框关闭
		hidePopover() {
			var that = this;
			let node = that.$refs.addUpdateTree.getCurrentNode()
			// that.$refs.tree.filter('')
			if (node) {
				that.text = node.menuName
			} else {
				that.text = ''
			}
		},
		// 默认选中
		handelSelect(key) {
			var that = this;
			if (key!=null) {
				let node = that.$refs.addUpdateTree.getNode(key);
				if (node) {
					that.$refs.addUpdateTree.setCurrentKey(key);
					that.text = node.data.menuName;
					// that.form.parentId=node.data.menuId;
				} else {
					that.$refs.addUpdateTree.setCurrentKey(null);
					that.text = '';
					// that.form.parentId='';
				}
			}
		},
		// 点击回调
		selectHandleNodeClick(node) {
			var that = this;
			if (node.disable) {
				return false;
			}
			that.visible = false;
			that.text = node.menuName;
			that.form.parentId = node.menuId;
			console.log(that.$refs.addUpdateTree.getCurrentNode());
		},

		addUpdateMenu() {
			var that= this;
			that.$refs.addMenu.validate((valid) => {
				if (valid) {
					var url = that.whetherUpdate ? '/menu/updateMenu' : '/menu/addMenu';
					that.postRequest(url, that.form).then(data => {
						if (data.status) {
							that.$message({
								message: data.msg,
								center: true,
								type: 'info'
							});
							that.dialogFormVisible = false;
							that.menuList();
						} else {
							that.$message({
								message: data.msg,
								center: true,
								type: 'error'
							});
						}
					})
				} else {
					that.$message.error('请输入所有字段');
					return false;
				}
			})
		}
	}
}
</script>
<style src="./menu.less" lang="less" scoped></style>

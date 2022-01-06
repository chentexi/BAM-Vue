<template>
	<div class="mainClass">
		<el-row :gutter="20">
			<el-col :span="20">
				<div class="tableWidth">
					<div class="inquire mainClass " style=" ">
						<div class="demo-input-suffix">
							<label class="fontName"> 用户姓名: </label>
							<el-input class="addPosInput fontName" v-model="name" placeholder="请输入内容"></el-input>
							<label class="fontName"> 开始时间: </label>
							<el-date-picker class="fontName" style="width: 180px" v-model="startDateTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
							<label class="fontName"> 结束时间: </label>
							<el-date-picker class="fontName" style="width: 180px" v-model="endDateTime" type="datetime" placeholder="选择日期时间"></el-date-picker>

							<el-button class="inquireBtnLeft1 fontName fa fa-search fa-lg" size="small" type="primary" @click="findAdminAll">查询</el-button>
							<el-button class="inquireBtnLeft1 fontName fa fa-trash fa-lg" size="small" type="primary" @click="resetForm">重置</el-button>
						</div>
					</div>
					<br/>
					<div class="tableHeight mainClass ">
						<div class="add" style="float: revert;margin-top: -6px;height: 40px">
							<el-button type="primary" size="small" class="small" @click="dialogFormVisible = true" round>
								<i class="fontName fa fa-address-card  inquireBtnRight1"></i>
								新增
							</el-button>
							<el-button type="primary" size="small" class="small" @click="toggleSelection()" round>
								<i class="fontName fa fa-check-square-o inquireBtnRight1"></i>
								取消选择
							</el-button>
							<el-button-group class="left">
								<el-button size="small" icon="el-icon-refresh " @click="findAdminAll"></el-button>
								<el-button size="small" icon="el-icon-s-grid"></el-button>
							</el-button-group>
						</div>
						<div>
							<el-table
									ref="multipleTable"
									:data="tableData"
									height="520"
									border
									:highlight-current-row="true"
									:show-overflow-tooltip="true"
									style="width: 100% ;height: 80%;font-size: 13px">
								<el-table-column
										type="selection"
										width="40">
								</el-table-column>
								<el-table-column
										label="序号"
										type="index"
										width="50"
										align="center"
										:index="indexMethod">
								</el-table-column>
								<el-table-column
										prop="id"
										label="id"
										v-if="false">
								</el-table-column>
								<el-table-column
										prop="name"
										label="姓名"
										show-overflow-tooltip="true"
										width="100">
								</el-table-column>
								<el-table-column
										prop="nickName"
										label="昵称"
										width="100">
								</el-table-column>
								<el-table-column
										prop="gender"
										label="性别"
										width="50">
									<template slot-scope="scope">
										<el-tag effect="dark" v-if="scope.row.gender==='1'">男</el-tag>
										<el-tag :type="'success'" effect="plain" v-if="scope.row.gender==='0'">女</el-tag>
									</template>
								</el-table-column>
								<el-table-column
										prop="phone"
										width="110"
										label="手机号码">
								</el-table-column>
								<el-table-column
										prop="email"
										width="200"
										label="邮箱">
								</el-table-column>
								<el-table-column
										prop="enabled"
										width="80"
										align="center"
										label="是否启用">
									<template slot-scope="scope">
										<el-switch
												v-model="scope.row.enabled==0?true:false"
												active-color="#13ce66"
												inactive-color="#ff4949"
												@change="upadteEnabled($event,scope.row)">
										</el-switch>
									</template>
								</el-table-column>
								<el-table-column
										prop="createBy"
										width="100"
										label="创建人">
								</el-table-column>
								<el-table-column
										prop="createTime"
										width="160"
										label="创建时间">
								</el-table-column>
								<el-table-column label="操作" fixed="right">
									<template slot-scope="scope">
										<el-button
												size="mini"
												@click="xxx(scope.$index, scope.row)">编辑
										</el-button>
										<el-button
												size="mini"
												type="danger"
												@click="xxx(scope.$index, scope.row)">删除
										</el-button>
									</template>
								</el-table-column>
							</el-table>
							<el-pagination
									@size-change="handleSizeChange"
									@current-change="handleCurrentChange"
									:current-page="currentPage"
									:page-sizes="[10, 20, 30, 40]"
									:page-size="10"
									layout="total, sizes, prev, pager, next, jumper"
									:total="total">
							</el-pagination>
						</div>
					</div>
				</div>
			</el-col>
		</el-row>
		<div>
			<el-dialog class="titleFont frameCenter" :title="whetherUpdate?'用户编辑':'用户新增'" :modal="false" :show-close="true" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
				<el-form :rules="rules" ref="addMenu" :model="form" :inline="false" label-width="120px" class="demo-form-inline">

					<el-row :gutter="0">
						<el-col :span="10">
							<el-form-item label="用户名:">
								<el-input class="inputWithe" size="medium"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="10">
							<el-form-item label="用户昵称:">
								<el-input class="inputWithe" size="medium"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="0">
						<el-col :span="10">
							<el-form-item label="手机号:">
								<el-input class="inputWithe" size="medium"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="10">
							<el-form-item label="邮箱:">
								<el-input class="inputWithe" size="medium"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="0">
						<el-col :span="10">
							<el-form-item label="性别:" >
								<div >
									<el-radio v-model="radio" label="1">男</el-radio>
									<el-radio v-model="radio" label="0">女</el-radio>
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="10">
							<div>
							<el-form-item label="是否启用:">
								<el-switch style="height: 40px" active-color="#13ce66"
										   inactive-color="#ff4949" active-value="1" inactive-value="0"></el-switch>
							</el-form-item>
							</div>
						</el-col>
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
	name: 'User',

	components: {},

	mixins: [],

	props: {},

	data() {

		return {
			currentPage: 1, //初始页
			pageSize: 10,    //    每页的数据
			tableData: [],
			total: '',
			name: '',
			startDateTime: '',
			endDateTime: '',
			whetherUpdate: false,
			dialogFormVisible: false,//是否显示弹窗
			imageUrl: ''
		}
	},

	computed: {},

	watch: {},

	created() {

	},
	mounted() {
		this.findAdminAll(this.currentPage, this.pageSize);
	},
	methods: {
		toggleSelection(rows) {
			if (rows) {
				rows.forEach(row => {
					this.$refs.multipleTable.toggleRowSelection(row);
				});
			} else {
				this.$refs.multipleTable.clearSelection();
			}
		},
		indexMethod(index) {
			return index + 1;
		},
		// 初始页currentPage、初始每页数据数pagesize和数据data
		handleSizeChange: function (size) {
			debugger;
			this.pageSize = size;
			this.findAdminAll();
			console.log(this.pageSize)  //每页下拉显示数据
		},
		handleCurrentChange: function (currentPage) {
			this.currentPage = currentPage;
			this.findAdminAll();
			console.log(this.currentPage)  //点击第几页
		},
		upadteEnabled(callback, row) {
			var that = this;
			var params = that.qs.stringify({
				id: row.id,
			})
			that.postRequest('/user/updateEnabled', params).then(data => {
				if (data) {

				}
			});
		},
		resetForm() {
			this.name = '';
			this.startDateTime = '';
			this.endDateTime = '';
		},
		findAdminAll() {
			var that = this;
			var params = {
				name: that.name,
				startDateTime: that.startDateTime,
				endDateTime: that.endDateTime,
				currentPage: that.currentPage,
				pageSize: that.pageSize
			}
			that.postRequest('', params).then(data => {
				debugger
				if (data) {
					this.tableData = data.data.list;
					that.total = data.data.total;
				}
			});
		}
	}
}
</script>
<style src="./_role.less" lang="less" scoped></style>

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
								<i class="fontName fa fa-calendar-times-o inquireBtnRight1"></i>
								取消选择
							</el-button>
							<el-button type="primary" size="small" class="small" @click="delSelectIds()" round>
								<i class="fontName fa fa-trash-o inquireBtnRight1"></i>
								删除
							</el-button>
							<el-button-group class="left">
								<el-button size="small" icon="el-icon-refresh " @click="findAdminAll"></el-button>
								<el-button size="small" icon="el-icon-s-grid"></el-button>
							</el-button-group>
						</div>
						<div>
							<el-table
									ref="multipleTable"
									@selection-change="selectRowChange"
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
										:show-overflow-tooltip="true"
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
												v-model="scope.row.enabled==0?false:true"
												active-color="#13ce66"
												inactive-color="#ff4949"
												@change="updateEnabled($event,scope.row)">
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
												@click="updateUser(scope.$index, scope.row)"><i class="fontName fa fa-edit inquireBtnRight1"></i>编辑
										</el-button>
										<el-button
												size="mini"
												type="danger"
												@click="delUser(scope.$index, scope.row)"> <i class="fontName fa fa-trash-o inquireBtnRight1"></i>删除
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
				<el-form :rules="rules" ref="addUpdateForm" :model="form" :inline="false" label-width="120px" class="demo-form-inline">
					<el-form-item label="用户头像:" ref="uploadElement" prop="image">
						<!--<el-input v-model="goods.image" v-if="false"></el-input>-->
						<!--<el-upload-->
						<!--		class="upload-demo"-->
						<!--		:on-success="handleAvatarSuccess"-->
						<!--		accept="image/jpeg,image/jpg,image/png"-->
						<!--		action-->
						<!--		:file-list="fileList"-->
						<!--		:limit="1"-->
						<!--		:auto-upload="false"-->
						<!--		:before-upload="beforeUpload2"-->
						<!--		ref="upload"-->
						<!--		:on-change="handleChange"-->
						<!--		multiple-->
						<!--		:data="goods">-->
						<!--	<el-button type="success" size="small">选择文件</el-button>-->
						<!--</el-upload>-->
						<el-upload
								class="avatar-uploader"
								action=""
								:show-file-list="false"
								:auto-upload="true"
								:on-success="handleAvatarSuccess"
								:before-upload="beforeAvatarUpload">
							<el-image v-if="imageUrl" :src="imageUrl" class="avatar" :fit="cover"></el-image>
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					<el-row :gutter="0">
						<el-col :span="10">
							<el-form-item label="用户名:" prop="name">
								<el-input class="inputWithe" size="medium" v-model="form.name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="10">
							<el-form-item label="用户昵称:" prop="nickName">
								<el-input class="inputWithe" size="medium" v-model="form.nickName"></el-input>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row :gutter="0">
						<el-col :span="10">
							<el-form-item label="手机号:" prop="phone">
								<el-input class="inputWithe" size="medium" v-model="form.phone"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="10">
							<el-form-item label="邮箱:" prop="email">
								<el-input class="inputWithe" size="medium" v-model="form.email"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="0">
						<el-col :span="10">
							<el-form-item label="性别:" prop="gender">
								<div>
									<el-radio v-model="form.gender" label="1">男</el-radio>
									<el-radio v-model="form.gender" label="0">女</el-radio>
								</div>
							</el-form-item>
						</el-col>
						<!--<el-col :span="10">-->
						<!--	<div>-->
						<!--		<el-form-item label="是否启用:" prop="enabled">-->
						<!--			<el-switch style="height: 40px" v-model="form.enabled"  active-color="#13ce66"-->
						<!--					   inactive-color="#ff4949" active-value="true" inactive-value="false"></el-switch>-->
						<!--		</el-form-item>-->
						<!--	</div>-->
						<!--</el-col>-->
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
			total: 0,
			name: '',
			startDateTime: '',
			endDateTime: '',
			whetherUpdate: false,
			dialogFormVisible: false,//是否显示弹窗
			imageUrl: '',
			delIds: '',
			selectIds:'',
			form: {
				name: '',
				nickName: '',
				gender: 0,
				email: '',
				phone: '',
				// enabled: 'true',
			},
			rules: {
				name: [{
					required: true, message: '用户名不能为空!', trigger: 'blur'
				}],
				phone: [{
					required: true, message: '手机号不能为空!', trigger: 'blur',style:"line-height: 2"
				}],
				email: [{
					required: true, message: '邮箱不能为空!', trigger: 'blur'
				}]
			}
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
		selectRowChange(rows) {
			var that = this;
			for (var i = 0; i < rows.length; i++) {
				var id = rows[i].id;
				if (that.selectIds.indexOf(id)==-1){
					that.selectIds+=id+',';
				}
			}
			console.log('rows:' + that.selectIds);
		},
		toggleSelection(rows) {
			this.$refs.multipleTable.to
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
			this.pageSize = size;
			this.findAdminAll();
			console.log(this.pageSize)  //每页下拉显示数据
		},
		handleCurrentChange: function (currentPage) {
			this.currentPage = currentPage;
			this.findAdminAll();
			console.log(this.currentPage)  //点击第几页
		},
		updateEnabled(callback, row) {
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
			that.$confirm(`确认${text}该用户吗`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				iconClass: 'icon-warning',
				customClass: 'custom-message-box'
			}).then(res => {
				row.enable = flag;
				var json = {
					id: row.id,
					enable2: flag
				}
				that.postRequest('/user/updateEnabled', json).then(data => {
					if (data.status) {
						that.findAdminAll();
					} else {
						that.$message({
							message: data.msg,
							center: true,
							type: 'error'
						});
					}
				})
			})
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
			that.postRequest('/user/findAdmin', params).then(data => {
				if (data) {
					this.tableData = data.data.list;
					that.total = data.data.total;
				}
			});
		},
		handleChange(file, fileList) {
			//注意这个file.raw,踩坑,你可以直接传file试试
			this.getBase64(file.raw).then(res => {
				//这个goods是我的商品信息，在data定义了
				this.goods.image = res
			});
		},
		// 将file转base64
		getBase64(file) {
			return new Promise(function (resolve, reject) {
				let reader = new FileReader();
				let imgResult = "";
				reader.readAsDataURL(file);
				reader.onload = function () {
					imgResult = reader.result;
				};
				reader.onerror = function (error) {
					reject(error);
				};
				reader.onloadend = function () {
					resolve(imgResult);
				};
			});
		},
		handleAvatarSuccess(res, file) {
			this.imageUrl = URL.createObjectURL(file.raw);
		},
		beforeAvatarUpload(file) {
			var that = this;
			const isJPG = file.type === 'image/jpeg';
			const isLt2M = file.size / 1024 / 1024 < 2;

			if (!isJPG) {
				this.$message.error('上传头像图片只能是 JPG 格式!');
			}
			if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!');
			}

			var params = {
				file: file
			};
			that.postRequest('', params).then(data => {
				if (data) {
					this.tableData = data.data.list;
					that.total = data.data.total;
				}
			});
			return isJPG && isLt2M;
		},
		delUser(index, row) {
			var id = row.id;
			this.delUserByIds(id);
		},

		delSelectIds() {
			var that = this;
			that.selectIds.substring(0, that.selectIds.length - 1);
			this.$confirm('此操作将永久删除选中的数据, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				that.delUserByIds(that.selectIds);
			}).catch(() => {
				that.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},
		delUserByIds(ids) {
			var that = this;
			var params = {
				ids: ids
			};
			that.postRequest('/user/delUserById', that.qs.stringify(params)).then(data => {
				if (data.status) {
					that.$message({
						type: 'success',
						message: data.msg
					});
					that.findAdminAll();
				} else {
					that.$message({
						type: 'info',
						message: data.msg
					})
				}
			});
		},
		updateUser(index,row){
			var that =this;
			debugger
			that.form={
				name:row.name,
				nickName:row.nickName,
				phone:row.phone,
				email:row.email,
				// enabled:row.enabled,
				gender:row.gender,
				id:row.id,
			};
			that.whetherUpdate=true;
			that.dialogFormVisible=true;
		},
		addUpdateMenu() {
			var that = this;
			that.$refs.addUpdateForm.validate((valid) => {
				if (valid) {
					var params = {};
					debugger
					var url= that.whetherUpdate?'/user/updateAdmin':'/user/addAdmin';
					that.postRequest(url, that.form).then(data => {
						if (data.status) {
							that.$message({
								message: data.msg,
								center: true,
								type: 'info'
							});
							that.dialogFormVisible = false;
							that.findAdminAll();
						} else {
							that.$message({
								message: data.msg,
								center: true,
								type: 'error'
							});
						}
					});
				} else {
					that.$message.error('请输入所有字段');
					return false;
				}
			});
		},
		changeEnabled(callback){
			var that = this;
			let text = ''
			let flag = 0;
			if (callback) {//修改启用之前是否确认修改
				text = '启用'
				flag = true
			} else {
				text = '禁用'
				flag = false
			}
			that.form.enabled=flag;
		}
	}
}
</script>
<style src="./user.less" lang="less" scoped></style>
<style>
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}

.avatar-uploader .el-upload:hover {
	border-color: #409EFF;
}

.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 100px;
	height: 100px;
	line-height: 100px;
	text-align: center;
}

.avatar {
	width: 100px;
	height: 100px;
	display: block;
}
</style>

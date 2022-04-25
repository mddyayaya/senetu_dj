<template>
	<div class="addzz">
		<el-dialog 
			class="zzgk"
			:modal-append-to-body='true'
			width="500px"
			center
			:append-to-body='true'
			@close="close"
			:visible.sync="showAskFor">
			<div slot="title" class="addtitle">
				<div>
					<i class="icon adddzz"></i>
					请假
					<div class="addline"></div>
				</div>
			</div>
			<div class="databank">
                <el-form 
                    label-position="center"
                    label-width="80px"
                    ref="formData" 
                    :model="formData" 
                    :rules="rules">
                    <el-form-item class="form_item" label="请假人员" prop="uid">
                        <el-select 
                            v-model="formData.uid"
                            filterable
                            multiple
                          	value-key="id" 
                            collapse-tags
                            placeholder="请选择请假人员">
                            <el-option
                                :key="index"
                                v-for="(item,index) in memberList"
                                :label="item.u_name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="submit()">保 存</el-button>
				<el-button @click="close()">取 消</el-button>
			</div>
		</el-dialog>
		<div class="loading">
			
		</div>
	</div>
</template>

<script>
    import {dwgl} from '@/axios'
	import {Message} from 'element-ui'
    let that;
	export default {
		data(){
			return {
                showAskFor:false,
                formData:{
					hyid: "",
					hyflag: "",
                    uid:[]
                },
				props: { multiple: true },
               
				rules:{
					// 检测是否选择人员
					uid: [{ required: true, message: '请选择请假人员', trigger: 'blur' }],
				},
                memberList:[],
				getdata:{
					hyid: "",
					hyflag: "",
					user_id:this.$store.state.userinfo.id
				},
			}
		},
		methods:{
            open(data){
				that.getdata.hyid = data.hyid;
				that.getdata.hyflag = data.hy_flag;
				that.formData.hyid = data.hyid;
				that.formData.hyflag = data.hy_flag;
                that.showAskFor = true;
				that.memebers();
				that.showAsk();
            },
            close(){
				that.getdata.hyid = "";
				that.getdata.hyflag = "";
				that.formData.hyid = "";
				that.formData.hyflag = "";
                that.showAskFor = false;
            },
            submit(){
				// if(that.formData.uid.length !== 0){
					dwgl.updateAttentMeet(that.formData).then(res => {
						if(res.code == 200){
							that.$emit("dataList");
							that.close();
						}else{
							Message.warning(res.msg)
						}
					})
				// }else{
				// 	Message.warning("请选择要请假的人")
				// }
            },
			// 查看请假人员
			showAsk(){
				dwgl.updateAttentMeetGet(that.formData).then(res => {
					if(res.code == 200){
						if(res.data.uid.length > 0){
							that.formData.uid = res.data.uid;
						}else{
							that.formData.uid = [];
						}
					}else{
						Message.error(res.msg)
					}
				})
			},
            memebers(){
				//党员列表
				dwgl.memberAttendMeet(that.getdata).then(res => {
					if(res.code == 200){
						if(res.data.length > 0){
							that.memberList = res.data;
						}else{
							Message.warning("该活动暂无参与人员")
						}
					}else{
						Message.error(res.msg)
					}
				})
            }
		},
        created(){
            that = this;
        },
		mounted() {
			
		}
	}
</script>

<style lang="scss">
	.databank{
		width: 100%;
        height: 200px;
		display: flex;
		box-sizing: border-box;
		justify-content: space-between;
		.type{
			height: 100%;
			overflow-y: scroll;
			overflow-x: hidden;
			width: 25%;
			padding: 10px;
			box-sizing: border-box;
			border: 1px solid #DDDDDD;
			
		}
		.list{
			height: 100%;
			margin-left: 2%;
			width: 74%;
			padding: 10px;
			box-sizing: border-box;
			border: 1px solid #DDDDDD;
			
		}
	}
	.el-dialog--center .el-dialog__body{
		padding-top: 0 !important;
		padding-bottom: 0 !important;
	}
</style>

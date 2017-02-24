<template>
	<div>
		<div class="content-panel-header">
			<h4>关于我</h4>
		</div>
		<div class="content-panel-content">
            <h1>{{name}}</h1>
            <div class="form-div sex">
            	<label>性别：</label><span>{{sex}}</span>
            </div>
            <div class="form-div age">
            	<label>年龄：</label><span>{{age}}</span>
            </div>
            <div class="form-div email">
            	<label>邮箱：</label><span>{{email}}</span>
            </div>
            <div class="form-div sex">
            	<label>电话：</label><span>{{telephone}}</span>
            </div>
            <div class="form-div sex">
            	<label></label><span>{{desc}}</span>
            </div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	mounted:function(){
		this.getInitData().then(result=>{
			this.$store.dispatch('getAboutMe',result);
		},()=>{
			this.$message.error('服务器出错，请重新刷新页面')
		})
	},
	computed:mapGetters({
		name:'getName',
		email:'getEmail',
		telephone:'getTelephone',
		desc:'getDesc',
		sex:'getSex',
		age:'getAge'
	}),
	methods:{
		getInitData:function(){
			return new Promise((resolve,reject)=>{
				this.$http.get('/api/ownerInfo').then(
		            respone => resolve(respone.body[0]),
		            respone => reject()
		        )
			})
		}
	}
}
</script>

<style lang="less" scoped>
	h1{
		margin-bottom: 30px;
	}
	.form-div{
		color: rgb(52, 73, 94);
		margin-bottom: 10px;
		font-size: 18px;
	}
</style>
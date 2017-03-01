<template>
	<div>
		<div class="content-panel-header">
			<h4>文章推荐</h4>
		</div>
		<div class="main-recommand-text">
			<el-input class="main-recommand-input" v-model="mainRecommanText" placeholder="请输入好文推荐主题"></el-input>
			<el-button class="main-recommand-btn" @click="giveRecommandText">提交</el-button>

		</div>
		<div class="content-panel-content" v-if="recommandList&&recommandList.length">
            <h1>为您推荐以下文章</h1>
            <div class="content-panel-recommand">
				<div class="recommand-item" v-for="item in recommandList">
					<a :href="item.recommandLink">{{item.recommandTitle}}</a>
					<img class="up-img" src="../assets/up.png" @click="upArticle(item._id)">
					<span v-if="item.upNumber">({{item.upNumber}})</span>
					<span v-else>(0)</span>
				</div>
			</div>
		</div>
		<div class="content-panel-content" v-else>
			<div class="recommand-panel">
                <h1>这里暂时还没内容噢</h1>
            </div>
		</div>
	</div>
</template>

<script>
import { Message } from 'element-ui';
import { mapGetters } from 'vuex';
export default {
	data(){
		return {
			mainRecommanText:''
		}
	},
	mounted:function(){
		this.getRecommandData();
	},
	computed:mapGetters({
		recommandList:'getRecommandList'
	}),
	methods:{
		getRecommandData:function(){
			// 请求标签数据列表
	        this.$http.get('/api/getArticleRecommand').then(
	            respone => {
	            	this.$store.dispatch('getRecommandList',respone.body);
	            },
	            respone => {
	                console.error('请求数据出错，请重新刷新页面')
	            }
	        )
		},
		upArticle:function(id){
			this.$http.post('/api/updateRecommandUpNumber',{
                _id: id
            }).then(
                respone => {
                    Message.success('点赞成功');
                    this.getRecommandData();
                },
                respone => {
                    Message.error('点赞失败')
                }
            )
		},
		giveRecommandText:function(){
			this.$store.dispatch('giveRecommandText',this.mainRecommanText);
		}
	}

}
</script>

<style lang="less" scoped>
	.recommand-panel{
		text-align: center;
	    padding-top: 8rem;
	    color: #ccc;
	}
	.recommand-item{
		&:hover{
			background-color: #fafafa;
		}
		margin-bottom: 20px;
		.up-img{
			width: 15px;
			height: 15px;
			position: relative;
			top: 2px;
			cursor:pointer;
		}
	}
	.main-recommand-text{
		position: relative;
		top: 10px;
		left: 10px;
		margin-bottom: 10px;
	}
	.main-recommand-input{
		width: 200px;
		display: inline-block;
	}
	.main-recommand-btn{
		display: inline-block;
	}
</style>
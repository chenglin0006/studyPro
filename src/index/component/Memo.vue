<template>
	<div>
		<div class="content-panel-header">
			<h4>待办事项</h4>
		</div>
		<div class="content-panel-content" v-if="memoList&&memoList.length">
			<div class="memo-show-nav" >
				<div class="memo-item" v-for="item in memoList" @click="memoPreview(item)">
					<div class="memo-title-date">
					<div class="memo-title" :class="{'active':item.active}">
						{{item.memoTitle}}
					</div>
					<div class="memo-end-date" v-if="item.memoEndDate">
						({{item.memoEndDate}})
					</div>
					</div>
				</div>
			</div>
			<div class="memo-preview">
				<transition name="fade" mode="out-in">
	                <router-view></router-view>
	            </transition>
			</div>
		</div>
		<div class="content-panel-content" v-else>
            <div class="memo-panel">
                <h1>这里暂时还没内容噢</h1>
            </div>
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    mounted: function(){
    	this.getMemoData().then(result=>{
    		this.$store.dispatch('getMemoList',result)
    	},()=>{
    		Message.error('请求数据出错，请重新刷新页面')
    	});
    },
    computed:mapGetters({
    	memoList:'getMemoList'
    }),
    methods:{
    	getMemoData: function(){
            // 请求待办事项数据列表
            return new Promise((resolve,reject)=>{
            	this.$http.get('/api/getMemo').then(
	                respone => resolve(respone.body),
	                respone => reject()
	            )
            })
        },
        memoPreview:function(item){
        	this.$router.push('/memo/memoPreview'+item._id+'')
        }
    }
}
</script>

<style lang="less" scoped>
.fade-enter-active, .fade-leave-active{
		transition: all .5s ease !important;
}
.fade-enter, .fade-leave-active{
	  opacity: 0
}
.content-panel-content{
	position: relative;
	.back-home-preview{
		position: absolute;
		bottom: 20px;
		right: 30px;
		a{
			color: #20a0ff;
		}
	}
}
.memo-panel {
    text-align: center;
    padding-top: 8rem;
    color: #ccc;
}
.memo-show-nav{
	width: 300px;
    height: 100%;
    min-height: 600px;
    float: left;
    border-right: solid 1px #e1e1e1;
}
.memo-preview{
	float: left;
	max-width: 320px;
}
.memo-item{
	height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #f1f1f1;
    padding: 5px 10px 5px 10px;
    color: rgb(126, 126, 126);
    .memo-title-date{
    	&:hover{
	    	color: #20a0ff;
			transform: scale(1.1);
	    	transition: all 0.5s; 
	    }
    }
    .memo-title{
    	max-width:170px;
	    padding: 5px 0 5px 0;
	    display: inline;
	    white-space: nowrap;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    cursor: pointer;
	    font-size: 20px;
	    font-weight: bold;
	    display: inline-block;
	    vertical-align: top;
	    &.active{
			color: #20a0ff;
	    }
    }

    .memo-end-date{
		display: inline-block;
		vertical-align: middle;
		padding-top: 4px;
    }
}
.memo-preview{
	padding-left: 10px;
}
</style>
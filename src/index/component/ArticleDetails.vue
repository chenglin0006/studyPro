<template>
	<div>
        <div class="content-panel-header">
            <h4 @click="goBack" style="cursor: pointer;">返回</h4>
        </div>
        <div class="content-panel-content">
            <div>
                <div class="atticle-title atticle-details-title" v-if="articleDetail&&articleDetail.title">{{articleDetail.title}}</div>
                <div style="color:#34495e" v-if="articleDetail&&articleDetail.articleContent" v-compiledMarkdown>{{articleDetail.articleContent}}</div>
            </div>
        </div>
	</div>
</template>

<script>
import marked from 'marked';
import highlight from 'highlight.js'
import '../assets/atom-one-light.css'
import { mapGetters } from 'vuex'
export default {
	mounted: function(){
		var id = this.$route.params.id;
		this.getArticleDetailFun(id).then(result=>{
			this.$store.dispatch('getArticleDetail',result);
		},(respone)=>{
			console.log('错误'+respone)
		});
	},
	computed:mapGetters({
		articleDetail:'getArticleDetail'
	}),
	methods: {
		goBack: function(){
			this.$router.go(-1)
		},
		getArticleDetailFun:function(id){
			return new Promise((resolve,reject)=>{
				this.$http.get('/api/articleDetails/'+ id)
				.then(
					respone => resolve(respone.body),
					respone => reject(respone)
				)
			})
		}
	},
	directives: {
        compiledMarkdown: {
            bind: function(el){
                el.innerHTML = marked(el.innerText)
            }
        }
    }
}
</script>

<style>
.atticle-title {
    font-size: 22px;
	cursor: pointer;
	border-left: 3px #a0a0a1 solid;
	padding-left: 10px;
	color: #2c3e50;
	font-weight: bold;
	margin-bottom: 10px;
}
.atticle-details-title {
    cursor: auto;
}
</style>

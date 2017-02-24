<template>
    <div class="article-recommand-wrap">
        <div class="article-recommand-nav">
            <div class="article-instructions">
                <img src="../assets/article-title.png" height="20" width="20">
                <span>好文推荐</span>
                <img src="../assets/add.png" height="17" width="17" @click="addArticRecommand(null)">
            </div>
            <ul v-articleListHeight>
                <li class="recommand-detail" v-for="item in articleRecommand">
                    <img src="../assets/labels.png" height="22" width="17">
                    <a :href="item.recommandLink" class="articleLabel-title">{{item.recommandTitle}}</a>
                    <img class="up-img" src="../assets/up.png" height="15" width="15"><span>({{item.upNumber}})</span>
                    <el-button class="delete-recommand" @click="deleteRecommand(item)">删除</el-button>
                    <el-button class="edit-recommand" @click="addArticRecommand(item)">编辑</el-button>
                </li>
            </ul>
            <div class="recommand-save" v-if="isRecommandInputShow">
                <div class="title" v-if="activeName=='new'">添加好文</div>
                <div class="title" v-else>编辑好文</div>
                <div class="close-btn" @click="colseRecommand">x</div>
                <el-input class="recommand-title-input"  v-model="recommandTitle" placeholder="请输入好文标题">
                </el-input>
                <el-input class="recommand-link-input"  v-model="recommandLink" placeholder="请输入好文链接">
                </el-input>
                <el-button slot="append" icon="check" @click="saveRecommandArticle">保存</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { Message } from 'element-ui';
export default{
    data(){
        return{
            articleRecommand: [

            ],
            recommandTitle: '',
            recommandLink: '',
            isRecommandInputShow: false,
            editRecommand:{},
            activeName:''
        }
    },
    mounted: function(){
        this.getRecommandData();
    },
    methods: {
        getRecommandData: function(){
            // 请求推荐好文数据列表
            this.$http.get('/api/getArticleRecommand').then(
                respone => {
                    this.articleRecommand =  respone.body
                },
                respone => {
                    Message.error('请求数据出错，请重新刷新页面')
                }
            )
        },
        colseRecommand:function(){
            this.isRecommandInputShow = false;
        },
        // 删除推荐好文
        deleteRecommand:function(item){
            this.$http.post('/api/delect/recommand',{
                _id:item._id
            }).then(
                respone => {
                    this.getRecommandData()
                },
                respone => {
                    Message.error('请求数据出错，请重新刷新页面')
                }
            )
        },
        addArticRecommand: function(item){
            this.activeName='new';
            console.log(item);
            if(item){
                this.activeName='edit';
                this.recommandTitle = item.recommandTitle;
                this.recommandLink = item.recommandLink;
                this.editRecommand = item;
            } else {
                this.recommandTitle = '';
                this.recommandLink = '';
            }
            this.isRecommandInputShow = true;
        },
        saveRecommandArticle: function(){
            this.isRecommandInputShow = false;
            if(this.activeName == 'edit'){
               this.editRecommand.recommandTitle = this.recommandTitle;
               this.editRecommand.recommandLink = this.recommandLink;
                this.$http.post('/api/editRecommand',{
                    recommand: this.editRecommand
                }).then(
                    respone => {
                        this.getRecommandData();
                        Message.success('好文信息更新成功')
                    },
                    respone => Message.error('更新失败')
                )

                return;
            }
            var obj = {
                recommandTitle: this.recommandTitle,
                recommandLink: this.recommandLink,
                upNumber:0
            }
            if(this.recommandTitle){
                this.articleRecommand.push(obj)
                this.$http.post('/api/saveArticleRecommand',{
                    recommand: obj
                }).then(
                    respone => {
            		    Message.success('好文信息保存成功')
                    },
                    respone => Message.error('保存失败')
                )
            }
        }
    },
    directives: {
        articleListHeight: {
            bind: function(el){
                var height = window.innerHeight - 120
                // el.style.maxHeight = height + 'px'
            }
        }
    }
}
</script>

<style lang="less" scoped>
.article-recommand-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    margin-left: 90px;
}
.article-label-nav {
    width: 230px;
    height: 100%;
    position: fixed;
    top: 0;
    left: 90px;
    border-right: 1px solid #f1f1f1;
    z-index: 1;
    background-color: #fff;
}
.article-label-nav > ul {
    overflow: auto;
    padding-left: 22px;
    padding-right: 22px;
}
.article-label-nav > ul > li {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #f1f1f1;
    padding: 5px 10px 5px 10px;
}
.article-label-nav > ul > li > img {
    display: block;
    float: left;
    padding-top: 13px;
    padding-right: 5px;
}
.article-label-nav > ul > li > h3 {
    width: 170px;
    padding: 5px 0 5px 0;
    display: inline;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    color: #20a0ff;
}
.tagName-input {
    margin: 5px 5px 0px;
    position: absolute;
    bottom: 13px
}

.recommand-detail{
    position: relative;
    width: 65%;
    margin-bottom: 5px;
    vertical-align: middle;
    line-height: 40px;
    margin-top: 5px;
    img{
        vertical-align: middle;
    }

    a{
        text-decoration: none;
    }
    .delete-recommand{
        position: absolute;
        right: 0;
    }

    .edit-recommand{
        position: absolute;
        right: 90px;
    }
    .up-img{
        margin-right: 5px;
    }
}

.recommand-save{
    width: 500px;
    border:solid 1px #e1e1e1;
    border-radius: 5px;
    position: fixed;
    top: 30%;
    left: 50%;
    margin-left: -250px;
    padding-top: 30px;
    padding-left:20px;
    padding-right: 20px;
    padding-bottom: 20px;
    margin-top: 30px;
    background: white;
    .title{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin-top: 10px;
        font-size: 15px;
        text-align: center;
    }
    .close-btn{
        position: absolute;
        right: 5px;
        top: 0px;
        cursor: pointer;
        padding:5px;
        width: 10px;
        height: 20px;

    }
    .recommand-title-input{
        margin-bottom: 10px;
        margin-top: 10px
    }
    .recommand-link-input{
        margin-bottom: 10px;
    }
}
</style>

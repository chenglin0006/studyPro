<template>
    <div id="app">
        <div class="left-sidebar">
            <div class="admin-left-div admin-logo">
                <img src="./admin/assets/logo.png" width="40" height="40">
            </div>
            <div class="admin-left-div article-logo" @click="articleList">
                <img src="./admin/assets/article.png" height="50" width="50">
                <span>文章</span>
            </div>
            <div class="admin-left-div label-logo" @click="articleLabel">
                <img src="./admin/assets/adminlabel.png" height="50" width="50">
                <span>标签</span>
            </div>
            <div class="admin-left-div recommand-logo" @click="articleRecommand">
                <img src="./admin/assets/up.jpeg" height="35" width="35">
                <span>好文推荐</span>
            </div>
            <div class="admin-left-div memo-logo" @click="remindMemo">
                <img src="./admin/assets/memo-logo.jpeg" height="35" width="35">
                <span>待办事项</span>
            </div>
            <div class="admin-left-div about-me-logo" @click="aboutMe">
                <img src="./admin/assets/about-me.jpg" height="40" width="40">
                <span>关于我</span>
            </div>
            <div class="admin-left-div use-logo" @click="personalCenter">
                <img src="./admin/assets/use.png" height="50" width="50">
                <span>个人信息</span>
            </div>
        </div>
        <div class="article-list-wrap">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {

        }
    },
    mounted: function(){

    },
    methods: {
        // 文章列表路由
        articleList: function(){
            this.$router.push('/articleList')
        },
        // 文章标签路由
        articleLabel: function(){
            this.$router.push('/atricleLabel')
        },
        //好文推荐
        articleRecommand: function(){
            this.$router.push('/atricleRecommand')
        },
        //待办事项
        remindMemo:function(){
            this.$router.push('/remindMemo')
        },
        // 个人中心
        personalCenter: function(){
            this.$router.push('/personalCenter')
        },
        //关于我
        aboutMe:function(){
            this.$router.push('/aboutMe')
        }
    },
    directives: {

    }
}
</script>

<style lang="less">
* {
    list-style-type: none;
    margin: 0;
    padding: 0;
}
body {
    position: relative;
}
pre {
    background-color: #f5f5f5;
    padding: 0.5rem 1rem;
    border-radius: 3px;
    margin: 10px 0 10px 0;
    overflow-x: auto;
}
blockquote {
    border-left: 10px #e4e9eb solid;
    background-color: #f5f5f5;
    padding: 15px 20px;
    margin: 10px 0 10px 0;
}
strong {
    color: #579eff;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    overflow: hidden;
}
.left-sidebar {
    width: 90px;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    border-right: 1px solid #f1f1f1;
    background-color: #f8f8f8;
}
.admin-logo {
    width: 70px;
    height: 80px;
    margin: 0 auto;
    margin-top: 20px;
    border-bottom: 1px solid #eaeaea;
}
.admin-logo > img {
    overflow: hidden;
    display: block;
    margin: 0 auto;
}
.article-logo {
    height: 60px;
    margin-top: 30px;
}
.article-logo > img {
    display: block;
    margin: 0 auto;
    cursor: pointer;
}
.label-logo {
    height: 60px;
    margin-top: 20px;
}
.label-logo > img {
    display: block;
    margin: 0 auto;
    cursor: pointer;
}
.recommand-logo {
    height: 60px;
    margin-top: 20px;
}
.recommand-logo > img {
    display: block;
    margin: 0 auto;
    cursor: pointer;
}
.memo-logo {
    height: 60px;
    margin-top: 20px;
}
.memo-logo > img {
    display: block;
    margin: 0 auto;
    cursor: pointer;
}
.use-logo {
    height: 60px;
    margin-top: 20px;
}
.use-logo > img {
    display: block;
    margin: 0 auto;
    cursor: pointer;
}
.about-me-logo {
    height: 60px;
    margin-top: 20px;
}
.about-me-logo > img {
    display: block;
    margin: 0 auto;
    cursor: pointer;
}
.sidebar-switch {
    height: 100px;
    position: absolute;
    bottom: 30px;
    left: 0;
}
.sidebar-switch > img {
    display: block;
    margin: 0 auto;
}
.article-list-wrap {
    position: relative;
    width: 100%;
    height: 100%;
}

.admin-left-div{
    position: relative;
}
.admin-left-div span{
    position: absolute;
    right: 0;
    top: 35px;
    color: #333;
    display: none;
    font-size: 12px;
}
.admin-left-div{
    &:hover{
        transform: scale(1.1);
        transition: all 0.5s;
        span{
            display: block;
        }
    }
}
</style>

<template>
    <div class="article-memo-wrap">
        <div class="article-recommand-nav">
            <div class="article-instructions">
                <img src="../assets/article-title.png" height="20" width="20">
                <span>待办事项</span>
                <img src="../assets/add.png" height="17" width="17" @click="addMemo(null)">
            </div>
            <ul>
                <li class="memo-detail" v-for="item in memoList">
                    <img src="../assets/labels.png" height="22" width="17">
                    <span class="memo-title-span"><span v-if="item.memoTitle">标题：</span>{{item.memoTitle}}</span>
                    <span class="memo-enddate-span"><span v-if="item.memoEndDate">到期时间：</span>{{item.memoEndDate}}</span>
                    <el-button class="delete-memo" @click="deleteMemo(item)">删除</el-button>
                    <el-button class="edit-memo" @click="addMemo(item)">编辑</el-button>
                </li>
            </ul>
            <div class="memo-save" v-if="isMemoInputShow">
                <div class="title" v-if="activeName=='new'">添加待办事项</div>
                <div class="title" v-else>编辑待办事项</div>
                <div class="close-btn" @click="colseMemo">x</div>
                <div>
                <div class="label-div">待办事项标题:</div><el-input class="memo-title-input"  v-model="memoTitle" placeholder="请输入待办事项标题">
                </el-input>
                </div>
                <div>
                <div class="label-div">待办事项结束时间:</div><date-picker class="memo-enddate-input" :date="startTime" :option="option"></date-picker>
                </div>
                <div>
                <div class="label-div">待办事项详细描述:</div><el-input type="textarea" class="memo-detail-input" placeholder="请描述详细内容" v-model="memoDetail">
                </el-input>
                </div>
                <el-button slot="append" icon="check" @click="saveMemo">保存</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { Message } from 'element-ui';
import DatePicker from 'vue-datepicker';
export default{
    data(){
        return{
            memoList: [],
            value:['2017-02-17'],
            isMemoInputShow:false,
            activeName:'',
            memoTitle:'',
            memoDetail:'',
            editMemo:{},
            startTime: {
                time: ''
            },
            option: {
                type: 'day',
                week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                format: 'YYYY-MM-DD',
                placeholder: '请选择到期时间',
                inputStyle: {
                  'display': 'inline-block',
                  'padding': '6px',
                  'line-height': '22px',
                  'font-size': '16px',
                  'border': '2px solid #fff',
                  'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
                  'border-radius': '2px',
                  'color': '#5F5F5F'
                },
                color: {
                  header: '#3f51b5',
                  headerText: '#fff'
                },
                buttons: {
                  ok: '确定',
                  cancel: '取消'
                },
                overlayOpacity: 0.5, // 0.5 as default
                dismissible: true // as true as default
            },
            timeoption: {
                type: 'min',
                week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                format: 'YYYY-MM-DD HH:mm'
            },
            multiOption: {
                type: 'multi-day',
                week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                format:"YYYY-MM-DD HH:mm"
            }
          }
    },
    components: {
        DatePicker
    },
    mounted: function(){
        Date.prototype.format = function(format) {
            var o = {
                "M+": this.getMonth() + 1, //month
                "d+": this.getDate(), //day
                "h+": this.getHours(), //hour
                "m+": this.getMinutes(), //minute
                "s+": this.getSeconds(), //second
                "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
                "S": this.getMilliseconds() //millisecond
            }
            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1,(this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o){
                if (new RegExp("(" + k + ")").test(format)){
                    format = format.replace(RegExp.$1,RegExp.$1.length == 1 ? o[k] :("00" + o[k]).substr(("" + o[k]).length));
                }
            }
            return format;
        }
        this.getMemoData();
    },
    computed:{
        memoEndDate:function(){
            return this.startTime.time;
        }
    },
    methods: {
        getMemoData: function(){
            // 请求待办事项数据列表
            this.$http.get('/api/getMemo').then(
                respone => {
                    this.memoList =  respone.body;
                },
                respone => {
                    Message.error('请求数据出错，请重新刷新页面')
                }
            )
        },
        colseMemo:function(){
            this.isMemoInputShow = false;
        },
        // 删除推荐好文
        deleteMemo:function(item){
            this.$http.post('/api/delect/memo',{
                _id:item._id
            }).then(
                respone => {
                    this.getMemoData();
                },
                respone => {
                    Message.error('请求数据出错，请重新刷新页面')
                }
            )
        },
        addMemo: function(item){
            this.activeName='new';
            if(item){
                this.activeName='edit';
                this.memoTitle = item.memoTitle;
                this.memoEndDate = item.memoEndDate;
                this.memoDetail = item.memoDetail;
                this.startTime.time = item.memoEndDate;
                this.editMemo = item;
            } else {
                this.memoTitle = '';
                this.startTime.time = '';
                this.memoEndDate = '';
                this.memoDetail = '';
            }
            this.isMemoInputShow = true;
        },
        saveMemo: function(){
            this.isRecommandInputShow = false;
            if(this.activeName == 'edit'){
               this.editMemo.memoTitle = this.memoTitle;
               this.editMemo.memoEndDate = this.memoEndDate;
               this.editMemo.memoDetail = this.memoDetail;
               console.log(this.editMemo);
                this.$http.post('/api/editMemo',{
                    memo: this.editMemo
                }).then(
                    respone => {
                        this.getMemoData();
                        this.isMemoInputShow = false;
                        Message.success('待办事项更新成功');
                    },
                    respone => Message.error('更新失败')
                )

                return;
            }
            var obj = {
                memoTitle: this.memoTitle,
                memoEndDate: this.memoEndDate,
                memoDetail:this.memoDetail,
                memoCreateDate:new Date().format('yyyy-MM-dd hh:mm:ss')
            }
            if(this.memoTitle){
                this.memoList.push(obj)
                this.$http.post('/api/saveMemo',{
                    memo: obj
                }).then(
                    respone => {
                        this.isMemoInputShow = false;
            		    Message.success('待办事项保存成功')
                    },
                    respone => Message.error('保存失败')
                )
            }
        }
    }
}
</script>

<style lang="less">
.article-memo-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    margin-left: 90px;
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

    .memo-detail{
        position: relative;
        width: 65%;
        margin-bottom: 5px;
        vertical-align: middle;
        line-height: 40px;
        margin-top: 5px;
        .memo-title-span{
            margin-right: 10px;
        }
        img{
            vertical-align: middle;
        }
        .delete-memo{
            position: absolute;
            right: 0;
        }

        .edit-memo{
            position: absolute;
            right: 90px;
        }
    }

    .memo-save{
        width: 500px;
        border:solid 1px #e1e1e1;
        border-radius: 5px;
        position: fixed;
        top: 20%;
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
        .label-div{
            display: inline-block;
            width: 150px;
        }
        .el-input,.el-textarea{
            width: 300px;
        }
        .memo-title-input{
            margin-bottom: 10px;
            margin-top: 10px;
            display:inline-block;
        }
        .memo-detail-input{
            margin-bottom: 10px;
            display:inline-block;
            vertical-align: -webkit-baseline-middle;
            vertical-align: middle;
        }
        .memo-enddate-input{
            margin-bottom: 10px;
            width: 283px;
            display:inline-block;
            .datepickbox input{
                width: 100%;
            }
        }
    }
}

</style>

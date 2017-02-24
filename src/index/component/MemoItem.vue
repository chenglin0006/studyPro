<template>
    <section>
    	<div class="memo-preview-div">
            <h5>{{commonTitle}}</h5>
    		<div class="memo-item-title">
                <span>{{memoItem.memoTitle}}</span>
            </div>
            <div class="memo-item-create-time" v-if="memoCreateDateStr">
                <div class="text">创建时间:</div>
                <div class="date">{{memoCreateDateStr}}</div>
            </div>
    		<div class="memo-item-end-date">
                <div class="text">到期时间:</div>
                <div class="date">{{memoItem.memoEndDate}}</div>
            </div>
            <div class="memo-item-detail">
                {{memoItem.memoDetail}}
            </div>
    	</div>
    </section>
</template>

<script>
import {mapGetters,mapState} from 'vuex'
export default {
    beforeRouteEnter:function(to,from,next){
        next()
    },
    beforeRouteUpdate:function(to,from,next){
        next()
    },
    beforeRouteLeave:function(to,from,next){
        next()
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
    	this.getMemo();
    },
    computed: {
        ...mapGetters({
          memoItem:'getMemoItem'
        }),
        ...mapState({
            commonTitle:state=>state.memoitem.title
        }),
        memoCreateDateStr:function(){
            if(this.memoItem.memoCreateDate){
                return new Date(this.memoItem.memoCreateDate).format('yyyy-MM-dd hh:mm:ss');
            } else {
                return ""
            }
        }
    },
    watch:{
        '$route':function(to,from){
            this.getMemo();
        }
    },
    methods:{
    	getMemo:function(){
            this.$http.get('/api/getMemoItem/'+ this.$route.params.memoId).then(
                respone => {
                    this.$store.dispatch('getMemoItem',respone.body)
                },
                respone => console.log('错误'+respone)
            )
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
    .memo-item-title{
        font-size: 22px;
        cursor: pointer;
        border-left: 3px #a0a0a1 solid;
        padding-left: 10px;
        color: #2c3e50;
        font-weight: bold;
    }
    .memo-item-end-date,.memo-item-create-time{
        margin-top: 10px;
        .text{
            display: inline-block;
            color: #f63;
        }
        .date{
            display: inline-block;
        }
    }
    .memo-item-create-time{
        .text{
            color: #2c3e50;
        }
    }
    .memo-item-detail{
        color: rgb(52, 73, 94);
        margin-top: 10px;
    }
</style>
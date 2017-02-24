<template>
	<div>
		<div class="content-panel-header">
			<h4>标签</h4>
		</div>
		<div class="content-panel-content">
            <div id="main" class="chart-div">
                
            </div>
			<ul class="label-list-wrap">
				<li v-for="item in articleLabel" @click="labelClassification(item._id)">
                    <img src="../assets/label.png" height="25" width="25">
					<h3 class="articleLabel-title">
                        {{item.tagName}}
                    </h3>
				</li>
			</ul>
            
		</div>
	</div>
</template>

<script>
import echarts from 'echarts';
import {mapGetters} from 'vuex';
export default {
	mounted: function(){
        // 请求标签数据列表
        this.getInitData().then(result=>{
            this.$store.dispatch('getArticleLabel',result);
            this.initEcharts();
        },()=>{
            console.error('请求数据出错，请重新刷新页面')
        })
    },
    computed:mapGetters({
        articleLabel:'getArticleLabel'
    }),
    methods: {
        labelClassification: function(tagId){
            this.$router.push({path: 'home', query: {tagId: tagId}})
        },
        getInitData:function(){
            return new Promise((resolve,reject)=>{
                this.$http.get('/api/getArticleLabel').then(
                    respone => resolve(respone.body),
                    respone => reject()
                )
            })
        },
        initEcharts: function(){
            var myChart = echarts.init(document.getElementById('main'));
            var dataXList = [];
            var dataYList = [];
            
            // 指定图表的配置项和数据
            var option = {
                color: ['#3398DB'],
                title: {
                    text: '标签-文章数'
                },
                tooltip: {},
                legend: {
                    data:['文章数']
                },
                xAxis: {
                    data: []
                },
                yAxis: {},
                series: [{
                    name: '文章数',
                    type: 'bar',
                    data: []
                }]
            };
            this.articleLabel.forEach((ele,index)=>{
                option.xAxis.data.push(ele.tagName);
                option.series[0].data.push(ele.tagNumber);
            })

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }
    }
}
</script>

<style lang="less">
.label-list-wrap {
    padding: 0 22px 0 22px;
}
.label-list-wrap > li {
    height: 40px;
    width: 160px;
    float: left;
    line-height: 55px;
    padding: 5px 10px 5px 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
}
.label-list-wrap > li > img {
    display: block;
    float: left;
    padding: 13px 5px 15px 15px;
}
.label-list-wrap > li > h3 {
    width: 170px;
    height: 36px;
    line-height: 36px;
    padding: 5px 0 5px 0;
    cursor: pointer;
    color: #7e7e7e;
    background-color: #f3f3f3;
    border-radius: 3px;
    margin: 3px 0;
}
.label-list-wrap > li {
    transition: all 0.5s;
}
.label-list-wrap > li:hover {
    transform: scale(1.1);
    transition: all 0.5s;
}
.chart-div{
    width: 500px;
    height: 300px;
    div{
        margin-top: 10px !important;
    }
}
</style>
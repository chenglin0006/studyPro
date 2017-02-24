<template>
    <div class="personal-center-wrap">
        <div class="personal-title">About Me</div>
        <div class="form-wrap">
            <el-form ref="form" label-width="80px">
                <el-form-item label="姓名">
                    <input ref="name" :value="name"></input>
                </el-form-item>
                <el-form-item label="性别">
                    <input ref="sex" :value="sex"></input>
                </el-form-item>
                <el-form-item label="年龄">
                    <input ref="age" :value="age"></input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <input ref="email" :value="email"></input>
                </el-form-item>
                <el-form-item label="电话">
                    <input ref="telephone" :value="telephone"></input>
                </el-form-item>
                <el-form-item label="说明">
                    <input type="textarea" ref="desc" :value="desc"></input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存修改</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default{
    mounted: function(){
        this.getInitData().then(result=>{
            this.$store.dispatch('getAboutMe',result);
        },respone=>{
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
    methods: {
        getInitData:function(){
            return new Promise((resolve,reject)=>{
                this.$http.get('/api/ownerInfo').then(
                    respone => resolve(respone.body[0]),
                    respone => reject()
                )
            })
        },
        onSubmit: function(){
            this.$http.post('/api/save/ownerInfo', {
                form: {
                    name:this.$refs.name.value,
                    email:this.$refs.email.value,
                    telephone:this.$refs.telephone.value,
                    desc:this.$refs.desc.value,
                    age:this.$refs.age.value,
                    sex:this.$refs.sex.value
                }
            }).then(
                respone => this.$message('保存成功'),
                respone => this.$message.error('保存失败，请刷新页面重试')
            )
        }
    }
}
</script>

<style scoped>
.personal-center-wrap {
    margin-left:90px;
    text-align: center;
}
.personal-title {
    font-size: 35px;
    color: #20a0ff;
    margin-top: 2rem;
    font-weight: bold;
}
.form-wrap {
    width: 500px;
    margin: 0 auto;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 13px 16px;
}
.textarea-height > textarea {
    height: 150px;
}

input{
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    color: #1f2d3d;
    display: block;
    font-size: inherit;
    height: 36px;
    line-height: 1;
    outline: 0;
    padding: 3px 10px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
}
</style>
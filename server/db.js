var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

// mongoose.connect('mongodb://wei1:0987654321@ds161018.mlab.com:61018/weiwei')
mongoose.connect('mongodb://localhost:27017/blogTable')

var userSchema = new mongoose.Schema({
	name: String,
	pwd: String,
})

var articleSchema = new mongoose.Schema({
	title: String,
	date: Date,
	articleContent: String,
	state: String,
	label: String,
})

var tagSchema = new mongoose.Schema({
    tagName: String,
    tagNumber: Number,
})

var recommandSchema = new mongoose.Schema({
    recommandTitle: String,
    recommandLink: String,
    upNumber:Number
})

var memoSchema = new mongoose.Schema({
    memoTitle: String,
    memoEndDate: String,
    memoDetail: String,
    memoCreateDate:Date
})

var personalInformationSchema = new mongoose.Schema({
    name: String,
    individualitySignature: String,
    introduce: String,
})

var ownerInfoSchema = new mongoose.Schema({
    name: String,
    sex: String,
    age: Number,
    email:String,
    telephone:String,
    desc:String
})

var Models = {
	User: mongoose.model('User', userSchema),
	Article: mongoose.model('Article', articleSchema),
	TagList: mongoose.model('TagList', tagSchema),
	Recommand: mongoose.model('Recommand', recommandSchema),
	Memo: mongoose.model('Memo', memoSchema),
    PersonalInformation: mongoose.model('PersonalInformation', personalInformationSchema),
    OwnerInfo: mongoose.model('OwnerInfo',ownerInfoSchema )
}

module.exports = Models

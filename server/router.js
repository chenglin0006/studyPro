var express = require('express');
var router = express.Router();
var db = require('./db');

// 查询文章列表路由 用于博客前端展示数据不包含草稿内容
router.get('/api/articleList', function(req, res){
    db.Article.find({state: "publish"}, function(err, docs){
        if (err) {
            console.log('出错'+ err);
            return
        }
        res.json(docs)
    })
});
// 按标签ID查询文章列表路由 用于博客前端展示数据不包含草稿内容
router.post('/api/articleList', function(req, res){
    db.TagList.find({_id: req.body.tagId}, function(err, docs){
        if (err) {
            res.status(500).send();
            return
        }
        db.Article.find({label: docs[0].tagName,state: "publish"}, function(err, docs){
            if (err) {
                res.status(500).send();
                return
            }
            res.json(docs)
        })
    })
});
// 查询文章列表路由 用于博客后端管理系统包含草稿和已发布文章数据
router.get('/api/admin/articleList', function(req, res){
    db.Article.find({}, function(err, docs){
        if (err) {
            console.log('出错'+ err);
            return
        }
        res.json(docs)
    })
});
// 查询文章列表路由(含查询条件) 用于博客后端管理系统包含草稿和已发布文章数据
router.post('/api/admin/articleList', function(req, res){
    db.Article.find({label: req.body.label.label}, function(err, docs){
        if (err) {
            console.log('出错'+ err);
            return
        }
        res.json(docs)
    })
});
// 查询文章详情路由
router.get('/api/articleDetails/:id', function(req, res){
    db.Article.findOne({_id: req.params.id}, function(err, docs){
        if (err) {
            return
        }
        res.send(docs)
    })
});
router.post('/api/articleDetails', function(req, res){
    db.Article.findOne({_id: req.body.id}, function(err, docs){
        if (err) {
            return
        }
        res.send(docs)
    })
});
// 文章保存路由
router.post('/api/saveArticle', function(req, res){
    new db.Article(req.body.articleInformation).save(function(error){
        if (error) {
            res.status(500).send()
            return
        }
        // if (req.body.articleInformation.state != 'draft') {
        //     db.Article.find({label:req.body.articleInformation.label},function(err, ArticleList){
        //         if (err) {
        //             return
        //         }
        //         db.TagList.find({tagName:req.body.articleInformation.label}, function(err, docs){
        //             if(docs.length>0){
        //                 docs[0].tagNumber = ArticleList.length
        //                 db.TagList(docs[0]).save(function(error){})
        //             }
        //         })
        //     })
        // }
        res.send()
    })
});


// 文章更新路由
router.post('/api/updateArticle', function(req, res){
    db.Article.find({_id: req.body.obj._id}, function(err, docs){
        if(err){
            return
        }
        docs[0].title = req.body.obj.title
        docs[0].articleContent = req.body.obj.articleContent
        docs[0].date = req.body.obj.date
        docs[0].state = req.body.obj.state
        docs[0].label = req.body.obj.label
        db.Article(docs[0]).save(function(err){
            if (err){
                res.status(500).send();
                return
            }
            res.send()
        })
    })
});
// 文章标签查询路由
router.get('/api/getArticleLabel', function(req, res){
    db.TagList.find({},function(err, docs){
        if (err) {
            return
        }
        res.json(docs)
    })
});
// 文章标签保存路由
router.post('/api/saveArticleLabel', function(req, res){
    new db.TagList(req.body.tagList).save(function(error){
        if (error) {
            res.send('保存失败');
            return
        }
        res.send()
    })
});

//标签数清零
router.post('/api/clearTagNum', function(req, res){
    db.TagList.find({}, function(err, docs){
        if(err){
            return
        }
        docs.forEach(function(ele,index){
            ele.tagNumber = 0;
            db.TagList(ele).save(function(err){
                if (err){
                    res.status(500).send();
                    return
                }
                res.send()
            })
        });
    })
});


//文章标签文章数更新路由
router.post('/api/updateTagNum', function(req, res){
    db.TagList.find({tagName: req.body.label}, function(err, docs){
        if(err){
            return
        }
        // if(docs[0]&&docs[0].tagNumber){
            docs[0].tagNumber = docs[0].tagNumber + 1;
        // }
        db.TagList(docs[0]).save(function(err){
            if (err){
                res.status(500).send();
                return
            }
            res.send()
        })
    })
});

//推荐好文查询路由
router.get('/api/getArticleRecommand', function(req, res){
    db.Recommand.find({},function(err, docs){
        if (err) {
            return
        }
        res.json(docs)
    })
});

// 推荐好文保存路由
router.post('/api/saveArticleRecommand', function(req, res){
    new db.Recommand(req.body.recommand).save(function(error){
        if (error) {
            res.send('保存失败');
            return
        }
        res.send()
    })
});

//推荐好文更新路由
router.post('/api/editRecommand', function(req, res){
    db.Recommand.find({_id: req.body.recommand._id}, function(err, docs){
        if(err){
            return
        }
        docs[0].recommandTitle = req.body.recommand.recommandTitle;
        docs[0].recommandLink = req.body.recommand.recommandLink;
        docs[0].upNumber = req.body.recommand.upNumber;
        db.Recommand(docs[0]).save(function(err){
            if (err){
                res.status(500).send();
                return
            }
            res.send()
        })
    })
});

//推荐好文更新点赞数路由
router.post('/api/updateRecommandUpNumber', function(req, res){
    db.Recommand.find({_id: req.body._id}, function(err, docs){
        if(err){
            return
        }
        docs[0].upNumber = docs[0].upNumber+1;
        db.Recommand(docs[0]).save(function(err){
            if (err){
                res.status(500).send();
                return
            }
            res.send()
        })
    })
});

// 删除推荐好文
router.post('/api/delect/recommand', function(req, res){
    db.Recommand.remove({_id: req.body._id}, function(err, docs){
        if (err) {
            res.status(500).send();
            return
        }
        res.send()
    })
})

//待办事项查询路由
router.get('/api/getMemo', function(req, res){
    db.Memo.find({},function(err, docs){
        if (err) {
            return
        }
        res.json(docs)
    })
});

// 待办事项保存路由
router.post('/api/saveMemo', function(req, res){
    new db.Memo(req.body.memo).save(function(error){
        if (error) {
            res.send('保存失败');
            return
        }
        res.send()
    })
});

//待办事项更新路由
router.post('/api/editMemo', function(req, res){
    db.Memo.find({_id: req.body.memo._id}, function(err, docs){
        if(err){
            return
        }
        docs[0].memoTitle = req.body.memo.memoTitle;
        docs[0].memoEndDate = req.body.memo.memoEndDate;
        docs[0].memoDetail = req.body.memo.memoDetail;
        db.Memo(docs[0]).save(function(err){
            if (err){
                res.status(500).send();
                return
            }
            res.send()
        })
    })
});

// 删除待办事项
router.post('/api/delect/memo', function(req, res){
    db.Memo.remove({_id: req.body._id}, function(err, docs){
        if (err) {
            res.status(500).send();
            return
        }
        res.send()
    })
})

// 查询文章详情路由
router.get('/api/getMemoItem/:id', function(req, res){
    db.Memo.findOne({_id: req.params.id}, function(err, docs){
        if (err) {
            return
        }
        res.send(docs)
    })
});

// 博客信息路由
router.post('/api/save/personalInformation', function(req, res){
    db.PersonalInformation.find({}, function(err, docs){
        if (err) {
            res.status(500).send();
            return
        }
        if(docs.length>0){
            docs[0].name = req.body.form.name
            docs[0].individualitySignature = req.body.form.individualitySignature
            docs[0].introduce = req.body.form.introduce
            db.PersonalInformation(docs[0]).save(function(err){
                if (err) {
                    res.status(500).send();
                    return
                }
                res.send();
            })
        } else {
            new db.PersonalInformation(req.body.from).save(function(err){
                if (err){
                    res.status(500).send();
                    return
                }
                res.send();
            })
        }
    })
})

router.get('/api/personalInformation', function(req, res){
    db.PersonalInformation.find({}, function(err, docs){
        if (err) {
            res.status(500).send();
            return
        }
        res.json(docs)
    })
})

// 关于我信息路由
router.get('/api/ownerInfo', function(req, res){
    db.OwnerInfo.find({}, function(err, docs){
        if (err) {
            res.status(500).send();
            return
        }
        res.json(docs)
    })
})

router.post('/api/save/ownerInfo', function(req, res){
    db.OwnerInfo.find({}, function(err, docs){
        if (err) {
            res.status(500).send();
            return
        }
        if(docs.length>0){
            docs[0].name = req.body.form.name
            docs[0].sex = req.body.form.sex
            docs[0].age = req.body.form.age
            docs[0].email = req.body.form.email
            docs[0].telephone = req.body.form.telephone
            docs[0].desc = req.body.form.desc
            db.OwnerInfo(docs[0]).save(function(err){
                if (err) {
                    res.status(500).send();
                    return
                }
                res.send();
            })
        } else {
            new db.OwnerInfo(req.body.from).save(function(err){
                if (err){
                    res.status(500).send();
                    return
                }
                res.send();
            })
        }
    })
})

// 删除文章
router.post('/api/delect/article', function(req, res){
    db.Article.remove({_id: req.body._id}, function(err, docs){
        if (err) {
            res.status(500).send();
            return
        }
        res.send()
    })
})



module.exports = router
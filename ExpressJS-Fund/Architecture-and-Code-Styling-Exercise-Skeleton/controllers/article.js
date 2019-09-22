const Article = require('../models/Article');

module.exports = {
    createGet: (req, res) => {
        res.render("article/create");
    },
    createPost: (req, res) => {
        const {title, content} = req.body;
        const author = req.user._id;
        const user = req.user;

        const article = new Article({title, content, author});

        article.save()
            .then((result) => {
                user.articles.push(result._id);

                return user.save();
            })
            .then(() => {
                res.redirect('/');
            })
            .catch(console.error);
    },
    editGet: (req, res) => {
        const articleId = req.params.articleId;

        Article.findById(articleId)
            .then((article) => {

                res.render('article/edit', article);
            })
            .catch(console.error);
    },
    editPost: (req, res) => {
        const {title, content} = req.body;
        const articleId = req.params.articleId;

        Article.findById(articleId)
            .then((article) => {
                article.title = title;
                article.content = content;
                return article.save();
            })
            .then(() => {
                res.redirect('/');
            })
            .catch(console.error);

    },
    deleteGet: (req, res) => {
        const articleId = req.params.articleId;

        Article.findById(articleId)
            .then((article) => {

                res.render('article/delete', article);
            })
            .catch(console.error)

    },
    deletePost: (req, res) => {
        const articleId = req.params.articleId;
        Article.findById(articleId)
            .then((article) => {
                return Article.find(article).remove().exec();
            })
            .then(() => {
                req.user.articles = req.user.articles.filter(a => a !== articleId);
                req.user.articles.pull(articleId);
                return req.user.save();
            })
            .then(() => {
                res.redirect('/');
            })
            .catch(console.error);
    },
    details: (req, res) => {
        const articleId = req.params.articleId;

        Article.findById(articleId)
            .populate('author')
            .then((article) => {
                let isAuthor = false;
                if (req.user) {
                    isAuthor = req.user.isAuthor(article);

                }

                res.render('article/details', {article, isAuthor});
            })
            .catch(console.error)

    }
};
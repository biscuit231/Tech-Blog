const router = require('express').Router();
const { Posts, Users, Replys} = require('../models');
//const withAuth = require('../utils/auth');

// GET all posts for homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Posts.findAll({
            order: [['post_date', 'DESC']],
          include: [
            {
                model: Users,
                attributes: ['user_name'],
            },
          ],
});

        const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        } );

    } catch (err) {
        res.status(500).json(err);
    }
    })



//get posts by pk
router.get('/posts/:id', async (req, res) => {
    try {
        const postID = req.params.id
        const postData = await Posts.findByPk(postID);
        const replyData = await Replys.findAll({
            order: [['reply_body', 'ASC']],
            include: [
                {
                    model: Users,
                    attributes: ['user_name'],
                },
            ],
            where: {
                posts_id: postID
            }
        });
        console.log(replyData);
        const post = postData.get({ plain: true });
        const replys = replyData.map((reply) => reply.get({ plain: true }));
        console.log (replys);
     
   
        res.render('post', {
            post,
            replys,
            logged_in: req.session.logged_in
        });
        req.session.save(() => {
            req.session.postId = postID;
        })
        console.log(post)
        // console.log(reply)
        
    } catch (err) { 
        res.status(500).json(err);
    }
});


  module.exports = router;
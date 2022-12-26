const router = require('express').Router();
// const upload = require('../../server').upload;
const upload = require('../../utils/upload');

const { Posts } = require('../../models');

// Show all Posts
router.get('/', async (req, res) => {
    try {
        const userData = await Posts.findAll({
            order: [post_date, 'DESC']
        });
        

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json (err)
    }
})



// Create Post
router.post('/create', upload.single('post_image'), async (req, res) => {
    try {
      // Use the `req.file` object to access the uploaded file
        const postData = {
            post_title: req.body.post_title,
            post_body: req.body.post_body,
            post_author: req.session.user_id,
            post_image: req.file.filename,
          };

      const dbPost = await Posts.create(postData);
      
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });
  
// Edit Post
router.put('/:id', async (req, res) => {
    try {
        const oldPost = await Posts.update(req.body, {
            where: {post_id: req.params.id}
        })

        res.status(200).json("Post updated");
        //res.render('homepage', {updatePost});
    } catch (err) {
        res.status(500).json (err)
    }
})

// Delete Post
router.delete('/:id', async (req, res) => {
    try {
        const deletePost = await Posts.findByPk(req.params.id)

        deletePost.destroy();

    
        res.status(200).json(deletePost);
    } catch (err) {
        res.status(500).json (err)
    }
})


module.exports = router;
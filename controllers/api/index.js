const router = require('express').Router();
const userRoutes = require('./userRoutes')
const postRoutes = require('./postRoutes')
const replyRoutes = require('./replyRoutes')


router.use('/replys', replyRoutes);
router.use('/posts', postRoutes);
router.use('/users', userRoutes);


module.exports = router;


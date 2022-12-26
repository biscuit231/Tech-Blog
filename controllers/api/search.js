const router = require('express').Router();
const { Search } = require('../../models');

//route to search all tables
router.get('/search', async (req, res) => {
    try {
        const search = await Search.findAll({
            where: {
                [Op.or]: [
                    {post_title: {[Op.like]: `%${req.body.search}%`}},
                    {post_content: {[Op.like]: `%${req.body.search}%`}},
                    {user_name: {[Op.like]: `%${req.body.search}%`}},
                    {first_name: {[Op.like]: `%${req.body.search}%`}},
                    {last_name: {[Op.like]: `%${req.body.search}%`}},
                    {email: {[Op.like]: `%${req.body.search}%`}}
                ]
            }
        });
        res.status(200).json(search);
    } catch (err) {
        res.status(500).json (err)
    }
})
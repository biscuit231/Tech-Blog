const router = require('express').Router();
const { Users } = require('../../models');

//get all users
router.get('/', async (req, res) => {
    try {
        const userData = await Users.findAll({

        });
        console.log(userData);
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json (err)
    }
})


//render new user form
router.get('/newUser', (req, res) => {
    res.render('newUser');
});

//create new user
router.post('/signup', async (req, res) => {
    try {
        const newUser = await Users.create({
            user_name: req.body.user_name,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        });

    

        req.session.save(() => {
            req.session.logged_in = true;
            //changed
        
            res.status(200).json(newUser)
        })

    } catch (err) {
        res.status(500).json (err);
    } 
})

//login
router.get ('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});



router.post('/login', async (req, res) => {
    try {
        const userData = await Users.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res 
                .status(400)
                .json('Incorrect email or password, please try again');
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);
        
        if (!validPassword) {
            res
                .status(400)
                .json('Incorrect email or password, please try again');
            return;
        }

      

        req.session.save(() => {
            req.session.logged_in = true;
            req.session.user_id = userData.users_id;
            res 
                .status(200)
                .json({ user: userData, message: 'You are now logged in!' });
                console.log(userData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) { 
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});


module.exports = router;
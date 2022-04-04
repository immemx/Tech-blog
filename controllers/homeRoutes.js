const router = require('express').Router();
const { Comment, User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  console.log(req.session);

  Post.findAll({
      attributes: [
          'id',
          'post_url',
          'title',
          'created_at'
      ],
      include: [
          {
              model: Comment,
              attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
              include: {
                  model: User,
                  attributes: ['user_name']
              }
          },
          {
              model: User,
              attributes: ['user_name']
          }
      ]
  })
  .then(dbPostData => {
      // pass a single post object into the homepage template
      // console.log(dbPostData[0]);
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('homepage', { 
          posts,
          loggedIn: req.session.loggedIn 
      });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;

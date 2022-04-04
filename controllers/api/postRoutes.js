const router = require('express').Router();
const withauth = require('../../utils/auth');
const { User, Post, Comment } = require('../../models')

module.exports = router;
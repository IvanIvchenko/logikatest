const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const authorize = require('_helpers/authorize');
const Role = require('_helpers/role');

// routes
router.post('/authenticate', authenticate);
router.get('/', getAll); // admin only
router.get('/:email', authorize([Role.Admin]), getByEmail);
router.post('/button', buttonPush)
router.delete('/:id', _delete);
router.post('/add', addUser)

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Email or password is incorrect' }))
        .catch(next);
}

function buttonPush(req, res, next) {
    userService.addClick(req.body)
        .then(user => user ? res.json(user) : res.status(401).json({ message: 'Unauthorized' }))
        .catch(next);
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getByEmail(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.email);

    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    userService.getById(req.params.email)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(users => res.json(users))
        .catch(err => next(err));
}

function addUser(req, res, next) {
    userService.addUser(req.body)
        .then(text => res.json({ message: text }))
        .catch(err => next(err));
}

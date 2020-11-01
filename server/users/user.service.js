const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;

module.exports = {
    authenticate,
    getAll,
    getByEmail,
    addClick,
    addUser,
    delete: _delete
};

async function authenticate({ email, password }) {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        };
    }
}

async function getAll() {
    const users = await User.find({'role': 'User'});
    return {...users};
}

async function _deleteAll() {
    return await User.deleteMany({}, function(err) {
        if (err) {
            console.log(err)
        }
    }
);
}

async function getByEmail({email}) {
    const user = await User.findOne({ email });
    if (!user) return;
    return {
        ...user.toJSON(),
    };
}

async function addClick({email, btnId}) {
    const user = await User.findOne({email});
        user[btnId] += 1;
        user.pressTime = Date.now();
        await user.save();
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        };
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
    return User.find({'role': 'User'})
}

async function addUser({email, password, role}){
    console.log(email)
    if (await User.findOne({ email })) {
        throw 'Email "' + email + '" is already taken';
    }

    const user = new User({email, password});

    // hash password
    if (password) {
        user.hash = bcrypt.hashSync(password, 10);
    }
    user.role = role;
    user.btn1 = 0;
    user.btn2 = 0;
    user.btn3 = 0;
    user.pressTime = Date.now();

    // save user
    await user.save();
    return 'User created'
}



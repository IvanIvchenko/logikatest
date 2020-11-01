const user = { email: 'user' ,
hash: bcrypt.hashSync('user', 10) ,
role: 'User',
btn1: 0 ,
btn2: 0,
btn3: 0,
pressTime: Date.now() 
};

const user1 = { email: 'user1' ,
hash: bcrypt.hashSync('user1', 10) ,
role: 'User',
btn1: 0 ,
btn2: 0,
btn3: 0,
pressTime: Date.now() 
};

const user2 = { email: 'user2' ,
hash: bcrypt.hashSync('user2', 10) ,
role: 'User',
btn1: 0 ,
btn2: 0,
btn3: 0,
pressTime: Date.now() 
};

async function addUser(userParam){
const user = new User(userParam);
await user.save();
}

addUser(user);
addUser(user1);
addUser(user2);

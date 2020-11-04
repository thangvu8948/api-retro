const bcrypt = require("bcrypt");
const salt = 10;

const password = '1111';

let hashed= "";

bcrypt.hash(password, salt, (err, hash) => {
    hashed = hash;
    console.log(hashed)
})

let isSuccess = bcrypt.compare(password, hashed).then((value) => console.log(value), (err) => console.log(err))
console.log(isSuccess)




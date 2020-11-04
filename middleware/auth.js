const jwt = require('jsonwebtoken')
const Account = require('../model/Account/Account')

const auth = async(req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, "THANG1712763")
    try {
        console.log("middle")
        const user = await Account.findOne(data.id)
        console.log(user);
        if (!user) {
            throw new Error()
        }
        req.user = user;
        req.token = token;
        next()
    } catch (error) {
        console.log(error);
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }

}
module.exports = auth
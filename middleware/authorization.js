const jswn = require("jsonwebtoken");
const customerrorhandle = require("../controllers/customerror")
let checkadmin = (req, res, next) => {
    const token = req.headers["authorization"];
    if (token) {
        jswn.verify(token, 'admin_sceret_key', (err, decoded) => {
            if (err) {
                const error = new customerrorhandle(500, "wrong token")
                return next(error);

            }
            else {
                req.id = decoded.id
                next();
            }


        })

    }
    else {
        const err = new customerrorhandle(401, "token is missing..")
        next(err);
    }
}
module.exports = checkadmin;

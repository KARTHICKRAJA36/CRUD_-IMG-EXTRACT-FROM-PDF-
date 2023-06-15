const express = require("express")
const app = express();
const sequelize = require("./config/db")
const router = require("./router/router")
app.use(express.json())
app.use(router)
const globalerrorhandle = require("./controllers/globalerror")

sequelize.sync({ alter: true })
    .then(() => {
        console.log(" table created");
    })
    .catch((error) => {
        console.log(error);
    })

app.all('*', (req, res, next) => {
    const err = new Error('cannot find the ${req.originalUrl} in the server');
    err.status = 'failure';
    err.statuscode = 404;

    next(err);

})
app.use(globalerrorhandle)



app.listen(3330, () => {
    console.log("port running at 3330...");
})

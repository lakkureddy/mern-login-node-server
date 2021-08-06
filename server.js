const express = require("express");
const mongoDb = require("mongodb");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const refVar = mongoDb.MongoClient;
app.post("/login", (req, res) => {
    refVar.connect("mongodb+srv://admin:admin@cluster0.kfwlo.mongodb.net/mern-login-db?retryWrites=true&w=majority", (err, connection) => {
        if (err) throw err;
        else {
            const db = connection.db("mern-login-db");
            db.collection("login").find({ "uname": req.body.uname, "upwd": req.body.upwd }).toArray((err, array) => {
                if (err) throw err;
                else {
                    if (array.length > 0) {
                        res.send({ "login": "success" });
                    } else {
                        res.send({ "login": "failed" });
                    }
                }
            })
        }

    })
});

let port = process.env.PORT || 9090;
app.listen(port, () => {
    console.log(`server istening on port number ${port}`)
})

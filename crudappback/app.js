var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectId;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", (req, res) => res.send("Hello World"));

app.post("/register", (req, res) => {
    console.log(req.body);
    if (req.body.fname) {
        var emp = {
            fname: req.body.fname,
            lname: req.body.lname,
            department: req.body.department,
            contact_no: req.body.contact_no,
            email: req.body.email,
        };

        MongoClient.connect("mongodb://localhost:27017/emp", (err, db) => {
            if (err) {
                throw err
            }
            else {
                let custRes = {};
                db.collection("employee").insertOne(emp, (err, result) => {
                    if (err) {
                        custRes = {
                            "status": 400,
                            "error": err
                        }
                    }
                    else {
                        custRes = {
                            "status": 200,
                            "result": result
                        }
                    }
                    res.json(custRes);
                });
            }
        });
    }
    else {
        let custRes = {
            "status": 400,
            "error": "please Enter First Name"
        }
        res.json(custRes);
    }
});

app.get("/getUsers", (req, res) => {
    MongoClient.connect("mongodb://localhost:27017/emp", (err, db) => {
        if (err) {
            throw err;
        }
        else {
            db.collection("employee").find().toArray((err, result) => {
                res.json(result);
            });
        }
    });
});

app.post("/getSingleUser", (req, res) => {
    console.log(req.body);
    MongoClient.connect("mongodb://localhost:27017/emp", (err, db) => {
        if (err) {
            throw err;
        }
        else {
            db.collection("employee").findOne({ "_id": new ObjectId(req.body._id) }, (err, result) => {
                let custRes = {}
                if (err) {
                    custRes = {
                        "status": 400,
                        "error": err
                    }
                }
                else {
                    custRes = {
                        "status": 200,
                        "result": result
                    }
                }

                res.json(custRes);
            })
        }
    })
})


app.put("/updateUser", (req, res) => {
    MongoClient.connect("mongodb://localhost:27017/emp", (err, db) => {
        if (err) {
            throw err;
        }
        else {
            db.collection("employee").update({ "_id": new ObjectId(req.body._id) }, {
                $set: {
                    fname: req.body.fname,
                    lname: req.body.lname,
                    department: req.body.department,
                    contact_no: req.body.contact_no,
                    email: req.body.email,
                }
            }, (err, result) => {
                if(err){
                    custRes ={
                        "status": 400,
                        "error": err
                    }
                }
                else{
                    custRes ={
                        "status": 200,
                        "result": result
                    }
                }
                res.send(custRes);
            });
        }
    });
});


app.delete("/delUser", (req, res) => {
    console.log(req.body._id);
    let custRes = {}
    MongoClient.connect("mongodb://localhost:27017/emp", (err, db) => {
        if (err) {
            throw err
        }
        else {
            db.collection("employee").remove({ "_id": new ObjectId(req.body._id) }, (err, result) => {
                if (err) {
                    throw err;
                }
                else {
                    if (result) {
                        custRes = {
                            "status": 200,
                            "msg": "succesful",
                            "result": result
                        }
                    }
                    else {
                        console.log(err);
                        custRes = {
                            "status": 400,
                            "msg": "error",
                            "result": 0
                        }
                    }
                }
                res.json(custRes);
            });
        }
    });
});

app.listen(3000, () => {
    console.log("App is running on port 3000");
})
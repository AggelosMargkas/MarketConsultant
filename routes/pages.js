const express = require('express');

const router = express.Router();

router.get("/", (req, res) =>{
    //res.send("<h1>Home Page</h1>")
    res.render("home");
})

router.get("/register", (req, res) =>{
    //res.send("<h1>Home Page</h1>")
    res.render("register");
})

router.get("/login", (req, res) =>{
    //res.send("<h1>Home Page</h1>")
    res.render("login");
})

router.get("/index", (req, res) =>{
    //res.send("<h1>Home Page</h1>")
    res.render("index");
})

router.get("/map", (req, res) =>{
    //res.send("<h1>Home Page</h1>")
    res.render("map");
})

router.get("/adminsIndex", (req, res) =>{
    //res.send("<h1>Home Page</h1>")
    res.render("adminsIndex");
})

router.get("/adminsIndex/categoriesUpload", (req, res) =>{
    //res.send("<h1>Home Page</h1>")
    res.render("adminsIndex");
})

router.get("/adminsIndex/productPrices", (req, res) =>{
    //res.send("<h1>Home Page</h1>")
    res.render("adminsIndex");
})

router.get("/adminsIndex/deleteProductData", (req, res) =>{
    //res.send("<h1>Home Page</h1>")
    res.render("adminsIndex");
})

router.get("/adminsIndex/supermarketUpload", (req, res) =>{
    //res.send("<h1>Home Page</h1>")
    res.render("adminsIndex");
})

router.get("/adminsIndex/deleteSupermarketData", (req, res) =>{
    //res.send("<h1>Home Page</h1>")
    res.render("adminsIndex");
})

router.get("/map/showSupermarket", (req, res) =>{
    //res.send("<h1>Home Page</h1>")
    res.render("map");
})

router.get("/map/showProducts", (req, res) =>{
    //res.send("<h1>Home Page</h1>")
    res.render("map");
})

router.get("/testAjax", (req, res) =>{
    //res.send("<h1>Home Page</h1>")
    res.render("testAjax");
})


module.exports = router;
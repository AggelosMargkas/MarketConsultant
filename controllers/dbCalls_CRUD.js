
const mysql = require("mysql");


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    charset : 'utf8',
    multipleStatements: true // Xrisimopoieitai auti i metabliti gia na kanoume "tupou" BULK Updates VLEPE uploadPrices

})


exports.uploadCategories = (req, res) => { 

	var categories = JSON.parse(req.body.categories);
    console.log(categories);

    var subcategories = JSON.parse(req.body.subcategories);
    console.log(subcategories);
    
    var prod = JSON.parse(req.body.prod);
    console.log(prod);
    

    var sql1 = "INSERT INTO categories (id, name) VALUES ?";
    var sql2 = "INSERT INTO subcategories (uuid, sub_name, parent_category) VALUES ?";
    var sql3 = "INSERT INTO product (product_id, product_name, parent_subcategory) VALUES ?";

    
    db.query(sql1, [categories], function(err) {
        if (err) {console.log(err)};
    });
        
    db.query(sql2, [subcategories], function(err) {
        if (err) {console.log(err)};
    });

    db.query(sql3, [prod], function(err) {
        if (err) {console.log(err)};
    });

    res.json([{
    }])

}



exports.uploadPrices = (req, res) => { 

    
    // An kai apo tin ereuna pou ekana den ginetai akribws na ginei bulk update ousiastika ftiaxnoume queries
    // me multiple statements diladi me ton pinaka pou tou vazoume sthn eisodo kai auto istera ftiaxnei dinamika
    // osa queries xreiazetai.


	var prices = JSON.parse(req.body.money);
    console.log(prices);

    var queries = '';

    prices.forEach(function (item) {
    queries += mysql.format("UPDATE product SET product_price = ? WHERE product_id  = ?; ", item);
    });

    var sql1 = "UPDATE product SET product_price = ? WHERE product_id  = ?";
    
    db.query(queries, function(err) {
        if (err) {throw err};
    });

    res.json([{
    }])

}


exports.nukeTheProductData = (req, res) => {

    console.log("Hey")

    var sql1 = "DELETE FROM categories";
    var sql2 = "DELETE FROM subcategories";
    var sql3 = "DELETE FROM product";

    db.query(sql3, function(err) {
        if (err) {console.log(err)};
    });

    db.query(sql2, function(err) {
        if (err) {console.log(err)};
    });

    db.query(sql1, function(err) {
        if (err) {console.log(err)};
    });

    res.json([{
    }])


}

exports.uploadSupermarkets = (req, res) => {

	var supermarket_entries = JSON.parse(req.body.supermarkets);
    console.log(supermarket_entries);

    var sql1 = "INSERT INTO supermarket (super_id, name, lat, lon) VALUES ?";
    
    db.query(sql1, [supermarket_entries], function(err) {
        if (err) {console.log(err)};
    });
        

    res.json([{
    }])


}

exports.nukeTheSupermarketData = (req, res) => {

    console.log("Hey")

    var sql1 = "DELETE FROM supermarket";

    db.query(sql1, function(err) {
        if (err) {console.log(err)};
    });

    res.json([{
     }])

}

exports.ajaxtest = (req, res) => {

    var action = req.body.name;
    console.log(action);

    eh = res.json([{
       name_recieved: req.body.name,
       designation_recieved: req.body.designation
    }])

    //console.log(eh)
}

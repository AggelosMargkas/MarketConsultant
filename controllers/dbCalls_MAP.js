
const mysql = require("mysql");


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    charset : 'utf8',
    multipleStatements: true // Xrisimopoieitai auti i metabliti gia na kanoume "tupou" BULK Updates VLEPE uploadPrices

})


exports.showSupermarket = (req, res) => {

    var lat = [];
    var lon = [];
    var name = [];
    var cat = [];
    var products = [];


    
    db.query('SELECT supermarket.lat as lat, supermarket.lon as lon, supermarket.name as name, categories.name as categories, product.product_name as product_name FROM active_offers INNER JOIN supermarket ON active_offers.supermarket_id = supermarket.super_id INNER JOIN product ON active_offers.product_key = product.product_id INNER JOIN subcategories ON product.parent_subcategory = subcategories.uuid INNER JOIN categories ON subcategories.parent_category = categories.id ', async function (error, results) {
        if (error) {
            console.log(error);
        }

        for ( i = 0; i < results.length; i++ ){

            lat.push(results[i].lat);
            lon.push(results[i].lon);
            name.push(results[i].name);
            cat.push(results[i].categories);
            products.push(results[i].product_name);
        }



        eh = res.json([{
            latitude: lat,
            lognitude: lon,
            name: name,
            categories: cat,
            products: products
         }])

        //console.log(results.length);
        //console.log(name);
        //res.redirect('/');
        //res.send("registered");

        // eh = res.json([{
        //     latitude: lat,
        //     lognitude: lon,
        //     name: name
        //  }])
    });



}

exports.showProducts = (req, res) => {

    var lat = [];
    var lon = [];
    var name = [];
    
    q1 = "SELECT supermarket.super_id as id,supermarket.lat as lat, supermarket.lon as lon, supermarket.name as name FROM supermarket WHERE NOT EXISTS (SELECT active_offers.supermarket_id FROM active_offers WHERE supermarket.super_id = active_offers.supermarket_id)"

    db.query(q1, async function (error, results) {
        if (error) {
            console.log(error);
        }

        for ( i = 0; i < results.length; i++ ){

            lat.push(results[i].lat);
            lon.push(results[i].lon);
            name.push(results[i].name);
            console.log(results[i].name);
        }

        console.log("Kalispera.")

        eh = res.json([{
            latitude: lat,
            lognitude: lon,
            name: name
         }])

        //console.log(results.length);
        //console.log(name);
        //res.redirect('/');
        //res.send("registered");

        // eh = res.json([{
        //     latitude: lat,
        //     lognitude: lon,
        //     name: name
        //  }])
    });



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

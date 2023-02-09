
/**
 * 
 *  Se auto to fakelo that epireazoume ta files pou tha vazei o admin.
 *  Stoxos einai na girname ena json object se ena hidden object mesa
 *  sto form. 
 * 
 *  Me auto ton tropo tha mporesoume na steiloume auto to object stin
 *  node/ controllers.
 * 
 *  Oi controllers to mono pou einai ipeuthinoi na kanoun einai na valoun
 *  me bulk entries mesa stin vasi ola ta dedomena.
 * 
 *  analoga me to poio input energopoieite kathe fora tha ginete kai diaforetiko
 *  entry.
 * 
 */ 



window.onload=function(){


    /**
     * 
     * GOAL: Create the category, subcategory and product entry.
     * 
     *       We need to extract | 4 Categories | => | 2 Subcategoies | => | 5 products|
     *       
     *       So here we create a MainObject whitch will pass all the values to the hidden
     *       object in the form and the with ajax will be sent to the backend to open it 
     *       and do bulk entry.
     * 
     *          
     */

    var categories = []; // An array of arrays to enter with bulk entry
    var subcategories = [];// An array of arrays to enter with bulk entry
    var products = [] ; // An array of arrays to enter with bulk entry
    

    
    // Arxika se mia metavliti apothikeuoume to element pou mpainei o fakelos (To id tis formas)
    const inputCategories = document.getElementById('categoriesUpload')


    // Epeita elegxoume an ginetai activate, diladi an mpike kati(oxi aparaitita swsto)
    // alla gia arxi theoroume oti einai swsto kai an mpike to json pou mas endiaferei 
    // ksekiname kai to peirazoume, diladi VGAZOUME oti mas endiaferei apo ton fakelo auton


    inputCategories.addEventListener('change', function(e) {


        inputFileName = inputCategories.files[0].name;
        console.log("Arxeio pou mpike " + inputFileName);
    

        const reader = new FileReader()
        reader.onload = function(){

            var periexomeno = reader.result;
    
            var data = JSON.parse(periexomeno);
            for (i = 0; i <  4; i++ ){

                let categories_entry = [] // An array that contain every entry => | category_id (Primary Key) | category_name |
                category_object = data.categories[i];

                for (j= 2; j < 4; j++){

                    let subcategories_entry = []; // An array that contain every entry => | subcategory_id (Primary Key) | subcategory_name | parent_category_id (Foreign Key) |

                    counter = 0;
                    //console.log(category_object.subcategories[j]);
                    subcategory = category_object.subcategories[j].uuid;

                    for (t = 0; t < data.products.length; t++){

                        let products_entry = []; // An array that contain every entry => | product_id (Primary Key) | product_name | product_price | parent_subcategory_id (Foreign Key) |

                        product = data.products[t];
                        
                        if (product.subcategory == subcategory){
                            
                            //console.log("Gia katigoria " + subcategory + " vrika: " + product.name);
                            //console.log(product.id + "\t" + product.name + "\t" + subcategory); // ! ! ! TABLE 3 ! ! ! 

                            products_entry.push(product.id);
                            products_entry.push(product.name);
                            products_entry.push(subcategory);
        
                            products.push(products_entry);

                            counter++;
                        }

                        if(counter == 5){break}                        
                    }
                    
                    console.log(category_object.subcategories[j].uuid + "\t" + category_object.subcategories[j].name + "\t" + category_object.id); // ! ! ! TABLE 2 ! ! !
                    
                    subcategories_entry.push(category_object.subcategories[j].uuid);
                    subcategories_entry.push(category_object.subcategories[j].name);
                    subcategories_entry.push(category_object.id);

                    subcategories.push(subcategories_entry);

                }
                
                //console.log(category_object.id + "\t" + category_object.name); // ! ! ! TABLE 1 ! ! !
                
                // We create an entry of a category.
                categories_entry.push(category_object.id);
                categories_entry.push(category_object.name);

                //console.log(categories_entry); // to be sent to database for bulk entry.

                categories.push(categories_entry);
                //console.log(subcategories);


            }          
            
            el1 = JSON.stringify(categories);
            el2 = JSON.stringify(subcategories);
            el3 = JSON.stringify(products);

            document.getElementById('myField1').value = el1;
            document.getElementById('myField2').value = el2;
            document.getElementById('myField3').value = el3;

        }


        reader.readAsText(inputCategories.files[0]);

    }, false)




    
    var pricesOfProducts = []; // An array of arrays to enter with bulk entry

    // Arxika se mia metavliti apothikeuoume to element pou mpainei o fakelos (To id tis formas)
    const inputPrices = document.getElementById('pricesUpload')


    // Epeita elegxoume an ginetai activate, diladi an mpike kati(oxi aparaitita swsto)
    // alla gia arxi theoroume oti einai swsto kai an mpike to json pou mas endiaferei 
    // ksekiname kai to peirazoume, diladi VGAZOUME oti mas endiaferei apo ton fakelo auton


    inputPrices.addEventListener('change', function(e) {


        inputFileName = inputPrices.files[0].name;
        console.log("Arxeio pou mpike " + inputFileName);
    

        const reader = new FileReader()
        reader.onload = function(){

            var periexomeno = reader.result;
    
            var data = JSON.parse(periexomeno);
            

            console.log(data.data);

            for (t = 0; t < data.data.length; t++){
                
                let pricesOfProducts_entry = [];

                let cumsum = 0;
                console.log(data.data[t].id);

                totalPrices = data.data[t].prices.length;

                for (l = 0; l < totalPrices; l++ ){
            
                    cumsum +=  data.data[t].prices[l].price;
                    console.log(cumsum);
            
                }

                let avg = cumsum / totalPrices;

                console.log("The mean price for \t" + data.data[t].name + " \twith id -> " + data.data[t].id + " <-\t" + avg );
                
                pricesOfProducts_entry.push(avg);
                pricesOfProducts_entry.push(data.data[t].id);


                pricesOfProducts.push(pricesOfProducts_entry);
                
            }        
            

            el1 = JSON.stringify(pricesOfProducts);

            console.log(el1);
            document.getElementById('myField1').value = el1;

        }




        reader.readAsText(inputPrices.files[0]);

    }, false)



        
    var locationData = []; // An array of arrays to enter with bulk entry

    // Arxika se mia metavliti apothikeuoume to element pou mpainei o fakelos (To id tis formas)
    const inputSupermarkets = document.getElementById('geolocationFile')


    // Epeita elegxoume an ginetai activate, diladi an mpike kati(oxi aparaitita swsto)
    // alla gia arxi theoroume oti einai swsto kai an mpike to json pou mas endiaferei 
    // ksekiname kai to peirazoume, diladi VGAZOUME oti mas endiaferei apo ton fakelo auton


    inputSupermarkets.addEventListener('change', function(e) {


        inputFileName = inputSupermarkets.files[0].name;
        console.log("Arxeio pou mpike " + inputFileName);
    

        const reader = new FileReader()
        
        reader.onload = function(){

            var periexomeno = reader.result;
    
            var data = JSON.parse(periexomeno);
            

            console.log(data);

            for (t = 0; t < data.features.length; t++){
                
                let supermarketLocation_entry = [];


                console.log("ID: " + data.features[t].id + " NAME: " + data.features[t].properties.name + " LAT: " + data.features[t].geometry.coordinates[0] + " LON: " + data.features[t].geometry.coordinates[1]); // TABLE supermarket

                supermarketLocation_entry.push(data.features[t].id);
                supermarketLocation_entry.push(data.features[t].properties.name);
                supermarketLocation_entry.push(data.features[t].geometry.coordinates[0]);
                supermarketLocation_entry.push(data.features[t].geometry.coordinates[1]);

                locationData.push(supermarketLocation_entry);

            }        
 
            console.log(locationData);
            
            el1 = JSON.stringify(locationData);

            console.log(el1);
            document.getElementById('myField1').value = el1;
        }

        reader.readAsText(inputSupermarkets.files[0]);

    }, false)

}
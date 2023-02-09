
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


    
    
    var pricesOfProducts = []; // An array of arrays to enter with bulk entry

    // Arxika se mia metavliti apothikeuoume to element pou mpainei o fakelos (To id tis formas)
    const input = document.getElementById('pricesUpload')


    // Epeita elegxoume an ginetai activate, diladi an mpike kati(oxi aparaitita swsto)
    // alla gia arxi theoroume oti einai swsto kai an mpike to json pou mas endiaferei 
    // ksekiname kai to peirazoume, diladi VGAZOUME oti mas endiaferei apo ton fakelo auton


    input.addEventListener('change', function(e) {


        inputFileName = input.files[0].name;
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

        reader.readAsText(input.files[0]);

    }, false)



}
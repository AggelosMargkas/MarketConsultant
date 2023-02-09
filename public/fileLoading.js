    $(document).ready(function () {

            $('#categories').on('submit', function (event) {

                event.preventDefault();

                cat = document.querySelector('#myField1').value;
                subcat = document.querySelector('#myField2').value;
                prod = document.querySelector('#myField3').value;

                console.log(cat);
                console.log(subcat);
                console.log(prod);

                $.ajax({
                    url: "/adminsIndex/categoriesUpload",
                    data: {
                        categories: cat,
                        subcategories: subcat,
                        prod: prod
                    },
                    dataType: "JSON",
                    type: 'POST',
                    success: function (data) {
                        //var result = JSON.parse(data);
                        console.log("Nicely added!");
                    }
                });
            });

            $('#prices').on('submit', function (event) {

                event.preventDefault();

                prices = document.querySelector('#myField1').value;

                console.log(prices);

                $.ajax({
                    url: "/adminsIndex/productPrices",
                    data: {
                        money: prices
                        },
                    dataType: "JSON",
                    type: 'POST',
                    success: function (data) {
                        //var result = JSON.parse(data);
                        console.log("Nicely added!");
                    }
                });
            });
            

            $('#nuke').on('submit', function (event) {

                event.preventDefault();

                $.ajax({
                    url: "/adminsIndex/deleteProductData",
                    type: 'POST',
                    success: function (data) {
                        console.log("Nicely removed!");
                    }
                });
            });

            
            $('#supermarketForm').on('submit', function (event) {

                event.preventDefault();

                supermarkets = document.querySelector('#myField1').value;

                $.ajax({
                    url: "/adminsIndex/supermarketUpload",
                    data: {
                        supermarkets: supermarkets
                    },
                    dataType: "JSON",
                    type: 'POST',
                    success: function (data) {
                        //var result = JSON.parse(data);
                        console.log("Nicely added!");
                    }
                });

            });
            
            $('#nuke_again').on('submit', function (event) {

                event.preventDefault();

                $.ajax({
                    url: "/adminsIndex/deleteProductData",
                    type: 'POST',
                    success: function (data) {
                        console.log("Nicely removed!");
                    }
                });
            });

})

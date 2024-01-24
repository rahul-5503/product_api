user Api

post  https://product-api-3trd.onrender.com/user/signup

values {
    "email":"ravi@gmail.com",
    "password":"admin123"
}

response 201
{
    "message": "user created ok"
}

same email respons 409
{
    "message": "Email already in use"
}
===================================================

post https://product-api-3trd.onrender.com/user/login

value {
    "email":"ravi@gmail.com",
    "password":"admin123"
}

respons 200
{
message: ok
}
response 401 password wrong
{
message:"wrong password"
}
respnse 401 user wrong
{
message"auth failed"
}
===================================================
Delete https://product-api-3trd.onrender.com/user/delete/id

respons 200
{
message:"Delete sucessfully"
}

resonse 404
{
message:"not found"
}
===================================================

Get https://product-api-3trd.onrender.com/user

response 200

"count": 6,
    "message": {
        "user": [
            {
                "id": "65a8cdf2ab4ac165de61aacb",
                "username": "rahulf@gmail.com"
            },
            {
                "id": "65b0ad3d4dc6569f44ed1380",
                "username": "rexion@gmail.com"
            },
            {
                "id": "65b0ad584dc6569f44ed1383",
                "username": "prasath@gmail.com"
            },
            {
                "id": "65b0ad624dc6569f44ed1386",
                "username": "kumar@gmail.com"
            },
            {
                "id": "65b0ad6a4dc6569f44ed1389",
                "username": "raja@gmail.com"
            },
            {
                "id": "65b0ad7b4dc6569f44ed138d",
                "username": "ravi@gmail.com"
            }
        ]
    }
}

ORDER

===================================================

POST https://product-api-3trd.onrender.com/order

{
productId: "product id",
cartId:"cartid",
userId:"userId"
}

response 201
{message:"order creted"}

respose 500
{message:"Internal server"}

response 404 if any of the one requrement is not present
{message:"no found"}

===================================================

Get https://product-api-3trd.onrender.com/order/orderid

response 

{
    "cartid": "65b0ac4db9eb735e0d98bd24",
    "userid": {
        "_id": "65a8cdf2ab4ac165de61aacb",
        "email": "rahulf@gmail.com"
    },
    "data": {
        "order_Details": {
            "product": {
                "productId": {
                    "_id": "659fb8dd96a7ea9752949a26",
                    "name": "dragon",
                    "category": "rare",
                    "price": 5000
                },
                "Method": "GET",
                "Url": "https://product-api-3trd.onrender.com/product/productid/659fb8dd96a7ea9752949a26"
            },
            "cart": {
                "cartId": {
                    "_id": "65a7d9a5a88a7e8e33ba39c2",
                    "quantity": 7
                }
            },
            "createdAt": "2024-01-24T06:21:01.728Z"
        },
        "request": {
            "Method": "GET",
            "url": "https://localhost:4000/order"
        }
    }
}
=====================================================

DELETE https://product-api-3trd.onrender.com/order/delete/orderid

response 200
{
message:"deleted successfully"
}
response 404 
{
message:"Not found"}
response 500
{message:"internal server error"}

=====================================================

Product api

https://product-api-3trd.onrender.com/product/

=====================================================
Post /

values{
name: ,
description: ,
price:,
discount_price:,
category:,
}

response 200
{message:successfuly}
response 400
{message:"internal server error"}

=====================================================
Get /

response 200 return all products
=====================================================
Get /productid/id

respons 200 return details of products
response 404 not found
response 500 internal
=====================================================
Get /category/categoruname

respons 200 return all  products that match category
response 404 not found
response 500 internal
====================================================
Get /name/:name/


respons 200 return all products that match name means

https://product-api-3trd.onrender.com/product/name/kertt
{
    "data": {
        "products": [
            {
                "id": "659fc16919b457f1d72744c9",
                "name": "kertt",
                "description": "it iskerttgon",
                "category": "rare",
                "price": 250
            },
            {
                "id": "659fd45364014093e6146187",
                "name": "kertt 2002",
                "description": "it iskerttgon",
                "category": "rare",
                "price": 250
            },
            {
                "id": "659fd48564014093e614618b",
                "name": "111kertt 2002",
                "description": "it iskerttgon",
                "category": "rare",
                "price": 250
            },
            {
                "id": "65a08959f3683d3da36f4b76",
                "name": "11kertt 2024",
                "description": "it iskerttgon",
                "category": "rare",
                "price": 200
            }
        ]
    }
}

response 404 not found
response 500 internal

===================================================
(filter)
Get /name/:name/:value


respons 200 return all  products that match name and value

https://product-api-3trd.onrender.com/product/name/kertt/250

{
    "data": {
        "products": [
            {
                "id": "659fc16919b457f1d72744c9",
                "name": "kertt",
                "description": "good",
                "category": "rare",
                "price": 210,
                "discounted_price": 200
            },
            {
                "id": "65a08959f3683d3da36f4b76",
                "name": "11kertt 2024",
                "description": "it iskerttgon",
                "category": "rare",
                "price": 200
            }
        ]
    }
}
response 404 not found
response 500 internal

====================================================
patch  /update/:id/:description/:price/:discounted_price

order is important
respons 200 return updated details of products
response 404 not found
response 500 internal
======================================================
delete 
/detete/:productid

response 200
{
message:"deleted successfully"
}
response 404 
{
message:"Not found"}
response 500
{message:"internal server error"}

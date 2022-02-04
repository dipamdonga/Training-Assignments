console.log("Welcome, This is app.js");

const subTotal = document.getElementById("subTotal");
const total = document.getElementById("total");
subTotal.innerHTML = "₹" + 0;
total.innerHTML = "₹" + 0;

const productName = document.getElementById("productName");
const productQuantity = document.getElementById("productQuantity");
const productPrice = document.getElementById("productPrice");
const productDescription = document.getElementById("productDescription");
const productImage = document.getElementById("productImage");

let productArr = [];
let cartArr = [];

//function to load Image
var imgURL;
function loadImg(event) {
    console.log(event);
    imgURL = URL.createObjectURL(event.target.files[0]);
}

//#region on submit click add product to product list
// function to empty product Form
function emptyForm() {
    productName.value = "";
    productQuantity.value = "";
    productPrice.value = "";
    productDescription.value = "";
    productImage.value = null;
}

function LoadInventory() {
    // productArr.push(tempProduct);
    const inventoryCard = document.getElementById("inventoryCard");
    inventoryCard.innerHTML = "";

    // quantity update function:- https://stackoverflow.com/questions/12462318/find-a-value-in-an-array-of-objects-in-javascript

    for (let i = 0; i < productArr.length; i++) {
        let card = ' <div class="card p-3 bg-white col-3 mx-2 shadow"> <div class="about-product text-center mt-2"><img style="height: 160px;" src=" '
            + productArr[i].pImage +
            ' "> <div class="mt-3"> <h4> '
            + productArr[i].pName +
            ' </h4> </div> </div> <div class="stats mt-2"> <div class="d-flex justify-content-center text-black-50"> '
            + productArr[i].pDescription +
            ' </div> <div class="d-flex justify-content-between p-price"><span><b>Quantity</b> </span><span> '
            + productArr[i].pQuantity +
            ' </span></div> <div class="d-flex justify-content-between p-price"><span><b> Price</b></span><span> ₹'
            + productArr[i].pPrice +
            ' </span> </div> </div> <div class="d-flex justify-content-md-evenly total font-weight-bold mt-4"> <button id="btnAddToCart'+ i +'" onclick="btnAddToCartClick('
             + productArr[i].id + //', ' + i +
            ')" class="btn btn-outline-primary">Add to Cart</button> <button class="btn btn-outline-danger" id="btnRemoveProduct'+ i +'" onclick="btnRemoveProductClick('
            + i +
            ')">Remove</button> </div> </div> '
        inventoryCard.innerHTML += card;
    }
}

function btnAddInventoryClick() {
    // form validation condition
    let flag = true;
    if (productName.value.trim() == "" || productPrice.value.trim() == "" || productDescription.value.trim() == "" || productImage.value.trim() == "" || productQuantity.value.trim() == "" || parseInt(productQuantity.value.trim()) < 1 || parseInt(productPrice.value.trim()) < 1) flag = false;

    if (flag) {
        console.log("flag = true.")
        let tempProduct = {
            id: productArr.length,
            pName: productName.value,
            pQuantity: productQuantity.value,
            pPrice: productPrice.value,
            pDescription: productDescription.value,
            pImage: imgURL,
        }
        productArr.push(tempProduct);
        LoadInventory();
        emptyForm();
        swal("Thank you for adding product", "Your Product added to inventory successfully.", "success");

    } else swal("Oops!", "Provided data is not valid, Enter Data Properly.", "error");
}

function btnRemoveProductClick(id) {
    console.log('remove function');
    productArr.splice(id, 1);
    LoadInventory();
}
//#endregion on submit click add product to product list

//#region on submit click add product to Cart from product list
function LoadCart() {
    // cartArr.push(cartProduct);
    const cartCard = document.getElementById("cartCard");

    cartCard.innerHTML = "";
    let sum = 0;

    for (let i = 0; i < cartArr.length; i++) {
        let card = '<div class="items"> <div class="product" > <div class="row  ms-3"> <div class="col-md-3 my-2"> <img class="img-fluid mx-auto d-block image" src="'
            + cartArr[i].CpImage +
            '"> </div> <div class="col-md-8"> <div class="info"> <div class="row"> <div class="col-md-6 product-name"> <div class="product-name mt-3"> <a>'
            + cartArr[i].CpName +
            '</a> <div class="product-info"> <div>Price: <span class="value"> ₹'
            + cartArr[i].CpPrice +
            '</span></div> <div>Quantity: <span class="value">'
            + cartArr[i].CpQuantity +
            '</span></div> </div> </div> </div> <div class="col-md-5 price"> Total: <span> ₹'
            + cartArr[i].CpPrice * cartArr[i].CpQuantity +
            '</span> </div> <div class="col-md-1 mt-3"> <button class="btn btn-danger" onclick="btnRemoveFromCartclick('
            + i + ',' + cartArr[i].CpQuantity + ',' + cartArr[i].InventoryProductId +
            ')" ><i class="fas fa-trash-alt"></i></button> </div> </div> </div> </div> </div> </div> </div>'
        sum += cartArr[i].CpPrice * cartArr[i].CpQuantity;
        // console.log(sum);
        cartCard.innerHTML += card;

        const temp = 'btnRemoveProduct'+ cartArr[i].InventoryProductId;
        console.log("btn remove disable "+temp);
        document.getElementById(temp).disabled = true;
        
    }
    subTotal.innerHTML = "₹" + sum;
    total.innerHTML = "₹" + sum;

}

function btnAddToCartClick(id) {
    
    console.log("add to cart function");
    swal("Provide Product Quantity you want to buy:", {
        content: "input",
    })
        .then((InputProductQuantity) => {
            swal("Thank you for adding product", `${InputProductQuantity} Quantity for Product added to inventory successfully.`, "success");
            if (InputProductQuantity) {
                if (InputProductQuantity < 1 || InputProductQuantity > productArr[id].pQuantity)
                    swal("Oops!", `Data can not be ${InputProductQuantity}`, "error");
                // else if (InputProductQuantity > productArr[id].pQuantity) 
                //     alert("can not buy more than "+ productArr[id].pQuantity + "Quantity for this Product.");
                else {
                    let cartProduct = {
                        id: cartArr.length,
                        InventoryProductId: id,
                        CpName: productArr[id].pName,
                        CpImage: productArr[id].pImage,
                        CpQuantity: InputProductQuantity,
                        CpPrice: productArr[id].pPrice,
                    }
                    cartArr.push(cartProduct);

                    updateInventory(id, InputProductQuantity);

                    LoadCart();
                }
                // const temp = 'btnRemoveProduct'+i
                // console.log("btn remove disable "+temp);
                // document.getElementById(temp).disabled = true;
            }
        });
    
}

function updateInventory(id, InputProductQuantity) {
    productArr[id].pQuantity = productArr[id].pQuantity - InputProductQuantity;
    LoadInventory();
}

function btnRemoveFromCartclick(id, CpQuantity, InventoryProductId) {
    productArr[InventoryProductId].pQuantity = productArr[InventoryProductId].pQuantity + CpQuantity;
    LoadInventory();
    cartArr.splice(id, 1);
    LoadCart();
}

// btnRemoveDisable() {
//     const temp = 'btnRemoveProduct'+ cartArr[i].InventoryProductId;
//     console.log("btn remove disable "+temp);
//     document.getElementById(temp).disabled = true;
// }

//#endregion on submit click add product to Cart from product list
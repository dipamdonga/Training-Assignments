console.log("Welcome, This is app.js");

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

function AddToInventory(tempProduct) {
    productArr.push(tempProduct);
    const inventoryCard = document.getElementById("inventoryCard");
    inventoryCard.innerHTML = "";

    // quantity update function:- https://stackoverflow.com/questions/12462318/find-a-value-in-an-array-of-objects-in-javascript

    for (let i = 0; i < productArr.length; i++) {
        let card = ' <div class="card p-3 bg-white col-4 mx-2 shadow"> <div class="about-product text-center mt-2"><img style="height: 160px;" src=" '
                    + productArr[i].pImage +
                    ' "> <div> <h4> ' 
                    + productArr[i].pName +
                    ' </h4> </div> </div> <div class="stats mt-2"> <div class="d-flex justify-content-center text-black-50"> '
                    + productArr[i].pDescription +
                    ' </div> <div class="d-flex justify-content-between p-price"><span><b>Quantity</b> </span><span> '
                    + productArr[i].pQuantity + 
                    ' </span></div> <div class="d-flex justify-content-between p-price"><span><b> Price</b></span><span> ₹'
                    + productArr[i].pPrice +
                    ' </span> </div> </div> <div class="d-flex justify-content-md-evenly total font-weight-bold mt-4"> <button class="btn btn-outline-primary" id="btnAddToCart" onclick="btnAddToCartClick( '
                    + productArr[i].id + 
                    ' )">Add to Cart</button> <button class="btn btn-outline-danger" id="btnRemoveProduct" onclick="btnRemoveProductClick( ' 
                    + productArr[i].id + 
                    ')">Remove</button> </div> </div> '
        inventoryCard.innerHTML += card;
    }
}

function btnAddInventoryClick() {
    // form validation condition
    let flag = true;
    if (productName.value.trim() == "" || productPrice.value.trim() == "" || productDescription.value.trim() == "" || productImage.value.trim() == "" || productQuantity.value.trim() == "" || parseInt(productQuantity.value.trim()) < 1 || parseInt(productPrice.value.trim()) < 1) {
        flag = false;
    }

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
        // productArr.push();

        AddToInventory(tempProduct);

        emptyForm();

        swal("Thank you for adding product", "Your Product added to inventory successfully.", "success");

    } else swal("Oops!", "Provided data is not valid, Enter Data Properly.", "error");
}

//#endregion on submit click add product to product list
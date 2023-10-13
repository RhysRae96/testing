const {remote, desktopCapturer} = require('electron')
const main = remote.require("./main")

const productForm = document.querySelector("#productForm")
const productName = document.querySelector("#name")
const productPrice = document.querySelector("#price")
const productDescription = document.querySelector("#description")
const productsList = document.querySelector("#products")

let user = []

productForm.addEventListener('submit',async (e) => {
    try{
        e.preventDefault()

        const product = {
            name:productName.value,
            price:productPrice.value,
            description:productDescription.value,
        }

        const savedProduct = await main.createProduct(product)
        console.log(savedProduct)

        //reset the form

        productForm.reset()
        productName.focus()

        main.getProducts()
        
    }catch(err){
        console.log(err)
    }
});

const deleteProduct = async (id) => {
    const response = confirm("Are you sure you want to delete this product?")

    if(response){
        await main.deleteProduct(id);
        await getProducts();
    }
    return;
}

function renderProducts(products){
    productsList.innerHTML = ""

    products.forEach(product => {
        productsList.innerHTML += `
        
        <div class="card card-body my-2 animated fadeInLeft">
            <h4>${product.name}</h4>
            <p>${product.description}</p>
            <h3>${product.price}</h3>
        </div>
        <p>
        <button class="btn btn-danger btn-sm" onclick="deleteProduct('${product.id}')">
            DELETE
        </button>
        <button class="btn btn-secondary btn-sm" onclick="editProduct('${product.id}')">
            EDIT
        </button>
        </p>
        `
    });
}

const getProducts = async () => {
    products = await main.getProducts()
    renderProducts(products)
}

async function init(){
    getProducts
}

init()
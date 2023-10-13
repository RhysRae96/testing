const {BrowserWindow} = require('electron');
const {getConnection} = require('./database');

let window;

// Creating a new product

const createProduct = async (product) => {
    try{
        const conn = await getConnection()
        product.price = parseFloat(product.price)
        const result = await conn.query("INSERT INTO product SET ?",product)
        product.id = result.insertId

        new Notification({
            title:'Electron Mysql',
            body:'New Product saved successfully'
        }).onshow()

        return product

    }catch(error){
        console.log(error)
    }
}

const getProducts = async () => {
    const conn = await getConnection();
    const results = await conn.query("SELECT * FROM product ORDER BY id DESC");
    return results;
}

const deleteProduct = async (id) => {
    const conn = await getConnection();
    const result = await conn.query("DELETE FROM product WHERE id = ?", id);
    return result;
}

function createWindow(){
    window = new BrowserWindow({
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    window.loadFile("src/ui/index.html");
}

module.exports = {
    createWindow,
    createProduct,
    getProducts,
    deleteProduct
};
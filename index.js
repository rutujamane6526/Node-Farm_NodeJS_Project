import 'dotenv/config';
import http from "http";
import fs from "fs";
import url from "url";
import tempReplace from "./modules/tempReplace.js";
import mongoose from "mongoose";

const port = process.env.PORT;
const hostname = process.env.HOSTURL;
const db = process.env.LOCAL_DB;

const dataObj = fs.readFileSync("./dev-data/data.json", "utf-8");// converted js to json
const tempCard = fs.readFileSync("./public/template-card.html" , "utf-8");
const tempOverview = fs.readFileSync("./public/template-overview.html", "utf-8");
const tempProduct = fs.readFileSync("./public/template-product.html", "utf-8");

await mongoose.connect(db);
console.log("DB connected!")
/*server started
 */
const data = JSON.parse(dataObj); // converted json to js

/* / and /home template overview 
/product template product
/api data json */
http.createServer((req, res) => {
    
    const {query, pathname} = (url.parse(req.url, { extended : true}));

    if(pathname === "/" || pathname === "/home"){
        const replaceCard = data.map((item) => {
            return tempReplace(tempCard, item);
        });
        const output = tempOverview.replace("{%PRODUCT_CARDS%}", replaceCard);
        res.write(output);
        res.end();
    }else if(pathname === "/product"){
        const productView = tempReplace(tempProduct, data[query.id]);
        //console.log(productView);
        res.write(productView);
        res.end();
    }else if(pathname === "/api"){
        res.write(JSON.stringify(data));// converted js to json
        res.end();
    }else{
        res.write("404 Page Not Found!");
        res.end();
    }
}).listen(port, hostname,  () => {
    console.log(`Server started at ${port} Hostname ${hostname}`);
});

function tempReplace(tempCard, item){

    let output = tempCard;

    output = output.replaceAll("{%IMAGE%}", item.image);
    output = output.replaceAll("{%PRODUCT_NAME%}", item.productName);
    output = output.replace("{%QUANTITY%}", item.quantity);
    output = output.replaceAll("{%PRICE%}", item.price);
    output = output.replace("{%ID%}", item.id);
    output = output.replace("{%COUNTRY%}", item.from);
    output = output.replace("{%NUTRIENTS%}", item.nutrients);
    output = output.replace("{%QUANTITY%}", item.quantity);
    output = output.replace("{%DESCRIPTION%}", item.description);
    if(!item.organic){
        output = output.replaceAll("{%NOT_ORGANIC%}", "not-organic");
    }
    
    return output;
}

export default tempReplace;
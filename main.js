function printReceiptByBarcodes(barcodes){
    let receipt = "\n***<store earning no money>Receipt ***\n";
    let itemsBarcodes = getItemsBarcodes(barcodes);
    let itemsBarcodesDetialsTotal = getItemsBarcodesDetialsTotal(itemsBarcodes);
    let infoStringArray = formateDatas(itemsBarcodesDetialsTotal);

    let money=0;
    for(let i=0;i< itemsBarcodesDetialsTotal.length;i++){
        money +=  itemsBarcodesDetialsTotal[i].subTotal;
    }

    for(let i=0;i<infoStringArray.length;i++){
        receipt+=infoStringArray[i];
        receipt+='\n';
    }
    receipt+="----------------------\n";
    receipt+="Total: "+ money +" (yuan)\n";
    receipt+="**********************";
    console.log(receipt);
    return receipt;
}

function formateDatas(itemsBarcodesDetialsTotal){
       let infoStringArray = [];
       for(let i=0;i<itemsBarcodesDetialsTotal.length;i++){
        let infoString="Name: "+itemsBarcodesDetialsTotal[i].name+", Quantity: "+itemsBarcodesDetialsTotal[i].quantity+", Unit price: "+itemsBarcodesDetialsTotal[i].unitPrice+" (yuan), Subtotal: "+itemsBarcodesDetialsTotal[i].subTotal+" (yuan)";
        infoStringArray.push(infoString);
    }
    return infoStringArray;

}

function getItemsBarcodesDetialsTotal(itemsBarcodes){
       let itemsBarcodesDetialsTotal = [];
       for(let i=0;i<itemsBarcodes.length;i++){
             itemsBarcodesDetialsTotal .push(getItemBarcodesDetials(itemsBarcodes[i]));
        }
        return itemsBarcodesDetialsTotal;
}

function getItemBarcodesDetials(itemBarcode){
    let itemBarcodesDetials = {};
    for(let i=0;i<database.length;i++){
        if(itemBarcode.code===database[i].barcode){
            itemBarcodesDetials={name:database[i].name,quantity:itemBarcode.num,unitPrice:database[i].price,subTotal:itemBarcode.num*parseInt(database[i].price)};
        }
    }
    return itemBarcodesDetials;
}

function getItemsBarcodes(barcodes){
   // let barocodes = Array.from(new Set(array)); ES6中 Set数据结构，它类似于数组，其成员的值都是唯一的。利用Array.from将Set结构转换成数组
    var itemsBarcodes = [];
    let tempitems = barcodes;
    while(tempitems.length>0){
        let barcode=tempitems.shift();
        let sum=1;
        for(let i=0;i<tempitems.length;i++){
            if(tempitems[i]==barcode){
                tempitems.splice(i,1);
                i--;
                sum++;
            }
        }
        itemsBarcodes.push({code:barcode,num:sum});
    }
    return itemsBarcodes;
}

const database = [
    {
       barcode: 'ITEM000000',
       name: 'Coca-Cola',
       price: 3
     },
     {
       barcode: 'ITEM000001',
       name: 'Sprite',
       price: 3
     },
     {
       barcode: 'ITEM000002',
       name: 'Apple',
       price: 5
     },
     {
       barcode: 'ITEM000003',
       name: 'Litchi',
       price: 15
     },
     {
       barcode: 'ITEM000004',
       name: 'Battery',
       price: 2
     },
     {
       barcode: 'ITEM000005',
       name: 'Instant Noodles',
       price: 4
     }
 ]

 module.exports = {
    printReceiptByBarcodes
};

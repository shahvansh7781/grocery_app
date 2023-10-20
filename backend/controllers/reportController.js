const xlsx = require('xlsx');
const path = require('path');
exports.getUserReport = async(req,res)=>{
    const data = req.body;
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook,worksheet,'Sheet 1')
    xlsx.writeFile(workbook,path.join(process.env.HOME,'Downloads','Users Report.xlsx'));
    res.status(200).send({
        success:true,
    })
// console.log(data)
}

exports.groceryReport = async(req,res) => {
    const data = req.body;
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook,worksheet,'Sheet 1')
    xlsx.writeFile(workbook,path.join(process.env.HOME,'Downloads','Groceries Report.xlsx'));
    res.status(200).send({
        success:true,
    })
}

exports.orderReport = async(req,res)=>{
    const data = req.body;
    const result=[]
    for (const order of data) {
        const { id, userName, userEmail, shippingAddress, status, subTotal, deliveryCharge, grandTotal, items } = order;
    
        for (const item of items) {
          const { id: itemId, title: itemTitle, price: itemPrice, count: itemCount, image: itemImage, stock: itemStock } = item;
          result.push({
            id,
            userName,
            userEmail,
            shippingAddress,
            status,
            subTotal,
            deliveryCharge,
            grandTotal,
            itemId,
            itemTitle,
            itemPrice,
            itemCount,
            itemImage,
            itemStock,
          });
        }
      }
    const worksheet = xlsx.utils.json_to_sheet(result);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook,worksheet,'Sheet 1')
    xlsx.writeFile(workbook,path.join(process.env.HOME,'Downloads','Orders Report.xlsx'));
    res.status(200).send({
        success:true,
    })
}
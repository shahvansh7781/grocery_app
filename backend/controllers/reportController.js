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
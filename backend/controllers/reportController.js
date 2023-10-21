const xlsx = require("xlsx");
const path = require("path");
const PDFDocument = require("pdfkit");
const PDFTable = require("pdfkit-table");
const fs = require("fs");
const { ref, getDownloadURL, uploadBytes } = require('firebase/storage');
const { storage } = require("../config/firebaseConfig");
exports.getUserReport = async (req, res) => {
  const data = req.body;
  const worksheet = xlsx.utils.json_to_sheet(data);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
  xlsx.writeFile(
    workbook,
    path.join(process.env.HOME, "Downloads", "Users Report.xlsx")
  );
  res.status(200).send({
    success: true,
  });
  // console.log(data)
};

exports.groceryReport = async (req, res) => {
  const data = req.body;
  const worksheet = xlsx.utils.json_to_sheet(data);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
  xlsx.writeFile(
    workbook,
    path.join(process.env.HOME, "Downloads", "Groceries Report.xlsx")
  );
  res.status(200).send({
    success: true,
  });
};

exports.orderReport = async (req, res) => {
  const data = req.body;
  const result = [];
  for (const order of data) {
    const {
      id,
      userName,
      userEmail,
      shippingAddress,
      status,
      subTotal,
      deliveryCharge,
      grandTotal,
      items,
    } = order;

    for (const item of items) {
      const {
        id: itemId,
        title: itemTitle,
        price: itemPrice,
        count: itemCount,
        image: itemImage,
        stock: itemStock,
      } = item;
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
  xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
  xlsx.writeFile(
    workbook,
    path.join(process.env.HOME, "Downloads", "Orders Report.xlsx")
  );
  res.status(200).send({
    success: true,
  });
};

exports.generateInvoice = async (req, res) => {
  const headers = ["Item Name", "Quantity", "Price Per Unit", "Amount"];
  const tableData = [
    // ['Name', 'Age', 'Country'],
    // ['Alice', '25', 'USA'],
    // ['Bob', '30', 'Canada'],
    // ['Charlie', '28', 'UK'],
  ];
  req.body.items.forEach((item) => {
    tableData.push([
      `${item.title}`,
      `${item.count}`,
      `${item.price}`,
      `${item.price * item.count}`,
    ]);
  });
  // Define table properties
  const tableWidth = 600; // Total width of the table
  const cellMargin = 5; // Margin for each cell
  // Define the header row
  const colWidth = tableWidth / headers.length;

  const doc = new PDFDocument();
  const height = doc.page.height;
  const width = doc.page.width;

  doc.pipe(
    fs.createWriteStream(
      path.join(process.env.HOME, "Downloads", `${req.body.Name} - Invoice.pdf`)
    )
  
  );
  doc.fontSize(28).text("Invoice", width / 2 - 30, 50);
  doc.fontSize(15).text(`Name: ${req.body.Name}`, 20, 100, { align: "left" });
  doc.fontSize(15).text(`Email: ${req.body.Email}`, 20, 130, { align: "left" });
  doc
    .fontSize(15)
    .text(`Shipping Address: ${req.body.Address}`, 20, 160, { align: "left" });
  doc
    .fontSize(15)
    .text(
      `Invoice Date: ${req.body.day}/${req.body.month}/${req.body.year}`,
      20,
      210,
      { align: "left" }
    );
  // Draw the header row
  doc.fontSize(17);
  headers.forEach((header, index) => {
    doc.text(header, index * colWidth + cellMargin - 50, 270, {
      width: width / 2 - 30,
      align: "center",
    });
  });
  doc.moveDown();
  doc.fontSize(14);
  //   Draw the data rows
  let currentY = doc.y + cellMargin; // Set the initial Y position
  for (let i = 0; i < tableData.length; i++) {
    const rowData = tableData[i];
    rowData.forEach((cell, index) => {
      doc.text(cell, index * colWidth + cellMargin - 50, currentY, {
        width: width / 2 - 30,
        align: "center",
      });
    });

    currentY += 40; // Move to the next line for the next data row

    // Adjust Y position for better alignment, if needed
    currentY += cellMargin;
  }
  doc
    .fontSize(15)
    .text(`Sub Total: Rs. ${req.body.SubTotal}`, 10, doc.y + 30, {
      align: "right",
    });
  doc
    .fontSize(15)
    .text(`Delivery Charge: Rs. ${req.body.Delivery}`, 10, doc.y + 20, {
      align: "right",
    });
  doc
    .fontSize(15)
    .text(`Grand Total: Rs. ${req.body.GrandTotal}`, 10, doc.y + 20, {
      align: "right",
    });
  doc.end();
};

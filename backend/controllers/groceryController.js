const { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } = require("firebase/firestore");
const { dbF } = require("../config/firebaseConfig");
const dbRef = collection(dbF, "Groceries");
exports.createGrocery = async (req, res) => {
  try {
    const resp = await addDoc(dbRef, req.body);
    if (resp) {
      res.status(201).send({
        success: true,
        message: "Data added successfully",
        id: resp.id,
      });
    }
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "Data Not added",
    });
  }
};

exports.getGrocery = async (req, res) => {
  try {
    // console.log(req.user);
    
    const data = await getDocs(dbRef);
    const items = data.docs.map((item) => {
      return {...item.data(),id:item.id}
    });
    if (items) {
      res.status(200).json({
        success:true,
        grocery:items
      })
    }
    // console.log(items);
  } catch (error) {}
};

exports.editGrocery = async(req,res)=>{
  // console.log(req.body);
  try {
    const docRef = doc(dbF,"Groceries",`${req.body.itemKey}`)
    const data = await updateDoc(docRef,req.body.newData)
    res.status(201).json({
      success:true,
      data
    })
  } catch (error) {
    
  }
}

exports.deleteGrocery = async(req,res)=>{
  console.log(req.body.itemKey);
  try {
  const docRef = doc(dbF,"Groceries",`${req.body.itemKey}`)
  const data = await deleteDoc(docRef);
  if (data) {
    res.status(200).json({
      success:true,
      message:"Data deleted sucessfully"
    })
  }
} catch (error) {
  res.status(200).json({
    success:false,
    message:"Data not deleted",
    error
  })
}
}
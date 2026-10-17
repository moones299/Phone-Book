import Contact from "@/models/contact"
import connectDB from "@/utils/connectDB"
import  { isValidObjectId } from "mongoose"

export default async function handler(req, res) {
await connectDB()
 const {_id}= req.query
  
   
    if(isValidObjectId(_id)){
       if (req.method == "GET") {
        const contact = await Contact.findById(_id)      
      if(contact){
         res.json(contact)
      }else{
         res.json({message :"contact not found"})
      }
   }else if(req.method == "DELETE"){
    const resultDelete=  await Contact.findByIdAndDelete(_id)
    if(resultDelete){
    res.json({message :"contact deleted successfully"})
    }else{
       res.json({message :"contact not found"})
    }
      
   }else if(req.method == "PUT"){
      await Contact.findByIdAndUpdate(_id , req.body) 
      res.json({message :"contact updated successfully"})
   }

    }else{
       res.json({message : 'objectId is not valid' })
    }
    
   }

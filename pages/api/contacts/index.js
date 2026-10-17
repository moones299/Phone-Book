import Contact from "@/models/contact"
import connectDB from "@/utils/connectDB"


export default async function handler(req, res) {
 await connectDB()

   if (req.method == "GET") {
      let contacts = null 
      const {gen , search}= req.query
      if(gen && search) //api/contacts?gen=value&search=value
         {
       if(gen == 'male' || gen == 'female'){
          contacts=  await Contact.find({$and :[{gender : gen} , {$or :[{firstName : search} , {lastName : search}]}]  })
       }else{
         contacts=  await Contact.find({$or : [{firstName : search} , {lastName : search}]})
       }
      }
    else if(gen) //api/contacts?gen=value
      {
       if(gen == 'male'){
       contacts=  await Contact.find({gender : 'male'}) 
      }else if(gen == 'female'){
        contacts=  await Contact.find({gender : 'female'})
      }else{
         contacts=  await Contact.find()
      }   
     }else if(search) //api/contacts?search=value
      {
       contacts=  await Contact.find({$or : [{firstName : search} , {lastName : search}]})
     }
      else{
       contacts=  await Contact.find()
     }
      res.json(contacts)
   }else if(req.method == "POST"){
    try{
      const createContact =  await Contact.create(req.body)
        res.status(201).json(createContact)
    }catch(error){
        let errorMessage = ''
         const {firstName , lastName, age , phone} = error.errors
         if(firstName){
            errorMessage += firstName.message + `\n`
         }
         if(lastName){
            errorMessage += lastName.message + `\n`
         }
         if(age){
            errorMessage += age.message + `\n`
         }
         if(phone){
            errorMessage += phone.message + `\n`
         }

         res.status(422).json({ message : errorMessage })
      
    }
    res.status(500).json({message : 'server error'})
   }else{
    res.status(405).json({message : 'method not allowed'})
   }
}
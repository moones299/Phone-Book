import ContactItem from "@/components/contact/contactItem";
import Contact from "@/models/contact";
import connectDB from "@/utils/connectDB";
import styles from "@/styles/contacts.module.css"
import { useEffect, useState } from "react";
 import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/router";

export default function Contacts({contactList}) {
    const [contacts , setContacts]=useState(contactList)
    const[searchKey , setSearchKey]=useState("")
    const[searchGen , setSearchGen]=useState("")
    const router = useRouter()
    const {gen , search}= router.query
    useEffect(()=>{
    gen ? setSearchGen(gen) : setSearchGen('')
    search ? setSearchKey(search)  : setSearchKey('')
    },[])
    const searchHandler = async ()=>{
      try{
 const res = await fetch(`/api/contacts?gen=${searchGen}&search=${searchKey}`)
        const data= await res.json()
        console.log(data)
        setContacts(data)
      }catch(error){
         toast.error('server error')
      }
       
    }

    return(
        <>
         <Toaster
         position="top-left"
         />
             <div className={styles.searchContainer}>
            <input
               type='text'
               onChange={(e) => setSearchKey(e.target.value)}
               placeholder='enter name or family'
               value={searchKey}
            />
            <select onChange={(e) => setSearchGen(e.target.value)}>
               <option value='' selected={searchGen == ''}>all</option>
               <option value='male' selected={searchGen == 'male'}>male</option>
               <option value='female' selected={searchGen == 'female'}>female</option>
            </select>
            <button onClick={searchHandler}>search</button>
         </div>
         {contacts.length > 0 && (
            <>
               {contacts.map((contact) => (
                  <ContactItem key={contact._id} {...contact} contacts={contacts} setContacts={setContacts} />
               ))}
            </>
         )}
         {contacts.length == 0 && <p className={styles.noAudience}>There is no audience</p>}



        </>
    )
}
export async function getServerSideProps(context){
    await connectDB()
     let contacts = null 
          const {gen , search}= context.query
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
   
   //const res= await fetch('http://localhost:3000/api/contacts')
 //  const data = await res.json()
    return{
     props :{
        contactList : JSON.parse(JSON.stringify(contacts))
     }
    }
}
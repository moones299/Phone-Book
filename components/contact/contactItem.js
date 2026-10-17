import styles from "./contactItem.module.css"
import toast, { Toaster } from 'react-hot-toast';
import Link from "next/link"
import { MdDeleteForever } from "react-icons/md"
import { AiFillEdit } from "react-icons/ai"
import { MdOutlineFavoriteBorder } from "react-icons/md"

export default function ContactItem({ _id,firstName , lastName , age , gender , phone , contacts , setContacts}) {
   const deleteHandler= async (_id)=>{
      try{
         const res = await fetch(`/api/contacts/${_id}` , {  method: 'DELETE'})
      const data = await res.json()
      if(res.status== 200){
         toast.success('contact deleted')
      }
      if(res.status== 404){
         toast.error(data.messsage)
      }
       const filterItem= contacts.filter((contact)=> contact._id != _id )
      setContacts(filterItem)
      } catch(error){
         toast.error(error.messsage)
      }
     
     
     

   }
   return (
     <>
     <Toaster
     position="top-left"
     />
      <div className={styles.card}>
         <div className='name'>
            <b>firstName :</b> {firstName}
         </div>
         <div className='family'>
            <b>lastName :</b> {lastName}
         </div>
         <div className='gender'>
            <b>gender :</b>{gender}
         </div>
         <div className='age'>
            <b>age :</b>{age}
         </div>
         <div className='phone'>
            <b>phone :</b>{phone}
         </div>
         <div className={styles.icons}>
            <div onClick={()=>deleteHandler(_id)} className='delete'>
               <MdDeleteForever />
            </div>
            <div className='edit'>
              <Link href={`/contacts/edit/${_id}`}>
               <AiFillEdit />
              </Link>
            </div>
            <div className='favorite'>
               <MdOutlineFavoriteBorder />
            </div>
         </div>
      </div>
     </>
   )
}
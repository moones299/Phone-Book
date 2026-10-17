import styles from '@/styles/AddaContact.module.css'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { FaSpinner } from "react-icons/fa";


export default function Add(){
    const[load , setLoad]=useState(false)
    const[addContact , setAddContact]=useState({
        firstName : "",
        lastName: "" ,
        age : "",
        gender: "" ,
        phone: "" ,
    })
    const addcontacthandler =async (e)=>{
       e.preventDefault()
       let errorMessage = ''
        const {firstName ,lastName ,age, gender , phone} = addContact
      if( !lastName || !lastName || !age || !gender || !phone){
        return toast.error('Please fill in all fields.')
      }
      //firstName
      if(firstName.length <3 || firstName.length >15){
        errorMessage += 'First name must be between 3 and 15 characters' + '\n'
      }
      //lastName
      if(lastName.length <3 || lastName.length >15){
         errorMessage += 'Last name must be between 3 and 15 characters' + '\n'
      }
       //age
      if(age<18){
         errorMessage += 'Age must be over 18' + '\n'
      }
       //phone
      if(phone.length >11 || !phone.match(/^09\d{9}$/)){
         errorMessage += 'Phone number is not valid' + '\n'
      }
      if(errorMessage){
        return toast.error(errorMessage)
      }
        setLoad(true)
       
            const res= await fetch('/api/contacts' , {
                method : 'POST' ,
                body : JSON.stringify(addContact) ,
                headers :{
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            setLoad(false)
           if(res.status == 422){
           return toast.error(data.message)
           }if(res.status == 500){
             return toast.error(data.message)
           }
       toast.success('Contact added!')
       setAddContact({
         firstName : "",
        lastName: "" ,
        age : "",
        gender: "" ,
        phone: "" ,
       })
   
   console.log("Form is complete")
   
        }

    
    return(
        <>
         <Toaster 
          position="top-left"
        />
         <div className={styles.container}>
            <form >
                <input  value={addContact.firstName} type="text" placeholder="firstName" onChange={(e) =>setAddContact({...addContact , firstName :e.target.value})} />
                  <input value={addContact.lastName} type="text" placeholder="lastName" onChange={(e) =>setAddContact({...addContact , lastName :e.target.value})} />
                    <input  value={addContact.age} type="number" placeholder="age" onChange={(e) =>setAddContact({...addContact , age :e.target.value})} />
                    <select value={addContact.gender} onChange={(e) =>setAddContact({...addContact , gender :e.target.value})} >
                        <option value=""  hidden disabled>gender</option>
                         <option value="male">male</option>
                          <option value="female">female</option>
                    </select>
                    <input  value={addContact.phone} type="text" placeholder="phone" onChange={(e) =>setAddContact({...addContact , phone :e.target.value})} />
                    <button onClick={addcontacthandler} >Add contact {load ? <FaSpinner className={styles.spin}/> : ""
}</button>
            </form>
         </div>
        </>
    )
} 
import { models , model , Schema } from "mongoose"

const contactSchema = new Schema({
    firstName : {
        type : String,
        trim: true ,  //for - , / 
       minLength: [3, 'First name must be at least 3 characters'],
       maxLength: [15, 'First name must be at most 15 characters']
    },
    lastName: {
        type: String,
        trim: true,
        minLength: [3, 'Last name must be at least 3 characters'],
        maxLength: [15, 'Last name must be at most 15 characters']
    },

    age: {
        type: Number,
        min: [18, 'Age must be at least 18']
    },

    gender: {
        type: String
    },

    phone: {
        type: String,
        trim: true,
        maxLength: [11, 'Phone number must not exceed 11 digits'],
        match: [/^09\d{9}$/, 'Phone number must start with 09 and contain 11 digits']
    }
})

const Contact = models.Contact || model('Contact' , contactSchema)

export default Contact
const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    fullName:{
     type:String,
     required:true,  
    },

    email:{
        type:String,
        required:true,  
        validate:{
            validator:(value)=>{
                const result = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return result.test(value);
            },
            message : "Por favor com um email valida",
        }
    },

    numTag:{
        type:String,
        required: false,
        default: "",
    },

    up:{
        type:String,
        required:false,
        default: "",
    },

    password:{
        type:String,
        require:true,
        validate:{
            validator:(value)=>{
                return value.length >=6
            },
            message : "Senha deve conter até 6 numeros"
        }     
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
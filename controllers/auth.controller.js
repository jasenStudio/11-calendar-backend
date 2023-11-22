const { response } = require('express');
const  bcrypt = require('bcryptjs')
const  User  = require('../models/UserModel');
const { generarJwt } = require('../helpers/jwt');



const createUser = async (req,res = response) => {

   const { email, password} = req.body

   try {
       let user = await User.findOne({ email: email})
      
       if( user ){
        return res.status(400).json({
            ok:false,
            msg:'Un usuario ya existe con esta cuenta de correo'
        })
       }

        user = new User( req.body );

        //encriptar la contraseña,
        const salt = bcrypt.genSaltSync();

        user.password = bcrypt.hashSync( password,salt );

    
        await user.save();

        //generar jwt
        const token = await generarJwt(user.id, user.name)
 
    
        res.status(201).json({
            ok:true,
            uid: user.id,
            name: user.name,
            token: token
        })

   } catch (error) {

    res.status(500).json({
        ok:false,
        msg:'Por favor hable con el administrador'
    })

    
   }
}


const loginUser = async (req,res = response)=>{


    try {
        
       const { email, password} = req.body

       const user = await User.findOne({ email: email})
      
       if( !user ){
        return res.status(400).json({
            ok:false,
            msg:'El usuario no existe'
        })
       }

       //Confirmar password
     const validPassword = bcrypt.compareSync( password, user.password );  

     if(!validPassword ){
        return res.status(400).json({
            ok:false,
            msg:'Password invalid'
        })
     }

     //generar el jwt
     const token = await generarJwt(user.id, user.name)

    
    res.json({
            ok:true,
            uid: user.id,
            name: user.name.User,
            token: token
    })



    } catch (error) {
         res.status(500).json({
        ok:false,
        msg:'Por favor hable con el administrador'
          })
    }

};


const validateToken = async (req,res = response )=>{

   const uid = req.uid;
   const name = req.name;

   //
   const token = await generarJwt(uid, name)

    res.json({
        ok:true,
        token: token
    })
}

module.exports = {
    createUser,
    validateToken,
    loginUser
}
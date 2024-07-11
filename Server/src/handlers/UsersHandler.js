// const { where } = require("sequelize")
// const {User} = require("../db")
// const {hashSync,compare} = require("bcrypt") 
// const {SECRET} = process.env;
// const {sign, verify } = require("jsonwebtoken")


// const RegisterUserHandler = async(req , res)=>{
//     const {name , password, email,rol} = req.body;

//     try {
//         const UserExist = await User.findOne({where:{email:email}});
//         if (UserExist) {
//             return res.status(409).send("email ya registrado")
//         }
//         else{
//             const hashedPW = hashSync(password,3);
//             const response = await User.create({name,password:hashedPW,email,rol})
//             return res.status(200).json(response); 
//         }
//     } catch (error) {
//        return res.status(500).json(error.message)
//     }
    
// };

// const LoginUserHandler = async(req ,res)=>{
//     const {email,password} = req.body;
//     try {
//         const user = await User.findOne({where:{email:email}})
//         if (!user) {
//             return res.status(409).send("email no registrado");
//         }
//         else{
//             const claveValida = await compare(password,user.password);
//             if (claveValida) {
//                 const token = sign({name:user.name , email:user.email,rol:user.rol},SECRET,{expiresIn:"1h"});
//                 return res.cookie("lacookie",token,{httpOnly:true,sameSite:"strict",maxAge: 1000 * 60 *60}).send(user);
//             }else{
//                return res.status(409).send("contrseña invalida")
//             }
//         }
//     } catch (error) {
        
//     }
    
// };

// const GetUsersHandler = async(req ,res)=>{
//     try {
//         const data = await User.findAll();
//         return res.status(200).json(data);
//     } catch (error) {
//         return res.status(500).send(error.message);
//     }
// };

// const ProtectedHandler = async(req,res)=>{
//     const token = req.cookies.lacookie;
//     try {
//         console.log(token);
//         if (!token) return res.status(409).send("acceso denegado");
//         const data = verify(token,SECRET);
//         console.log(data);
//         return  res.status(200).send(data);
//     } catch (error) {
//         return res.status(500).send(error.message)
//     }
// };

// const LogoutHandler = (req, res)=>{
//     try {
//         return res.clearCookie("lacookie").send("cookie limpia")
//     } catch (error) {
//         return res.status(500).send(error)
//     }
// };

// module.exports = {RegisterUserHandler,LoginUserHandler,GetUsersHandler,ProtectedHandler,LogoutHandler}
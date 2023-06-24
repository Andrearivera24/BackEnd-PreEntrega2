import { Router } from "express";
import userService from "../dao/services/user.service.js";

const userRouter = Router();
userRouter.post("/", async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await userService.createUser(userData);
    res.status(201).send(newUser).redirect("/login");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//en el formulario de login, para que no explote cuando no hay una autentificación y más bien redirija a la pagina de login
userRouter.post("/auth", async (req, res)=>{
  const {email, password} = req.body;
  try {
    const user = await userService.getByEmail(email); //obtengo el usuario por email
    if(!user) throw new Error ("Invalid Email"); //Valido que exista un ususario con ese email
    if(user.password != password) throw new Error ("Invalid Password") // valido que la contraseña sea la ya registrada. 

    req.session.user = user; //piso el anterior con el nuevo

    if(email == "adminCoder@coder.com" && password == "adminCod3r123"){
     req.session.user = { first_name: "Coder", last_name: "Manager", rol: "admin" }
   
    }

    res.redirect("/products");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

userRouter.post("/logout", (req, res)=>{
  req.session.destroy();
  // res.status(201).json({message: "Logged out"});
  res.redirect("/login"); // redirige a la vista login 

});





export default userRouter;

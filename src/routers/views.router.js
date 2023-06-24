//viwes para los productos y el carrito 
import { Router } from "express";
import productService from "../dao/services/product.service.js";
import cartService from "../dao/services/cart.service.js";
import { isAuth, isGuest } from "../middlewares/auth.middlewares.js";


const viewsRouter = Router();

// VIEWS PRODUCTS CON PAGINACIÓN. 
viewsRouter.get('/products', async (req, res)=>{
 const {user} = req.session; 
 const { page, limit, sort, category, status} = req.query;
 const data = await productService.getProducts(page, limit, sort, category, status);
 console.log(data);
  try {
    res.render('products', {user, data});
  } catch (err) {
    res.status(500).send({ ERROR: err });
  }
})

//Plantilla que muestra los productos de carrito en específico. 
viewsRouter.get('/carts/:cid', async (req, res)=>{ 

  try {
    const cid = req.params.cid
    const cart = await cartService.getCartPopulated(cid);
    
    res.render('carts', {title:'Carts Detail', cart});
  } catch (err) {
    res.status(500).send({ ERROR: err });
  }
});


//Muestra el perfil del usuario, que usa el middleware que autentifica
viewsRouter.get("/", isAuth,  (req, res) => {
  const { user } = req.session;
  delete user.password;
  res.render("index", { title: "Perfil de Usuario", user}); //envía el usuario que esté en el reqsession.user
});

//Registra un nuevo usuario
viewsRouter.get("/register", isGuest, (req, res) => {
  res.render("register", { title: "Registrar Nuevo Usuario" });
});

//El login valida los datos del registro
viewsRouter.get("/login", (req, res) => {
  res.render("login", { title: "Iniciar Sesión" });
});





export default viewsRouter;
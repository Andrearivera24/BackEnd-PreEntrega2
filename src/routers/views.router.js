//viwes para los productos y el carrito 
import { Router } from "express";
import productService from "../dao/services/product.service.js";
import cartService from "../dao/services/cart.service.js";

const viewsRouter = Router();

// VIEWS PRODUCTS CON PAGINACIÓN. 
viewsRouter.get('/products', async (req, res)=>{
 const { page, limit, sort, category, status} = req.query;
 const data = await productService.getProducts(page, limit, sort, category, status);
  try {
    res.render('products', data);
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


export default viewsRouter;
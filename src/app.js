//---- Modules
import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import { Server } from 'socket.io';



//---- Rutas
import productRouter from './routers/products.router.js';
import cartRouter from './routers/carts.router.js';
import viewsRouter from './routers/views.router.js';

const app = express();

//uso middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//seteo estructura de handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', 'views/'); //seteo la vista en la carpeta raiz views
app.set('view engine', 'handlebars');

// Uso las rutas.
app.use ('/api/carts', cartRouter);
app.use('/api/products', productRouter);
app.use('/', viewsRouter); 

//Estructura de handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", "views/"); //seteo la vista de la carpeta raíz vistas
app.set("view engine", "handlebars");

//Conecto el servidor con mongoose
mongoose.connect('mongodb+srv://AndreaRivera24:acrs241097@cluster0.ggiy5uv.mongodb.net/?retryWrites=true&w=majority');

//Inicializo el servidor

const webServer = app.listen(8080, ()=>{
    console.log('Listening on port 8080');
})

//inicio el socket.io
const io = new Server(webServer);
// cuándo haya una conexión, emita todos los mensajes.
io.on('connection', async (socket)=>{
    socket.emit('messages', await messageService.getMessages());

    // Ecucho los mensajes que envía al cliente, lo agrego al array y los emito actualizados a todos. 
    socket.on('message', async (msj)=>{
        console.log(msj);
        await messageService.addMessage(msj);
        io.emit('messages', await messageService.getMessages())
    });
   
});


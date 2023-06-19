//chat
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    user: String, //el correo del usuario
    message: String} // el mensaje
);

export const messageModel = mongoose.model('messages', messageSchema); // exporto la colección messages a mongoAtlas usando el esquema "messageSchema"
import Contenedor from './controller.mjs';
import express from 'express';

//const express = require('express');
const app = express();

const PORT = 8080;

//instancio objeto
const contenedor = new Contenedor('productos.txt');

//lleno el archivo txt
async function main(){
    const contenedor = new Contenedor('productos.txt');
    console.log("contenedor: ", contenedor);
    await contenedor.save({
        title: 'tv',
        price: 500,
        thumbnail: 'url',
    });
    await contenedor.save({
        title: 'ipad',
        price: 600,
        thumbnail: 'url',
    });
    await contenedor.save({
        title: 'compu',
        price: 800,
        thumbnail: 'url',
    });
}
main();

//obtengo prodcutos
app.get('/productos', async (req,res)=>{
    const productos = await contenedor.getAll();
    res.send(productos);
});

//obtengo prodcuto random
app.get('/productoRandom', async (req,res)=>{
    const productos = await contenedor.getAll();
    let valorRandom = Math.floor(Math.random()*productos.length);
    const productoAleatorio = await contenedor.getById(productos[valorRandom].id);
    res.send(productoAleatorio);
});

const server = app.listen(PORT, ()=>{
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", error => console.log(`Error en servidor ${error}`));
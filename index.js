const system = require("os");
const person = require("./person.json");
const { Module } = require("module");
const http = require("http");
const formatRupiah = require("rupiah-format");

const device = {
    memory: system.freemem(),
};

const { name, age, gender, hobby, favorite_food, ballance } = person;

function golongan(usia){
    if (usia > 6 && usia <= 10) {
        return "anak-anak"
    }else if (usia >= 11 && usia <= 17) {
        return "Remaja"
    }else if (usia >= 18 && usia <= 30) {
        return "Dewasa"
    }else if (usia >= 31 && usia <= 100) {
        return "Orang Tua"
    }else if (usia >= 100) {
        return "dewa"
    }else {
        return "Balita"
    }
}

console.log("Memory : ", system.freemem());

function listener (request, response) {
    console.log(request.url);
    
    if (request.url == "/") {
        response.writeHead(200, {"Content-type": "text/html"})
        response.write("<html><body><h1><marquee>WELLCOME WOY CUY TO BASIC JAVA API<marquee><h1><body><html>")
    }
    else if (request.url == "/name"){
        response.write(`nama gua: ${name}`)
    }else if (request.url == "/age") {
        response.write(`umur gua: ${age} - ${golongan(age)}`)
    }else if (request.url == "/gender") {
        response.write(`jenis kelamin: ${gender}`)
    }else if (request.url == "/hobby") {
        response.write(`hobi: ${hobby}`)
    }else if (request.url == "/favorite_food") {
        response.write(`makanan favorit: ${favorite_food}`)
    }else if (request.url == "/ballance") {
        response.write(`saldo saya sekarang: ${formatRupiah.convert(ballance)}`)
    }else if (request.url == "/api") {
        response.writeHead(200, {"Conten-Type": "application/json"})
        const data = JSON.stringify(person)
        response.write(data);
    }
    else {
        response.writeHead(404, {"Content-Type": "plain"})
        response.end("404 not found")
    }

    return response.end();
} 

http.createServer(listener).listen(8015);

console.log("server running di localhost 3015");
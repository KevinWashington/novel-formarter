import express from "express";
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

import puppeteer from "puppeteer";

const scrap = async (url) => {
  try {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto(url);
   
    const conteudo = await page.evaluate(() => {
      return document.querySelector(".entry-content").innerHTML;
    });

    const titulo = await page.evaluate(() => {
      return document.querySelector(".epheader").innerHTML;
    });

    await browser.close();

    let resultado = titulo + conteudo
    return resultado;
  } catch (error) {
    console.error('Erro na requisição:', error);
    return error
  }
};


// Adicionar os cabeçalhos Access-Control-Allow-Origin
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/novel", async (req, res) => {
  const url = req.query.url;
  let text= await scrap(url);
  return res.json(text);
});

app.listen(port, () => console.log("server is running on port ", port));
console.log("funcionando server")

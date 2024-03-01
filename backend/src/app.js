import express from "express";
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

import puppeteer from "puppeteer";
//const puppeteer = require("puppeteer");

const scrap = async (url) => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto(url);

  const resultado = await page.evaluate(() => {
    return document.querySelector(".entry-content").innerHTML;
  });

  await browser.close();

  // Print the full title
  return resultado;
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

app.get("/", async (req, res) => {
  return res.json("hello world");
});

app.get("/novel", async (req, res) => {
  const url = req.query.url;
  const text = await scrap(url);
  return res.status(200).json(text);
});

app.listen(port, () => console.log("server is running on port ", port));

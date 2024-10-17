import express from "express";
import cors from "cors";
import puppeteer from "puppeteer";

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;


app.use(cors());

app.get('/novel', async (req, res) => {
  const url = "https://centralnovel.com/the-beginning-after-the-end-capitulo-"+ req.query.url;

  if (!url) {
    return res.status(400).json({ error: 'Por favor, forneça uma URL válida.' });
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const title = await page.$eval('.epheader', el => el.innerHTML);

    const content = await page.$eval('.entry-content', el => el.innerHTML);

    await browser.close();

    res.json(title + content);

  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao realizar o scraping.', details: error.message });
  }
});


app.get("/", async (req, res) => {
  res.status(200).json({ message: 'Hello, World!' });
});


app.listen(port, () => console.log("server is running on port ", port));
console.log("funcionando server")

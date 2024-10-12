const fetchText = async (url) => {
  const link = `https://novel-formarter.vercel.app:3000/novel?url=https://centralnovel.com/the-beginning-after-the-end-capitulo-${url}`
  try {
    document.querySelector("#loader").classList.remove("hidden")
    const response = await fetch(link);
  
    const json = await response.json();
    if (json.name) {
      throw new Error;
    }
 
    await fetch(`novel.html`)
    .then(response => response.text())
    .then(novel => {
      const parser = new DOMParser();
      const html = parser.parseFromString(novel, 'text/html');
      html.querySelector("#novel").innerHTML = json;

      document.querySelector("#resultado").innerHTML = html.body.firstChild.outerHTML

    });

  } catch (error) {
    
    await fetch(`error.html`)
    .then(response => response.text())
    .then(errorHTML => {
      document.querySelector("#resultado").innerHTML = errorHTML;
    });
    
  }finally{
    document.querySelector("#loader").classList.add("hidden")
  }
}

async function pesquisar(){
  let url = document.querySelector("#url");
  await fetchText(url.value)

  document.querySelector("#home").style.display = "none";
  document.querySelector("#resultado").classList.remove("hidden")
  
};

async function proximo() {
  url.value++
  await fetchText(url.value)
}

async function ultimo(){
  url.value--
  await fetchText(url.value)
}
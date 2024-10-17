const fetchText = async (url) => {
  //const link = `https://novel-formarter.vercel.app/api/novel?url=${url}`
  const link = `http://127.0.0.1:3000/novel?url=${url}`
  document.querySelector("#loader").classList.remove("hidden")
  
  try {
    const response = await fetch(link);
  
    if (!response.ok) {
      throw new Error('Erro ao buscar dados');
    }
    const json = await response.json();

    await fetch(`novel.html`)
    .then(response => response.text())
    .then(novel => {
      const parser = new DOMParser();
      const html = parser.parseFromString(novel, 'text/html');
      console.log(json)
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
const fetchText = async (url) => {
  const link = `http://localhost:3000/novel?url=https://centralnovel.com/the-beginning-after-the-end-capitulo-${url}`
  try {
    const response = await fetch(link);
  
    const json = await response.json();
    if (json.name) {
      throw new Error;
    }
    return json
  } catch (error) {
    
    await fetch(`error.html`)
    .then(response => response.text())
    .then(errorHTML => {
      document.querySelector("#resultado").innerHTML = errorHTML;
    });
    
  }
}

document.querySelector("#btn").addEventListener("click", async () => {
  let url = document.querySelector("#url");
  let resultado = await fetchText(url.value)

  if(document.querySelector("#resultado").innerHTML == "") { document.querySelector("#resultado").innerHTML = resultado; }
  document.querySelector("#home").style.display = "none";
  document.querySelector(".controller").style.display = "flex";
  
});

document.querySelector(".prox").addEventListener("click", async () => {
  url.value++
  let resultado = await fetchText(url.value)
  
  document.querySelector("#resultado").innerHTML = resultado;
})

document.querySelector(".last").addEventListener("click", async () => {
  url.value--
  let resultado = await fetchText(url.value)

  document.querySelector("#resultado").innerHTML = resultado;
})

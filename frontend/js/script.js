const fetchText = async (url) => {
  const res = await fetch(`http://localhost:3000/novel?url=https://centralnovel.com/the-beginning-after-the-end-capitulo-${url}`);
  const text = await res.json()
  return text
}

document.querySelector("#btn").addEventListener("click", async () => {
  let url = document.querySelector("#url");
  let resultado = await fetchText(url.value)
  document.querySelector("#home").style.display = "none";
  document.querySelector(".controller").style.display = "flex";
  document.querySelector("#resultado").innerHTML = resultado;
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
  
  console.log(url.value);
})

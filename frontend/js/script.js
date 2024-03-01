const fetchText = async (url) => {
  const res = await fetch(`http://localhost:3000/novel?url=${url}`);
  const text = await res.json()
  return text
}

document.querySelector("#btn").addEventListener("click", async () => {
  let url = document.querySelector("#url");
  let resultado = await fetchText(url.value)
  document.querySelector(".container").style.display = "none";
  document.querySelector("#resultado").innerHTML = resultado;
});

document.querySelector(".passar").addEventListener("click", async () => {
  url.value++
  let resultado = await fetchText(url.value)
  document.querySelector("#resultado").innerHTML = resultado;
  console.log(url.value);
})

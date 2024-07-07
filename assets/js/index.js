const btnBuscar = document.querySelector("#buscar");

const getMoneda = async () => {
  const res = await fetch(`https://mindicador.cl/api`);
  const data = await res.json();
  return data;
};

btnBuscar.addEventListener("click", async () => {
  const inputValue = document.querySelector("#input").value;
  const monedaValue = document.querySelector("#moneda").value;
  const respuesta = await getMoneda();

  let tipoCambio = inputValue * respuesta[monedaValue].valor;
  document.querySelector("#resultado").innerHTML = tipoCambio;
});

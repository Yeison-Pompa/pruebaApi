const btnBuscar = document.querySelector("#buscar");

const getMoneda = async (monedaValue) => {
  const res = await fetch(`https://mindicador.cl/api/${monedaValue}`);
  const data = await res.json();
  return data;
};

const graficoMoneda = async (series) => {
  console.log(series);
  const monto = (series.map = (serie) => serie.valor);
  const fecha_actual = (series.map = (serie) => serie.fecha);

  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: fecha_actual,
      datasets: [{
        label: '# of Votes',
        data: monto,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

btnBuscar.addEventListener("click", async () => {
  let grafico = Chart.getChart("mychart");
  if (grafico !== undefined) {
    grafico.destroy();
  }

  const inputValue = document.querySelector("#input").value;
  const monedaValue = document.querySelector("#moneda").value;
  const respuesta = await getMoneda(monedaValue);

  let tipoCambio = respuesta.serie[0].valor * inputValue;

  graficoMoneda(respuesta.serie);
  document.querySelector("#resultado").innerHTML = tipoCambio;
});

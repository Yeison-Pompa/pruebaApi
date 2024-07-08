try {
  const btnBuscar = document.querySelector("#buscar");

  const getMoneda = async (monedaValue) => {
    const res = await fetch(`https://mindicador.cl/api/${monedaValue}`);
    const data = await res.json();
    return data;
  };

  const graficoMoneda = async (series) => {
    console.log(series); // Solo para depuración, muestra los datos recibidos

    // Tomar solo los primeros 10 elementos (si existen) de series
    const primerosDiezSeries = series.slice(0, 10);

    function formatDate(date) {
      date = new Date(date);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    // Obtener arrays de valores y fechas utilizando map correctamente
    const montos = primerosDiezSeries.map((serie) => serie.valor);
    const fechas = primerosDiezSeries
      .map((serie) => formatDate(serie.fecha))
      .reverse();

    const ctx = document.getElementById("myChart");

    // Crear el gráfico utilizando Chart.js
    new Chart(ctx, {
      type: "line",
      data: {
        labels: fechas, // Usar las fechas como etiquetas en el eje X
        datasets: [
          {
            label: "Valor", // Etiqueta del dataset
            data: montos, // Datos (valores) para el gráfico de línea
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true, // Comenzar el eje Y desde cero
          },
        },
      },
    });
  };

  btnBuscar.addEventListener("click", async () => {
    let grafico = Chart.getChart("myChart"); // Corregir el ID del gráfico
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
} catch (error) {
  console.error("Error:", error);
}

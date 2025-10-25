fetch("http://127.0.0.1:5000/get-stats-data")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    const parsedLineData = data.avisos_por_dia.map((item) => {
      const [year, month, day] = item.fecha
        .split("-")
        .map(Number);
      return [
        Date.UTC(year, month - 1, day),
        item.cantidad,
      ];
    });

    Highcharts.chart("grafico_lineas", {
      chart: { type: "line" },
      title: { text: "Cantidad de Avisos por Día" },
      xAxis: { type: "datetime", title: { text: "Fecha" } },
      yAxis: { title: { text: "Número de Avisos" } },
      series: [{ name: "Avisos", data: parsedLineData, color: "#FC2865" }],
    });

    const parsedPieData = data.avisos_por_tipo.map((item) => ({
        name: item.tipo,
        y: item.cantidad
    }));

    Highcharts.chart("grafico_torta", {
      chart: { type: "pie" },
      title: { text: "Distribución por Tipo de Mascota" },
      series: [{ name: "Avisos", data: parsedPieData, colors: ["#FC2865", "#5B9BD5"], }],
    });

    const meses = [...new Set(data.avisos_por_mes_tipo.map(i => i.mes))];
    const gatos = meses.map(m => {
        const entry = data.avisos_por_mes_tipo.find(i => i.mes === m && i.tipo === "gato");
        return entry ? entry.cantidad : 0;
    });
    const perros = meses.map(m => {
        const entry = data.avisos_por_mes_tipo.find(i => i.mes === m && i.tipo === "perro");
        return entry ? entry.cantidad : 0;
    });

    Highcharts.chart("grafico_barras", {
      chart: { type: "column" },
      title: { text: "Avisos por Mes y Tipo de Mascota" },
      xAxis: { categories: meses, title: { text: "Mes" } },
      yAxis: { title: { text: "Cantidad de Avisos" } },
      series: [
        { name: "Gatos", data: gatos, color: "#FC2865" },
        { name: "Perros", data: perros, color: "#5B9BD5" }
      ],
    });
  })
  .catch((error) => console.error("Error al obtener los datos:", error));
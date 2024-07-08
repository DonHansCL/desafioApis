let chartInstance = null

const handleClick = async (event) => {

    try {
        event.preventDefault(); // Prevent form submission

    const select = document.querySelector("#currency")
    const dinero = document.querySelector("#dinero")

    if (!select.value || !dinero.value) {
        alert("Por favor, complete todos los campos")
        return
    }

        const url = 'https://mindicador.cl/api/' + select.value;
        const res = await fetch(url);
        const data = await res.json();

        // Conversion de moneda
         // Extracting the last 10 days of data and reversing the order
        const info = data.serie.slice(0, 10).reverse()
        const etiquetas = info.map(day => {
            return day.fecha.split('T')[0]
            //fechaThora devuelve 2 array por que los separa en la T
            // [fecha, hora] por lo que el 0 es la fecha
        })
        const valores = info.map(day => {
            return day.valor
        })

        const conversion = dinero.value / valores[valores.length - 1]
        // document.querySelector('h1').innerText = '$' + conversion.toFixed(2)
        document.querySelector('#result').innerText = "$" + conversion.toFixed(3)

        console.log("etiquetas", etiquetas)
        console.log("valores", valores)

        dinero.value = ""

        // creacion del grafico

        const ctx = document.getElementById("myChart").getContext('2d')

        if(chartInstance) {
            chartInstance.destroy()
        }


    const dataChart = {
        labels: etiquetas,
        datasets: [
            {
                label: "Variaciones de moneda",
                data: valores,
                // fill: false
                borderColor: 'rgb(75, 192,192)',
            },
        ],
    }
    
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: dataChart,
    })
    } catch (error) {
        document.getElementById('error-message').innerText = "Error: " + error.message;
    }

    
}


const searchButton = document.getElementById('search')
searchButton.addEventListener('click', handleClick)
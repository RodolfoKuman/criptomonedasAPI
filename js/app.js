const cotizador = new Cotizador();
const ui = new Interfaz();

//obtener el formulario

const formulario = document.getElementById('formulario');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    
    //leer la moneda seleccionada

    const monedaSelect = document.getElementById('moneda');
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;

    // leer criptomoneda
    const criptoMonedaSelect = document.getElementById('criptomoneda');
    const criptoMonedaSeleccionada = criptoMonedaSelect.options[criptoMonedaSelect.selectedIndex].value;

    console.log(criptoMonedaSeleccionada);

    if (monedaSeleccionada === '' || criptoMonedaSeleccionada == ''){
        ui.mostrarMensaje('Ambos campos son obligatorios', 'deep-orange darken-4 card-panel');
    }else{
        cotizador.obtenerValores(monedaSeleccionada,
        criptoMonedaSeleccionada)
        .then(data => {
            ui.mostrarResultado(data.resultado[0], monedaSeleccionada.toLowerCase() );
        })

    }
    
})
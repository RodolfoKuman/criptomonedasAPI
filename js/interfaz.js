class Interfaz{

    constructor(){
       this.init();
    }

    init(){
        this.construirSelect();
    }

    construirSelect(){
        cotizador.obtenerMonedasAPI()
            .then(monedas => {
               const arregloMonedas = monedas.monedas;
               const select = document.getElementById('criptomoneda');

               arregloMonedas.forEach(moneda => {
                   const option = document.createElement('option');
                   option.value = moneda.id;
                   option.appendChild(document.createTextNode(moneda.name));
                   select.appendChild(option);
               });
            })
    }

    mostrarMensaje(mensaje, clases){
        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));

        const divMensaje = document.querySelector('.mensajes');
        divMensaje.appendChild(div);

        setTimeout(() => {
            document.querySelector('.mensajes div').remove();
        }, 3000);
    }

    mostrarResultado(resultado, moneda){

        const resultadoAnterior = document.querySelector('#resultado > div');

        if(resultadoAnterior){
            resultadoAnterior.remove();
        }

        this.mostrarSpinner();

        const etiquetaMoneda = `price_${moneda}`;

        const valor = resultado[etiquetaMoneda];

        const monedaUpper = moneda.toUpperCase();

        //convierte la hora de unix a hora minutos
        const hora = new Date(resultado.last_updated * 1000);

        const horaActualizada = `${hora.getHours()}: ${hora.getMinutes()}`;

        let templateHTML = '';
        templateHTML += `
            <div class="card cyan darken-3">
                <div class="card-content white-text">
                    <span class="card-title">Resultado:</span>
                    <p>El precio de ${resultado.name} a moneda ${monedaUpper} es de: ${valor} </p>
                    <p>Última hora: ${resultado.percent_change_1h}</p>
                    <p>Último día: ${resultado.percent_change_24h}</p>
                    <p>Últimos 7 dias: ${resultado.percent_change_7d}</p>
                    <p>Última Actualización: ${horaActualizada} horas</p>
                </div>
            </div>
        `;

        

        setTimeout(() => {
            document.querySelector('#resultado').innerHTML = templateHTML;
            document.querySelector('.spinner img').remove();
        },3000);

    }

    mostrarSpinner(){
        const spinnerGIF = document.createElement('img');
        spinnerGIF.src = 'img/spinner.gif';
        document.querySelector('.spinner').appendChild(spinnerGIF);
    }

}
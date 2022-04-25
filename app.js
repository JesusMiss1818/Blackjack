let baraja = [];
let carta;
let totalpuntosjugador = 0;
let totalpuntoscomputadora = 0;

function crearbaraja() {
    baraja = [];
    const numeros = [2, 3, 4, 5, 6, 7, 8, 9, 10];
    const letras = ['J', 'Q', 'K', 'A'];
    const palo = ['C', 'D', 'H', 'S'];
    
    for (const n of numeros) {
        for (const p of palo) {
            baraja.push(n + p);
        }
    }
    
    letras.forEach((l) => {
        palo.forEach((p) => {
            baraja.push(l + p);
        });
    });
    baraja = _.shuffle(baraja);
}

function valor(carta) {
    let valorcarta = carta.substring(0, carta.length - 1);

    return (['A', 'Q', 'J', 'K'].includes(valorcarta))
    ? valorcarta == 'A' ? 11 : 10
    : valorcarta * 1;
}

function turnocomputadora() {
    let ganojugador = true;
    do {
        carta = baraja.shift()
        $('#cartascomputadora').html($('#cartascomputadora').html() + (`<img src="./Cartas/${carta}.png"></img>`));
        
        totalpuntoscomputadora += valor(carta);
        $('#puntoscomputadora').text(totalpuntoscomputadora);

        if (totalpuntosjugador > 21) {
            ganojugador = false;
            break;
        }


    } while (totalpuntoscomputadora <= 21 && totalpuntoscomputadora < totalpuntosjugador);
    if (totalpuntoscomputadora <= 21 && totalpuntoscomputadora > totalpuntosjugador) {
        ganojugador = false;
    }
    alert(ganojugador ? 'El jugador ganó' : 'La computadora gana');
 
}

$('#btn-new').click(function () {
    $('#cartasjugador').html('');
    $('#cartascomputadora').html('');
    crearbaraja();
    totalpuntosjugador = 0;
    $('#puntosjugador').text(0);
    totalpuntoscomputadora = 0;
    $('#puntoscomputadora').text(0);
    $('#btn-card').removeAttr('disabled');
    $('#btn-stop').removeAttr('disabled');
    
});

$('#btn-card').click(function () {
    carta = baraja.shift()
    $('#cartasjugador').html($('#cartasjugador').html() + (`<img src="./Cartas/${carta}.png"></img>`));

    totalpuntosjugador += valor(carta);
    $('#puntosjugador').text(totalpuntosjugador);

    if (totalpuntosjugador > 21) {
        $('#btn-card').attr('disabled','true');
        $('#btn-stop').attr('disabled','true');
        turnocomputadora();     
    }
})

$('#btn-stop').click(turnocomputadora);

crearbaraja();
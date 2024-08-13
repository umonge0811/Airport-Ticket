/* INICIO Paso 1*/
document.addEventListener('DOMContentLoaded', () => {
    const formularioBusqueda = document.getElementById('paso1Form');

    formularioBusqueda.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

        // Capturar los datos del formulario
        const destino = document.getElementById('destino').value;
        const cantidadTiquetes = document.getElementById('cantidadTiquetes').value;
        const cantidadNinos = document.getElementById('cantidadNinos').value || 0;

        // Almacenar los datos en variables de sesión
        sessionStorage.setItem('destino', destino);
        sessionStorage.setItem('cantidadTiquetes', cantidadTiquetes);
        sessionStorage.setItem('cantidadNinos', cantidadNinos);

        // Redirigir al siguiente paso
        window.location.href = 'paso2.html';
    });
});
/* FIN Paso 1*/


/*INICIO Paso 2*/
function avanzarAlPaso3() {
    const destino = document.getElementById('destino').value;
    const cantidadTiquetes = document.getElementById('cantidadTiquetes').value;
    const cantidadNinos = document.getElementById('cantidadNinos').value || 0;
    const clase = document.querySelector('input[name="clase"]:checked').value;
    const fecha = document.getElementById('fecha').value;
    const nombre = document.getElementById('nombre').value;
    const cedula = document.getElementById('cedula').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;

    sessionStorage.setItem('destino', destino);
    sessionStorage.setItem('cantidadTiquetes', cantidadTiquetes);
    sessionStorage.setItem('cantidadNinos', cantidadNinos);
    sessionStorage.setItem('clase', clase);
    sessionStorage.setItem('fecha', fecha);
    sessionStorage.setItem('nombre', nombre);
    sessionStorage.setItem('cedula', cedula);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('telefono', telefono);

    // Redirigir al siguiente paso
    window.location.href = 'paso3.html';
}

// Event listener para avanzar al Paso 3
document.getElementById('reservaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    avanzarAlPaso3();
});


/*FIN Paso 2*/

/*INICIO PASO 3 */
function calcularMonto() {
    const cantidadTiquetes = parseInt(sessionStorage.getItem('cantidadTiquetes'));
    const cantidadNinos = parseInt(sessionStorage.getItem('cantidadNinos'));
    const clase = sessionStorage.getItem('clase');
    const destino = sessionStorage.getItem('destino');
    const fecha = new Date(sessionStorage.getItem('fecha'));
    const nombre = sessionStorage.getItem('nombre');
    const cedula = sessionStorage.getItem('cedula');
    const email = sessionStorage.getItem('email');
    const telefono = sessionStorage.getItem('telefono');

    const tarifas = {
        "Peru": 500,
        "USA": 250,
        "Espana": 1000,
        "Panama": 300,
        "Guatemala": 400
    };

    const temporadas = {
        "1": 35, "2": 35, "3": 35, // Alta
        "4": 0, "5": 0, "6": 0,    // Baja
        "7": 20,                   // Especial
        "8": 0, "9": 0, "10": 0, "11": 0, // Baja
        "12": 20                  // Especial
    };

    const clases = {
        "economica": 0,
        "empresarial": 20,
        "primera": 45
    };

    const tarifaBase = tarifas[destino];
    const mes = fecha.getMonth() + 1; // Los meses van de 0 a 11
    const porcentajeTemporada = temporadas[mes];
    const porcentajeClase = clases[clase];

    const tarifaTemporada = tarifaBase + (tarifaBase * porcentajeTemporada / 100);
    const tarifaFinal = tarifaTemporada + (tarifaTemporada * porcentajeClase / 100);

    const montoAdulto = tarifaFinal;
    const montoNino = tarifaFinal * 0.4;
    const totalAdultos = montoAdulto * cantidadTiquetes;
    const totalNinos = montoNino * cantidadNinos;
    const montoTotal = totalAdultos + totalNinos;

    const resumenHTML = `
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Cédula:</strong> ${cedula}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Fecha de Reservación:</strong> ${fecha.toLocaleDateString()}</p>
        <p><strong>Destino:</strong> ${destino}</p>
        <p><strong>Cantidad de Adultos:</strong> ${cantidadTiquetes}</p>
        <p><strong>Cantidad de Niños:</strong> ${cantidadNinos}</p>
        <p><strong>Clase:</strong> ${clase}</p>
        <p><strong>Tarifa Aplicada (por Adulto):</strong> $${montoAdulto.toFixed(2)}</p>
        <p><strong>Tarifa Aplicada (por Niño):</strong> $${montoNino.toFixed(2)}</p>
        <p><strong>Total a Pagar:</strong> $${montoTotal.toFixed(2)}</p>
    `;

    document.getElementById('resumen').innerHTML = resumenHTML;
}

// Llamar a la función calcularMonto al cargar la página
document.addEventListener('DOMContentLoaded', calcularMonto);

function finalizarCompra() {
    alert('Compra finalizada. ¡Gracias por tu compra!');
    // Aquí puedes añadir la lógica para finalizar la compra, como redirigir a una página de confirmación o procesar el pago.
}

/*  FIN Paso 3*/


function calcularMonto() {
    const cantidadTiquetes = parseInt(sessionStorage.getItem('cantidadTiquetes'));
    const cantidadNinos = parseInt(sessionStorage.getItem('cantidadNinos'));
    const clase = sessionStorage.getItem('clase');
    const destino = sessionStorage.getItem('destino');
    const fecha = new Date(sessionStorage.getItem('fecha'));
    const nombre = sessionStorage.getItem('nombre');
    const cedula = sessionStorage.getItem('cedula');
    const email = sessionStorage.getItem('email');
    const telefono = sessionStorage.getItem('telefono');

    const tarifas = {
        "Peru": 500,
        "USA": 250,
        "Espana": 1000,
        "Panama": 300,
        "Guatemala": 400
    };

    const temporadas = {
        "1": 35, "2": 35, "3": 35, // Alta
        "4": 0, "5": 0, "6": 0,    // Baja
        "7": 20,                   // Especial
        "8": 0, "9": 0, "10": 0, "11": 0, // Baja
        "12": 20                  // Especial
    };

    const clases = {
        "economica": 0,
        "empresarial": 20,
        "primeraClase": 45
    };

    const tarifaBase = tarifas[destino];
    const mes = fecha.getMonth() + 1; // Los meses van de 0 a 11
    const porcentajeTemporada = temporadas[mes];
    const porcentajeClase = clases[clase];

    const tarifaTemporada = tarifaBase + (tarifaBase * porcentajeTemporada / 100);
    const tarifaFinal = tarifaTemporada + (tarifaTemporada * porcentajeClase / 100);

    const montoAdulto = tarifaFinal;
    const montoNino = tarifaFinal * 0.4;
    const totalAdultos = montoAdulto * cantidadTiquetes;
    const totalNinos = montoNino * cantidadNinos;
    const montoTotal = totalAdultos + totalNinos;

    const resumenHTML = `
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Cédula:</strong> ${cedula}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Fecha de Reservación:</strong> ${fecha.toLocaleDateString()}</p>
        <p><strong>Destino:</strong> ${destino}</p>
        <p><strong>Cantidad de Adultos:</strong> ${cantidadTiquetes}</p>
        <p><strong>Cantidad de Niños:</strong> ${cantidadNinos}</p>
        <p><strong>Clase:</strong> ${clase}</p>
        <p><strong>Tarifa Aplicada (por Adulto):</strong> $${montoAdulto.toFixed(2)}</p>
        <p><strong>Tarifa Aplicada (por Niño):</strong> $${montoNino.toFixed(2)}</p>
        <p><strong>Total a Pagar:</strong> $${montoTotal.toFixed(2)}</p>
    `;

    document.getElementById('resumen').innerHTML = resumenHTML;
}

// Llamar a la función calcularMonto al cargar la página
document.addEventListener('DOMContentLoaded', calcularMonto);

function finalizarCompra() {
    alert('Compra finalizada. ¡Gracias por tu compra!');
    // Aquí puedes añadir la lógica para finalizar la compra, como redirigir a una página de confirmación o procesar el pago.
}


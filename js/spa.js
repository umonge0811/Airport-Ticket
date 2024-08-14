document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('content');
  const menuLinks = document.querySelectorAll('.menulink, .nav-link');

  function loadPage(page) {
    //alert(page)
    if(page != "/home"){

   
      fetch(`${page}.html`)
          .then(response => response.text())
          .then(html => {
            
              content.innerHTML = html;
              //window.history.pushState(null, null, `${page}.html`);
              initFormHandlers();
          })
          .catch(error => {
              console.error('Error loading page:', error);
              content.innerHTML = '<p>Error al cargar la página.</p>';
          });
        }
  }

  menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          const page = e.target.getAttribute('data-page');
          loadPage(page);
      });
  });

  // Load initial page
  loadPage('video');

  window.addEventListener('popstate', () => {
      loadPage(window.location.pathname.replace('.html', ''));
  });
});

function initFormHandlers() {
  const continuarPaso2Button = document.getElementById('continuarPaso2');
  if (continuarPaso2Button) {
      continuarPaso2Button.addEventListener('click', function() {
          avanzarAlPaso2();
      });
  }

  const reservaForm = document.getElementById('reservaForm');
  if (reservaForm) {
      reservaForm.addEventListener('submit', function(event) {
          event.preventDefault();
          avanzarAlPaso3();
      });
  }
    // Llamar a calcularMonto si estamos en la página paso3
    if (window.location.pathname.includes('paso3')) {
      calcularMonto();
  }
}

function avanzarAlPaso2() {
  // No se necesita obtener datos del paso 1
  loadPage('paso2');
}

function avanzarAlPaso3() {
  const clase = document.querySelector('input[name="clase"]:checked').value;
  const fecha = document.getElementById('fecha').value;
  const nombre = document.getElementById('nombre').value;
  const cedula = document.getElementById('cedula').value;
  const email = document.getElementById('email').value;
  const telefono = document.getElementById('telefono').value;
  const destino = document.getElementById('destino').value
  const cantidadtiquetes = document.getElementById('cantidadTiquetes').value
  const cantidadNinosValue = document.getElementById('cantidadNinos').value;
  const destinoNinos = isNaN(parseInt(cantidadNinosValue)) ? 0 : parseInt(cantidadNinosValue);



  sessionStorage.setItem('clase', clase);
  sessionStorage.setItem('fecha', fecha);
  sessionStorage.setItem('nombre', nombre);
  sessionStorage.setItem('cedula', cedula);
  sessionStorage.setItem('email', email);
  sessionStorage.setItem('telefono', telefono);
  sessionStorage.setItem('destino',destino)
  sessionStorage.setItem('cantidadTiquetes',cantidadtiquetes)
  sessionStorage.setItem('cantidadNinos',destinoNinos)


  loadPage('paso3');
}


// Paso 3


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
      "Economica": 0,
      "Empresarial": 20,
      "PrimeraClase": 45
  };

  const tarifaBase = tarifas[destino];
  const mes = fecha.getMonth() + 1; // meses van de 0 a 11
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
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card shadow-lg border-0">
          <div class="card-header bg-gradient-primary text-center py-4">
            <h4 class="mb-0"><i class="fas fa-ticket-alt"></i> Resumen de Reservación</h4>
          </div>
          <div class="card-body p-5">
            <div class="row mb-4">
              <div class="col-md-6">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item bg-light"><strong>Nombre:</strong> ${nombre}</li>
                  <li class="list-group-item"><strong>Cédula:</strong> ${cedula}</li>
                  <li class="list-group-item bg-light"><strong>Teléfono:</strong> ${telefono}</li>
                  <li class="list-group-item"><strong>Email:</strong> ${email}</li>
                  <li class="list-group-item"><strong>Clase:</strong> ${clase}</li>
                </ul>
              </div>
              <div class="col-md-6">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item"><strong>Fecha de Reservación:</strong> ${fecha.toLocaleDateString()}</li>
                  <li class="list-group-item"><strong>Destino:</strong> ${destino}</li>
                  <li class="list-group-item"><strong>Cantidad de Adultos:</strong> <span class="badge  bg-primary rounded-pill">${cantidadTiquetes}</span></li>
                  <li class="list-group-item"><strong>Cantidad de Niños:</strong> <span class="badge  bg-primary rounded-pill">${cantidadNinos}</span></li>
                </ul>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col-md-6">
                <h5 class="text-primary"><i class="fas fa-money-bill-wave"></i> Tarifas</h5>
                <p class="mb-1"><strong>Por Adulto:</strong> $${montoAdulto.toFixed(2)}</p>
                <p><strong>Por Niño:</strong> $${montoNino.toFixed(2)}</p>
              </div>
              <div class="col-md-6 text-right">
                <h5 class="text-primary"><i class="fas fa-dollar-sign"></i> Total a Pagar</h5>
                <h3 class="text-success font-weight-bold">$${montoTotal.toFixed(2)}</h3>
              </div>
            </div>
            <div class="text-center mt-4">
           <div class="text-center mt-4">
              <button id="finalizarCompra" class="btn btn-primary">Finalizar Compra</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`;






document.getElementById('resumen').innerHTML = resumenHTML;

// Agregar evento al botón "Finalizar Compra"
const finalizarCompraButton = document.getElementById('finalizarCompra');
if (finalizarCompraButton) {
  finalizarCompraButton.addEventListener('click', finalizarCompra);
}
}

function finalizarCompra() {
  Swal.fire({
    title: 'Compra finalizada',
    text: '¡Gracias por tu compra!',
    icon: 'success',
    showConfirmButton: false, 
    timer: 2000, 
    timerProgressBar: true, 
  }).then(() => {
    loadPage('paso1'); 
  });
}



/// --------------------------------------------

function loadPage(page) {
  fetch(`${page}.html`)
      .then(response => response.text())
      .then(html => {
          const content = document.getElementById('content');
          content.innerHTML = html;
          window.history.pushState(null, null, `${page}.html`);
          initFormHandlers();
      })
      .catch(error => {
          console.error('Error loading page:', error);
          const content = document.getElementById('content');
          content.innerHTML = '<p>Error al cargar la página.</p>';
      });
}

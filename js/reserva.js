
const formularioBusqueda = document.querySelector('form');

formularioBusqueda.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

    // Capturar los datos del formulario
    const origen = document.getElementById('origen').value;
    const destino = document.getElementById('destino').value;
    const fechaSalida = document.getElementById('fechaSalida').value;
    const fechaRegreso = document.getElementById('fechaRegreso').value;
    const adultos = document.getElementById('adultos').value;
    const ninos = document.getElementById('ninos').value;
    const clase = document.getElementById('clase').value;

    // Almacenar los datos en variables de sesión (simulación por ahora)
    sessionStorage.setItem('origen', origen);
    sessionStorage.setItem('destino', destino);
    sessionStorage.setItem('fechaSalida', fechaSalida);
    sessionStorage.setItem('fechaRegreso', fechaRegreso);
    sessionStorage.setItem('adultos', adultos);
    sessionStorage.setItem('ninos', ninos);
    sessionStorage.setItem('clase', clase);

    // Redirigir al siguiente paso
    window.location.href = 'paso2.html';
});

const continuarPaso2Btn = document.querySelector('[data-page="paso2"]');

if (continuarPaso2Btn) {
    continuarPaso2Btn.addEventListener('click', () => {
    const carousel = new bootstrap.Carousel(document.getElementById('reservaCarousel'));
    carousel.next();
    });
}
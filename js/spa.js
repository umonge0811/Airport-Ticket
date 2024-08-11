// Esperar a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', () => { 

    // Obtener el elemento con el id "content" (donde se cargará el contenido de las páginas)
    const content = document.getElementById('content');
  
    // Obtener todos los elementos con la clase "menulink" (los enlaces del menú)
    const menuLinks = document.querySelectorAll('.menulink'); 
  
    // Función para cargar el contenido de una página
    function loadPage(page) {
  
      // Realizar una petición para obtener el archivo HTML de la página
      fetch(`${page}.html`) 
  
        // Cuando la petición sea exitosa, obtener el texto (contenido HTML) de la respuesta
        .then(response => response.text()) 
  
        // Cuando se haya obtenido el contenido HTML, actualizar el contenido del elemento "content" con el nuevo HTML
        .then(html => { 
          content.innerHTML = html; 
        })
  
        // Si ocurre un error al cargar la página, mostrar un mensaje de error en la consola y en el elemento "content"
        .catch(error => { 
          console.error('Error loading page:', error); 
          content.innerHTML = '<p>Error al cargar la página.</p>';
        });
    }
  
    // Iterar sobre cada enlace del menú y agregar un evento de clic
    menuLinks.forEach(link => { 
  
      // Agregar un evento de clic a cada enlace
      link.addEventListener('click', (e) => { 
  
        // Prevenir el comportamiento por defecto del enlace (evitar que navegue a otra página)
        e.preventDefault(); 
  
        // Obtener el valor del atributo "data-page" del enlace (el nombre de la página a cargar)
        const page = e.target.getAttribute('data-page'); 
  
        // Llamar a la función loadPage para cargar la página correspondiente
        loadPage(page); 
      });
    });
  
    // Cargar la página "video.html" al iniciar la aplicación
    loadPage('video'); 
  });
  
document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const navLinks = document.querySelectorAll('.nav-link');

    function loadPage(page) {
        fetch(`${page}.html`)
            .then(response => response.text())
            .then(html => {
                content.innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading page:', error);
                content.innerHTML = '<p>Error al cargar la página.</p>';
            });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.getAttribute('data-page');
            loadPage(page);
        });
    });

    // Cargar la página de inicio por defecto
    loadPage('video');
});
  


function loadPage(page) {
    // ...
    fetch(`${page}.html`)
      .then(response => response.text())
      .then(html => {
        content.innerHTML = html;
        if (page === 'galeria') {
          initGaleriaHandlers(); // Call initGaleriaHandlers() when Galeria page is loaded
        }
      })
      .catch(error => {
        console.error('Error loading page:', error);
        content.innerHTML = '<p>Error al cargar la página.</p>';
      });
  }
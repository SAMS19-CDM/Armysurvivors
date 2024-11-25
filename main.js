// Ejemplo de función que puedes ejecutar cuando se hace clic en un botón
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        console.log(`Se hizo clic en el botón: ${this.innerHTML}`);
        // Puedes agregar más funcionalidad aquí, como redirigir o mostrar un mensaje
    });
});

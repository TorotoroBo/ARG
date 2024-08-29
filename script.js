// Función para cargar las ubicaciones desde el archivo JSON
async function loadLocations() {
    const response = await fetch('locations.json');
    const locations = await response.json();
    return locations;
}

// Función para agregar una imagen en una ubicación específica
function addImageAtLocation(name, latitude, longitude, image) {
    const entity = document.createElement('a-image');
    entity.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
    entity.setAttribute('name', name);
    entity.setAttribute('src', image);
    entity.setAttribute('scale', '5 5 5'); // Aumentamos la escala para que la imagen sea más grande
    entity.setAttribute('position', '0 2.5 0'); // Elevamos la imagen 2.5 metros sobre el suelo
    entity.setAttribute('look-at', '[gps-camera]'); // Hace que la imagen siempre mire hacia la cámara
    entity.setAttribute('rotation', '0 0 0'); // Asegura que la imagen esté vertical

    // Agregamos un evento para asegurarnos de que la imagen siempre mire a la cámara
    entity.addEventListener('loaded', () => {
        window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
    });

    document.querySelector('a-scene').appendChild(entity);
}

// Función principal
async function main() {
    const locations = await loadLocations();
    
    locations.forEach(location => {
        addImageAtLocation(location.name, location.latitude, location.longitude, location.image);
    });
}

// Iniciar la aplicación cuando se cargue la escena
document.querySelector('a-scene').addEventListener('loaded', main);

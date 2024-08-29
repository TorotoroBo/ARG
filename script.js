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
    entity.setAttribute('scale', '1 1 1');
    entity.setAttribute('look-at', '[gps-camera]');
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
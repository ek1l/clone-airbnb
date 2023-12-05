const L = window.L || {};

const mapInstance = {
  map: null,
  layer: null,
  markers: L.featureGroup(),
};

const defaultOptions = { zoom: 13, coords: [], maxZoom: 18 };

function initialize($element, options = defaultOptions) {
  mapInstance.map = L.map($element).setView(options.coords, options.zoom);
  mapInstance.layer = L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      titleSize: 512,
    },
  ).addTo(mapInstance.map);

  mapInstance.markers
    .on('mouseover', (e) => {
      e.layer.setZIndexOffset(100);
    })
    .on('mouseout', (e) => {
      e.layer.setZIndexOffset(0);
    })
    .addTo(mapInstance.map);
}

function inconPrice(content) {
  return L.divIcon({ className: 'map-price', html: content, iconSize: null });
}

function addMarker(attrs = {}) {
  mapInstance.markers.addLayer(
    L.marker(attrs.coords, {
      icon: inconPrice(attrs.content),
    }),
  );
}

export default {
  initialize,
  addMarker,
};

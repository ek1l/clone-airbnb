const L = window.L || {};

const defaultOptions = { zoom: 13, coords: [], maxZoom: 18 };

export const initialize = ($element, options = defaultOptions) => {
  const map = L.map($element).setView(options.coords, options.zoom);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    titleSize: 512,
  }).addTo(map);

  const markers = L.featureGroup()
    .on('mouseover', (e) => {
      e.layer.setZIndexOffset(100);
    })
    .on('mouseout', (e) => {
      e.layer.setZIndexOffset(0);
    })
    .addTo(map);
};

const inconPrice = (content) => {
  return L.divIcon({ className: 'map-price', html: content, iconSize: null });
};

// const addMarker = (attrs = {}) => {
//   mapInstance.markers.addLayer(
//     L.marker(attrs.coords, {
//       icon: inconPrice(attrs.content),
//     }),
//   );
// };

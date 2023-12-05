const L = window.L || {};

const inconPrice = (content) => {
  return L.divIcon({ className: 'map-price', html: content, iconSize: null });
};

const defaultOptions = {
  zoom: 13,
  coords: [],
  maxZoom: 18,
  tileServer: 'maptiler',
};

const mapTileConfig = {
  mapDefault: {
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    options: {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      titleSize: 512,
    },
  },
  maptiler: {
    url: 'https://api.maptiler.com/maps/{id}/{z}/{x}/{y}.png?key={key}',
    options: {
      key: '3U5wYD1rEGBHqHyEGhcb',
      id: 'basic',
    },
  },
};

const initialize = ($element, options = defaultOptions) => {
  const optionsBase = {
    ...defaultOptions,
    ...options,
  };

  const map = L.map($element).setView(optionsBase.coords, optionsBase.zoom);
  L.tileLayer(
    mapTileConfig[optionsBase.tileServer].url,
    mapTileConfig[optionsBase.tileServer].options,
  ).addTo(map);

  const markers = L.featureGroup().addTo(map);

  const addMarker = (attrs = {}) => {
    markers.addLayer(
      L.marker(attrs.coords, {
        riseOnHover: true,
        icon: inconPrice(attrs.content),
      }),
    );
  };

  return {
    addMarker,
  };
};

export default initialize;

const L = window.L || {};

const inconPrice = ({ content, className }) => {
  return L.divIcon({ className, html: content, iconSize: null });
};

const defaultOptions = {
  zoom: 13,
  coords: [],
  maxZoom: 18,
  tileServer: 'maptiler',
  marker: {
    default: 'map-price',
    hover: 'map-price__hover',
  },
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
  map.on('moveend', optionsBase.onChange);

  const addMarker = (attrs = {}) => {
    const marker = L.marker(attrs.coords, {
      riseOnHover: true,
      icon: inconPrice({
        content: attrs.content,
        className: optionsBase.marker.default,
      }),
    });
    markers.addLayer(marker);
    return marker;
  };

  const contains = (coords) => {
    return map.getBounds().contains(coords);
  };

  const clearMarkers = () => {
    markers.clearLayers();
  };

  const setActiveMarker = (marker, active = true) => {
    marker.setIcon(
      inconPrice({
        content: marker.options.icon.options.html,
        className: ` ${optionsBase.marker.default}  ${
          active ? optionsBase.marker.hover : ''
        } `,
      }),
    );
  };

  return {
    addMarker,
    contains,
    clearMarkers,
    setActiveMarker,
  };
};

export default initialize;

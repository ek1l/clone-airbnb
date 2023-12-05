import maps from './libs/maps.js';
import { getPosition } from './helpers/geolocation.js';

async function init() {
  const { coords } = await getPosition();

  const mapInstance = maps(document.querySelector('.map-instance'), {
    tileServer: 'maptiler',
    coords: [coords.latitude, coords.longitude],
    zoom: 13,
  });

  mapInstance.addMarker({
    coords: [-19.45442371086181, -44.25036484452751],
    content: 'R$ 400',
  });

  mapInstance.addMarker({
    coords: [-19.467534923063994, -44.25310914915545],
    content: 'R$ 350',
  });

  mapInstance.addMarker({
    coords: [-19.47594809554594, -44.23370628079845],
    content: 'R$ 5475',
  });

  mapInstance.addMarker({
    coords: [-19.436779930397318, -44.246248500167404],
    content: 'R$ 1600',
  });

  mapInstance.addMarker({
    coords: [-19.468180651831954, -44.24315148247979],
    content: 'R$ 2000',
  });
}

export default init;

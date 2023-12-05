import maps from './libs/maps.js';
import { getPosition } from './helpers/geolocation.js';
import AccommodationComponent from './components/AccommodationComponent.js';
import accommodationsService from './services/accommodationService.js';
async function init() {
  const { coords } = await getPosition();

  const accomodationsData = await accommodationsService.getAccommodations();
  console.log(accomodationsData);

  const mapInstance = maps(document.querySelector('.map-instance'), {
    tileServer: 'maptiler',
    coords: [coords.latitude, coords.longitude],
    zoom: 13,
  });

  const $accommodations = document.querySelector('.accommodations');
  const render = () => {
    $accommodations.innerHTML = AccommodationComponent({
      title: 'acomodação 1',
    });

    $accommodations.insertAdjacentHTML(
      'beforeend',
      AccommodationComponent({ title: 'acomodação 2' }),
    );

    $accommodations.insertAdjacentHTML(
      'beforeend',
      AccommodationComponent({ title: 'acomodação 3' }),
    );
  };
  render();
}

export default init;

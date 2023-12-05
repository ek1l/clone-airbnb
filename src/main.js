import maps from './libs/maps.js';
import { getPosition } from './helpers/geolocation.js';
import AccommodationComponent from './components/AccommodationComponent.js';
import accommodationsService from './services/accommodationService.js';
import accommodationAdapter from './components/accommodationAdapter.js';

const init = async () => {
  const { coords } = await getPosition();

  const accommodationsData = await accommodationsService.getAccommodations();

  const mapInstance = maps(document.querySelector('.map-instance'), {
    tileServer: 'maptiler',
    coords: [coords.latitude, coords.longitude],
    zoom: 13,
  });

  const $accommodations = document.querySelector('.accommodations');

  const getAccommodationsFromMapBounds = (accommodations) => {
    return accommodations.filter((accommodation) => {
      return mapInstance.contains([
        accommodation.listing.lat,
        accommodation.listing.lng,
      ]);
    });
  };
  const render = () => {
    const accommodationsAreaMap =
      getAccommodationsFromMapBounds(accommodationsData);

    accommodationsAreaMap.forEach((accommodation) => {
      $accommodations.insertAdjacentHTML(
        'beforeend',
        AccommodationComponent(accommodationAdapter(accommodation)),
      );
      mapInstance.addMarker({
        coords: [accommodation.listing.lat, accommodation.listing.lng],
        content: accommodation.pricingQuote.priceString,
      });
    });
  };
  render();
};

export default init;

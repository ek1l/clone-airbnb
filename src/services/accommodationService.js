import accommodationsMock from '../../data/mock.js';

const getAccommodations = async () => {
  return accommodationsMock.data.dora.exploreV3.sections[2].items;
};

export default {
  getAccommodations,
};

import {DONATION_PHOTOS_CHANGE} from '../constants';

export const addDonationPhoto = photo => {
  return {
    type: DONATION_PHOTOS_CHANGE,
    payload: photo,
  };
};

export const resetDonationPhoto = () => {
  return {
    type: DONATION_PHOTOS_CHANGE,
    payload: [],
  };
};

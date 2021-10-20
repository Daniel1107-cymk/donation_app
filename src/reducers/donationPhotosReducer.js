import {DONATION_PHOTOS_CHANGE} from '../constants';

const initialState = {
  donationPhotos: [],
};

const DonationPhotosReducer = (state = initialState, action) => {
  switch (action.type) {
    case DONATION_PHOTOS_CHANGE:
      return {
        ...state,
        donationPhotos: action.payload,
      };
    default:
      return state;
  }
};

export default DonationPhotosReducer;

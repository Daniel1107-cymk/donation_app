import Toast from 'react-native-toast-message';

export const errorHandler = error => {
  const {status, data} = error.response;

  switch (status) {
    case 401:
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Unauthorized',
        text2: `You'll be redirect to the login`,
        visibilityTime: 1000,
        autoHide: true,
        bottomOffset: 20,
      });
      return {
        success: false,
        data: null,
        redirect: true,
        status: 401,
      };
    case 403:
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Not found',
        text2: 'Something went wrong, please try again',
        visibilityTime: 1000,
        autoHide: true,
        bottomOffset: 20,
      });
      break;
    case 404:
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Not found',
        text2: 'Something went wrong, please try again',
        visibilityTime: 1000,
        autoHide: true,
        bottomOffset: 20,
      });
      return {
        success: false,
        data: data?.errors ?? data,
        redirect: true,
        status: 401,
      };
    case 400:
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Not found',
        text2: 'Something went wrong, please try again',
        visibilityTime: 1000,
        autoHide: true,
        bottomOffset: 20,
      });
      return {
        success: false,
        data: data?.errors ?? data,
        redirect: false,
        status: 422,
      };
    case 422:
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Not found',
        text2: 'Something went wrong, please try again',
        visibilityTime: 1000,
        autoHide: true,
        bottomOffset: 20,
      });
      return {
        success: false,
        data: data?.errors ?? data,
        redirect: false,
        status: 422,
      };
    case 500:
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Not found',
        text2: 'Something went wrong, please try again',
        visibilityTime: 1000,
        autoHide: true,
        bottomOffset: 20,
      });
      console.log('server error', error);
      break;
    default:
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Network error',
        text2: 'Network connection problem, please try again!',
        visibilityTime: 1000,
        autoHide: true,
        bottomOffset: 20,
      });
      return {
        success: false,
        data: null,
        redirect: true,
      };
  }
};

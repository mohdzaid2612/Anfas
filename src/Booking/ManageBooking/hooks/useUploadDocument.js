import {useState} from 'react';

import RNFetchBlob from 'rn-fetch-blob';
import {URL} from '../../../utils/constant';

import store from '../../../Store';

export default () => {
  const [uploadDocumentState, setUploadDocumentState] = useState({
    isLoading: false,
    response: [],
    error: '',
  });

  const uploadDocument = async payload => {
    try {
      setUploadDocumentState({
        isLoading: true,
        response: {},
        error: '',
      });
      const response = await RNFetchBlob.fetch(
        'POST',
        `http://ec2-3-144-72-161.us-east-2.compute.amazonaws.com/${URL.UPLOAD_DOCUMENT}`,
        {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${store.getState().auth.token}`,
        },
        payload,
      );
      setUploadDocumentState({
        isLoading: false,
        response: JSON.parse(response.data),
        error: '',
      });
    } catch (error) {
      setUploadDocumentState({
        isLoading: false,
        response: {},
        error: error.message,
      });
    }
  };

  return [uploadDocumentState, uploadDocument];
};

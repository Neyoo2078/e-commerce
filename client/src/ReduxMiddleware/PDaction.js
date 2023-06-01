import { Api } from '../Api/Api';
import { FetchDetails, Ploading } from '../Reducers/PDetailreducer';

export const PDetails = (id) => async (dispatch) => {
  console.log('got here');
  try {
    dispatch(Ploading(true));

    const data = await Api.get(`/details/${id}`);
    dispatch(FetchDetails(data.data));
    dispatch(Ploading(false));
  } catch (error) {
    console.log(error);
  }
};

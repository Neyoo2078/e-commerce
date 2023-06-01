import { Api } from '../Api/Api';
import { isLoading, fetchAll } from '../Reducers/ProductReducer';

export const fetchPoducts = () => async (dispatch) => {
  try {
    dispatch(isLoading(true));
    const data = await Api.get();
    dispatch(fetchAll(data.data));
    dispatch(isLoading(false));
  } catch (error) {
    console.log(error.message);
  }
};

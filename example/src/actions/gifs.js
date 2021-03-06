import 'whatwg-fetch';
import * as ActionTypes from 'constants/gifs';
import { beginTask, endTask } from '../../../src';

export function getRandomGif() {
  const screwSafari = Math.random().toString(36).substr(2);

  return {
    type: ActionTypes.GET_RANDOM_GIF,
    nprogress: true,
    payload: fetch(
      `https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&screw_safari=${screwSafari}`
    ).then(res => res.json())
  };
}

export function loadMultipleGifs(n = 1) {
  return (dispatch) => {
    const promises = [...new Array(n)].map(() => dispatch(getRandomGif()));

    return dispatch({
      type: ActionTypes.LOAD_MULTIPLE_GIFS,
      nprogress: [
        ActionTypes.LOAD_MULTIPLE_GIFS_SUCCESS,
        ActionTypes.LOAD_MULTIPLE_GIFS_ERROR
      ],
      payload: Promise.all(promises)
    });
  };
}

export function reset() {
  return (dispatch) => {
    dispatch(beginTask());
    dispatch({ type: ActionTypes.RESET });

    setTimeout(() => {
      dispatch(endTask());
    }, 500);
  };
}

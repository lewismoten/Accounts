import { handleActions } from 'redux-actions';
import { produce } from 'immer';
import * as actions from './actions';

const initialState = {};

const onChange = produce((draft, action) => {
  const {
    palette: { background, primary },
  } = action.payload;
  draft.palette = {
    background: {
      paper: background.paper,
    },
    primary: {
      main: primary.main,
    },
  };
});

export default handleActions(
  {
    [actions.change.TRIGGER]: onChange,
  },
  initialState
);
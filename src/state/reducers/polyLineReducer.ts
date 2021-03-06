import { last, pythag } from "../../utils";
import { PolyLineAction, PolyLineState, PolyLineTypes } from "../types";

const DISTANCE_LIMIT = 150;

const initialState: PolyLineState = [];

const polyLineReducer = (state = initialState, action: PolyLineAction) => {
  switch (action.type) {
    case PolyLineTypes.POLYLINE_APPEND:
      let lastLine: number[][] = last(state);
      const lastPoint: number[] = last(lastLine);

      if (state.length === 0) {
        return [[[action.payload.latitude, action.payload.longitude]]];
      }
      // Starts a new line if the ISS wraps arround the map
      if (
        state.length > 0 &&
        lastPoint.length === 2 &&
        pythag(
          { latitude: lastPoint[0], longitude: lastPoint[1] },
          action.payload
        ) > DISTANCE_LIMIT
      ) {
        return Object.assign(
          [],
          state.concat([[[action.payload.latitude, action.payload.longitude]]])
        );
      } else {
        lastLine.push([action.payload.latitude, action.payload.longitude]);
        state[state.length - 1] = lastLine;
        return Object.assign([], state);
      }

    case PolyLineTypes.POLYLINE_CLEAR:
      return initialState;

    default:
      return state;
  }
};

export default polyLineReducer;

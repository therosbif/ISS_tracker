import { last, pythag } from "../../utils";
import { PolyLineAction, PolyLineState, PolyLineTypes } from "../types";

const DISTANCE_LIMIT = 1000;

const initialState: PolyLineState = [[]];

export default (state = initialState, action: PolyLineAction) => {
  switch (action.type) {
    case PolyLineTypes.POLYLINE_APPEND:
      let lastLine: number[][] = last(state);
      const lastPoint: number[] = last(lastLine);

      // Starts a new line if the ISS wrap arround the map
      if (
        lastPoint?.length === 2 &&
        pythag(
          lastPoint[0],
          action.payload.latitude,
          lastPoint[1],
          action.payload.longitude
        ) > DISTANCE_LIMIT
      ) {
        return state.concat([[
          [action.payload.latitude, action.payload.longitude],
        ]]);
      } else {
        if (state === [[]]) {
          return [[[action.payload.latitude, action.payload.longitude]]];
        }
        if (lastPoint?.length === 2) {
        console.log('dist: ' + pythag(
          lastPoint[0],
          action.payload.latitude,
          lastPoint[1],
          action.payload.longitude
        ))
        }
        lastLine.push([action.payload.latitude, action.payload.longitude]);
        state[state.length - 1] = lastLine;
        return state;
      }

    case PolyLineTypes.POLYLINE_CLEAR:
      return [[]];

    default:
      return state;
  }
};

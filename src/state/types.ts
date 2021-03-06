export interface Coords {
  latitude: number;
  longitude: number;
}

//   ISS

export enum ISSTypes {
  FETCH_ISS_REQUEST = "FETCH_ISS_REQUEST",
  FETCH_ISS_SUCCESS = "FETCH_ISS_SUCCESS",
  FETCH_ISS_FAILURE = "FETCH_ISS_FAILURE",
}

export interface ISSState {
  loading: boolean;
  data: IISSData[];
  error: string | null;
}

export interface FetchISSSuccessPayload {
  data: IISSData;
}

export interface FetchISSFailurePayload {
  error: string;
}

export interface FetchISSRequest {
  type: typeof ISSTypes.FETCH_ISS_REQUEST;
}

export interface FetchISSSuccess {
  type: typeof ISSTypes.FETCH_ISS_SUCCESS;
  payload: FetchISSSuccessPayload;
}

export interface FetchISSFailure {
  type: typeof ISSTypes.FETCH_ISS_FAILURE;
  payload: FetchISSFailurePayload;
}

export type ISSAction = FetchISSRequest | FetchISSSuccess | FetchISSFailure;

// export interface IISSData {
//   message: string;
//   iss_position: Coords;
//   timestamp: number;
// }

// Generated by https://quicktype.io

export interface IISSData {
  name:       string;
  id:         number;
  latitude:   number;
  longitude:  number;
  altitude:   number;
  velocity:   number;
  visibility: string;
  footprint:  number;
  timestamp:  number;
  daynum:     number;
  solar_lat:  number;
  solar_lon:  number;
  units:      string;
}


//   PolyLine

export enum PolyLineTypes {
  POLYLINE_APPEND = "POLYLINE_APPEND",
  POLYLINE_CLEAR = "POLYLINE_CLEAR",
}

export type PolyLineState = number[][][];

export type PolyLineAppendPayload = Coords;

export interface PolyLineAppendAction {
  type: typeof PolyLineTypes.POLYLINE_APPEND;
  payload: PolyLineAppendPayload;
}

export interface PolyLineClearAction {
  type: typeof PolyLineTypes.POLYLINE_CLEAR;
}

export type PolyLineAction = PolyLineAppendAction | PolyLineClearAction;

//   Time

export enum TimeControlTypes {
  TIME_FORWARD = "TIME_FORWARD",
  TIME_BACKWARD = "TIME_BACKWARD",
  TIME_RESET = "TIME_RESET",
  TIME_SET = "TIME_SET",
}

export interface TimeControlState {
  live: boolean;
  data: IISSData | null;
}

export interface TimeControlForwardPayload {
  data: IISSData[];
}

export interface TimeControlBackwardPayload {
  data: IISSData[];
}

export interface TimeControlSetPayload {
  data: IISSData[];
  timestamp: number;
}

export interface TimeControlForwardAction {
  type: typeof TimeControlTypes.TIME_FORWARD;
  payload: TimeControlForwardPayload;
}

export interface TimeControlBackwardAction {
  type: typeof TimeControlTypes.TIME_BACKWARD;
  payload: TimeControlBackwardPayload;
}

export interface TimeControlResetAction {
  type: typeof TimeControlTypes.TIME_RESET;
}

export interface TimeControlSetAction {
  type: typeof TimeControlTypes.TIME_SET;
  payload: TimeControlSetPayload;
}

export type TimeControlAction =
  | TimeControlForwardAction
  | TimeControlBackwardAction
  | TimeControlResetAction
  | TimeControlSetAction;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  TorqueType,
  ThrustType,
  RotorSpeedType,
  MotorSpeedType,
  WingPositionsType,
  MotorParameters
} from "./types";


export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "main",
  tagTypes: ["torque", "thrust", "rotorSpeed", "motorSpeed", "wingPosition", "controllParameter"],
  endpoints: (build) => ({
    getTorque: build.query<Array<TorqueType>, void>({
      query: () => "data/getSensorData/torques",
      providesTags: ["torque"],
    }),
    getThrust: build.query<Array<ThrustType>, void>({
      query: () => "data/getSensorData/thrusts",
      providesTags: ["thrust"],
    }),
    getRotorSpeed: build.query<Array<RotorSpeedType>, void>({
      query: () => "data/getSensorData/rotorSpeeds",
      providesTags: ["rotorSpeed"],
    }),
    getMotorSpeed: build.query<Array<MotorSpeedType>, void>({
      query: () => "data/getSensorData/motorSpeeds",
      providesTags: ["motorSpeed"],
    }),
    getWingPosition: build.query<Array<WingPositionsType>, void>({
      query: () => "data/getSensorData/wingPositions",
      providesTags: ["wingPosition"],
    }),
    getControllData: build.query<Array<MotorParameters>, void>({
      query: () => "Controll/getControllParametes",
      providesTags: ["controllParameter"],
    }),
    
  }),
});

export const { useGetTorqueQuery, 
               useGetThrustQuery,
               useGetRotorSpeedQuery,
               useGetMotorSpeedQuery,
               useGetWingPositionQuery,
               useGetControllDataQuery
              } = api;

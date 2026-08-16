// types.js
export interface TorqueType {
  torque: number;
  timeStampManual: number;
  id: number;
}

export interface ThrustType {
  thrust: number[];
  timeStampManual: number;
  id: number;
}

export interface RotorSpeedType {
  rotorSpeed: number;
  timeStampManual: number;
  id: number;
}

export interface MotorSpeedType {
  motorSpeed: number;
  timeStampManual: number;
  id: number;
}

export interface WingPositionsType {
  wingPosition: number;
  timeStampManual: number;
  id: number;
}

export interface ControllDataType {
  wingPosition: number;
  timeStampManual: number;
  id: number;
}

export interface MotorParameters {
  id: number;
  motorRun: boolean;
  direction: number[];
  setSpeedPercentage: number;
  maxSpeedPercentage: number;
  testRoutine: {
    maxSpeed: number;
    directionMatrix: number[];
  }[];
  cageOpen: boolean;
  emergencyShutdown: boolean;
  testBenchConnection: boolean;
}



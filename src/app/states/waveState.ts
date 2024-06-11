import { Point } from "../types"

export interface WaveStateType {
  nodesNumber: number;
  points: Point[];
  direction: 'T' | 'B' | 'R' | 'L';
  height: number;
  contrast: number;
  rec: boolean;
  steps: number;
  pathFill: boolean;
  pathStrokeWidth: number;
  recColor: string;
  pathColor: string;
}

const waveState: WaveStateType = {
  nodesNumber: 7,
  points: [{ x: 0, y: 0 }, { x: 1, y: 0 }],
  direction: 'B',
  height: 0.5,
  contrast: 0.4,
  rec: true,
  steps: 3,
  pathFill: true,
  pathStrokeWidth: 3,
  recColor: '#070027',
  pathColor: '#06b6d4'
}

export default waveState;
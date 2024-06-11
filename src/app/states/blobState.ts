import { Point } from "../types"
export interface BlobStateType{
  nodesNumber: number;
  points:Point[];
  height:number;
  contrast:number;
  rec:boolean;
  steps:number;
  pathFill:boolean;
  position:'C'|'TL'|'TR'|'BL'|'BR';
  pathStrokeWidth:number,
  recColor:string;
  pathColor:string;
}

const blobState:BlobStateType = {
  nodesNumber: 5,
  points:[{x:0,y:0},{x:0,y:0},{x:0,y:0}],
  height:0.5,
  contrast:0.4,
  rec:true,
  steps:1,
  pathFill:true,
  position:'C',
  pathStrokeWidth:3,
  recColor:'#00122d',
  pathColor:'#ffff00'
}

export default blobState

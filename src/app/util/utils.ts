import Color from 'colorjs.io'
import { Point } from '../types'

const round2D = (x:number) => {
  return Math.round(x * 100) / 100
}

const getCoordinate = (p:number, x:number) => {
  // rounded multiplication
  return round2D(p * x)
}



const pointString = (point:Point, xAxis:number, yAxis:number, direction:string) => {
  // direction: 'B' 'T' 'L' 'R'
  // enter point in fractions and aspect and get string of actual coordinates
  let x:number, y:number
  if (direction === 'B' || direction === 'T') {
    const px = getCoordinate(point.x, xAxis)
    const py = getCoordinate(point.y, yAxis)
    x = px;
    y = direction === 'B' ? yAxis - py : py
  } else {
    const py = getCoordinate(point.x, yAxis)
    const px = getCoordinate(point.y, xAxis)
    x = direction === 'R' ? px : xAxis - px
    y = py;
  }

  return `${x.toFixed(2)},${y.toFixed(2)}`
}



const getEvolvedValue = (v:number, height:number, contrast:number) => {
  // v :value 0-1 
  // height :height of used area 0.1 - 1
  // contrast :contrast in the area 0 values always in the middle of area , 1 means all area used,  0 - 1
  return (v * height * contrast) + (height * (1 - contrast) / 2)
}


const extractHexString = (s:string) => {
  const hexRegExp = new RegExp("[A-Fa-f0-9]")
  let c = Array.from(s).filter(el => hexRegExp.test(el)).join('')
  c = c.substring(0, 6)
  return c
}



const isHexString = (s:string) => {
  // #rgb || #rrggbb
  return new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).test(s)
}



const genWaveNodes = (nodesNumber:number):Point[] => {
  // nodesNumber : number of nodes inside path

  let points:Point[] = []
  const sectors = nodesNumber + 1
  const secWidth = 1 / sectors

  points.push({
    x: 0,
    y: Math.random()
  })

  for (let i = 0; i < nodesNumber; i++) {
    let x = (i + 1) * secWidth
    let y = Math.random()
    points.push({ x, y })
  }

  points.push({
    x: 1,
    y: Math.random()
  })

  return points
}


const genBlobNodes = (nodesNumber:number):Point[] => {
  let points:Point[] = []
  for (let i = 0; i < nodesNumber; i++) {
    points.push({ x: 0, y: Math.random() })
  }
  return points
}




const generateStepsPaths = (pathPoints:Point[], steps:number):Point[][] => {
  const paths:Point[][] = []
  for (let i = 1; i <= steps; i++) {
    let path:Point[] = pathPoints.map(el => {
      return {
        x: el.x,
        y: el.y * (i / steps)
      }
    })
    paths.push(path)
  }
  return paths.reverse()
}




const generateStepsColors = (startColor:string, endColor:string, steps:number) => {
  // gradient colors
  //  steps 1-10
  let color = new Color(startColor);
  let colors = color.steps(endColor, {
    space: "srgb",
    outputSpace: "srgb",
    steps: steps + 1 // number of steps
  });
  //  console.log(`rgb(${Math.round(el.r*255)}  ${Math.round(el.g*255)}  ${Math.round(el.b*255)})`);
  const stepsColors:string[] = colors.map(el => `rgb(${Math.round(el.r * 255)}  ${Math.round(el.g * 255)}  ${Math.round(el.b * 255)})`)
  return stepsColors.slice(0, -1).reverse()
}


export {
  round2D,
  getCoordinate,
  pointString,
  getEvolvedValue,
  extractHexString,
  isHexString,
  genWaveNodes,
  genBlobNodes,
  generateStepsPaths,
  generateStepsColors

}
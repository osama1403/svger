import { generateStepsColors, generateStepsPaths, getEvolvedValue, pointString } from '@/app/util/utils'
import { Aspect } from '@/app/states/aspects'
import { Point } from '@/app/types'
import { BlobStateType } from '@/app/states/blobState'

export const BlobPath = (aspect: Aspect, state: BlobStateType): React.ReactNode => {
  const points = state.points

  const pathPoints: Point[] = points.map(el => {
    return {
      x: el.x,
      y: getEvolvedValue(el.y, state.height, state.contrast)
    }
  })


  let steps = state.steps

  const paths = generateStepsPaths(pathPoints, steps)
  const colors = generateStepsColors(state.pathColor, state.recColor, steps)

  const yAxis = aspect.height

  const getPointString = (p: Point) => {
    // convert point relative coordinates to actual ready to insert coordinates string
    return pointString(p, yAxis, yAxis, 'B')
  }



  const getSvgPath = (pathPoints: Point[]) => {
    // get cubic beziar control points between control points, for smooth join 
    pathPoints = rotatePathPoints(pathPoints)
    let controlPoints = genBlobCubicControlPoints(pathPoints)
    controlPoints = smoothenControls(pathPoints, controlPoints)

    let d = pathPoints[0] ? `M${getPointString(pathPoints[0])} ` : ''

    for (let i = 0; i < pathPoints.length; i++) {
      const c1idx = (((2 * i) - 1) + controlPoints.length) % controlPoints.length
      const c2idx = (((2 * i)) + controlPoints.length) % controlPoints.length
      let c = `C${getPointString(controlPoints[c1idx])} ${getPointString(controlPoints[c2idx])} ${getPointString(pathPoints[(i + 1) % pathPoints.length])}  `
      d = d + c;
    }
    d += ' Z'
    return d
  }

  const svgPaths: { pathD: string, color: string }[] = paths.map((el, idx) => {
    const pathD = getSvgPath(el)
    const color = colors[idx]
    return { pathD, color }
  })

  // console.log(svgPaths);
  return (
    <>
      {
        state.rec &&
        <rect x="0" y="0" height={aspect.height} width={aspect.width} style={{ fill: state.recColor }
        } />
      }
      <g transform={translateBlob(aspect.width, aspect.height, state.position)}>
        {
          svgPaths.map((path, idx) => (
            <path key={idx} d={path.pathD}
              style={{ strokeWidth: state.pathFill ? 0 : state.pathStrokeWidth, stroke: path.color, fill: state.pathFill ? path.color : 'none', transition: 'all 0.2s cubic-bezier(0.62, 0.15, 0.39, 0.8), fill 0s,stroke 0s', strokeLinecap: 'round' }} />
          ))
        }
      </g>
    </>
  )

}


const rotatePoint = (p: Point, radian: number) => {
  return {
    x: (p.x * Math.cos(radian)) - (p.y * Math.sin(radian)),
    y: (p.x * Math.sin(radian)) + (p.y * Math.cos(radian))
  }
}

const rotatePathPoints = (points: Point[]): Point[] => {
  const PI = 3.1415
  const radStep = (2 * PI) / points.length
  return points.map((el, idx) => rotatePoint(el, idx * radStep))
}

const translateBlob = (width: number, height: number, position: string): string => {
  switch (position) {
    case 'TL':
      return (`translate(0 -${height})`)
    case 'TR':
      return (`translate(${width} -${height})`)
    case 'BL':
      return (`translate(0 0)`)
    case 'BR':
      return (`translate(${width} 0)`)
    default:
      return (`translate(${width / 2} -${height / 2})`);
  }
}


const genBlobCubicControlPoints = (points: Point[]): Point[] => {
  // generates an array of points located between every two consecutive inner points <not edge points>
  // [. . . . .] -> [. *.* *.* *.* .]

  const controlPoints: Point[] = []

  for (let i = 1; i <= points.length; i++) {
    const pp = points[i - 1]
    const cp = points[i % points.length]
    const ep = points[(i + 1) % points.length]

    const diff6X = (ep.x - pp.x) / 6
    const diff6Y = (ep.y - pp.y) / 6

    controlPoints.push({
      x: cp.x - diff6X,
      y: cp.y - diff6Y
    })
    controlPoints.push({
      x: cp.x + diff6X,
      y: cp.y + diff6Y
    })
  }

  return controlPoints
}


const smoothenControls = (points: Point[], controlPoints: Point[]) => {
  // For making the curves smooth 
  // parallel points control line with outer control line 
  // gradient algorithm

  // add first and last cp <not used only for algorithm>
  // controlPoints.unshift({ x: (points[0].x), y: (points[0].y) })
  // controlPoints.push({ x: (points[points.length - 1].x), y: (points[points.length - 1].y) })

  // number of smoothing Rounds
  const RATE = 10

  for (let r = 0; r < RATE; r++) {
    for (let i = 1; i <= points.length; i++) {
      // .   .   .   .
      //    . . . . . . . .
      // 2i-2 . 2i-1
      const nextCP = controlPoints[(2 * i) % controlPoints.length]
      const prevCP = controlPoints[((2 * i) - 3 + controlPoints.length) % controlPoints.length]
      const diff4X = (nextCP.x - prevCP.x) / 4
      const diff4Y = (nextCP.y - prevCP.y) / 4

      const new1X = points[i % points.length].x - diff4X
      const new2X = points[i % points.length].x + diff4X
      const new1Y = points[i % points.length].y - diff4Y
      const new2Y = points[i % points.length].y + diff4Y
      controlPoints[(2 * i) - 2] = { x: new1X, y: new1Y }
      controlPoints[(2 * i) - 1] = { x: new2X, y: new2Y }
    }
  }
  return controlPoints
}
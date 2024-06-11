import { generateStepsColors, generateStepsPaths, getEvolvedValue, pointString } from '@/app/util/utils'
import { Aspect } from '@/app/states/aspects'
import { Point } from '@/app/types'
import { WaveStateType } from "@/app/states/waveState"

export const WavesPath = (aspect: Aspect, state: WaveStateType): React.ReactNode => {
  const points = state.points
  const direction = state.direction

  const pathPoints: Point[] = points.map(el => {
    return {
      x: el.x,
      y: getEvolvedValue(el.y, state.height, state.contrast)
    }
  })


  let steps = state.steps

  const paths = generateStepsPaths(pathPoints, steps)
  const colors = generateStepsColors(state.pathColor, state.recColor, steps)

  const xAxis = aspect.width
  const yAxis = aspect.height

  const getPointString = (p: Point) => {
    // convert point relative coordinates to actual ready to insert coordinates string
    return pointString(p, xAxis, yAxis, direction)
  }



  const getSvgPath = (pathPoints: Point[]) => {
    // get cubic beziar control points between control points, for smooth join 
    let controlPoints = genCubicControlPoints(pathPoints)
    controlPoints = smoothenControls(pathPoints, controlPoints)

    let d = pathPoints[0] ? `M${getPointString(pathPoints[0])} ` : ''

    if (pathPoints.length > 2) {
      d += `Q${getPointString(controlPoints[0])} ${getPointString(pathPoints[1])} `
    } else {
      d += `L${getPointString(pathPoints[1])}`
    }

    for (let i = 0; i < pathPoints.length - 3; i++) {
      let c = `C${getPointString(controlPoints[(2 * i) + 1])} ${getPointString(controlPoints[(2 * i) + 2])} ${getPointString(pathPoints[i + 2])}  `
      d = d + c;
    }

    if (pathPoints.length > 2) {
      d += `Q${getPointString(controlPoints[controlPoints.length - 1])} ${getPointString(pathPoints[pathPoints.length - 1])} `
    }

    if (state.pathFill) {
      d += `L${getPointString({ x: 1, y: 0 })} L${getPointString({ x: 0, y: 0 })} Z`
    }

    return d
  }

  const svgPaths: { pathD: string, color: string }[] = paths.map((el, idx) => {
    const pathD = getSvgPath(el)
    const color = colors[idx]
    return { pathD, color }
  })

  return (
    <>
      {state.rec &&
        <rect x="0" y="0" height={aspect.height} width={aspect.width} style={{ fill: state.recColor }} />
      }
      {
        svgPaths.map((path, idx) => (
          <path key={idx} d={path.pathD}
            style={{ strokeWidth: state.pathFill ? 0 : state.pathStrokeWidth, stroke: path.color, fill: state.pathFill ? path.color : 'none', transition: 'all 0.2s cubic-bezier(0.62, 0.15, 0.39, 0.8), fill 0s,stroke 0s', strokeLinecap: 'round' }} />
        ))
      }
    </>
  )
}

const genCubicControlPoints = (points: Point[]) => {
  // generates an array of points located between every two consecutive inner points <not edge points>
  // [. . . . .] -> [. *.* *.* *.* .]

  const controlPoints: Point[] = []

  for (let i = 1; i < points.length - 1; i++) {
    const pp = points[i - 1]
    const cp = points[i]
    const ep = points[i + 1]

    const diff3X = (ep.x - cp.x) / 3
    const slope = (ep.y - pp.y) / (ep.x - pp.x)

    controlPoints.push({
      x: cp.x - diff3X,
      y: cp.y - (slope * diff3X)
    })
    controlPoints.push({
      x: cp.x + diff3X,
      y: cp.y + (slope * diff3X)
    })
  }

  return controlPoints
}


const smoothenControls = (points: Point[], controlPoints: Point[]) => {
  // For making the curves smooth 
  // parallel points control line with outer control line 
  // gradient algorithm

  // add first and last cp <not used only for algorithm>
  controlPoints.unshift({ x: (points[0].x), y: (points[0].y) })
  controlPoints.push({ x: (points[points.length - 1].x), y: (points[points.length - 1].y) })

  // number of smoothing Rounds
  const RATE = 5
  const diff3X = (points[1].x - points[0].x) / 3

  for (let r = 0; r < RATE; r++) {
    for (let i = 1; i < points.length - 1; i++) {
      // 2i-1 . 2i
      const nextCP = controlPoints[(2 * i) + 1]
      const prevCP = controlPoints[(2 * i) - 2]
      const slope = (nextCP.y - prevCP.y) / (nextCP.x - prevCP.x)
      const new1Y = points[i].y - diff3X * slope
      const new2Y = points[i].y + diff3X * slope
      controlPoints[(2 * i) - 1] = { x: controlPoints[(2 * i) - 1].x, y: new1Y }
      controlPoints[2 * i] = { x: controlPoints[2 * i].x, y: new2Y }
    }
  }
  return controlPoints.slice(1, -1)
}
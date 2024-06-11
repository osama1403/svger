import { generateStepsColors, generateStepsPaths, getEvolvedValue, pointString } from "../utils"
import { Aspect } from '@/app/states/aspects'
import { Point } from '@/app/types'
import { WaveStateType } from "@/app/states/waveState"

export const StepsPath = (aspect: Aspect, state: WaveStateType): React.ReactNode => {
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

    let d = pathPoints[0] ? `M${getPointString(pathPoints[0])} ` : '';

    for (let i = 0; i < pathPoints.length - 1; i++) {
      let l = `L${getPointString({ x: pathPoints[i + 1].x, y: pathPoints[i].y })} ${i === pathPoints.length - 2 ? '' : `L${getPointString(pathPoints[i + 1])}`} `
      d = d + l;
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
      {/* <path d={d}
        style={{ strokeWidth: state.pathFill ? 0 : state.pathStrokeWidth, stroke: state.pathColor, fill: state.pathFill ? state.pathColor : 'none', transition: 'all 0.2s cubic-bezier(0.62, 0.15, 0.39, 0.8), fill 0s,stroke 0s', strokeLinecap: 'round' }} /> */}
      {
        svgPaths.map((path, idx) => (
          <path key={idx} d={path.pathD}
            style={{ strokeWidth: state.pathFill ? 0 : state.pathStrokeWidth, stroke: path.color, fill: state.pathFill ? path.color : 'none', transition: 'all 0.2s cubic-bezier(0.62, 0.15, 0.39, 0.8), fill 0s,stroke 0s', strokeLinecap: 'round' }} />
        ))
      }

    </>
  )
}
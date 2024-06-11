import { useEffect } from "react";
import SvgDisplay from "../SvgDisplay";
import { genWaveNodes } from '../../util/utils'
import { WavesPath } from '../../util/variants/Waves'
import { WaveStateType } from "@/app/states/waveState";
import { Aspect } from "@/app/states/aspects";

const Waves = ({ state, aspect, setState }: { state: WaveStateType, aspect: Aspect, setState: CallableFunction }) => {

  const regenerate = () => {
    const points: any[] = genWaveNodes(state.nodesNumber);
    setState((p: any) => { return { ...p, points } })
  }

  const svgPath = WavesPath(aspect, state)

  useEffect(() => {
    regenerate()
  }, [state.nodesNumber])

  return (
    <SvgDisplay regenerate={regenerate} aspect={aspect} >
      {svgPath}
    </SvgDisplay>
  );
}

export default Waves;
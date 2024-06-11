import { useEffect } from "react";
import SvgDisplay from "../SvgDisplay";
import { genBlobNodes} from '../../util/utils'
import {BlobPath}from '@/app/util/variants/Blob'
import { BlobStateType } from "@/app/states/blobState";
import { Aspect } from "@/app/states/aspects";
const Blob = ({ state, aspect, setState }: { state: BlobStateType, aspect: Aspect, setState: CallableFunction }) => {

  const regenerate = () => {
    const points: any[] = genBlobNodes(state.nodesNumber);
    setState((p: any) => { return { ...p, points } })
  }

  const svgPath = BlobPath(aspect, state)

  useEffect(() => {
    regenerate()
  }, [state.nodesNumber])

  return (
    <SvgDisplay regenerate={regenerate} aspect={aspect} >
      {svgPath}
    </SvgDisplay>
  );
}

export default Blob;
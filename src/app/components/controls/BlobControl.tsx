import Slider from "../Slider"
import { BiChevronDown, BiChevronUp, BiChevronLeft, BiChevronRight } from "react-icons/bi"
import { FaCircle } from 'react-icons/fa'
import { TbBlob, TbBlobFilled } from "react-icons/tb"
import ColorInput from "../ColorInput";
import contrastLow from '@/app/assets/blobContrastLow.svg'
import contrastHigh from '@/app/assets/blobContrastHigh.svg'
import sizeLow from '@/app/assets/blobSizeLow.svg'
import sizeHigh from '@/app/assets/blobSizeHigh.svg'
import complexityLow from '@/app/assets/blobNodesLow.svg'
import complexityHigh from '@/app/assets/blobNodesHigh.svg'
import stepsLow from '@/app/assets/stepsLow.svg'
import stepsHigh from '@/app/assets/stepsHigh.svg'
import SvgIcon from "../SvgIcon";
import { BlobStateType } from "@/app/states/blobState";

const BlobControl = ({ state, setState }: { state: BlobStateType, setState: CallableFunction }) => {

  const setNodes = (n: number) => {
    setState((p: any) => {
      return {
        ...p,
        nodesNumber: n
      }
    })
  }

  const setPosition = (pos: string) => {
    setState((p: any) => {
      return {
        ...p,
        position: pos
      }
    })
  }
  const setHeight = (h: number) => {
    setState((p: any) => {
      return {
        ...p,
        height: h
      }
    })
  }
  const setContrast = (c: number) => {
    setState((p: any) => {
      return {
        ...p,
        contrast: c
      }
    })
  }
  const setPathFill = (c: boolean) => {
    setState((p: any) => {
      return {
        ...p,
        pathFill: c
      }
    })
  }

  const toggleBackground = () => {
    setState((p: any) => {
      return {
        ...p,
        rec: !p.rec
      }
    })
  }

  const setPathStrokeWidth = (s: string) => {
    if (!isNaN(Number(s)) && Number(s) <= 30 && Number(s) > 0) {
      setState((p: any) => {
        return {
          ...p,
          pathStrokeWidth: s
        }
      })
    }
  }

  const setPathColor = (c: string) => {
    setState((p: any) => {
      return {
        ...p,
        pathColor: c
      }
    })
  }

  const setRectColor = (c: string) => {
    setState((p: any) => {
      return {
        ...p,
        recColor: c
      }
    })
  }

  const setSteps = (s: number) => {
    setState((p: any) => {
      return {
        ...p,
        steps: s
      }
    })
  }

  const download = () => {
    const svg = document.getElementById('svg')
    if (svg) {
      const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' });
      let url = URL.createObjectURL(blob);
      const a = document.createElement('a')
      a.setAttribute('download', 'blob.svg')
      a.setAttribute('href', url)
      // a.setAttribute('href',url)
      console.log(a);

      a.click()
    }
  }

  return (
    <>
      <div className="w-full p-1  rounded-xl mt-2">

        <div className="h-[1px] bg-zinc-600 mt-2" />

        <div className="mt-2">
          <p className="font-medium text-zinc-300">Position</p>
          <div className="relative w-3/4 h-24 overflow-hidden mx-auto mt-2 rounded">
            <button className={`w-12 h-12 rounded-full absolute -top-4 -left-4 ${state.position === 'TL' ? 'bg-cyan-600' : 'bg-white/10 hover:bg-white/20'}`} onClick={() => setPosition('TL')} />
            <button className={`w-12 h-12 rounded-full absolute -top-4 -right-4 ${state.position === 'TR' ? 'bg-cyan-600' : 'bg-white/10 hover:bg-white/20'}`} onClick={() => setPosition('TR')} />
            <button className={`w-12 h-12 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${state.position === 'C' ? 'bg-cyan-600' : 'bg-white/10 hover:bg-white/20'}`} onClick={() => setPosition('C')} />
            <button className={`w-12 h-12 rounded-full absolute -bottom-4 -left-4 ${state.position === 'BL' ? 'bg-cyan-600' : 'bg-white/10 hover:bg-white/20'}`} onClick={() => setPosition('BL')} />
            <button className={`w-12 h-12 rounded-full absolute -bottom-4 -right-4 ${state.position === 'BR' ? 'bg-cyan-600' : 'bg-white/10 hover:bg-white/20'}`} onClick={() => setPosition('BR')} />
          </div>

        </div>

        <div className="h-[1px] bg-zinc-600 mt-4" />

        <div className="mt-2">
          <p className="font-medium text-zinc-300">Complexity</p>
          <Slider decIco={<SvgIcon icon={complexityLow} />} incIco={<SvgIcon icon={complexityHigh} />} max={15} min={3} step={1} setValue={setNodes} value={state.nodesNumber} />
        </div>

        <div className="mt-2">
          <p className="font-medium text-zinc-300">Size</p>
          <Slider decIco={<SvgIcon icon={sizeLow} />} incIco={<SvgIcon icon={sizeHigh} />} max={1.5} min={0.1} step={0.1} setValue={setHeight} value={state.height} />
        </div>

        <div className="mt-2">
          <p className="font-medium text-zinc-300">Contrast</p>
          <Slider decIco={<SvgIcon icon={contrastLow} />} incIco={<SvgIcon icon={contrastHigh} />} max={0.7} min={0} step={0.1} setValue={setContrast} value={state.contrast} />
        </div>

        <div className="mt-2">
          <p className="font-medium text-zinc-300">Steps</p>
          <Slider decIco={<SvgIcon icon={stepsLow} />} incIco={<SvgIcon icon={stepsHigh} />} max={10} min={1} step={1} setValue={setSteps} value={state.steps} />
        </div>

        {/* <input type="range" name="height" id="height" value={state.contrast} min={0} max={1} step={0.1} onChange={(e) => { setContrast(Number(e.target.value)) }} /> */}
        <div className="h-[1px] bg-zinc-600 mt-2" />

        <div className="mt-4 flex items-center gap-2">
          <p className="font-medium text-zinc-300">Background</p>
          <input type="checkbox" name="background" checked={state.rec} className="accent-cyan-500 size-4 cursor-pointer" onChange={toggleBackground} />
        </div>

        <div className="h-[1px] bg-zinc-600 mt-4" />

        <div className="mt-4 flex items-center gap-2">
          <p className="font-medium text-zinc-300">Fill</p>
          <div className="flex grow gap-2 items-center justify-evenly">
            <button className={`basis-0 px-4 py-2 flex justify-center text-xl text-zinc-300 rounded-xl ${!state.pathFill ? 'bg-cyan-600' : 'bg-white/10'}`} onClick={() => setPathFill(false)}><TbBlob /> </button>
            <button className={`basis-0 px-4 py-2 flex justify-center text-xl text-zinc-300 rounded-xl ${state.pathFill ? 'bg-cyan-600' : 'bg-white/10'}`} onClick={() => setPathFill(true)}><TbBlobFilled /></button>
          </div>
        </div>

        <div className="h-[1px] bg-zinc-600 mt-4" />

        <div className="mt-4">
          <p className="font-medium inline-block mr-2 text-zinc-300">Stroke</p>
          <input type="number" max={30} min={1} value={state.pathStrokeWidth}
            className="w-16 bg-zinc-700 text-zinc-300 py-1 px-2 rounded-lg outline-none "
            onChange={(e) => { setPathStrokeWidth(e.target.value) }} />
        </div>

        <div className="h-[1px] bg-zinc-600 mt-4" />

        <ColorInput title="Color" color={state.pathColor} setColor={setPathColor} className="mt-4" />
        <ColorInput title="Background Color" color={state.recColor} setColor={setRectColor} className="mt-2" />


        <div className="h-[1px] bg-zinc-600 mt-4" />

        <div className="my-4 flex items-center">
          <button onClick={download} className="px-4 py-1 mx-auto text-white font-semibold rounded-lg bg-cyan-700 hover:bg-cyan-600">Download SVG</button>
        </div>

      </div>
    </>
  );
}

export default BlobControl;


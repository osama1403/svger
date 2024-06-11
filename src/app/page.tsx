'use client'
import { useState } from "react";
import SideBar from "./components/SideBar";
import ControlSideBar from "./components/ControlSideBar";
import aspects from './states/aspects'
import VARIANTS from "./util/variants";
import initialWaveState from '@/app/states/waveState'
import initialBlobState from '@/app/states/blobState'
import AspectControl from "./components/AspectControl";
import { HiDotsVertical, HiMenu } from "react-icons/hi";
import WavesControl from "./components/controls/WavesControl";

import Waves from "./components/variants/Waves";
import Peaks from "./components/variants/Peaks";
import Steps from "./components/variants/Steps";
import Blob from "./components/variants/Blob";
import BlobControl from "./components/controls/BlobControl";



export default function Home() {
  const [sideOpen, setSideOpen] = useState(false)
  const [controlsOpen, setControlsOpen] = useState(false)

  const [selectedVariant, setSelectedVariant] = useState(VARIANTS.Wave.id)

  const [aspect, setState] = useState(aspects[0])
  const [waveState, setWaveState] = useState(initialWaveState)
  const [peaksState, setPeaksState] = useState({ ...initialWaveState, recColor: '#151244', pathColor: '#cb00fd' })
  const [stepsState, setStepsState] = useState({ ...initialWaveState, recColor: '#050027', pathColor: '#342cda' })
  const [blobState, setBlobState] = useState(initialBlobState)

  return (
    <>
      <main className="min-h-screen">
        <div className="w-full h6 lg:hidden bg-zinc-800 px-3 py-2 flex items-center justify-between text-white text-2xl">
          <button onClick={() => setSideOpen(p => !p)} className="p-2 text-2xl text-zinc-300 hover:bg-white/20"><HiDotsVertical /></button>
          <button onClick={() => setControlsOpen(p => !p)} className="p-2 text-2xl text-zinc-300 hover:bg-white/20"><HiMenu /></button>
        </div>

        <main className="h-[calc(100vh-56px)] lg:h-screen relative grid lg:grid-cols-[12rem,1fr,18rem] overflow-x-hidden">

          {/* SideBar */}
          <SideBar open={sideOpen} variant={selectedVariant} setVariant={setSelectedVariant} />


          {/* Variants */}
          <div className="w-full h-full overflow-x-auto p-8 md:p-20 flex justify-center items-stretch">
            {selectedVariant === VARIANTS.Wave.id && <Waves state={waveState} aspect={aspect.aspect} setState={setWaveState} />}
            {selectedVariant === VARIANTS.Peaks.id && <Peaks state={peaksState} aspect={aspect.aspect} setState={setPeaksState} />}
            {selectedVariant === VARIANTS.Steps.id && <Steps state={stepsState} aspect={aspect.aspect} setState={setStepsState} />}
            {selectedVariant === VARIANTS.Blob.id && <Blob state={blobState} aspect={aspect.aspect} setState={setBlobState} />
            }
          </div>


          {/* Controls */}
          <ControlSideBar open={controlsOpen} >
            <AspectControl aspect={aspect} setAspect={setState} />
            {selectedVariant === VARIANTS.Wave.id && <WavesControl state={waveState} setState={setWaveState} />}
            {selectedVariant === VARIANTS.Peaks.id && <WavesControl state={peaksState} setState={setPeaksState} />}
            {selectedVariant === VARIANTS.Steps.id && <WavesControl state={stepsState} setState={setStepsState} />}
            {selectedVariant === VARIANTS.Blob.id && <BlobControl state={blobState} setState={setBlobState} />}
          </ControlSideBar>

        </main>

      </main>


    </>
  );
}

import { BiInfinite } from "react-icons/bi";
import { useAnimate } from 'framer-motion'
import { ReactNode } from "react";
import { Aspect } from "../states/aspects";

const SvgDisplay = ({ children, regenerate, aspect }: { children: ReactNode, regenerate: CallableFunction, aspect: Aspect }) => {

  const [scope, animate] = useAnimate()

  function click() {
    animate(scope.current, { rotate: [0, 360] }, { duration: 0.3, bounceDamping: 10, bounceStiffness: 600, bounce: 100000 })
  }

  return (
    // <div className="w-full max-h-full relative "style={{aspectRatio:`${aspect.aspect.width}/${aspect.aspect.height}`}}>
    <div className="w-full max-w-fit h-full max-h-fit relative flex items-center justify-center  " style={{ aspectRatio: `${aspect.width}/${aspect.height}`, }}>
      <div className="relative grow svg-container" >
        <div className=" absolute inset-0 border border-transparent box-border -z-10" style={{ background: 'url(transparent.svg)', backgroundClip: 'content-box', backgroundColor: 'white', backgroundRepeat: 'repeat', backgroundSize: '1em' }} />

        <svg id="svg" xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${aspect.width} ${aspect.height}`} width={aspect.width} height={aspect.height} >
          {children}
        </svg>

        <div className="z-10 p-2 absolute w-20 h-20 bg-slate-950 rounded-full bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2">
          <button ref={scope} className="w-full h-full rounded-full flex items-center justify-center text-5xl bg-zinc-200 hover:bg-zinc-300 text-slate-950"
            onClick={() => { regenerate(); click() }}>
            <BiInfinite />
          </button>
        </div>
      </div>

    </div>
  );
}

export default SvgDisplay;
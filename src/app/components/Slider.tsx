// import { ReactElement } from "react";
import { ReactElement } from "react";
interface SliderProp {
  value: number,
  setValue: CallableFunction,
  min: number,
  max: number,
  step: number,
  incIco: ReactElement,
  decIco: ReactElement,
}
const Slider = ({ value, setValue, min, max, incIco, decIco, step }: SliderProp) => {
  const set = (n: number) => {
    if (n >= min && n <= max)
      setValue(n)
  }
  return (
    <div className="w-full py-2 flex gap-1 items-center">
      <button className="p-1 w-7 h-7 text-xl bg-zinc-700 rounded-md text-zinc-300 overflow-hidden" onClick={() => { set(value - step) }}>
        {decIco}
      </button>

      <input type="range" value={value} min={min} max={max} step={step} className="grow cursor-pointer accent-cyan-400" onChange={(e) => { setValue(Number(e.target.value)) }} />

      <button className="p-1 w-7 h-7 text-xl bg-zinc-700 rounded-md text-zinc-300 overflow-hidden" onClick={() => { set(value + step) }}>
        {incIco}
      </button>

    </div>

  );
}

export default Slider;
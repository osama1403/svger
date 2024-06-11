import { useState } from "react";
import aspects from "../states/aspects";
import { BiChevronDown } from "react-icons/bi";
import { Aspect } from "../states/aspects";

const AspectControl = ({ aspect, setAspect }: { aspect: { name: string, aspect: Aspect }, setAspect: CallableFunction }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="p-2 bg-zinc-700 rounded-xl relative ">

        <div className="p-2 rounded-lg flex justify-between items-center transition-colors duration-200 hover:bg-zinc-800 cursor-pointer text-zinc-300 " onClick={() => { setOpen(p => !p) }}>
          <div className=" ">
            <span className="text-xl">{aspect.name}</span>
            <span className="ml-2 text-sm">{aspect.aspect.width}x{aspect.aspect.height}</span>
          </div>
          <BiChevronDown className={`text-2xl ${open ? 'rotate-180' : 'rotate-0'} transition-transform duration-200`} />
        </div>

        <div className={`${open ? 'h-32' : 'h-0'} box-border transition-all duration-200 overflow-hidden`}>

          <div className={`mt-2 w-full grid grid-cols-3 gap-3 items-center`}>
            {aspects.map((el, idx) => (
              <button key={idx} className={`px-3 py-1 rounded-lg flex flex-col  items-center gap-[2px] text-white ${aspect.name === el.name ? 'bg-cyan-600' : 'bg-zinc-600 hover:bg-zinc-800'}`} onClick={() => setAspect(el)}>
                <span className="font-semibold">{el.name}</span>
                <span className="text-xs">{el.aspect.width}x{el.aspect.height}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AspectControl;
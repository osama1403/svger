import { HexColorPicker } from "react-colorful";
import { extractHexString, isHexString } from "@/app/util/utils";
import { useState } from "react";
import { title } from "process";

interface colin {
  title: string;
  color: string;
  setColor: CallableFunction;
  className?: string;
}

const ColorInput = ({ color, setColor, title, className = '' }: colin) => {
  const [open, setOpen] = useState(false)
  const [colorInputValue, setColorInputValue] = useState(color)

  const setColorValue = (c: string) => {
    let colVal = `#${extractHexString(c)}`
    setColorInputValue(colVal)
    if (isHexString(colVal)) {
      setColor(colVal)
    }
  }

  const inputBlur = () => {
    setColorInputValue(color)
  }

  return (
    <div className={`${className}`}>
      <p className="font-medium text-zinc-300">{title}</p>
      <div className="flex w-full gap-2 mt-1 items-center">
        <button className="w-8 h-8 shrink-0 block rounded-full border-4 border-zinc-700 " style={{ backgroundColor: color }} onClick={() => setOpen(p => !p)}>
        </button>
        <input type="text" value={colorInputValue}
          className="grow w-full bg-zinc-700 text-zinc-300 py-1 px-2 rounded-lg outline-none "
          onChange={(e) => { setColorValue(e.target.value) }} onBlur={() => { inputBlur() }} />
      </div>

      <div className={`mt-2 ${open ? 'h-[220px]' : 'h-0'} transition-all duration-300 overflow-hidden`}>
        <div className="pt-4 pb-1">
          <HexColorPicker color={color} className="mx-auto" onChange={setColorValue} />
        </div>
      </div>
    </div>
  )
}
export default ColorInput
import Image from "next/image";
import Logo from '@/app/assets/svgerLogoNew.svg'
import variants from "../util/variants";

const SideBar = ({ open, variant, setVariant }: { open: boolean, variant: string, setVariant: CallableFunction }) => {
  return (
    <div className={`w-48 scrollbar overflow-y-auto bg-zinc-800 absolute inset-0 lg:relative ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} transition-transform duration-300 lg:duration-0 z-20`}>
      <div className="py-5 px-2 mb-3 flex items-center justify-center gap-2 bg-zinc-700">
        <Image  alt="logo" src={Logo} width={200}/>
      </div>
      {
        Object.entries(variants).map(([, el], idx) => (
          <button key={idx} className="w-full px-3 py-1 hover:bg-white/15 group" onClick={() => setVariant(el.id)}>
            <div className={`relative flex items-center justify-center w-full h-28 box-border rounded-xl border-2 overflow-hidden  ${variant === el.id ? 'border-cyan-500' : 'border-transparent'}`}>
              <p className={`text-xl text-shadow text-white font-semibold relative z-10`} >{el.id.toLowerCase()}</p>
              <Image className="absolute inset-0 origin-center object-cover group-hover:scale-110 transition-all duration-200 " alt="variant pic" src={el.bg} />
            </div>
          </button>
        ))
      }
      <p className="text-center bg-zinc-700 text-zinc-300 text-sm font-semibold mt-4">by: Osama AboAjeeb</p>
    </div>
  );
}

export default SideBar;
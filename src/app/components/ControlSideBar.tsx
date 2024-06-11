import { ReactNode } from "react";

const ControlSideBar = ({ open, children }: { open: boolean, children: ReactNode }) => {
  return (
    <div className={`w-72 scrollbar h-full overflow-y-scroll z-20 bg-zinc-800 absolute inset-y-0 right-0 p-2 lg:relative ${open ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'} transition-transform duration-300 lg:duration-0`}>
      {children}
    </div>
  );
}

export default ControlSideBar;
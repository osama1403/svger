import { StaticImport } from "next/dist/shared/lib/get-img-props"
import Image from "next/image"

const SvgIcon = ({icon}:{icon:StaticImport}) => {
  return ( 
    <Image alt="icon" src={icon} />
   );
}
 
export default SvgIcon;
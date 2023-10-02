import Logo from "./assets/MangoLavandaLogo.png";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col align-center items-center">
      <h1 className="font-bold text-center text-2xl m-7">Welcom To Mango Lavanda</h1>
      <Image className="flex items-center" src={Logo} width={300} height={300} alt="Logo"></Image>
    </main>
  )
}

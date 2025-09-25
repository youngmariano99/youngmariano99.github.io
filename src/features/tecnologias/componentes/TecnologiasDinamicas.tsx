import { useEffect, useState } from "react";
import { Tecnologias } from "../models/tecnologias.models.ts";

export default function TecnologiasDinamicas() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % Tecnologias.length);
    }, 3000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <span className="block mb-2 text-lg font-semibold">
        {Tecnologias[index].nombre}
      </span>
      <div className="flex gap-4">
        {Tecnologias[index].logos.map((logo, i) => (
          <img key={i} src={logo} className="w-16 h-16 inline-block" />
        ))}
      </div>
    </div>
  );
}
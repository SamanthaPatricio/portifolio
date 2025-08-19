// src/components/Book3D.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Book3D({ capa, titulo, link }) {
  const [open, setOpen] = useState(false);

  const openCover = { rotateY: -160 };
  const closeCover = { rotateY: 0 };

  const openFirstPage = { rotateY: -18, x: 2 };
  const closeFirstPage = { rotateY: -180, x: 0 };

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      title="Ver na Amazon"
      className="group relative w-[220px] sm:w-[240px] h-[300px] sm:h-[320px] perspective-1000"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((s) => !s)} // mobile
    >
      {/* miolo */}
      <div className="absolute inset-0 rounded-xl bg-white dark:bg-neutral-900 shadow-soft">
        <div className="absolute top-3 bottom-3 right-2 w-[6px] rounded bg-gradient-to-b from-gray-200 to-gray-300 dark:from-neutral-700 dark:to-neutral-600" />
        <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/10 to-transparent rounded-l-xl" />
      </div>

      {/* 1ª página (atrás da capa) */}
      <motion.div
        className="absolute inset-0 origin-left rounded-xl bg-white dark:bg-neutral-900 shadow"
        style={{ backfaceVisibility: "hidden" }}
        initial={closeFirstPage}
        animate={open ? openFirstPage : closeFirstPage}
        transition={{ type: "spring", stiffness: 140, damping: 16 }}
      >
        <div className="w-full h-full rounded-xl grid place-items-center p-4">
          <span className="text-xs opacity-70 text-center px-2">{titulo}</span>
        </div>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
      </motion.div>

      {/* Capa abrindo */}
      <motion.div
        className="absolute inset-0 origin-left rounded-xl bg-white dark:bg-neutral-900 shadow-xl"
        style={{ backfaceVisibility: "hidden" }}
        initial={closeCover}
        animate={open ? openCover : closeCover}
        transition={{ type: "spring", stiffness: 140, damping: 16 }}
      >
        <div className="w-full h-full rounded-xl grid place-items-center p-3">
          <img src={capa} alt={titulo} className="max-h-[82%] object-contain" />
          <p className="mt-2 text-[11px] text-center opacity-85 px-2">{titulo}</p>
        </div>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-black/15 to-transparent pointer-events-none" />
      </motion.div>

      {/* “página” direita (dica) */}
      <div className="absolute left-[230px] sm:left-[248px] top-0 w-[200px] sm:w-[220px] h-full rounded-xl shadow-soft bg-white/90 dark:bg-neutral-800 grid place-items-center">
        <span className="text-gray-500 dark:text-gray-300 text-xs">Passe o mouse para abrir →</span>
      </div>
    </a>
  );
}

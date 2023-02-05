import { appWindow } from "@tauri-apps/api/window";

import { useRef, useEffect } from "react"

export default function CustomTitleBar() {
  const minimizeButtonRef = useRef(null);
  const maximizeButtonRef = useRef(null);
  const closeButtonRef = useRef(null);

  const minimizeButtonListener = () => appWindow.minimize();
  const maximizeButtonListener = async () => {
    if (!(await appWindow.isMaximized())) {
      appWindow.maximize();
    }
    else {
      appWindow.unmaximize()
    }
  }
  const closeButtonListener = () => appWindow.close();

  useEffect(() => {
    if (minimizeButtonRef && minimizeButtonRef.current) {
      minimizeButtonRef.current.addEventListener('click', minimizeButtonListener);

      return () => minimizeButtonRef.current.removeEventListener('click', minimizeButtonListener);
    }
  }, [minimizeButtonRef]);

  useEffect(() => {
    if (maximizeButtonRef && maximizeButtonRef.current) {
      maximizeButtonRef.current.addEventListener('click', maximizeButtonListener);

      return () => maximizeButtonRef.current.removeEventListener('click', maximizeButtonListener);
    }
  }, [maximizeButtonRef]);

  useEffect(() => {
    if (closeButtonRef && closeButtonRef.current) {
      closeButtonRef.current.addEventListener('click', closeButtonListener);

      return () => closeButtonRef.current.removeEventListener('click', closeButtonListener);
    }
  }, [closeButtonRef])

  return (
    <div
      data-tauri-drag-region
      className="h-10 bg-lime-500 select-none flex justify-end sticky top-0 left-0 right-0 rounded-t-xl"
    >
      <div
        className="inline-flex justify-center items-center w-12 h-10 hover:bg-lime-400"
        id="titlebar-minimize"
        ref={minimizeButtonRef}
      >
        <img
          src="https://api.iconify.design/mdi:window-minimize.svg"
          alt="minimize"
        />
      </div>
      <div
        className="inline-flex justify-center items-center w-12 h-10 hover:bg-lime-400"
        id="titlebar-maximize"
        ref={maximizeButtonRef}
      >
        <img
          src="https://api.iconify.design/mdi:window-maximize.svg"
          alt="maximize"
        />
      </div>
      <div
        className="inline-flex justify-center items-center w-12 h-10  hover:bg-red-500 hover:rounded-tr-xl"
        id="titlebar-close"
        ref={closeButtonRef}
      >
        <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
      </div>
    </div>
  )
}
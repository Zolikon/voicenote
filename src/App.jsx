import { useRef } from "react";
import VoiceNote from "./VoiceNote";

function App() {
  const dialogRef = useRef(null);

  const openDialog = () => {
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
  };

  return (
    <>
      <div className="flex flex-col h-full w-full">
        <header className="h-[10%] flex items-center justify-center gap-5 bg-gradient-to-br from-[#6789f0] to-[#0e215c]">
          <img src="/logo.png" className="object-contain h-[70%] hidden sm:inline rounded-lg" draggable={false} />
          <div className="text-center font-bold text-3xl text-stone-300 select-none">VoiceNote</div>
        </header>
        <main className="flex flex-col flex-grow p-12 bg-stone-200">
          <VoiceNote />
        </main>

        <footer className="h-[20px] xl:h-[40px] text-gray-200 bg-gradient-to-br from-[#6789f0] to-[#0e215c] flex justify-end gap-4 px-2 items-center">
          <button onClick={openDialog}>About</button>
          <p className="">VoiceNote | 2024</p>
        </footer>
      </div>
      <dialog ref={dialogRef}>
        <div className="w-[80vw] h-[80vh] p-4 flex flex-col items-center justify-between">
          <p className="font-bold text-2xl">VoiceNote</p>
          <div>
            <p>Take notes by talking</p>
            <p>Copy content to clipboard</p>
          </div>
          <button onClick={closeDialog} className="bg-green-600 py-2 px-4 rounded-md text-stone-200">
            Close
          </button>
        </div>
      </dialog>
    </>
  );
}

export default App;

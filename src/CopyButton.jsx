import PropTypes from "prop-types";
import { useState } from "react";

function CopyButton({ textToCopy }) {
  const [icon, setIcon] = useState("content_copy");

  function copyTextToClipboard() {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIcon("done");
      setTimeout(() => setIcon("content_copy"), 1000);
    });
  }

  return (
    <button
      className="group bg-green-500 p-2 rounded-full aspect-square w-8 h-8 md:w-16 md:h-16 bottom-2 right-2 absolute flex items-center justify-center hover:bg-green-600 transition-all duration-100"
      onClick={copyTextToClipboard}
    >
      <span className="material-symbols-outlined text-sm md:text-4xl group-hover:scale-110 transition-all duration-100 ">
        {icon}
      </span>
    </button>
  );
}

CopyButton.propTypes = {
  textToCopy: PropTypes.string.isRequired,
};

export default CopyButton;

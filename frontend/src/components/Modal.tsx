import React from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  if (!open) return null; 
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/40"
      onClick={onClose}
    >
      {/* Conteneur du contenu */}
      <div
        className="relative bg-white rounded-lg shadow-lg p-6 max-w-md w-full transform transition-all scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Bouton fermer */}
        <button
          className="absolute top-2 right-2 px-2 border border-neutral-200 rounded-md text-gray-600 
          bg-white hover:bg-gray-50 cursor-pointer"
          onClick={onClose}
        >
          x
        </button>

        {/* Contenu injecté */}
        {children}
      </div>
    </div>
  );
};

export default Modal;

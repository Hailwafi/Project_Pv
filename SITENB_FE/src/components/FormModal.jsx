// FormModal.js
import React from 'react';

const FormModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <>
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 ">
      <div className="bg-white p-6 rounded shadow-lg grid grid-cols-2 gap-5">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        {children}
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
        >
          Tutup
        </button>
      </div>
    </div>
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 ">
      <div className="bg-white p-6 rounded shadow-lg grid grid-cols-2 gap-5">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        {children}
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
        >
          Tutup
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-customGreen text-white px-4 py-2 rounded mt-4"
        >
          Save
        </button>
      </div>
    </div>
    
    </>
  );
};

export default FormModal;

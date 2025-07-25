import React, { useState, useRef } from "react";

const ImageUploader = ({ onChange }) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && ["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onChange && onChange(file);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Formato no soportado. Solo JPG, JPEG o PNG.");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex items-center gap-6">
      <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
        {preview ? (
          <img src={preview} alt="Preview" className="object-cover w-full h-full" />
        ) : (
          <span className="text-gray-500 text-xl">Perfil</span>
        )}
      </div>
      <div>
        <button
          type="button"
          onClick={triggerFileInput}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 dark:bg-blue-500 dark:hover:bg-blue-600 dark:border-none"
        >
          Cambiar Foto
        </button>
        <p className="text-sm text-gray-500 mt-1">JPG, JPEG o PNG. Máximo 2MB.</p>
        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default ImageUploader;

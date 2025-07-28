import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
// import { uploadImage } from '../../api/upload'; // Deshabilitado temporalmente
import Button from './Button';

const ImageUpload = ({
  onImagesChange,
  images,
  multiple = true,
  maxFiles = 10
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);

  const handleFileSelect = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => file.type.startsWith('image/'));

    if (validFiles.length === 0) {
      alert('Por favor selecciona solo archivos de imagen');
      return;
    }

    if (images.length + validFiles.length > maxFiles) {
      alert(`Puedes subir máximo ${maxFiles} imágenes`);
      return;
    }

    setIsUploading(true);
    const newImages = [...images];

    try {
      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];
        const fileId = `${Date.now()}-${i}`;
        setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
        // Simulate upload progress
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => {
            const current = prev[fileId] || 0;
            if (current >= 90) {
              clearInterval(progressInterval);
              return prev;
            }
            return { ...prev, [fileId]: current + 10 };
          });
        }, 100);
        try {
          // const imageUrl = await uploadImage(file); // Deshabilitado
          // Simulación de subida: usar un placeholder
          await new Promise((res) => setTimeout(res, 800));
          const imageUrl = URL.createObjectURL(file); // Solo para preview local
          clearInterval(progressInterval);
          setUploadProgress(prev => ({ ...prev, [fileId]: 100 }));
          // Add new image to the list
          const newImage = {
            url: imageUrl,
            descripcion: file.name,
            principal: newImages.length === 0 // First image is principal by default
          };
          newImages.push(newImage);
          onImagesChange(newImages);
          // Remove progress after a short delay
          setTimeout(() => {
            setUploadProgress(prev => {
              const newProgress = { ...prev };
              delete newProgress[fileId];
              return newProgress;
            });
          }, 1000);
        } catch {
          // Handle upload error silently
          clearInterval(progressInterval);
          setUploadProgress(prev => {
            const newProgress = { ...prev };
            delete newProgress[fileId];
            return newProgress;
          });
        }
      }
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    // If we removed the principal image and there are other images, make the first one principal
    if (images[index].principal && newImages.length > 0) {
      newImages[0].principal = true;
    }
    onImagesChange(newImages);
  };

  const setPrincipalImage = (index) => {
    const newImages = images.map((img, i) => ({
      ...img,
      principal: i === index
    }));
    onImagesChange(newImages);
  };

  const updateImageDescription = (index, descripcion) => {
    const newImages = [...images];
    newImages[index].descripcion = descripcion;
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading || images.length >= maxFiles}
          icon={Upload}
          className="w-full"
        >
          {isUploading ? 'Subiendo...' : `Seleccionar ${multiple ? 'imágenes' : 'imagen'}`}
        </Button>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {multiple ? `Máximo ${maxFiles} imágenes` : 'Una imagen por vez'}
        </p>
      </div>

      {/* Upload Progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="space-y-2">
          {Object.entries(uploadProgress).map(([fileId, progress]) => (
            <div key={fileId} className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <div className="flex justify-between text-sm text-blue-600 dark:text-blue-400 mb-1">
                <span>Subiendo imagen...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Preview */}
      {images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
              {/* Image */}
              <div className="aspect-square bg-gray-100 dark:bg-gray-800 relative">
                {image.url ? (
                  <img
                    src={image.url}
                    alt={image.descripcion}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                {/* Principal Badge */}
                {image.principal && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    Principal
                  </div>
                )}
                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {/* Image Info */}
              <div className="p-3 space-y-2">
                <input
                  type="text"
                  value={image.descripcion}
                  onChange={(e) => updateImageDescription(index, e.target.value)}
                  placeholder="Descripción de la imagen"
                  className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={image.principal ? "primary" : "outline"}
                    size="sm"
                    onClick={() => setPrincipalImage(index)}
                    className="flex-1"
                  >
                    {image.principal ? 'Principal' : 'Hacer Principal'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload; 
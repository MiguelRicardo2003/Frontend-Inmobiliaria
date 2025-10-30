import React, { useState } from 'react';
import { MapPin, Bed, Bath, SquaresSubtract, Tag, Phone, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import Modal from '../../../../components/ui/Modal';
import Button from '../../../../components/ui/Button';

const PropertyModal = ({ open, onClose, property }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!open || !property) return null;

    const {
        titulo,
        descripcion,
        imagen,
        ubicacion,
        precio,
        habitaciones,
        banos,
        area,
        tipo,
        estado,
        ciudad,
        imagenes,
        amenidades,
        asesor,
    } = property;

    // Construir array de imágenes disponibles
    const availableImages = [];
    if (imagenes && Array.isArray(imagenes) && imagenes.length > 0) {
        availableImages.push(...imagenes.map(img => img.url_imagen));
    } else if (imagen) {
        availableImages.push(imagen);
    } else {
        availableImages.push('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80');
    }

    const mainImage = availableImages[currentImageIndex];
    const address = ubicacion || ciudad || 'Ubicación no disponible';

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % availableImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + availableImages.length) % availableImages.length);
    };

    return (
        <Modal isOpen={open} onClose={onClose} title={titulo || 'Detalle de Propiedad'} size="xl">
            <div className="space-y-6">
                {/* Slider de imágenes */}
                <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden relative">
                    <img
                        src={mainImage}
                        alt={`${titulo} - Imagen ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80')}
                    />
                    
                    {/* Botones de navegación solo si hay más de 1 imagen */}
                    {availableImages.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all"
                            >
                                <ChevronRight size={24} />
                            </button>
                            
                            {/* Indicador de imagen actual */}
                            <div className="absolute bottom-2 right-2 bg-gray-800 bg-opacity-75 text-white px-3 py-1 rounded-full text-sm">
                                {currentImageIndex + 1} / {availableImages.length}
                            </div>
                        </>
                    )}
                </div>

                {/* Miniaturas */}
                {availableImages.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {availableImages.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                    index === currentImageIndex 
                                        ? 'border-blue-500 scale-105' 
                                        : 'border-gray-300 opacity-60 hover:opacity-100'
                                }`}
                            >
                                <img
                                    src={img}
                                    alt={`Miniatura ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}

                {/* Detalles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-gray-800 mb-4">
                            {descripcion || 'Descripción no disponible por el momento.'}
                        </p>

                        <div className="grid grid-cols-3 gap-4 mt-6 text-gray-800">
                            <div className="text-center">
                                <Bed className="mx-auto mb-1" />
                                <p className="text-sm">Habitaciones</p>
                                <p className="font-bold">{habitaciones ?? 'N/A'}</p>
                            </div>
                            <div className="text-center">
                                <Bath className="mx-auto mb-1" />
                                <p className="text-sm">Baños</p>
                                <p className="font-bold">{banos ?? 'N/A'}</p>
                            </div>
                            <div className="text-center">
                                <SquaresSubtract className="mx-auto mb-1" />
                                <p className="text-sm">Área</p>
                                <p className="font-bold">{area ?? 'N/A'} m²</p>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center text-gray-600">
                            <MapPin className="w-5 h-5 mr-2" />
                            <span>{address}</span>
                        </div>

                        {(tipo || estado) && (
                            <div className="mt-4 flex gap-2">
                                {tipo && (
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                        {tipo}
                                    </span>
                                )}
                                {estado && (
                                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                        {estado}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mapa */}
                    <div className="w-full h-64 rounded-lg overflow-hidden">
                        <iframe
                            title="Ubicación"
                            src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
                            width="100%"
                            height="100%"
                            loading="lazy"
                            className="border-0"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>

                {Array.isArray(amenidades) && amenidades.length > 0 && (
                    <div>
                        <h4 className="font-semibold mb-2">Amenidades:</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {amenidades.map((item, i) => (
                                <div key={i} className="flex items-center text-sm text-gray-700sssssssssssssssssssssssssssssssssssssssss">
                                    <Tag className="w-4 h-4 mr-2 text-green-500" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {asesor ? (
                    <div className="bg-gray-100 p-4 rounded-lg space-y-2">
                        <h4 className="font-semibold text-gray-800">Asesor Asignado</h4>
                        <p><strong>Nombre:</strong> {asesor.nombre}</p>
                        <p><strong>Email:</strong> {asesor.email}</p>
                        <p><strong>Teléfono:</strong> {asesor.telefono}</p>

                        {asesor.telefono && (
                            <a
                                href={`https://wa.me/${asesor.telefono}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block mt-2 bg-green-500 hover:bg-green-600 text-white text-center py-2 rounded-md"
                            >
                                Contactar por WhatsApp
                            </a>
                        )}
                    </div>
                ) : (
                    <div className="text-sm text-gray-500">Contacto aún no disponible.</div>
                )}

                {/* Acciones */}
                <div className="flex flex-wrap gap-2 justify-between">
                    <div className="flex gap-2">
                        <Button variant="primary" icon={Phone}>Contactanos</Button>
                        <Button variant="outline" icon={Mail}>Enviar Mensaje</Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default PropertyModal;

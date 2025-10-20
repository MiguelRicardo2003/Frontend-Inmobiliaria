import React from 'react';
import { MapPin, Bed, Bath, SquaresSubtract, Tag, Phone, Mail } from 'lucide-react';
import Modal from '../../../../components/ui/Modal';
import Button from '../../../../components/ui/Button';

const PropertyModal = ({ open, onClose, property }) => {
    if (!open || !property) return null;

    const {
        titulo,
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

    const mainImage = imagen || (imagenes?.[0]?.url ?? '/placeholder-property.jpg');
    const address = ubicacion || ciudad || 'Ubicación no disponible';

    return (
        <Modal isOpen={open} onClose={onClose} title={titulo || 'Detalle de Propiedad'} size="xl">
            <div className="space-y-6">
                <div className="w-full h-64 rounded-lg overflow-hidden">
                    <img
                        src={mainImage}
                        alt={titulo}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.currentTarget.src = '/placeholder-property.jpg')}
                    />
                </div>

                {/* Detalles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-gray-800">
                            Descripción no disponible por el momento.
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

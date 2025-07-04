
const WhatsAppButton = () => {

  const numero = "573189267246";
  const enlace = `https://api.whatsapp.com/send?phone=${numero}`;

  return (
    <a
      href={enlace}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 transition-all duration-300"
      title="Habla con nosotros por WhatsApp"
    >
      <img
        src="/img/whatsapp.png"
        alt="Chat por WhatsApp"
        className="w-14 h-14"
      />
    </a>
  );
};

export default WhatsAppButton;

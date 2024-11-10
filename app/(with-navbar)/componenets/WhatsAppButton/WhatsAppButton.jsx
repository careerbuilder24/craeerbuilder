import React from 'react';

const WhatsAppButton = () => {
  const phoneNumber = '01865995917'; 
  const message = 'Hello, I would like to get in touch!'; 
  const encodedMessage = encodeURIComponent(message);
  
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
      <button style={{ padding: '10px 20px', backgroundColor: '#25D366', color: 'white',border: 'none',  borderRadius: '5px', cursor: 'pointer',fontSize: '16px'}}>
        Contact via WhatsApp
      </button>
    </a>
  );
};



export default WhatsAppButton;

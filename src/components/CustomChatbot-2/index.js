import React, { useEffect } from 'react';

const CustomChatbot = () => {
  useEffect(() => {
    // Load the chatbot script
    const script1 = document.createElement('script');
    script1.src = 'https://cdn.botpress.cloud/webchat/v2.2/inject.js';
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://files.bpcontent.cloud/2024/12/06/00/20241206003543-HIGUFN4X.js';
    script2.async = true;
    document.body.appendChild(script2);
  }, []);

  return (
    <>
    </>
  );
};

export default CustomChatbot;

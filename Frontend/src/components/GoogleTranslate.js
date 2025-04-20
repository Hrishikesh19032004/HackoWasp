import React, { useEffect, useState } from "react";

function GoogleTranslate() {
    const [isInitialized, setIsInitialized] = useState(false);
  
    useEffect(() => {
      if (!isInitialized) {
        const addScript = document.createElement('script');
        addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
        document.body.appendChild(addScript);
  
        window.googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,hi,ta,te,ml,bn,mr,gu,pa,kn',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
          }, 'google_translate_element');
        };
  
        setIsInitialized(true); // Set flag to true after initialization
      }
    }, [isInitialized]);
  
    return (
      <div id="google_translate_element" className="translate-dropdown"></div>
    );
  }
  
  export default GoogleTranslate;
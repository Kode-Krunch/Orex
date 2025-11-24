import { Button } from 'components/ui';
import React, { useEffect, useState } from 'react';
import './style.css';
import { IoChevronDownSharp } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';

/* CONSTANTS */
const INCLUDED_LANGUAGES = 'en,es,fr,de,hi,mr,ta,zh-CN,ja,ar,sw';
const PAGE_LANGUAGE = 'en';

function LanguageSelectorDropdown() {
  /* STATES */
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  /* USE EFFECTS */
  useEffect(() => {
    loadGoogleTranslateWidget();
    observeGoogleTranslate();
  }, []);

  /* HELPER FUNCTIONS */
  const loadGoogleTranslateWidget = () => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src =
        '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.onload = () => {
        if (window.google) {
          window.googleTranslateElementInit();
        }
      };
      document.body.appendChild(script);
    } else {
      window.googleTranslateElementInit();
    }
  };

  const resetSelectedLanguage = () => {
    var iframe =
      document.getElementsByClassName('goog-te-banner-frame')[0] ||
      document.getElementById(':1.container');
    if (!iframe) {
      setSelectedLanguage(null);
      return;
    }
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    var restore_el = innerDoc.getElementsByTagName('button');
    for (var i = 0; i < restore_el.length; i++) {
      if (restore_el[i].id.indexOf('restore') >= 0) {
        restore_el[i].click();
        setSelectedLanguage(null);
        return;
      }
    }
  };

  const observeGoogleTranslate = () => {
    const observer = new MutationObserver(() => {
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        select.addEventListener('change', (event) => {
          const selectedLanguage = event.target.value;
          setSelectedLanguage(selectedLanguage);
        });
        observer.disconnect(); // Stop observing after attaching the event
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  };

  window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: PAGE_LANGUAGE,
        autoDisplay: false,
        includedLanguages: INCLUDED_LANGUAGES,
      },
      'google_translate_element',
    );
  };

  return (
    <>
      <div id="google_translate_element">
        <div
          className={`absolute top-0 right-0 h-full pl-[5px] rounded-r-full flex justify-center items-center ${selectedLanguage ? 'pr-[3px]' : 'px-[10px]'
            }`}
        // style={{ backgroundColor: '#2f3a49' }}
        >
          {selectedLanguage ? (
            <Button
              shape="circle"
              variant="plain"
              size="xs"
              icon={<IoMdClose />}
              onClick={resetSelectedLanguage}
            />
          ) : (
            <IoChevronDownSharp className="text-base text-white" />
          )}
        </div>
      </div>
    </>
  );
}

export default LanguageSelectorDropdown;

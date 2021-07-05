import React, {useState, Suspense} from 'react';
import './App.css'
import {initReactI18next, useTranslation, Trans} from 'react-i18next'
import i18n from 'i18next';

const translationEn = {
  welcome: 'Welcome!!!',
  sample: "Sample <bold><italics>text</italics></bold>. ",
  changed: 'You have changed the language {{count}} time',
  changed_plural: 'You have changed the language {{count}} times'
}
const translationFr = {
  welcome: 'Bienvenue!!!',
  sample: "Example de <bold><italics>texte</italics></bold>. ",
  changed: 'Vous avez changé la langue {{count}} fois'
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {translation: translationEn},
      fr: {translation: translationFr},
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {escapeValue: false},
  })

function App() {
  const {t} = useTranslation();
  const [count, setCount] = useState(0);

  const onChange = (e: any) => {
    i18n.changeLanguage(e.target.value)
    setCount((prev: number) => prev + 1)
  }
  return (
    <Suspense fallback='Loading...'>
    <div className="App">
      <header className="App-header">
        <h1>{t('welcome')}!</h1>
        <p>
          <Trans components={{ bold: <strong />, italics: <i />}}>
            sample 
          </Trans>
          {/* <strong><i> text </i></strong> */}
        </p>
      
      <p>{t('changed', {count})}</p>
      <select name="language" onChange={onChange}>
        <option value="en">English</option>
        <option value="fr">French</option>
      </select>
      </header>
    </div>
    </Suspense>
  );
}

export default App;

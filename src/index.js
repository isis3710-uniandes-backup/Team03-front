import React from "react";
import { render } from 'react-dom';
import 'materialize-css/dist/css/materialize.min.css';
import App from './App'
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import localeData from './data.json';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PortfolioFromURL from './PortfolioFromURL'

addLocaleData([...en, ...es]);

const language = (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage;

// Split locales with a region code
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

// Try full locale, try locale without region code, fallback to 'en'
const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.en;


render(
    <IntlProvider locale={language} messages={messages}>
        <BrowserRouter>
            <Switch>
                <Route path="/:portfolio" component={PortfolioFromURL}/>
                <Route path="/" component ={()=>  <App messages={messages} />} exact/>    
            </Switch>
        </BrowserRouter>
    </IntlProvider>,
    document.getElementById("app")
);
import React from "react";
import ReactDOM from "react-dom/client";

// Redux
import { Provider } from 'react-redux'
import { store } from "./store";

// Router
import { BrowserRouter } from "react-router-dom";

// Internationalization
import './i18n';

import { JournalApp } from "./JournalApp";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={ store }>
      <BrowserRouter>
        <JournalApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

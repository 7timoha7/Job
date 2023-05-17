import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {PersistGate} from "redux-persist/integration/react";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {GOOGLE_CLIENT_ID} from "./constans";
import {persistor, store} from "./app/store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {ThemeProvider} from "@mui/material";
import theme from "./theme";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <Provider store={store}>
                        <ThemeProvider theme={theme}>
                            <App/>
                        </ThemeProvider>
                    </Provider>
                </BrowserRouter>
            </PersistGate>
        </GoogleOAuthProvider>
    </>
);

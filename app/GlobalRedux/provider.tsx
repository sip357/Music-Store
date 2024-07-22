'use client';
//client side provider file

import { Provider } from "react-redux";
import { store } from "../GlobalRedux/store";

export function Providers({ children }) {
    return(
        <Provider store = {store}>
            {children}
        </Provider>
    )
}
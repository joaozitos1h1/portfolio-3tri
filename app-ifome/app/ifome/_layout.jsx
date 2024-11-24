import React from "react";
import { AppProvider } from "../../scripts/appContext";
import { Slot } from "expo-router";

const Layout = () => {
    return (
        <AppProvider>
            <Slot />
        </AppProvider>
    );
}

export default Layout;

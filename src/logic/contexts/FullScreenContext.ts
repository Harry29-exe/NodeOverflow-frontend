import React from "react";

export const FullScreenContext = React.createContext({
    onFullscreen: false,
    toggleFullscreen: (b: boolean) => {
    }
});
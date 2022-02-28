import React from "react";
interface AppState {
}
const defaultState = {
}
const AppContext = React.createContext<AppState>(defaultState);
export default AppContext;
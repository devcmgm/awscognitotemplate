import React, {useState} from 'react';
import './App.css';
import Header from './components/molecules/Header';
import {UserCtx, UserContextInterface} from "./utils/UserContext";
import Routes from "./utils/Routes"

function App(this: any) {

    const [authState] = useState<UserContextInterface>({
        isAuthenticated: false,
        currentRole: "unknown"
    });

    const currentAppContext: UserContextInterface = {
        isAuthenticated: authState.isAuthenticated,
        currentRole: authState.currentRole
    };

    return (<div className="App">
            <UserCtx.Provider value={currentAppContext}>
                <Header />
                <Routes />
            </UserCtx.Provider>
        </div>
    );
}

export default App;

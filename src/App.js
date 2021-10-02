import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

// Import React Components
import Application from "./views/Application";
import Launcher from "./views/Launcher";

// App: function which links Components to webpage endpoints
function App() {
    // returns Application and Launcher React Components as web pages;
    return (
        <BrowserRouter>
            <Route path="/" component={Application} />
            <Route path="/launch" component={Launcher} exact />
        </BrowserRouter>
    );
}

// Export App() function
export default App;
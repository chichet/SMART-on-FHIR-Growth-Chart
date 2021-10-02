import React from "react";
import { oauth2 as SMART } from "fhirclient";

// Source: https://codesandbox.io/s/fhir-client-react-react-router-context-0q3n8?file=/src/components/Launcher.js:0-1625

// Authenticate using React Component
export default class Launcher extends React.Component {
    // Component Mount 
    componentDidMount() {

        // SMART Authentication
        SMART.authorize({
            // clientId: Obtained from SMART-on-FHIR authenticator after registration (e.g. Cerner)
            clientId: "",
            scope: "launch profile fhirUser openid online_access user/Patient.read user/Observation.read",
            // redirectUri: Endpoint for your application frontend
            redirectUri: "http://0.0.0.0:8111/",
            completeInTarget: true,
            // Define iss for TESTING
            // iss: "http://hapi.fhir.org/baseR4",
            // Local server
            iss: "http://0.0.0.0:8004/hapi-fhir-jpaserver/fhir/"
        });
    }

    // Render prior to redirect
    render() {
        return "Launching...";
    }
}
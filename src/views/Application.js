import React from "react";
// FHIR Context Provider
import FhirClientProvider from "../Context/FhirClientProvider";
// Pages
import Home from "./pages/Home";

export default function Application() {

    return (
			<FhirClientProvider>
				<Home/>
			</FhirClientProvider>
    );
}
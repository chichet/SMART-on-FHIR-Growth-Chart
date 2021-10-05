// Felipe Giuste
// 2021-10-01 

import React from "react";
import Button from "@material-ui/core/Button";

// Import FhirClientContext (should contain client object after SMART verification)
import { FhirClientContext } from "../../Context/FhirClientContext";

// Import SMART Query helper function
import {SMARTRequest} from "../../utils/SMARTRequest.js";

// Fronend: Component to render button testing SMART client
export default class Frontend extends React.Component {
    // FHIR Client Context
    static contextType = FhirClientContext;
    constructor(props) {
        super(props);
		// State
        this.state = {
        	state_variable_1: "Hello World"
        }
    }

	// TEST: Log SMART client on mount
    componentDidMount() {
        // Log context
        console.log("Frontend Component Mounted");
        console.log(this.context);
    }

	render() {
		// TEST string 
		// const test_string = "Frontend String"


        const buttons = (
            <React.Fragment>

            <div>
                {/* Button logs SMART URL to console */}
                <Button
                    id="button-submit"
                    variant="contained"
                    onClick={() => {
                        const client = this.context.client;
                        // Log Client
                        console.log(client); 
                    }}
                >
                    Client
                </Button>

                {/* Button logs SMART URL to console */}
                <Button
                    id="button-submit"
                    variant="contained"
                    onClick={() => {
                        const client = this.context.client;
                        // Log url
                        console.log(client.state.serverUrl);
                            
                    }}
                >
                    Client:server_Url
                </Button>

                {/* Button logs patient user to console */}
                <Button
                    id="button-submit"
                    variant="contained"
                    onClick={() => {
                        const client = this.context.client;
                        this._loader = client.patient
                            .read()
                            .then((patient) => {
                                // Log Patient
                                console.log(patient);
                            })
                            .catch((error) => {
                                // Log
                                console.log(error);
                            });
                    }}
                >
                    Client:Patient
                </Button>

                {/* Button logs patient user to console */}
                <Button
                    id="button-submit"
                    variant="contained"
                    onClick={() => {
                        const client = this.context.client;
                        this._loader = client.user
                            .read()
                            .then((user) => {
                                // Log user
                                console.log(user);
                            })
                            .catch((error) => {
                                // Log
                                console.log(error);
                            });
                    }}
                >
                    Client:User
                </Button>
            </div>
                
            <div>
                {/* Button GET Request using SMART client */}
                <Button
                    id="button-submit"
                    variant="contained"
                    onClick={() => {
                        const client = this.context.client;
                        // Query Parameters: Patient named Jon
                        const QueryParameters = 'Patient?name=jon'

                        // Query Patient
                        SMARTRequest(QueryParameters, client)
                    }}
                >
                    Patient Query
                </Button>
            </div>

            </React.Fragment>
        )

		return(
            <div>
    			{buttons}
            </div>
		)

	}
}
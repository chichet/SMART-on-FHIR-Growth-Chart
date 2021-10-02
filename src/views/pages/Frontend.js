// Felipe Giuste
// 2021-10-01 

import React from "react";
import Button from "@material-ui/core/Button";

// Import FhirClientContext (should contain client object after SMART verification)
import { FhirClientContext } from "../../Context/FhirClientContext";

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

        // const client = this.context.client;
        // Log client
        // console.log(client);
    }

	render() {
		// TEST string 
		// const test_string = "Frontend String"


        const buttons = (
            <React.Fragment>
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

                {/* Button logs SMART URL to console */}
                <Button
                    id="button-submit"
                    variant="contained"
                    onClick={() => {
                        const client = this.context.client;
                        // Log url
                        console.log(client.environment._url);
                            
                    }}
                >
                    Client:url
                </Button>

            </React.Fragment>
        )

		return(
            <div>
    			{buttons}
            </div>
		)

	}
}
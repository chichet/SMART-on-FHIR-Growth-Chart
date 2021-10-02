// Source: https://codesandbox.io/s/fhir-client-react-react-router-context-0q3n8?file=/src/components/FhirClientProvider.js
import React from "react";
import { oauth2 as SMART } from "fhirclient";
import { FhirClientContext } from "./FhirClientContext";

// Creates the client object within FhirClientContext
class FhirClientProvider extends React.Component {
    componentDidMount() {
        SMART.ready().then(
            (client) => this.setState({ client }),
            (error) => this.setState({ error })
        );
    }

    render() {
        return (
            <FhirClientContext.Provider value={this.state || {}}>
                <FhirClientContext.Consumer>
                    {({ client, error }) => {
                        // any error that SMART.ready() may have been rejected with
                        if (error) {
                            return <pre>{error.stack}</pre>;
                        }

                        // if client is already available render the subtree
                        if (client) {
                            return this.props.children;
                        }

                        // client is undefined until SMART.ready() is fulfilled
                        return "Authorizing...";
                    }}
                </FhirClientContext.Consumer>
            </FhirClientContext.Provider>
        );
    }
}

export default FhirClientProvider;

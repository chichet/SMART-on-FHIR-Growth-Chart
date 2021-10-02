// Felipe Giuste
// 2021-10-01 

import React from "react";
import { Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

// FHIR Context Provider
import FhirClientProvider from "../Context/FhirClientProvider";

// Pages
import Frontend from "./pages/Frontend";

// History
const history = createBrowserHistory();

export default function Application() {

	const links_element = (
		<React.Fragment>
			{/* List of Pages with Icons */}
		    <List>
		        <ListItem
		            button
		            component={Link}
		            to="/frontend"
		            key="Frontend"
		        >
		            <ListItemIcon>
		                <ChevronRightIcon />
		            </ListItemIcon>
		            <ListItemText primary={"Frontend"} />
		        </ListItem>
		    </List>

		    {/* Routes */}
		    <main>
		        {/* FHIR Client Provider */}
		        <FhirClientProvider>
		            <Route exact path="/frontend" component={Frontend} />
		        </FhirClientProvider>
		    </main>
	    </React.Fragment>
    )

    return (
    	// Router
        <Router history={history}>
            <div>
                {links_element}
            </div>
        </Router>
    );
}
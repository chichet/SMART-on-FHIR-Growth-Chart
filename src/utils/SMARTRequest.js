// Felipe Giuste
// 2021-10-05

// Organize Requests
export async function SMARTRequest(parameters, client){
	// Log Parameters
	console.log(parameters);

    // GET Query
    const QueryResponse = await GETRequest(parameters, client)
    // Log Query Response
    console.log(QueryResponse);
}

// GET Request via SMART client
async function GETRequest(parameters, client){
    // Query
    let QueryResponse = client
        .request(parameters, {
            pageLimit: 1,
            flat: true,
        })
        .then((response_items) => {
            return(response_items);
        });
    
	// Return fulfilled Promise
    return await QueryResponse
}
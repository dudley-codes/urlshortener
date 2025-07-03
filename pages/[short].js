import React from 'react';

function Short() {
	return <div></div>;
}

export default Short;

export async function getServerSideProps(context) {
	const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;
	const GRAPHQL_API_KEY = process.env.GRAPHQL_KEY;

	const query = /*GraphQL */ `
    query LIST_URLS($input: ModelURLFilterInput!){
      listURLS(filter: $input){
        items {
          long
          short
        }
      }
    }
  `;

	const variables = {
		input: { short: { eq: context.params.short } },
	};

	const options = {
		method: 'POST',
		headers: {
			'x-api-key': GRAPHQL_API_KEY,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ query, variables }),
	};

	const res = await fetch(GRAPHQL_ENDPOINT, options);
	const data = await res.json();

	const url = data.data.listURLS.items[0];
	return {
		redirect: {
			destination: url?.long,
		},
	};
}

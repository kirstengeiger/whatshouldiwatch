// Function to render your items
const renderItems = (data) => {
	// The `ul` where the items will be inserted
	const dataList = document.getElementById('data-list')
}

// Fetch gets your (local) JSON file…
fetch('data.json')
	.then(response => response.json())
	.then(data => {
		// And passes the data to the function, above!
		renderItems(data)
	})
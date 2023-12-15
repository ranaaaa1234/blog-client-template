document.getElementById('createPostForm').addEventListener('submit', async function (event) {
    // Prevents the default form submission behavior
    event.preventDefault();

    // Extracts form data from the submitted form
    const formData = new FormData(this);
    const postData = {}; // Initializes an empty object to store the form data

    // Iterates through each form field and assigns its value to the postData object
    formData.forEach((value, key) => {
        postData[key] = value;
    });

    try {
        // Sends a POST request to a specific URL (API endpoint) with the form data
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts', {
            method: 'POST', // Specifies the HTTP method as POST
            headers: {
                'Content-Type': 'application/json' // Sets the content type of the request body as JSON
            },
            body: JSON.stringify(postData) // Converts the postData object to a JSON string and sends it as the request body
        });

        // Checks if the response from the server is successful (status code 200-299)
        if (response.ok) {
            // Redirects the user to 'index.html' upon successful post creation
            window.location.href = 'index.html';
        } else {
            // Throws an error if the response status is not successful
            throw new Error('Failed to create post.');
        }
    } catch (error) {
        // Logs the error to the console if there's an issue with the POST request
        console.error('Error:', error);
        // Handles the error case if needed 
    }

});

    //custom tag input field
    const tagsSelect = document.getElementById('tags');
    const customTagInput = document.getElementById('customTagInput');
    // Show/hide the custom tag input field based on the selected option
    tagsSelect.addEventListener('change', () => {
        if (tagsSelect.value === 'custom') {
            customTagInput.style.display = 'block';
        } else {
            customTagInput.style.display = 'none';
        }
    });

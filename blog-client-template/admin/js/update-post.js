document.addEventListener('DOMContentLoaded', fetchPost);

// Function to fetch the details of a specific post
async function fetchPost() {
    try {
        // Get the 'id' parameter from the URL query string
        const urlParams = new URLSearchParams(location.search);
        const postId = urlParams.get('id');

        // Fetch the post details using the 'id' from the API
        const response = await fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`);
        const post = await response.json();

        // Fill the form fields with the retrieved post details
        document.getElementById('title').value = post.title;
        document.getElementById('author').value = post.author;
        document.getElementById('content').value = post.content;

        // Get the select element for tags and the input field for custom tags
        const tagsSelect = document.getElementById('tags');
        const customTagInput = document.getElementById('customTagInput');

        // Check if the post contains a 'custom' tag and display the custom tag input accordingly
        if (post.tags.includes('custom')) {
            tagsSelect.value = 'custom';
            customTagInput.style.display = 'inline-block';
            customTagInput.value = post.tags.filter(tag => tag !== 'custom')[0];
        } else {
            tagsSelect.value = post.tags;
        }
    } catch (error) {
        console.error(error);
    }
}

// Function to handle the form submission to update the post
document.getElementById('updatePostForm').addEventListener('submit', updatePost);

function updatePost(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const tagsSelect = formData.get('tags');

    // Check if the selected tag is 'custom' and adjust tags data accordingly
    const tagsData = tagsSelect === 'custom' ? [formData.get('customTag')] : [tagsSelect];

    // Prepare the data to be sent for updating the post
    const data = {
        "title": formData.get('title'),
        "author": formData.get('author'),
        "content": formData.get('content'),
        "tags": tagsData
    };

    // Get the 'id' parameter from the URL query string
    const urlParams = new URLSearchParams(location.search);
    const postId = urlParams.get('id');

    // Send a PATCH request to update the post data
    fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(response => {
        // Redirect to the index.html page after the update if successful
        if (response.ok) {
            location.href = 'index.html';
        }
    }).catch(error => {
        console.error(error);
    });
}

// custom tag input field
const tagsSelect = document.getElementById('tags');
const customTagInput = document.getElementById('customTagInput');

tagsSelect.addEventListener('change', () => {
    // Show/hide the custom tag input field based on the selected option
    const selectedOption = tagsSelect.value;

    // Check if the selected option is not a pre-defined one
    const predefinedOptions = ['Food', 'Travel', 'Fotball', 'Animals']; //predefined options 
    if (!predefinedOptions.includes(selectedOption)) {
        customTagInput.style.display = 'block';
    } else {
        customTagInput.style.display = 'none';
    }
});

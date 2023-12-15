document.addEventListener('DOMContentLoaded', async () => {
    const postId = getPostIdFromURL(); // Assuming you have a function to extract post ID from URL
    const postDetailsContainer = document.getElementById('post-details');

    try {
        const response = await fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`);
        const post = await response.json();

        // Construct the HTML to display post details
        const postHTML = `
            <h2>${post.title}</h2>
            <p><strong>Author:</strong> ${post.author}</p>
            <p>${post.date}</p>
            <p><strong>Tags:</strong> ${post.tags}</p>
            <p>${post.content}</p>
        `;

        // Fill the post-details container with the retrieved post HTML
        postDetailsContainer.innerHTML = postHTML;
    } catch (error) {
        console.error('Error fetching post details:', error);
        // Handle errors here, such as displaying an error message in the UI
    }
});

function getPostIdFromURL() {
    // This function extracts the post ID from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

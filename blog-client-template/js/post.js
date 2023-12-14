document.addEventListener("DOMContentLoaded", async () => {
    const postId = new URLSearchParams(window.location.search).get('id');
    
    if (postId) {
        try {
            // Fetch the specific post using its ID from the API
            const response = await fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`);
            const post = await response.json(); // Convert the response to JSON format

            // Create HTML content for the post details
            const postContent = `
                <h2>${post.title}</h2>
                <p><strong>Author</strong>: ${post.author}</p>
                <p>${post.date}</p>
                <p class="content">${post.content}</p>
            `;

            // Get the element where the post details will be displayed
            const postDetails = document.getElementById('post-content');

            // Set the generated post content in the specified element
            postDetails.innerHTML = postContent;
        } catch (error) {
            // Log an error if fetching the post data fails
            console.error('Error fetching post:', error);
        }
    }
});

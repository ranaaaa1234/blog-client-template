async function fetchAndDisplayPosts() {
    try {
        // Fetch blog posts from the API
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
        const posts = await response.json();

        // Prepare HTML for the posts table
        let postsTableHTML = '';
        for (let post of posts) {
            postsTableHTML += `
                <tr>
                    <td>${post.title}</td>
                    <td>${post.author}</td>
                    <td>${post.tags.join(', ')}</td>
                    <td>${post.date}</td>
                    <td>
                        <a href="#">Update</a>
                        <a href="#" data-id="${post.id}" class="delete-links">Delete</a>
                    </td>
                </tr>
            `;
        }

        // Display the fetched blog posts in the table
        document.getElementById('post-table-body').innerHTML = postsTableHTML;

        // Add event listeners to delete links
        const deleteLinks = document.querySelectorAll('.delete-links');
        deleteLinks.forEach(link => {
            link.addEventListener('click', async (e) => {
                e.preventDefault();
                const postId = e.target.dataset.id;

                try {
                    // Send a DELETE request to delete the chosen blog post
                    const deleteResponse = await fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`, {
                        method: 'DELETE'
                    });

                    // Remove the deleted post from the DOM if successful
                    if (deleteResponse.ok) {
                        e.target.closest('tr').remove();
                    } else {
                        throw new Error('Could not delete the blog post');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            });
        });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
    }
}

// Call the function to fetch and display blog posts when the page loads
fetchAndDisplayPosts();

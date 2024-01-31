document.addEventListener("DOMContentLoaded", async () => {
    // Get the container where blog posts will be displayed
    const blogPostsContainer = document.getElementById('blog-posts');

    // Function to fetch and display blog posts
    async function fetchAndDisplayPosts() {
        try {
            // Fetch blog posts from the API
            const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
            const posts = await response.json();

            let postsHTML = '';
            // Loop through each post and generate HTML content
            for (let post of posts) {
                // Extract a short content and full content for preview
                let shortContent = '';
                let fullContent = '';

                if (post.content && typeof post.content === 'string') {
                    shortContent = post.content.length > 100 ? post.content.slice(0, 100) : post.content;
                    fullContent = post.content;
                }

                // Create HTML elements for each post
                postsHTML += `
                    <div class="blog-post">
                        <h2>${post.title}</h2>
                        <p><strong>Author:</strong> ${post.author}</p>
                        <p>${post.date}</p>
                        <p><strong>Tags:</strong> ${post.tags}</p>
                        <p class="content">${shortContent}</p>
                        <!-- Include the post ID as a query parameter -->
                        <p id="read-more" data-id="${post._id}">...click to read more</p>
                    </div>
                `;
            }

            // Display the generated HTML content within the container
            blogPostsContainer.innerHTML = postsHTML;
    
            // Add event listeners to "Read More" buttons for each post
            const blogPosts = document.querySelectorAll('#blog-posts');
            blogPosts.forEach(button => {
                button.addEventListener('click', () => {
                    // Redirect to the full post using the post ID as a query parameter
                    const postId = button.dataset.id;
                    window.location.href = `post.html?id=${postId}`;
                });
            });

        } catch (error) {
            console.error('Error fetching blog posts:', error);
        }
    }

    // Fetch and display the blog posts when the DOM content is loaded
    fetchAndDisplayPosts();
});


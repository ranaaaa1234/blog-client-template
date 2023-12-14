document.addEventListener("DOMContentLoaded", async () => {
    const blogPostsContainer = document.getElementById('blog-posts');

    async function fetchAndDisplayPosts() {
        try {
            const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
            const posts = await response.json();

            let postsHTML = '';
            for (let post of posts) {
                let shortContent = '';
                let fullContent = '';

                if (post.content && typeof post.content === 'string') {
                    shortContent = post.content.length > 100 ? post.content.slice(0, 100) : post.content;
                    fullContent = post.content;
                }

                // Pass the post ID as a URL parameter to post.html
                postsHTML += `
                    <div class="blog-post">
                        <h2>${post.title}</h2>
                        <p><strong>Author:</strong> ${post.author}</p>
                        <p>${post.date}</p>
                        <p><strong>Tags:</strong> ${post.tags}</p>
                        <p class="content">${shortContent}</p>
                        <!-- Include the post ID as a query parameter -->
                        <a href="post.html?id=657b0db931b9d5002a63a192" id="read-more">read more...</a>
                    </div>
                `;
            }

            // Append the generated HTML content to the blogPostsContainer
            blogPostsContainer.innerHTML = postsHTML;

        } catch (error) {
            console.error('Error fetching blog posts:', error);
        }
    }


    // Call the function to fetch and display blog posts
    fetchAndDisplayPosts();
});
  
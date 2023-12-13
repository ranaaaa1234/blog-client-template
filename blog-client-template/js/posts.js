// execute following code
document.addEventListener("DOMContentLoaded", async () => {
    // Get the container where the blog posts will be displayed
    const blogPostsContainer = document.getElementById('blog-posts');

    // Function to fetch and display blog posts
    async function fetchAndDisplayPosts() {
        try {
            // Fetch blog posts from API
            const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
            const posts = await response.json(); // Convert response to JSON

            let postsHTML = ''; // Initialize an empty string to store HTML for blog posts
            for (let post of posts) {
                // extracting the first 100 characters of the post content as a preview
                const shortContent = post.content.slice(0, 100);
                const fullContent = post.content; // Store the full content for later use

                // Construct the HTML structure for each blog post
                postsHTML += `
                    <div class="blog-post">
                        <h2>${post.title}</h2>
                        <p><strong>Author</strong> ${post.author}</p>
                        <p>${post.date}</p>
                        <p><strong>Tags</strong> ${post.tags}</p>
                        <p class="content">${shortContent}</p>
                        <a href="post.html" class="read-more" data-full-content="${fullContent}">Read more...</a>
                    </div>
                `;
            };

            // Set the generated HTML content inside the blogPostsContainer blogPostsContainer.innerHTML = postsHTML;

            // Add click event listeners to all 'Read more' links
            const readMoreLinks = document.querySelectorAll('.read-more');
            readMoreLinks.forEach(link => {
                // When a 'Read more' link is clicked, execute the following code
                link.addEventListener('click', (e) => {
                    e.preventDefault(); // Prevent the default behavior of the link

                    const contentElement = e.target.previousElementSibling; // Select the content element
                    const fullContent = e.target.dataset.fullContent; // Get the full content from the data attribute

                    // Display the full content when the link is clicked
                    contentElement.textContent = fullContent;

                    e.target.remove(); // Remove the "Read more" link after displaying the full content
                });
            });
        } catch (error) {
            // If there's an error fetching or processing the data, log the error to the console
            console.error('Error fetching blog posts:', error);
        }
    }

    // Call the function to fetch and display blog posts
    fetchAndDisplayPosts();
});

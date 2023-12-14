document.addEventListener("DOMContentLoaded", async () => {
    const blogPostsContainer = document.getElementById('blog-posts');

    async function fetchAndDisplayPosts() {
        try {
            const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
            const posts = await response.json();

            let postsHTML = '';
            for (let post of posts) {
                const shortContent = post.content.slice(0, 100);
                const fullContent = post.content;

                postsHTML += `
                <div class="blog-post">
                <h2>${post.title}</h2>
                <p><strong>Author</strong> ${post.author}</p>
                <p>${post.date}</p>
                <p><strong>Tags</strong> ${post.tags}</p>
                <p class="content">${shortContent}</p>
                <a href="post.html?id=${post.id}" class="read-more" data-full-content="${fullContent}">read more...</a>
            </div>
                `;
            }

            // Append the generated HTML content to the blogPostsContainer
            blogPostsContainer.innerHTML = postsHTML;

         }catch (error) {
            console.error('Error fetching blog posts:', error);
        }
    }

    // Call the function to fetch and display blog posts
    fetchAndDisplayPosts();
});

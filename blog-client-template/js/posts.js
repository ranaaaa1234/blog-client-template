document.addEventListener("DOMContentLoaded", () => {
    const blogPostsContainer = document.getElementById('blog-posts');

    // Function to fetch and display blog posts
    async function fetchAndDisplayPosts() {
        try {
            const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
            const posts = await response.json();

            let postsHTML = '';
            for (let post of posts) {
                // Extracting first 100 characters of the post content
                const shortContent = post.content.slice(0, 100);
                
                // Creating the HTML structure for each blog post
                postsHTML += `
                    <div class="blog-post">
                        <h2>${post.title}</h2>
                        <p><strong>Author:</strong> ${post.author}</p>
                        <p><strong>Date:</strong> ${post.date}</p>
                        <p>${shortContent}</p>
                        <p><strong>Tags:</strong> ${post.tags.join(', ')}</p>
                        <a href="#" class="read-more" data-content="${post.content}">Read more...</a>
                    </div>
                `;
            }

            blogPostsContainer.innerHTML = postsHTML;

            // Event listener for 'Read more' links
            const readMoreLinks = document.querySelectorAll('.read-more');
            readMoreLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const content = e.target.dataset.content;
                    alert(content); // Replace this with your logic to show full content
                });
            });
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        }
    }

    fetchAndDisplayPosts();
});

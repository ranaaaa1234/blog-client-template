async function fetchAndDisplayPosts() {
    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
        const posts = await response.json();

        let postsTableHTML = '';
        for (let post of posts) {
            postsTableHTML += `
                <tr>
                    <td>${post.title}</td>
                    <td>${post.author}</td>
                    <td>${post.tags.join(', ')}</td>
                    <td>${post.date}</td>
                    <td>
                        <button id="update-${post.id}">Update</button>
                        <button id="delete-${post.id}" class="delete-links">Delete</button>
                    </td>
                </tr>
            `;
        }

        document.getElementById('post-table-body').innerHTML = postsTableHTML;

        // Add event listeners to delete links
        const deleteLinks = document.querySelectorAll('.delete-links');
        deleteLinks.forEach(link => {
            link.addEventListener('click', async (e) => {
                e.preventDefault();
                const postId = e.target.id.split('-')[1]; // Extracting postId from the button id

                try {
                    const deleteResponse = await fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`, {
                        method: 'DELETE'
                    });

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

fetchAndDisplayPosts();

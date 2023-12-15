// When the DOM content is loaded, fetch and display posts
document.addEventListener('DOMContentLoaded', fetchAndDisplayPosts);

// Function to fetch and display posts
async function fetchAndDisplayPosts() {
    try {
        // Fetch posts from the API
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
        const puns = await response.json(); // response as JSON

        let punsTableHTML = ""; // Initialize an empty string to store table HTML
        // Loop through each post and create table rows
        for (let pun of puns) {
            // Convert the date string to a JavaScript Date object
            let punDate = new Date(pun.date);

            // Generate HTML for each post and append to the table
            punsTableHTML += `
                <tr>
                    <td>${pun.title}</td>
                    <td>${pun.author}</td>
                    <td>${pun.tags}</td>
                    <td>${punDate.getFullYear()}-${punDate.getMonth() + 1}-${punDate.getDate()} ${punDate.toLocaleTimeString()}</td>
                    <td>
                        <button id="update-btn" data-id="${pun._id}">Update</button>
                        <button class="delete-btn" data-id="${pun._id}">Delete</button>
                    </td>
                </tr>
            `;
        }

        // Display the generated HTML in the table body
        document.getElementById('post-table-body').innerHTML = punsTableHTML;

        // Add event listeners to delete buttons for each post
        const deleteButtons = document.getElementsByClassName('delete-btn');
        for (let button of deleteButtons) {
            button.addEventListener('click', async function (e) {
                e.preventDefault();
                let punId = e.target.dataset.id;
                // Send a DELETE request to delete the post by ID
                let response = await fetch(`https://blog-api-assignment.up.railway.app/posts/${punId}`, {
                    method: 'DELETE'
                });

                // If deletion is successful, remove the post row from the table
                if (response.ok) {
                    e.target.parentNode.parentNode.remove();
                }
            });
        }

        // Add event listeners to update buttons for each post
        const updateButtons = document.querySelectorAll('#update-btn');
        updateButtons.forEach(button => {
            button.addEventListener('click', () => {
                const punId = button.dataset.id;
                // Redirect to the update-post.html page with the post ID as a query parameter
                window.location.href = `update-post.html?id=${punId}`;
            });
        });

    } catch (error) {
        console.log(error); // if errors during the process
    }
}

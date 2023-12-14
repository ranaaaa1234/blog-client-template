// manage-posts.js

document.addEventListener('DOMContentLoaded', fetchAndDisplayPosts);

async function fetchAndDisplayPosts() {
    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
        const puns = await response.json();

        let punsTableHTML = "";
        for (let pun of puns) {
            let punDate = new Date(pun.date);

            punsTableHTML += `
                <tr>
                    <td>${pun.title}</td>
                    <td>${pun.author}</td>
                    <td>${pun.tags.join(', ')}</td>
                    <td>${punDate.getFullYear()}-${punDate.getMonth() + 1}-${punDate.getDate()} ${punDate.toLocaleTimeString()}</td>
                    <td>
                        <button class="update-btn" data-id="${pun._id}">Update</button>
                        <button class="delete-btn" data-id="${pun._id}">Delete</button>
                    </td>
                </tr>
            `;
        }

        document.getElementById('post-table-body').innerHTML = punsTableHTML;

        // Add event listeners to delete buttons
        const deleteButtons = document.getElementsByClassName('delete-btn');
        for (let button of deleteButtons) {
            button.addEventListener('click', async function (e) {
                e.preventDefault();
                let punId = e.target.dataset.id;
                let response = await fetch(`https://blog-api-assignment.up.railway.app/posts/${punId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    e.target.parentNode.parentNode.remove();
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
}

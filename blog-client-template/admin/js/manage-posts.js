// Fetch puns and populate the table
async function fetchAllPuns() {
    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
        const puns = await response.json();

        let punsTableHTML = "";
        for (let pun of puns) {
            let punDate = new Date(pun.date);

            punsTableHTML += `
                <tr>
                    <td>${pun.content}</td>
                    <td>${pun.author}</td>
                    <td>${pun.tags.join(', ')}</td>
                    <td>${punDate.toISOString().split('T')[0]}</td>
                    <td>
                        <a href="update-pun.html?id=${pun._id}">Update</a> |
                        <a href="#" data-id="${pun._id}" class="delete-links">Delete</a> 
                    </td>
                </tr>
            `;
        }

        document.getElementById('post-table-body').innerHTML = punsTableHTML;

        // Event listener to delete puns
        const deleteLinks = document.querySelectorAll('.delete-links');
        deleteLinks.forEach(link => {
            link.addEventListener('click', async (e) => {
                e.preventDefault();
                const punId = e.target.dataset.id;
                
                try {
                    const response = await fetch(`https://blog-api-assignment.up.railway.app/posts${punId}`, {
                        method: 'DELETE'
                    });

                    if (response.ok) {
                        e.target.closest('tr').remove();
                    } else {
                        throw new Error('Could not delete pun');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            });
        });
    } catch(error) {
        console.error(error);
    }
}

// Call the function to fetch and populate the table
fetchAllPuns();

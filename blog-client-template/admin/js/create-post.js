document.getElementById('createPostForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const postData = {};
    formData.forEach((value, key) => {
        postData[key] = value;
    });

    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        if (response.ok) {
            window.location.href = 'index.html'; // Redirect to the handle blog page upon successful post creation
        } else {
            throw new Error('Failed to create post.');
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle the error case if needed
    }

});

    //custom tag input field
    const tagsSelect = document.getElementById('tags');
    const customTagInput = document.getElementById('customTagInput');

    tagsSelect.addEventListener('change', () => {
        if (tagsSelect.value === 'custom') {
            customTagInput.style.display = 'block';
        } else {
            customTagInput.style.display = 'none';
        }
    });

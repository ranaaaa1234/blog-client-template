document.getElementById('createPostForm').addEventListener('submit', async function(event) {
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
            alert('Post created successfully!');
            window.location.href = 'index.html';
        } else {
            throw new Error('Failed to create post.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to create post. Please try again.');
    }
});

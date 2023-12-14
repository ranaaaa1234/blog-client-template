document.addEventListener('DOMContentLoaded', fetchPost);

async function fetchPost() {
    try {
        const urlParams = new URLSearchParams(location.search);
        const postId = urlParams.get('id');

        const response = await fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`);
        const post = await response.json();

        document.getElementById('title').value = post.title;
        document.getElementById('author').value = post.author;
        document.getElementById('content').value = post.content;

        const tagsSelect = document.getElementById('tags');
        const customTagInput = document.getElementById('customTagInput');

        if (post.tags.includes('custom')) {
            tagsSelect.value = 'custom';
            customTagInput.style.display = 'inline-block';
            customTagInput.value = post.tags.filter(tag => tag !== 'custom')[0];
        } else {
            tagsSelect.value = post.tags;
        }
    } catch (error) {
        console.error(error);
    }
}

document.getElementById('updatePostForm').addEventListener('submit', updatePost);

function updatePost(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const tagsSelect = formData.get('tags');

    // Check if the selected tag is 'custom' and adjust tags data accordingly
    const tagsData = tagsSelect === 'custom' ? [formData.get('customTag')] : [tagsSelect];

    const data = {
        "title": formData.get('title'),
        "author": formData.get('author'),
        "content": formData.get('content'),
        "tags": tagsData
    };

    const urlParams = new URLSearchParams(location.search);
    const postId = urlParams.get('id');

    fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (response.ok) {
            location.href = 'index.html';
        }
    }).catch(error => {
        console.error(error);
    });
}

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

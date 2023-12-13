document.getElementById('postForm').addEventListener('submit', createPost);


async function createPost(e) {
  e.preventDefault();
  let form = e.target;


  try {
    let formData = new FormData(form)
    data = {"content": formData.get('content')};

    await fetch('https://blog-api-assignment.up.railway.app/posts', {
      method: "POST", // GET, POST, PATCH, DELETE, etc.
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });


    location.replace('index.html');

  } catch(error) {
      console.log(error)
  } 
}

let serializeForm = function (form) {
    var obj = {};
    var formData = new FormData(form);
    // console.log(formData.getAll());

    for (var key of formData.keys()) {
        let inputData = formData.getAll(key);

        if (inputData.length > 1) {
            obj[key] = inputData;
        } else {
            obj[key] = inputData[0];    
        }
    }
    
    // console.log(obj);
    return obj;
};

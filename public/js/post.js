const imgInp = document.getElementById("imgInp");
const preview = document.getElementById("preview");

imgInp.onchange = evt => {
  const [file] = imgInp.files
  if (file) {
    preview.src = URL.createObjectURL(file)
  }
}
const replyFormHandler = async (event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append('post_title', document.querySelector('#post_title').value.trim());
  formData.append('post_body', document.querySelector('#post_body').value.trim());
  formData.append('post_image', document.querySelector('input[type="file"]').files[0]);

  const post_title = formData.get('post_title');
  const post_body = formData.get('post_body');
  const post_image = formData.get('post_image');

  // Validate the form data NOT WORKING
  if (!post_title) {
    M.Modal.init(document.querySelector('#error-modal')).open();
    return;
  }

  if (!post_body) {
    M.Modal.init(document.querySelector('#error-modal')).open();
    return;
  }

  if (!post_image) {
    M.Modal.init(document.querySelector('#error-modal')).open();
    return;
  }

  // If the form data is valid, send the request
  //even if (!post_title) form still submits???
  if (post_title && post_body && post_image) {
    const response = await fetch('/api/posts/create', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      M.Modal.init(document.querySelector('#success-modal')).open();
      document.location.replace('/');
    } else {
      M.Modal.init(document.querySelector('#error-modal')).open();
    }
  }
};


document
  .querySelector('.post')
  .addEventListener('submit', replyFormHandler);

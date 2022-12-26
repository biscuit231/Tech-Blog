document.addEventListener("DOMContentLoaded", function() {
    const imgInp = document.getElementById("imgInp");
    const preview = document.getElementById("preview");
  
    imgInp.onchange = evt => {
      const [file] = imgInp.files
      if (file) {
        preview.src = URL.createObjectURL(file)
        preview.classList.remove("hidden");
      }
    }
  });
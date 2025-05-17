document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('nav a'); 
  const sections = document.querySelectorAll('.section'); 

  links.forEach(link => {
    link.addEventListener('click', event => {
      const targetSectionId = link.getAttribute('data-section');

      if (targetSectionId) {
        event.preventDefault(); 

        sections.forEach(section => section.classList.remove('active'));

        const targetSection = document.getElementById(targetSectionId);
        if (targetSection) {
          targetSection.classList.add('active');
        }
      }
    });
  });

  const fileInput = document.getElementById('fileInput');
  const uploadButton = document.getElementById('uploadButton');
  const fileDisplay = document.getElementById('fileDisplay');

  const savedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
  savedFiles.forEach(displayFile);

  uploadButton.addEventListener('click', () => {
    const files = Array.from(fileInput.files);

    if (files.length === 0) {
      alert('Por favor selecciona al menos un archivo.');
      return;
    }

    files.forEach(file => {
      const reader = new FileReader();

      reader.onload = function (e) {
        const fileContent = e.target.result;

        const newFile = {
          name: file.name,
          type: file.type,
          content: fileContent
        };

        const updatedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
        updatedFiles.push(newFile);
        localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));

        displayFile(newFile);
      };

      if (file.type.startsWith('image/')) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsText(file);
      }
    });

    fileInput.value = ''; 
  });

  function displayFile(file) {
    const container = document.createElement('div');
    container.style.border = '1px solid #ccc';
    container.style.padding = '10px';
    container.style.borderRadius = '8px';
    container.style.width = '200px';
    container.style.textAlign = 'center';
    container.style.backgroundColor = '#f9f9f9';

    const fileName = document.createElement('p');
    fileName.textContent = `📄 ${file.name}`;
    container.appendChild(fileName);

    if (file.type.startsWith('image/')) {
      const img = document.createElement('img');
      img.src = file.content;
      img.alt = file.name;
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
      container.appendChild(img);
    }

    const downloadLink = document.createElement('a');
    downloadLink.textContent = 'Descargar';
    downloadLink.href = file.content;
    downloadLink.download = file.name;
    downloadLink.style.display = 'block';
    downloadLink.style.marginTop = '8px';
    downloadLink.style.color = 'blue';
    container.appendChild(downloadLink);

    fileDisplay.appendChild(container);
  }
});

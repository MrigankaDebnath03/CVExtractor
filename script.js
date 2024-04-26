// const uploadButton = document.getElementById('upload-button');
// const downloadButton = document.getElementById('download-button');

// uploadButton.addEventListener('change', async (e) => {
//   // Disable download button initially
//   downloadButton.disabled = true;
//   downloadButton.classList.remove('active');

//   const file = e.target.files[0];

//   // Check if file is a ZIP
//   if (!file.name.endsWith('.zip')) {
//     alert('Please select a ZIP file');
//     return;
//   }

//   // Send the file to the server using FormData
//   const formData = new FormData();
//   formData.append('file', file);

//   try {
//     const response = await fetch('http://localhost:8000/upload-zip/', {
//       method: 'POST',
//       body: formData,
//     });

//     if (response.ok) {
//       // Assuming successful upload enables download button
//       downloadButton.disabled = false;
//       downloadButton.classList.add('active');
//     } else {
//       throw new Error('Error uploading file');
//     }
//   } catch (error) {
//     console.error(error);
//     alert('Error processing file');
//   }
// });

// downloadButton.addEventListener('click', async () => {
//   // Simulate download by opening the CSV file in a new tab
//   window.open('http://localhost:8000/data.csv');
// });

const uploadButton = document.getElementById('upload-button');
const downloadButton = document.getElementById('download-button');

uploadButton.addEventListener('change', async (e) => {
  // Disable download button initially
  downloadButton.disabled = true;
  downloadButton.classList.remove('active');

  const file = e.target.files[0];

  // Check if file is a ZIP
  if (!file.name.endsWith('.zip')) {
    alert('Please select a ZIP file');
    return;
  }

  // Send the file to the server using FormData
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('http://localhost:8000/upload-zip/', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      // Assuming successful upload enables download button
      downloadButton.disabled = false;
      downloadButton.classList.add('active');
    } else {
      throw new Error('Error uploading file');
    }
  } catch (error) {
    console.error(error);
    alert('Error processing file');
  }
});

// downloadButton.addEventListener('click', async () => {
//   try {
//     const response = await fetch('http://localhost:8000/upload-zip/');
//     const blob = await response.blob();
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'data.csv';
//     link.click();
//     URL.revokeObjectURL(url);
//   } catch (error) {
//     console.error(error);
//     alert('Error downloading file');
//   }
// });

downloadButton.addEventListener('click', () => {
  const endpoint = 'http://localhost:8000/download/data.csv'; // Replace with your FastAPI endpoint URL

  fetch(endpoint, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/octet-stream'
      }
  })
  .then(response => response.blob())
  .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.csv'; // Replace with the desired file name and extension
      document.body.appendChild(a);
      a.click();
      a.remove();
  })
  .catch(error => {
      console.error('Error downloading file:', error);
  });
});

// downloadButton.addEventListener('click', () => {
//   const endpoint = 'http://localhost:8000/download/data.csv'; // Replace with your actual server URL

//   fetch(endpoint, {
//       method: 'GET',
//       headers: {
//           'Content-Type': 'application/octet-stream' // Optional header for binary data
//       }
//   })
//   .then(response => response.blob())
//   .then(blob => {
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = 'data.csv'; // Set the desired filename
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//   })
//   .catch(error => {
//       console.error('Error downloading file:', error);
//   });
// });
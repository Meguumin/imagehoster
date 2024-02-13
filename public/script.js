import PocketBase from './pocketbase.es.mjs';

const pb = new PocketBase('http://127.0.0.1:8090');
const authData = pb.admins.authWithPassword('aidenloktong@gmail.com', 'wm52QCjcsJjkfy2');
const formData = new FormData();

const fileInput = document.getElementById('fileInput');

// listen to file input changes and add the selected files to the form data
fileInput.addEventListener('change', function () {
    for (let file of fileInput.files) {
        formData.append('image', file);
    }
    pb.collection('File_ImagesStoring').create(formData);
});



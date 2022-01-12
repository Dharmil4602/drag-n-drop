const dragArea = document.querySelector(`.drag-area`);
const dragItem = document.querySelector(`.header`);
let file;
let btnBrowse = document.querySelector(`.button`);
let input = document.querySelector(`input`);

btnBrowse.onclick = () => {
    input.click();
}

input.addEventListener(`change`, function() {
    file = this.files[0];
    displayFile();
})

// When File Enters Drag Area
dragArea.addEventListener(`dragover`, (event) => {
    event.preventDefault();
    dragItem.textContent = `Release To Upload`;
})

// When File Leaves The Drag Area
dragArea.addEventListener(`dragleave`, () => {
    console.log(`File Left Drag Area`);
    dragItem.textContent = `Drag & Drop`;
})

// When File Is Dropped In The Drag Area
dragArea.addEventListener(`drop`, (event) => {
    event.preventDefault();
    file = event.dataTransfer.files[0];
  displayFile();
    console.log(file);
})

function displayFile() 
{
    let fileType = file.type;

    let validExtensions = [`image/jpeg`, `image/jpg`, `image/png`];
    if (validExtensions.includes(fileType)) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let fileURL = fileReader.result;
            let imgTag = `<img src="${fileURL} alt="">`;
            dragArea.innerHTML = imgTag;
        }
        fileReader.readAsDataURL(file);
    }
    else {
        alert(`The File Will Not Be Uploaded`)
    }
}


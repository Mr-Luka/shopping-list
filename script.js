const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');


function addItem(e){
    e.preventDefault();
    const newItem = itemInput.value;
    // Validat Input
    if(newItem === ''){
        alert('Please add an item');
        return;
    } 
    // Create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));
    
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button)
    
    itemList.appendChild(li);
    itemInput.value = '';
}

// Function that is creating a button with a classes paramaterer
function createButton (classes){
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

// Function that is creating an icon with a classes paramaterer
function createIcon (classes){
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}


// Event Listeners
itemForm.addEventListener('submit', addItem);
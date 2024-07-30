const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearButton = document.querySelector('#clear');


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

// Function to remove items
function removeItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){ //targeting the right thing, X
        e.target.parentElement.parentElement.remove() // .parentElement - button, and second .parentElement is the List Item
    }
}

// Function that is clearing all the items from the list
function clearItems (){
    // itemList.innerHTML = '';   one way to do it, or:
    while(itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
}


// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearButton.addEventListener('click', clearItems)
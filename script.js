const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearButton = document.querySelector('#clear');
const itemFilter = document.querySelector('#filter')


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
    
    // Add li to the DOM
    itemList.appendChild(li);

    checkUI();

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
        if (confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove() // .parentElement - button, and second .parentElement is the List Item
        checkUI()
        }
    }
}

// Function that is clearing all the items from the list
function clearItems (){
    // itemList.innerHTML = '';   one way to do it, or:
    while(itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
    checkUI();
}




// Function that will filter out items
function filterItems(e){
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();
    items.forEach(item=> {
        const itemName = item.firstChild.textContent.toLowerCase(); // getting the text, not the whole thing with html
        
        if(itemName.indexOf(text) != -1){ // if the text that's typed in, matches the itemNames it wll be true
          item.style.display = 'flex';
        } else {
            item.style.display = 'none'
        }
    });
}



// Function that will check if there are any items in the UI,
// if there is nothing, hide clear button and filter, and if there is, show 
function checkUI(){
const items = itemList.querySelectorAll('li'); // nodeList, when using querySelectorAll
//have to define items here, because if its up above, it will define it and thats it, so node list
//will always be 0, and here its defined inside checkUI
    if(items.length === 0) {
        clearButton.style.display = 'none';
        itemFilter.style.display = 'none'
    } else {
        clearButton.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}



// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearButton.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems)

checkUI()
const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearButton = document.querySelector('#clear');
const itemFilter = document.querySelector('#filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;


function displayItems (){
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => {
        addItemToDOM(item);
        checkUI();
    })
}


function onAddItemSubmit(e){
    e.preventDefault();
    const newItem = itemInput.value;
    // Validat Input
    if(newItem === ''){
        alert('Please add an item');
        return;
    } 
    // Check for edit mode
    if(isEditMode){
        const itemToEdit = itemList.querySelector('.edit-mode');

        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    }
    // // Create list item
    // const li = document.createElement('li');
    // li.appendChild(document.createTextNode(newItem));
    
    // const button = createButton('remove-item btn-link text-red');
    // li.appendChild(button)
    
    // // Add li to the DOM
    // itemList.appendChild(li);

    // Create item DOM element
    addItemToDOM(newItem);

    // Add item to local storage
    addItemToStorage(newItem);


    checkUI();

    itemInput.value = '';
}


// Function add item to dom
function addItemToDOM(item){
    // Create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button)
    
    // Add li to the DOM
    itemList.appendChild(li);
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


// Function to add item to storage
function addItemToStorage(item){
    const itemsFromStorage = getItemsFromStorage();
    
    
    // Add new item to array
    itemsFromStorage.push(item);

    //Convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}


// function that will get the items from the storage:
function getItemsFromStorage(){
    let itemsFromStorage; // creating the variable
    
    if(localStorage.getItem('items') === null){ // we are checking to see if there are no items in storage
        itemsFromStorage = []; // if there isnt (null), that variable is set to an empty array
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));  // gives an array JSON.parse
        //If there is, we are parsing a string back into an Array and putting those items in itemsFromStorage variable.
    }
    return itemsFromStorage;
}

function onClickItem (e){
    if(e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement);
    } else {
        setItemToEdit(e.target); // when I click, its gonna capture the list item
    }
}

function setItemToEdit(item){
    isEditMode = true;
    itemList.querySelectorAll('li').forEach(i=> i.classList.remove('edit-mode'));
    // item.style.color = '#ccc'; or:
    item.classList.add('edit-mode');
    formBtn.innerHTML = `<i class='fa-solid fa-pen'></i>  Update Item`; // When I click the item, addItem button updates
    // to Update item with a pen logo
    formBtn.style.backgroundColor = '#228B22';
    itemInput.value = item.textContent; // When I click the list item, it will show up in the Input value
}

// Function to remove items
function removeItem(item){
    if (confirm('Are you sure?')){
        // Remove from DOM
        item.remove();

        //Remove Item from storage
        removeItemFromStorage(item.textContent)

        checkUI();
    }
}
function removeItemFromStorage(item){
    let itemsFromStorage = getItemsFromStorage();
    
    // Filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((itemm)=> itemm !== item);

    // Re-set to localStorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// Function that is clearing all the items from the list
function clearItems (){
    // itemList.innerHTML = '';   one way to do it, or:
    while(itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    // Clear from localStorage
    localStorage.removeItem('items');
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
    itemInput.value = '';
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
    formBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Add Item`;
    formBtn.style.backgroundColor = '#333';
    isEditMode = false;
}

// Initialize app, so we dont have all the event listeners in a global scope
function init(){
    // Event Listeners
    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', onClickItem);
    clearButton.addEventListener('click', clearItems);
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);
    
    checkUI();
}
init();



/*
We want to get an item that was put into an item list, into a localStorage, so when I refresh
the page, it is saved and it stays still on.
We also want to be able to remove an item, if we have an item and then we delete it, we also want
to delete it from a local storage.
And then we also want to load the items when the page loads, we want to fetch from local storage
and show those items.

We can only store strings in the local storage.
It's key value pairs, and the value has to be a string.
What we want to save though is the list of items.
So what we are gonna do is have an array of the list of items, and we are gonna stringify
that with the JSON.stringify method, and then we are gonna put it in local storage, so its
actually stored as a string, but it looks like an array.
Then when we take it out, we can run it through JSON.parse method, and that will turn it back
into a regular array that we can use

*/
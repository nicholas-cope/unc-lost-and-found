document.addEventListener('DOMContentLoaded', function() {
  // Function to display lost items
  function displayLostItems(items) {
    var lostSection = document.getElementById('itemList');
    lostSection.innerHTML = '';

    items.forEach(function(item) {
      var newItem = document.createElement('div');
      newItem.classList add('lost-item');

      var itemTitle = document.createElement('h3');
      itemTitle.textContent = item.name;

      var itemDesc = document.createElement('p');
      itemDesc.textContent = item.description;

      var itemLoc = document.createElement('p');
      itemLoc.textContent = 'Location: ' + item.location;

      var email = document.createElement('p');
      email.textContent = 'Email: ' + item.contact; // Corrected field name

      if (item.image) {
        var itemImg = document.createElement('img');
        itemImg.src = item.image;
        newItem.appendChild(itemImg);
      }

      newItem.appendChild(itemTitle); //item title/name
      newItem.appendChild(itemDesc); //description
      newItem.appendChild(itemLoc); //location
      newItem.appendChild(email); // Add the email field
      newItem.appendChild(removeButton); // Add the "Remove" button

      lostSection.appendChild(newItem);
    });
  }


  // Retrieve stored items and display them on page load
  var storedItems = JSON.parse(localStorage.getItem('lostItems')) || [];
  displayLostItems(storedItems);

  // Store the form data in localStorage when the form is submitted
  document.getElementById('itemForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect form data
    var itemName = document.getElementById('itemName').value;
    var itemDescription = document.getElementById('itemDescription').value;
    var itemLocation = document.getElementById('itemLocation').value;
    var itemEmail = document.getElementById('contact').value; // Corrected field name
    var itemImage = document.getElementById('itemImage').files[0];

    // Create an object to represent the item
    var newItem = {
      name: itemName,
      description: itemDescription,
      location: itemLocation,
      contact: itemEmail, // Corrected field name
      image: itemImage ? URL.createObjectURL(itemImage) : null,
    };

    // Retrieve existing items from localStorage or initialize an empty array
    var storedItems = JSON.parse(localStorage.getItem('lostItems')) || [];

    // Add the new item to the array
    storedItems.push(newItem);

    // Store the updated array back in localStorage
    localStorage.setItem('lostItems', JSON.stringify(storedItems));

    // Update the display with the newly added item (optional)
    displayLostItems(storedItems);

    // Clear the form fields
    document.getElementById('itemName').value = '';
    document.getElementById('itemDescription').value = '';
    document.getElementById('itemLocation').value = '';
    document.getElementById('contact').value = ''; // Corrected field name
    document.getElementById('itemImage').value = '';
  });

  // Define a function to remove an item
  function removeItem(item) {
    console.log("Removing item:", item);
    // Retrieve existing items from localStorage
    var storedItems = JSON.parse(localStorage.getItem('lostItems')) || [];

    // Find the index of the item to remove in the storedItems array
    var indexToRemove = storedItems.findIndex(function(existingItem) {
      return existingItem.name === item.name && existingItem.description === item.description;
    });

    if (indexToRemove !== -1) {
      // Remove the item from the storedItems array
      storedItems.splice(indexToRemove, 1);

      // Update the storedItems array in localStorage
      localStorage.setItem('lostItems', JSON.stringify(storedItems));

      // Update the display with the updated list of items
      displayLostItems(storedItems);
    }
  }

});




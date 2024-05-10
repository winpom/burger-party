document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch and populate dropdown menus
    const populateDropdownMenus = async () => {
        try {
            // Fetch restaurants and populate dropdown menu
            const restaurantResponse = await fetch('/api/restaurant');
            const restaurants = await restaurantResponse.json();
            const restaurantSelect = document.getElementById('restaurant_id');
            restaurants.forEach(restaurant => {
                const option = document.createElement('option');
                option.value = restaurant.id;
                option.textContent = restaurant.restaurant_name;
                restaurantSelect.appendChild(option);
            });

            // Fetch burgers and populate dropdown menu
            const burgerResponse = await fetch('/api/burger');
            const burgers = await burgerResponse.json();
            const burgerSelect = document.getElementById('burger_id');
            burgers.forEach(burger => {
                const option = document.createElement('option');
                option.value = burger.id;
                option.textContent = burger.burger_name;
                burgerSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Call the function to populate dropdown menus
    populateDropdownMenus();

    // Function to handle restaurant selection
    const restaurantSelect = document.getElementById('restaurant_id');
    if (restaurantSelect) {
        restaurantSelect.addEventListener('change', async () => {
            const selectedOption = restaurantSelect.value;
            if (selectedOption === 'new') {
                // Prompt the user to fill out the form to add a new restaurant
                const restaurantName = prompt('Enter the name of the new restaurant:');
                const locationName = prompt('Enter the location of the new restaurant:');

                if (restaurantName) {
                    try {
                        const response = await fetch('/api/restaurant', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                restaurant_name: restaurantName,
                                location_name: locationName
                            })
                        });

                        if (response.ok) {
                            const newRestaurant = await response.json();
                            // Update the dropdown menu with the new restaurant
                            const option = document.createElement('option');
                            option.value = newRestaurant.id;
                            option.textContent = newRestaurant.restaurant_name;
                            restaurantSelect.appendChild(option);
                            alert('New restaurant added successfully!');
                        } else {
                            alert('Failed to add new restaurant.');
                        }
                    } catch (error) {
                        console.error('Error adding new restaurant:', error);
                        alert('An error occurred. Please try again.');
                    }
                }
            }
        });
    }

    // Function to handle restaurant selection
    const burgerSelect = document.getElementById('burger_id');
    if (burgerSelect) {
        burgerSelect.addEventListener('change', async () => {
            const selectedOption = burgerSelect.value;
            if (selectedOption === 'new') {
                // Prompt the user to fill out the form to add a new burger
                const burgerName = prompt('Enter the name of the new burger:');
                const burgerCost = prompt('Enter the cost of the new burger:');
                const restaurantSelect = document.getElementById('restaurant_id');
                const restaurantId = restaurantSelect.value;

                if (burgerName && burgerCost) {
                    try {
                        const response = await fetch('/api/burger', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                restaurant_name: burgerName,
                                location_name: burgerCost,
                                restaurant_id: restaurantId
                            })
                        });

                        if (response.ok) {
                            const newBurger = await response.json();
                            // Update the dropdown menu with the new restaurant
                            const option = document.createElement('option');
                            option.value = newBurger.id;
                            option.textContent = newBurger.burger_name;
                            burgerSelect.appendChild(option);
                            alert('New burger added successfully!');
                        } else {
                            alert('Failed to add new burger.');
                        }
                    } catch (error) {
                        console.error('Error adding new burger:', error);
                        alert('An error occurred. Please try again.');
                    }
                }
            }
        });
    }

    // Function to handle star rating interactions
    const stars = document.querySelectorAll('.star');
    let selectedRating = 0;

    stars.forEach(star => {
        star.addEventListener('mouseover', () => {
            const value = parseInt(star.getAttribute('data-value'));
            highlightStars(value);
        });

        star.addEventListener('click', () => {
            selectedRating = parseInt(star.getAttribute('data-value'));
            highlightStars(selectedRating);
        });

        star.addEventListener('mouseout', () => {
            highlightStars(selectedRating);
        });
    },
    );

    function highlightStars(value) {
        stars.forEach(star => {
            const starValue = parseInt(star.getAttribute('data-value'));
            if (starValue <= value) {
                star.innerHTML = '&#9733;'; // filled star
            } else {
                star.innerHTML = '&#9734;'; // empty star
            }
        });
        document.querySelector("#rating").dataset.rating = value;
    }

    // const submitReviewButton = document.getElementById('submitReviewBtn');
    // if (submitReviewButton) {
    //     submitReviewButton.addEventListener('click', async (event) => {
    //     })}

    // Review deletion
    document.addEventListener('click', async (event) => {
        // Check if the clicked element is a delete button
        if (event.target.classList.contains('deleteBtn')) {
            // Get the review ID from the dataset attribute
            const reviewId = event.target.dataset.reviewId;
            // console.log(reviewId)

            // Ask for confirmation before deletion
            const isConfirmed = confirm('Are you sure you want to delete this review?');

            if (isConfirmed) {
                try {
                    const response = await fetch(`/api/review/${reviewId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        alert('Review deleted successfully!');
                        // Optionally, remove the review from the DOM
                        event.target.closest('.review').remove();
                    } else {
                        alert('Failed to delete review.');
                    }
                } catch (error) {
                    console.error('Error deleting review:', error);
                    alert('An error occurred. Please try again.');
                }
            }
        }
    });
});
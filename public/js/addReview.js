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

    // Function to compress image
    async function compressImage(file, maxWidth, maxHeight, quality) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve, reject) => {
            reader.onload = async function(event) {
                const img = new Image();
                img.src = event.target.result;
                img.onload = async function() {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    let width = img.width;
                    let height = img.height;

                    // Calculate new dimensions
                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }

                    // Set canvas dimensions
                    canvas.width = width;
                    canvas.height = height;

                    // Draw image on canvas
                    ctx.drawImage(img, 0, 0, width, height);

                    // Get compressed image data URL
                    const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);

                    // Convert data URL to Blob
                    const blob = await fetch(compressedDataUrl).then(res => res.blob());
                    
                    resolve(blob);
                };
            };
            reader.onerror = reject;
        });
    }

    // Review form submission
    const submitReviewButton = document.getElementById('submitReviewBtn');
    if (submitReviewButton) {
        submitReviewButton.addEventListener('click', async (event) => {
            event.preventDefault();
        
            // Get values from the form
            const rating = document.getElementById('rating').value;
            const restaurantId = document.getElementById('restaurant_id').value;
            const burgerId = document.getElementById('burger_id').value;
            const review = document.getElementById('review_content').value;
            // const image = document.getElementById('input[name="image"]').files[0];
            
            // Compress image
            // const compressedImage = await compressImage(image, 400, 300, 0.7);

            // Create FormData object to send both JSON and compressed image data
            const formData = new FormData();
            formData.append('rating', rating);
            formData.append('restaurantId', restaurantId);
            formData.append('burgerId', burgerId);
            formData.append('review', review);
            // formData.append('image', compressedImage);
  
            try {
                const response = await fetch(`/api/review`, {
                    method: 'POST',
                    headers: {
                    },
                    body: formData,
                });
  
                if (response.ok) {
                    alert('Review added successfully!');
                    window.location.reload();
                } else {
                    alert('Failed to add review.');
                }
            } catch (error) {
                console.error('Error adding review:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }

    // Review deletion
    document.addEventListener('click', async (event) => {
        if (event.target.classList.contains('deleteBtn')) {
            const reviewId = event.target.dataset.reviewId;

            try {
                const response = await fetch(`/api/review/${reviewId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    alert('Review deleted successfully!');
                    window.location.reload();
                } else {
                    alert('Failed to delete review.');
                }
            } catch (error) {
                console.error('Error deleting review:', error);
                alert('An error occurred. Please try again.');
            }
        }
    });
});

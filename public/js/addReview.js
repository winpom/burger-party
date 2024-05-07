async function newFormHandler(event) {
    event.preventDefault();
    const ratingStars = document.querySelector('#rating')
    const restaurantName = document.querySelector('input[name="restaurant_name"]').value;
    const burgerName = document.querySelector('input[name="burger_name"]').value;
    const review = document.querySelector('textarea[name="review"]')
  
    const response = await fetch(`/api/reviews`, {
      method: 'POST',
      body: JSON.stringify({
        restaurantName,
        burgerName,
        review,
        ratingStars
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  };
  
document.querySelector('#new-review-form').addEventListener('submit', newFormHandler);
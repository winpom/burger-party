document.addEventListener('DOMContentLoaded', () => {
  //review form submission
  const submitReviewButton = document.getElementById('submitReviewBtn');
  if (submitReviewButton) {
    submitReviewButton.addEventListener('click', async (event) => {
          event.preventDefault();
          const rating = document.querySelector('#rating').value.trim();
          const restaurantName = document.querySelector('input[name="restaurant_name"]').value.trim();
          const burgerName = document.querySelector('input[name="burger_name"]').value.trim();
          const review = document.querySelector('textarea[name="review"]').value.trim();

          try {
              const response = await fetch(`/api/review`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      restaurantName,
                      burgerName,
                      review,
                      rating
                  }),
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

  // review deletion
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
}
)

// async function newFormHandler(event) {
//     event.preventDefault();
//     const rating = document.querySelector('#rating').value.trim();
//     const restaurantName = document.querySelector('input[name="restaurant_name"]').value.trim();
//     const burgerName = document.querySelector('input[name="burger_name"]').value.trim();
//     const review = document.querySelector('textarea[name="review"]').value.trim();
  
//     const response = await fetch(`/api/reviews`, {
//       method: 'POST',
//       body: JSON.stringify({
//         restaurantName,
//         burgerName,
//         review,
//         rating
//       }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
  
//     if (response.ok) {
//       document.location.replace('/dashboard');
//     } else {
//       alert(response.statusText);
//     }
//   };
  
// document.querySelector('#new-review-form').addEventListener('submit', newFormHandler);
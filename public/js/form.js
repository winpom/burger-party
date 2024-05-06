document.addEventListener('DOMContentLoaded', () => {
    // review logic

    // button to reveal review form
    const newReviewButton = document.getElementById('newReviewBtn');
    if (newReviewButton) {
        newReviewButton.addEventListener('click', (event) => {
            event.preventDefault();
            if (updateReviewForm && reviewForm) {
                if (updateReviewForm.style.display === 'block') {
                    updateReviewForm.style.display = 'none';
                }
            }
        });
    }

    //review form submission
    const submitReviewButton = document.getElementById('submitReviewBtn');
    if (submitReviewButton) {
        submitReviewButton.addEventListener('click', async (event) => {
            event.preventDefault();
            const title = document.getElementById('reviewTitle').value;
            const content = document.getElementById('reviewContent').value;

            try {
                const response = await fetch(`/api/review`, {
                    method: 'REVIEW',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title,
                        content,
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


    // reveal update review form
    const updateButtons = document.querySelectorAll('.updateBtn');
    updateButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            event.preventDefault();
            const reviewId = button.dataset.reviewId;
            const title = button.dataset.title;
            const content = button.dataset.content;
            const updateReviewForm = document.getElementById('updateReviewForm');
            const reviewForm = document.getElementById('reviewForm');

            if (updateReviewForm && reviewForm) {
                if (reviewForm.style.display === 'block') {
                    reviewForm.style.display = 'none';
                }

                updateReviewForm.style.display = 'block';
                document.getElementById('updatedReviewTitle').value = title;
                document.getElementById('updatedReviewContent').value = content;
            }
        });
    });

    // submit updated review 
    const submitUpdatedReviewButton = document.getElementById('resubmitReviewBtn');
    if (submitUpdatedReviewButton) {
        submitUpdatedReviewButton.addEventListener('click', async (event) => {
            event.preventDefault();
            const title = document.getElementById('updatedReviewTitle').value;
            const content = document.getElementById('updatedReviewContent').value;
            const reviewId = submitUpdatedReviewButton.dataset.reviewId;

            try {
                const response = await fetch(`/api/review/${reviewId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title,
                        content,
                    }),
                });

                if (response.ok) {
                    alert('Review updated successfully!');
                    window.location.reload();
                } else {
                    alert('Failed to update review.');
                }
            } catch (error) {
                console.error('Error updating review:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }
});
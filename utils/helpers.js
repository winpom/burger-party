const format_time = (date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const format_date = (date) => {
  const options = {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  return new Date(date).toLocaleDateString(undefined, options);
};

function convertToStars(rating) {
  const fullStars = Math.floor(rating);
  const remainder = rating - fullStars;
  const halfStar = remainder >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  let stars = '';

  // Full stars
  for (let i = 0; i < fullStars; i++) {
      stars += '★';
  }

  // Half star
  if (halfStar === 1) {
      stars += '☆';
  }

  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
      stars += '☆';
  }

  return stars;
}

module.exports = { format_time, format_date, convertToStars };
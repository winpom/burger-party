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

module.exports = { format_time, format_date };
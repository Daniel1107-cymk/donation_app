export const donationStatusColor = status => {
  let color = '';
  switch (status) {
    case 'Completed':
      color = '#4CAF50';
      break;
    case 'Pending':
      color = '#ABABAB';
      break;
    case 'In Progress':
      color = '#F1811C';
      break;
    default:
      color = '#FFAA4C';
      break;
  }
  return color;
};

const getDateBasedStyling = (date: string): string => {
  const gigDate = new Date(date).setHours(0, 0, 0, 0);
  const now = new Date().setHours(0, 0, 0, 0);

  if (gigDate < now) return 'bg-bj-blue-light text-bj-white';
  if (gigDate > now) return 'bg-bj-blue-dark text-bj-blue-light';
  return 'bg-bj-green-mid font-bold text-2xl';
};
export default getDateBasedStyling;

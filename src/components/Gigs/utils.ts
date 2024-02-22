const dateBasedStatus = (date: string, gigId: string, selectedGig: string): string => {
  if (gigId === selectedGig) return 'bg-bj-green-mid text-bj-white font-bold text-2xl';
  const gigDate = new Date(date).setHours(0, 0, 0, 0);
  const now = new Date().setHours(0, 0, 0, 0);

  if (gigDate < now) return 'bg-bj-blue-light text-bj-white';
  if (gigDate > now) return 'bg-bj-blue-dark text-bj-blue-light';
  return 'bg-bj-green-mid';
};
export default dateBasedStatus;

export const calculateCountdown = (DATE) => {
  if (!DATE || isNaN(new Date(DATE).getTime()))
    throw new Error("No/Invalid date provided to <calculateCountdown>");
  try {
    const endDate = new Date(DATE),
      startDate = new Date(),
      difference = endDate - startDate >= 0 ? (endDate - startDate) / 1000 : 0;

    if (difference) {
      const days = Math.floor(difference / 3600 / 24);
      const hours = Math.floor((difference - days * 3600 * 24) / 3600);
      const minutes = Math.floor(
        (difference - days * 3600 * 24 - hours * 3600) / 60
      );
      const seconds = Math.floor(
        difference - days * 3600 * 24 - hours * 3600 - minutes * 60
      );

      return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      };
    } else {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
  } catch (error) {
    console.error(error);
  }
};

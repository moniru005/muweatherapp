const useFullDate = () => {
  //   Date Formating
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth()+1;
  const day = currentDate.getDay();
  const dayOfWeek = currentDate.getDay();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDayName = daysOfWeek[dayOfWeek];

  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString("en-US", { month: "long" });
  };

  const fullDate = getMonthName(month) + " " + day + ", " + year;

  return [currentDayName, fullDate];
};

export default useFullDate;

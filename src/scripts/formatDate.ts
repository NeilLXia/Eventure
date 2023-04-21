const formatDate = (date: string) => {
  return new Date(Number(date * 1000)).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default formatDate;

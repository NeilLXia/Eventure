const validateURL = (url: string) => {
  if (url.slice(0, 4) !== "http") {
    url = `http://${url}`;
  }
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      return false;
    });
};

export default validateURL;

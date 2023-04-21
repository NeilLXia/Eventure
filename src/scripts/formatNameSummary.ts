const formatNameSummary = (users: any) => {
  if (!users) {
    return "No confirmed attendees";
  }

  let attendeeNames = [];
  users.forEach((user: any) => {
    if (user.attending === "joining") {
      attendeeNames.push(user.first_name);
    }
  });
  if (attendeeNames.length === 0) {
    return "No confirmed attendees";
  } else if (attendeeNames.length === 1) {
    return `${attendeeNames[0]} is going`;
  }
  if (attendeeNames.length === 2) {
    return `${attendeeNames.join(" and ")} are going`;
  }
  if (attendeeNames.length === 3) {
    return `${attendeeNames[0]}, ${attendeeNames[1]} and ${attendeeNames[2]} are going`;
  }
  return `${attendeeNames[0]}, ${attendeeNames[1]} and ${
    attendeeNames.length - 2
  } others are going`;
};

export default formatNameSummary;


export function formatJoinedDate(date: Date) {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
  };
  return parsedDate.toLocaleDateString("en-IN", options);
}

export function formatPostDate(date: Date) {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return parsedDate.toLocaleDateString("en-US", options);
}
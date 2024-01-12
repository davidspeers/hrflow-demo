const _padLeft = (num) => String(num).padStart(2, "0");

export function getDate(dateString) {
  const date = new Date(dateString);
  const day = _padLeft(date.getDate());
  const month = _padLeft(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function getTime(dateString) {
  const date = new Date(dateString);
  const hours = _padLeft(date.getHours());
  const minutes = _padLeft(date.getMinutes());

  return `${hours}:${minutes}`;
}

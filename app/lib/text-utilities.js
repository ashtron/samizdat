export function toTitleCase(string) {
  const capitalizedString = string.charAt(0).toUpperCase() + string.slice(1);
  return capitalizedString.replace(/([A-Z])/g, " $1");
}
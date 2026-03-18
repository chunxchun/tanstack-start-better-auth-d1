export const capitalizeFirstLetterofEachWord = (str: string) => {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join(" ");
}
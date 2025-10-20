// Text ko truncate karne ka utility function
// Zyada lamba text ho toh use short kar ke ... lagata hai
export const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

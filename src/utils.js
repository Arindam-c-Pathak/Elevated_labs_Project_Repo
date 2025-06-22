// src/utils.js

/**
 * Format ISO date string to readable format
 * @param {string} isoStr
 * @returns {string}
 */
export function formatDate(isoStr) {
  const date = new Date(isoStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

/**
 * Debounce a function to limit rapid calls
 * @param {Function} fn
 * @param {number} delay
 */
export function debounce(fn, delay = 300) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Truncate long text with ellipsis
 * @param {string} str
 * @param {number} max
 * @returns {string}
 */
export function truncate(str, max = 100) {
  return str.length > max ? str.slice(0, max) + "..." : str;
}

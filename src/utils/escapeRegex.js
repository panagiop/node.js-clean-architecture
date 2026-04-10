/**
 * Escapes a string for safe use inside a RegExp constructed from user input.
 * @param {string} text
 * @returns {string}
 */
export default function escapeRegex(text) {
  if (typeof text !== 'string') {
    return '';
  }
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

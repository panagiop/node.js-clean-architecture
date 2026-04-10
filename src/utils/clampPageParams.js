const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

/**
 * Normalizes pagination query params and caps page size to protect the DB.
 * @param {unknown} page
 * @param {unknown} perPage
 * @param {{ maxPerPage?: number }} [options]
 * @returns {{ page: number, perPage: number }}
 */
export default function clampPageParams(page, perPage, options = {}) {
  const maxPerPage = options.maxPerPage ?? 100;

  let p = parseInt(page, 10);
  if (!Number.isFinite(p) || p < 1) {
    p = DEFAULT_PAGE;
  } else {
    p = Math.min(Math.floor(p), 1_000_000);
  }

  let pp = parseInt(perPage, 10);
  if (!Number.isFinite(pp) || pp < 1) {
    pp = DEFAULT_PER_PAGE;
  } else {
    pp = Math.min(Math.floor(pp), maxPerPage);
  }

  return { page: p, perPage: pp };
}

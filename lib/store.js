const slug = process.env.NEXT_PUBLIC_STORE_SLUG;
export const STORE_SLUG = slug && slug !== 'undefined' && slug !== 'null' ? slug : null;
export const IS_MAIN = !STORE_SLUG;

export function storeFilter(field = 'store_slug') {
  if (IS_MAIN) return {};
  return { [field]: STORE_SLUG };
}

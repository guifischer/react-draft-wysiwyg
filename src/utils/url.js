const ATTRIBUTE_WHITESPACES = /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205f\u3000]/g; // eslint-disable-line no-control-regex
const SAFE_URL = /^(?:(?:https?|ftps?|mailto):|[^a-z]|[a-z+.-]+(?:[^a-z+.:-]|$))/i;

/**
 * Returns a safe URL based on a given value.
 * A URL is considered safe if it is safe for the user (does not contain any malicious code).
 * If a URL is considered unsafe, a simple `"#"` is returned.
 *
 * Based on: https://github.com/ckeditor/ckeditor5/blob/bce8267e16fccb25448b4c68acc3bf54336aa087/packages/ckeditor5-link/src/utils.js#L63
 */
export function ensureSafeUrl(url) {
  const normalizedUrl = String(url).replace(ATTRIBUTE_WHITESPACES, '');
  return normalizedUrl.match(SAFE_URL) ? url : '#';
}

/***************************************************************************************/

const MMFMATCH_URL = /(?:https?:\/\/)?(?:www\.)?(?:myminifactory\.com)?(?:\/object\/3d-print-)(.*)\/?/;
const MMF_PREFIX = 'https://www.myminifactory.com/object/card/';


/**
 * @param link
 * @returns {boolean}
 */
 export function isMMF(link) {
  return MMFMATCH_URL.test(link)
}

/**
 * @param link
 * @returns {{id: string, profile: string, src: string, link: string}}
 */
 export function getMMFInfos(link)
 {
     if (isMMF(link)) {
         //TODO ping to see if it exists (not 404)
         const id = link.match(MMFMATCH_URL)[1];
         return {
             profile: 'mmf',
             id: id,
             src: `${MMF_PREFIX}${id}`,
             link,
         };
     }
     return undefined;
 }
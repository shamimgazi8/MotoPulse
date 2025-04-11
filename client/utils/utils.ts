//remove tags
export const remove_tags = (_html: any) => {
  let html = _html?.toString();
  let strippedString = html?.replace(/(<([^>]+)>)/gi, '');
  return strippedString;
};
//printe excerpt
export const excerpt = (_html: any, count = 100) => {
  const text = remove_tags(_html)
    ?.toString()
    .replaceAll('&nbsp;', ' ')
    .replaceAll(/"/g, '');
  return text?.slice(0, count) + (text?.length > count ? '...' : '');
};

export function capitalizeFirstLetter(string: any) {
  const letterCorrection = string.charAt(0).toUpperCase() + string.slice(1);
  const space = letterCorrection.replace('-', ' ');

  return space
    .split(' ')
    .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

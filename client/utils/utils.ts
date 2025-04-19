import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
// Remove HTML tags from a string
export const remove_tags = (_html: any) => {
  const html = String(_html || "");
  return html.replace(/(<([^>]+)>)/gi, "");
};

// Print excerpt with plain text and character limit
export const excerpt = (_html: any, count = 100) => {
  const text = remove_tags(_html)
    .replaceAll("&nbsp;", " ")
    .replaceAll(/"/g, "");

  return text.slice(0, count) + (text.length > count ? "..." : "");
};

// Capitalize the first letter of each word, replacing dashes with spaces
export function capitalizeFirstLetter(input: any) {
  if (!input) return "";

  const str = String(input).replace(/-/g, " ");

  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const getUserIdFromToken = () => {
  const token = Cookies.get("token");
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    return decoded?.id || null;
  } catch {
    return null;
  }
};

type linkTypes = "banner" | "avatar";

export function getFileLink(
  link?: string,
  type?: linkTypes,
  isLocal?: boolean
) {
  if (isLocal) return link;
  if (!link) {
    if (type == "avatar")
      return "https://ionicframework.com/docs/img/demos/avatar.svg";
  }
  return import.meta.env.VITE_FILES_URL + link;
}

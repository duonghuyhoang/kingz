import { renderOgImage, ogContentType, ogSize } from "@/lib/ogImage";

export const alt = "KINGZ — Full-stack developer";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage("en");
}

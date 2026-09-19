import { renderOgImage, ogContentType, ogSize } from "@/lib/ogImage";

export const alt = "KINGZ — Lập trình viên full-stack";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImageVi() {
  return renderOgImage("vi");
}

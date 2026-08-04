import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "R.M OPTICAL",
    short_name: "RM Optical",
    description: "Premium Optical Store & Computerised Eye Testing",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0A2E73",

    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
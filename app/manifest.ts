import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Akhdan Ravi Andaman — Software Engineer & Business Development Specialist",
    short_name: "Akhdan RVY",
    description:
      "Portfolio of Akhdan Ravi Andaman — Software Engineer & Business Development Specialist from Bogor, Indonesia.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f5ee",
    theme_color: "#c9a84c",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

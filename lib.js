import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
//...

export const client = createClient({
  projectId: "4jkut4mk",
  dataset: "production",
  apiVersion: "2022-03-25",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlfor = (source) => builder.image(source);

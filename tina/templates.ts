import type { TinaField } from "tinacms";
export function blogFields() {
  return [
    {
      type: "string",
      name: "title",
      label: "Title",
      required: true,
    },
    {
      type: "string",
      name: "author",
      label: "Author",
    },
    {
      type: "datetime",
      name: "date",
      label: "Date",
      required: true,
    },
    {
      type: "string",
      name: "url",
      label: "URL",
    },
    {
      type: "string",
      name: "categories",
      label: "Category",
      list: true,
      options: ["Tech", "Review", "Essay", "Info", "Travel"],
    },
    {
      type: "string",
      name: "description",
      label: "Description",
    },
    {
      type: "string",
      name: "tags",
      label: "Tag",
      list: true,
      ui: {
        component: "tags",
      },
    },
    {
      type: "image",
      name: "image",
      label: "Featured Image",
    },
  ] as TinaField[];
}

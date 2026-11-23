import { defineField, defineType } from "sanity";

export const collaborator = defineType({
  name: "collaborator",
  title: "Collaborator",
  type: "document",
  icon: () => "🤝",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Name or title of the collaboration / event.",
      validation: (Rule) => Rule.required().min(3).max(200),
    }),

    defineField({
      name: "date",
      title: "Date",
      type: "date",
      options: { dateFormat: "MMMM D, YYYY" },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 10,
      validation: (Rule) => Rule.integer().positive(),
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "date",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      const formatted = subtitle
        ? new Date(subtitle + "T00:00:00").toLocaleDateString("en-IN", {
            year: "numeric", month: "short", day: "numeric",
          })
        : "No date";
      return { title, subtitle: formatted, media };
    },
  },

  orderings: [
    {
      title: "Date (newest first)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }, { field: "_id", direction: "desc" }],
    },
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});

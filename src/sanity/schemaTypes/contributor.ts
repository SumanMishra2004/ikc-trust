import { defineField, defineType } from "sanity";

export const contributor = defineType({
  name: "contributor",
  title: "Contributor",
  type: "document",
  icon: () => "🙏",

  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      description: "The contributor's name as it should appear on the page.",
      validation: (Rule) => Rule.required().min(2).max(120),
    }),

    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "City or region (optional). e.g. 'Kolkata', 'New Delhi'",
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Grouping for display — Patron, Benefactor, Supporter, or Community.",
      options: {
        list: [
          { title: "Patron", value: "Patron" },
          { title: "Benefactor", value: "Benefactor" },
          { title: "Supporter", value: "Supporter" },
          { title: "Community", value: "Community" },
        ],
        layout: "radio",
      },
      initialValue: "Community",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "anonymous",
      title: "Anonymous?",
      type: "boolean",
      description: "If true, name is hidden and shown as 'Anonymous Donor'.",
      initialValue: false,
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first within their category.",
      initialValue: 10,
      validation: (Rule) => Rule.integer().positive(),
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "category",
      anonymous: "anonymous",
    },
    prepare({ title, subtitle, anonymous }) {
      return {
        title: anonymous ? "Anonymous Donor" : title,
        subtitle: subtitle ?? "Community",
      };
    },
  },

  orderings: [
    {
      title: "Category then Order",
      name: "categoryOrder",
      by: [
        { field: "category", direction: "asc" },
        { field: "order", direction: "asc" },
        { field: "name", direction: "asc" },
      ],
    },
    {
      title: "Name A–Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
});

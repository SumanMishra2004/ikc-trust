import { defineField, defineType } from "sanity";

const PARTNERSHIP_TYPES = [
  { title: "MoU (Memorandum of Understanding)", value: "MoU" },
  { title: "Academic Collaboration", value: "Academic" },
  { title: "Corporate CSR", value: "CSR" },
  { title: "Government Alliance", value: "Government" },
  { title: "NGO Partnership", value: "NGO" },
  { title: "Medical Society", value: "Medical" },
  { title: "Other", value: "Other" },
];

export const partnershipEvent = defineType({
  name: "partnershipEvent",
  title: "Partnership Event",
  type: "document",
  icon: () => "🤝",

  fields: [
    defineField({
      name: "title",
      title: "Partnership Title",
      type: "string",
      description: "e.g. 'MoU with Sovarani Memorial College'",
      validation: (Rule) => Rule.required().min(5).max(200),
    }),

    defineField({
      name: "partnershipType",
      title: "Partnership Type",
      type: "string",
      options: { list: PARTNERSHIP_TYPES, layout: "dropdown" },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "date",
      title: "Date Signed / Event Date",
      type: "date",
      options: { dateFormat: "MMMM D, YYYY" },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "objective",
      title: "Objective",
      type: "string",
      description: "One concise sentence describing the purpose of this partnership.",
      validation: (Rule) => Rule.required().min(10).max(300),
    }),

    defineField({
      name: "venue",
      title: "Venue / Location",
      type: "string",
      description: "Physical location where the MoU was signed or event took place.",
    }),

    defineField({
      name: "partnerName",
      title: "Partner Organisation Name",
      type: "string",
      description: "Full name of the partnering institution or organisation.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 10,
      description: "Full narrative about this partnership — scope, goals, activities planned.",
      validation: (Rule) => Rule.required().min(100),
    }),

    defineField({
      name: "images",
      title: "Event Images",
      type: "array",
      description: "Photos from the signing ceremony or related event. First image shown as primary.",
      of: [{ type: "initiativeImage" }],
      options: { layout: "grid" },
    }),

    defineField({
      name: "mediaCoverage",
      title: "Media Coverage",
      type: "array",
      description: "Press coverage or YouTube videos about this partnership.",
      of: [{ type: "mediaCoverageItem" }],
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first. Use multiples of 10.",
      initialValue: 10,
      validation: (Rule) => Rule.integer().positive(),
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "date",
      partnershipType: "partnershipType",
      media: "images.0.asset",
    },
    prepare({ title, subtitle, partnershipType, media }) {
      const formattedDate = subtitle
        ? new Date(subtitle + "T00:00:00").toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "No date";
      return {
        title: title || "Untitled Partnership",
        subtitle: `${partnershipType || "Partnership"} · ${formattedDate}`,
        media,
      };
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

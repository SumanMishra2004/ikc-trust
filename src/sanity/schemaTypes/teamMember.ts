import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  icon: () => "👤",

  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(120),
    }),

    defineField({
      name: "position",
      title: "Position / Role",
      type: "string",
      description: "e.g. 'Founder & President', 'Director — Education & Outreach'",
      validation: (Rule) => Rule.required().max(160),
    }),

    defineField({
      name: "affiliation",
      title: "Affiliation",
      type: "string",
      description: "Organisation or division this person represents.",
      validation: (Rule) => Rule.required().max(200),
    }),

    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      description: "Portrait photo. Use a square or portrait crop for best results.",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "linkedin",
      title: "LinkedIn URL",
      type: "url",
      description: "Full LinkedIn profile URL (optional).",
    }),

    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      description: "Contact email (optional — shown as a mailto link).",
      validation: (Rule) =>
        Rule.custom((val) => {
          if (!val) return true;
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? true : "Must be a valid email address.";
        }),
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first. Use multiples of 10 to leave room for reordering.",
      initialValue: 10,
      validation: (Rule) => Rule.required().integer().positive(),
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "position",
      media: "photo",
    },
  },

  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Name A–Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
});

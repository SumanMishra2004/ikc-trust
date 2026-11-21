import { defineField, defineType } from "sanity";

export const advisoryBoardMember = defineType({
  name: "advisoryBoardMember",
  title: "Advisory Board Member",
  type: "document",
  icon: () => "🎓",

  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(120),
    }),

    defineField({
      name: "affiliation",
      title: "Affiliation",
      type: "string",
      description: "Institution or organisation (e.g. 'Indian Institute of Management, Kolkata').",
      validation: (Rule) => Rule.required().max(200),
    }),

    defineField({
      name: "expertise",
      title: "Area of Expertise",
      type: "string",
      description: "Short label shown as a badge (e.g. 'Environmental Policy', 'Public Health').",
      validation: (Rule) => Rule.max(80),
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
      name: "description",
      title: "Profile Description",
      type: "text",
      rows: 6,
      description:
        "2–4 sentences about this person's background and their contribution to IKC Trust.",
      validation: (Rule) => Rule.required().min(50).max(600),
    }),

    defineField({
      name: "isFeatured",
      title: "Featured Member",
      type: "boolean",
      description:
        "Mark as featured to display this person in the prominent dark card at the top of the advisory board page. Only one member should be featured at a time.",
      initialValue: false,
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first. The featured member always appears first regardless.",
      initialValue: 10,
      validation: (Rule) => Rule.required().integer().positive(),
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "affiliation",
      featured: "isFeatured",
      media: "photo",
    },
    prepare({ title, subtitle, featured, media }) {
      return {
        title: `${featured ? "⭐ " : ""}${title || "Unnamed Member"}`,
        subtitle: subtitle,
        media,
      };
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

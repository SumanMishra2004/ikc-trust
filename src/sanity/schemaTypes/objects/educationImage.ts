import { defineField, defineType } from "sanity";

export const educationImage = defineType({
  name: "educationImage",
  title: "Event Image",
  type: "object",
  fields: [
    defineField({
      name: "asset",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
      description:
        "Describe the image for screen readers and search engines. E.g. 'Students attending AI seminar at Jadavpur University'.",
      validation: (Rule) =>
        Rule.required().warning("Alt text improves accessibility and SEO."),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Optional caption displayed below the image in the gallery.",
    }),
  ],
  preview: {
    select: {
      title: "alt",
      subtitle: "caption",
      media: "asset",
    },
  },
});

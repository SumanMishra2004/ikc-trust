import { defineField, defineType } from "sanity";

/**
 * Shared image object type used by all non-education initiative event schemas
 * (healthcare, environment, social-welfare, disaster-relief, culture-sports).
 */
export const initiativeImage = defineType({
  name: "initiativeImage",
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
        "Describe the image for screen readers and search engines.",
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

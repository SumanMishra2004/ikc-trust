import { defineField, defineType } from "sanity";

const COVERAGE_TYPES = [
  { title: "Image", value: "image" },
  { title: "YouTube Video", value: "youtube" },
];

/**
 * A single media coverage entry — either an image or a YouTube embed.
 * Attached as an array to any initiative event document.
 */
export const mediaCoverageItem = defineType({
  name: "mediaCoverageItem",
  title: "Media Coverage Item",
  type: "object",
  fields: [
    defineField({
      name: "type",
      title: "Coverage Type",
      type: "string",
      description: "Choose whether this coverage is a photograph or a YouTube video.",
      options: {
        list: COVERAGE_TYPES,
        layout: "radio",
      },
      initialValue: "image",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "title",
      title: "Title / Headline",
      type: "string",
      description: "Short headline for this coverage item (e.g. newspaper name, video title).",
      validation: (Rule) => Rule.required().max(200),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      description:
        "Brief description of the coverage — context, source, date published, or what was covered.",
      validation: (Rule) => Rule.max(500),
    }),

    // ── Image branch ─────────────────────────────────────────────────────────
    defineField({
      name: "image",
      title: "Coverage Image",
      type: "image",
      description: "Upload the coverage photograph (newspaper clipping, screenshot, etc.).",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.type !== "image",
    }),

    defineField({
      name: "imageAlt",
      title: "Image Alt Text",
      type: "string",
      description: "Describe the image for accessibility.",
      hidden: ({ parent }) => parent?.type !== "image",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { type?: string };
          if (parent?.type === "image" && !value) return "Alt text is required for images.";
          return true;
        }),
    }),

    // ── YouTube branch ───────────────────────────────────────────────────────
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      description:
        "Full YouTube video URL (e.g. https://www.youtube.com/watch?v=XXXXXXXXXXX or https://youtu.be/XXXXXXXXXXX).",
      hidden: ({ parent }) => parent?.type !== "youtube",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { type?: string };
          if (parent?.type !== "youtube") return true;
          if (!value) return "YouTube URL is required.";
          const isYoutube = /youtube\.com\/watch|youtu\.be\//.test(value as string);
          if (!isYoutube) return "Must be a valid YouTube URL.";
          return true;
        }),
    }),

    defineField({
      name: "source",
      title: "Source / Publication",
      type: "string",
      description: "Name of the publication, channel, or media outlet (e.g. 'The Hindu', 'DD News').",
      validation: (Rule) => Rule.max(100),
    }),

    defineField({
      name: "coverageDate",
      title: "Coverage Date",
      type: "date",
      description: "When this piece of coverage was published.",
      options: { dateFormat: "MMMM D, YYYY" },
    }),
  ],
  preview: {
    select: {
      title: "title",
      type: "type",
      source: "source",
      image: "image",
    },
    prepare({ title, type, source, image }) {
      return {
        title: title || "Untitled Coverage",
        subtitle: `${type === "youtube" ? "YouTube" : "Image"} · ${source || "Unknown source"}`,
        media: type === "image" ? image : () => "📺",
      };
    },
  },
});

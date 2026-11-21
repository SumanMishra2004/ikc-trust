import { defineField, defineType } from "sanity";

/**
 * Reusable video object — attached to any initiative event.
 * Stored as a Sanity file asset (uploaded MP4/WebM/MOV).
 * Optional: title + caption for accessibility and display.
 */
export const initiativeVideo = defineType({
  name: "initiativeVideo",
  title: "Event Video",
  type: "object",
  fields: [
    defineField({
      name: "asset",
      title: "Video File",
      type: "file",
      description: "Upload an MP4, WebM, or MOV file. Recommended: H.264 MP4, max 200 MB.",
      options: {
        accept: "video/mp4,video/webm,video/quicktime",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Video Title",
      type: "string",
      description: "Short title shown as overlay label (e.g. 'Opening Ceremony').",
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Optional caption displayed below the video.",
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: "poster",
      title: "Thumbnail / Poster Image",
      type: "image",
      description:
        "Optional still image shown before the video plays. If omitted, the browser picks a frame.",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "caption",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Untitled Video",
        subtitle: subtitle || "Video",
        media: () => "🎬",
      };
    },
  },
});

import { defineField, defineType } from "sanity";

const CONFERENCE_MODES = [
  { title: "In-Person", value: "In-Person" },
  { title: "Online", value: "Online" },
  { title: "Hybrid", value: "Hybrid" },
];

export const conferenceEvent = defineType({
  name: "conferenceEvent",
  title: "Conference Event",
  type: "document",
  icon: () => "🎤",

  fields: [
    defineField({
      name: "title",
      title: "Conference Title",
      type: "string",
      description: "The full name of the conference.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "venue",
      title: "Venue",
      type: "string",
      description: "Physical location or venue name. Leave blank for fully online conferences.",
    }),

    defineField({
      name: "mode",
      title: "Mode",
      type: "string",
      description: "How the conference was conducted.",
      options: {
        list: CONFERENCE_MODES,
        layout: "radio",
      },
    }),

    defineField({
      name: "timing",
      title: "Timing",
      type: "string",
      description: 'e.g. "9:00 AM – 5:00 PM"',
    }),

    defineField({
      name: "date",
      title: "Conference Date",
      type: "date",
      description: "The date the conference took place (or begins, for multi-day conferences).",
      options: {
        dateFormat: "MMMM D, YYYY",
      },
    }),

    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 4,
      description: "A short plain-text blurb about the conference (shown as a highlight).",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "array",
      description:
        "Full narrative description — rich text with headings, bold/italic, lists, blockquotes, links, and code.",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Heading 4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Underline", value: "underline" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
      ],
    }),

    defineField({
      name: "images",
      title: "Conference Images",
      type: "array",
      description:
        "Upload photographs from the conference. The first image is used as the primary image. Drag to reorder.",
      of: [{ type: "initiativeImage" }],
      options: {
        layout: "grid",
      },
    }),

    defineField({
      name: "video",
      title: "Conference Video",
      type: "initiativeVideo",
      description: "Optional video from the conference.",
    }),

    defineField({
      name: "abstractBook",
      title: "Abstract Book (PDF)",
      type: "file",
      description: "Upload the conference abstract book as a PDF.",
      options: {
        accept: "application/pdf",
      },
    }),

    defineField({
      name: "link",
      title: "External Link",
      type: "url",
      description: "Optional link to the conference website or related resource.",
    }),
  ],

  orderings: [
    {
      title: "Date (newest first)",
      name: "dateDesc",
      by: [
        { field: "date", direction: "desc" },
        { field: "_id", direction: "desc" },
      ],
    },
    {
      title: "Date (oldest first)",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "date",
      media: "images.0.asset",
    },
    prepare({ title, subtitle, media }) {
      const formattedDate = subtitle
        ? new Date(subtitle + "T00:00:00").toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "No date";

      return {
        title: title || "Untitled Conference",
        subtitle: `Conference · ${formattedDate}`,
        media,
      };
    },
  },
});

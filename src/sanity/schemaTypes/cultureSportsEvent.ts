import { defineField, defineType } from "sanity";

const EVENT_TYPES = [
  { title: "Cultural Program", value: "Cultural Program" },
  { title: "Sports Tournament", value: "Sports Tournament" },
  { title: "Arts Exhibition", value: "Arts Exhibition" },
  { title: "Festival", value: "Festival" },
  { title: "Workshop", value: "Workshop" },
  { title: "Competition", value: "Competition" },
  { title: "Other", value: "Other" },
];

const EVENT_MODES = [
  { title: "Offline", value: "Offline" },
  { title: "Online", value: "Online" },
  { title: "Hybrid", value: "Hybrid" },
];

export const cultureSportsEvent = defineType({
  name: "cultureSportsEvent",
  title: "Culture & Sports Event",
  type: "document",
  icon: () => "🎭",

  fields: [
    defineField({
      name: "title",
      title: "Event Title",
      type: "string",
      description: "The full name of the culture or sports activity or event.",
      validation: (Rule) => Rule.required().min(5).max(200),
    }),

    defineField({
      name: "eventType",
      title: "Event Type",
      type: "string",
      description: "Category of this culture or sports activity.",
      options: {
        list: EVENT_TYPES,
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "date",
      title: "Event Date",
      type: "date",
      description: "The date the event took place (or begins, for multi-day events).",
      options: {
        dateFormat: "MMMM D, YYYY",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "objective",
      title: "Objective",
      type: "string",
      description:
        "A single concise sentence describing the event's purpose. Displayed prominently on the page.",
      validation: (Rule) => Rule.required().min(10).max(300),
    }),

    defineField({
      name: "venue",
      title: "Venue",
      type: "string",
      description:
        "Physical location or venue name. Leave blank for fully online events.",
    }),

    defineField({
      name: "mode",
      title: "Mode",
      type: "string",
      description: "How the event was conducted.",
      options: {
        list: EVENT_MODES,
        layout: "radio",
      },
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 20,
      description:
        "Full narrative description of the event. Write in Markdown — supports headings (##, ###), bold (**text**), italic (*text*), bullet lists, numbered lists, blockquotes (>), and links. Minimum 1,000 characters · Maximum 1,500 characters.",
      validation: (Rule) =>
        Rule.required().custom((value: string | undefined) => {
          if (!value) return "Description is required.";
          const charCount = value.length;
          if (charCount < 1000)
            return `Description is too short (${charCount} characters). Minimum is 1,000 characters.`;
          if (charCount > 1500)
            return `Description is too long (${charCount} characters). Maximum is 1,500 characters.`;
          return true;
        }),
    }),

    defineField({
      name: "images",
      title: "Event Images",
      type: "array",
      description:
        "Upload photographs from the event. The first image is shown as the primary image. Drag to reorder.",
      of: [
        {
          type: "initiativeImage",
        },
      ],
      options: {
        layout: "grid",
      },
    }),

    defineField({
      name: "videos",
      title: "Event Videos",
      type: "array",
      description:
        "Upload video clips from the event (MP4/WebM/MOV). Videos appear first in the media slider with autoplay. Drag to reorder.",
      of: [{ type: "initiativeVideo" }],
    }),

    defineField({
      name: "mediaCoverage",
      title: "Media Coverage",
      type: "array",
      description:
        "Press coverage, photo coverage, or YouTube videos about this event. Each entry can be an image (newspaper/magazine clipping, screenshot) or a YouTube link.",
      of: [{ type: "mediaCoverageItem" }],
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "date",
      eventType: "eventType",
      media: "images.0.asset",
    },
    prepare({ title, subtitle, eventType, media }) {
      const formattedDate = subtitle
        ? new Date(subtitle + "T00:00:00").toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "No date";

      return {
        title: title || "Untitled Event",
        subtitle: `${eventType || "Event"} · ${formattedDate}`,
        media,
      };
    },
  },

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
    {
      title: "Title A–Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});

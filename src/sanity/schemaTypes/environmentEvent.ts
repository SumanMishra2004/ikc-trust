import { defineField, defineType } from "sanity";

const EVENT_TYPES = [
  { title: "Tree Plantation", value: "Tree Plantation" },
  { title: "Clean-up Drive", value: "Clean-up Drive" },
  { title: "Awareness Campaign", value: "Awareness Campaign" },
  { title: "Workshop", value: "Workshop" },
  { title: "Seminar", value: "Seminar" },
  { title: "Conservation Project", value: "Conservation Project" },
  { title: "Other", value: "Other" },
];

const EVENT_MODES = [
  { title: "Offline", value: "Offline" },
  { title: "Online", value: "Online" },
  { title: "Hybrid", value: "Hybrid" },
];

export const environmentEvent = defineType({
  name: "environmentEvent",
  title: "Environment Event",
  type: "document",
  icon: () => "🌱",

  fields: [
    defineField({
      name: "title",
      title: "Event Title",
      type: "string",
      description: "The full name of the environment activity or event.",
      validation: (Rule) => Rule.required().min(5).max(200),
    }),

    defineField({
      name: "eventType",
      title: "Event Type",
      type: "string",
      description: "Category of this environment activity.",
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
        "Physical location or site name. Leave blank for fully online events.",
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

import { type StructureResolver } from "sanity/structure";

/**
 * Custom Studio sidebar structure for IKC Trust.
 *
 * Organised into initiative groups so the sidebar scales cleanly as new
 * document types are added. To add a new initiative:
 *   1. Create its schema in src/sanity/schemaTypes/ and register it in index.ts.
 *   2. Add a new S.listItem() inside the matching group (or create a new group).
 *
 * Icon reference: https://icons.sanity.io  (Sanity uses Heroicons v2 internally)
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("IKC Trust Content")
    .items([
      // ── Education ────────────────────────────────────────────────────────
      S.listItem()
        .id("education")
        .title("Education & Knowledge")
        .icon(() => "📚")
        .child(
          S.list()
            .title("Education")
            .items([
              S.listItem()
                .id("educationEvents")
                .title("Events")
                .icon(() => "🎓")
                .child(
                  S.documentTypeList("educationEvent")
                    .title("Education Events")
                    .defaultOrdering([
                      { field: "date", direction: "desc" },
                      { field: "_id", direction: "desc" },
                    ])
                ),
            ])
        ),

      S.divider(),

      // ── Placeholder groups — uncomment and add schemas as initiatives grow ──

      // S.listItem()
      //   .id("healthcare")
      //   .title("Healthcare")
      //   .icon(() => "🏥")
      //   .child(
      //     S.documentTypeList("healthcareEvent").title("Healthcare Events")
      //   ),

      // S.listItem()
      //   .id("environment")
      //   .title("Environment")
      //   .icon(() => "🌱")
      //   .child(
      //     S.documentTypeList("environmentEvent").title("Environment Events")
      //   ),

      // S.listItem()
      //   .id("socialWelfare")
      //   .title("Social Welfare")
      //   .icon(() => "🤝")
      //   .child(
      //     S.documentTypeList("socialWelfareEvent").title("Social Welfare Events")
      //   ),

      // S.listItem()
      //   .id("disasterRelief")
      //   .title("Disaster Relief")
      //   .icon(() => "🆘")
      //   .child(
      //     S.documentTypeList("disasterReliefEvent").title("Disaster Relief Events")
      //   ),

      // S.listItem()
      //   .id("cultureSports")
      //   .title("Culture & Sports")
      //   .icon(() => "🎭")
      //   .child(
      //     S.documentTypeList("cultureSportsEvent").title("Culture & Sports Events")
      //   ),
    ]);

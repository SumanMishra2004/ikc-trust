import { type StructureResolver } from "sanity/structure";

/**
 * Custom Studio sidebar structure for IKC Trust.
 *
 * Organised into initiative groups so the sidebar scales cleanly as new
 * document types are added. To add a new initiative:
 *   1. Create its schema in src/sanity/schemaTypes/ and register it in index.ts.
 *   2. Add a new S.listItem() inside the matching group (or create a new group).
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

      // ── Healthcare ───────────────────────────────────────────────────────
      S.listItem()
        .id("healthcare")
        .title("Healthcare")
        .icon(() => "🏥")
        .child(
          S.list()
            .title("Healthcare")
            .items([
              S.listItem()
                .id("healthcareEvents")
                .title("Events")
                .icon(() => "💊")
                .child(
                  S.documentTypeList("healthcareEvent")
                    .title("Healthcare Events")
                    .defaultOrdering([
                      { field: "date", direction: "desc" },
                      { field: "_id", direction: "desc" },
                    ])
                ),
            ])
        ),

      S.divider(),

      // ── Environment ──────────────────────────────────────────────────────
      S.listItem()
        .id("environment")
        .title("Environment")
        .icon(() => "🌱")
        .child(
          S.list()
            .title("Environment")
            .items([
              S.listItem()
                .id("environmentEvents")
                .title("Events")
                .icon(() => "🌿")
                .child(
                  S.documentTypeList("environmentEvent")
                    .title("Environment Events")
                    .defaultOrdering([
                      { field: "date", direction: "desc" },
                      { field: "_id", direction: "desc" },
                    ])
                ),
            ])
        ),

      S.divider(),

      // ── Social Welfare ───────────────────────────────────────────────────
      S.listItem()
        .id("socialWelfare")
        .title("Social Welfare")
        .icon(() => "🤝")
        .child(
          S.list()
            .title("Social Welfare")
            .items([
              S.listItem()
                .id("socialWelfareEvents")
                .title("Events")
                .icon(() => "🫶")
                .child(
                  S.documentTypeList("socialWelfareEvent")
                    .title("Social Welfare Events")
                    .defaultOrdering([
                      { field: "date", direction: "desc" },
                      { field: "_id", direction: "desc" },
                    ])
                ),
            ])
        ),

      S.divider(),

      // ── Disaster Relief ──────────────────────────────────────────────────
      S.listItem()
        .id("disasterRelief")
        .title("Disaster Relief")
        .icon(() => "🆘")
        .child(
          S.list()
            .title("Disaster Relief")
            .items([
              S.listItem()
                .id("disasterReliefEvents")
                .title("Events")
                .icon(() => "⛑️")
                .child(
                  S.documentTypeList("disasterReliefEvent")
                    .title("Disaster Relief Events")
                    .defaultOrdering([
                      { field: "date", direction: "desc" },
                      { field: "_id", direction: "desc" },
                    ])
                ),
            ])
        ),

      S.divider(),

      // ── Culture & Sports ─────────────────────────────────────────────────
      S.listItem()
        .id("cultureSports")
        .title("Culture & Sports")
        .icon(() => "🎭")
        .child(
          S.list()
            .title("Culture & Sports")
            .items([
              S.listItem()
                .id("cultureSportsEvents")
                .title("Events")
                .icon(() => "🏆")
                .child(
                  S.documentTypeList("cultureSportsEvent")
                    .title("Culture & Sports Events")
                    .defaultOrdering([
                      { field: "date", direction: "desc" },
                      { field: "_id", direction: "desc" },
                    ])
                ),
            ])
        ),

      S.divider(),

      // ── Team & Advisory Board ────────────────────────────────────────────
      S.listItem()
        .id("people")
        .title("People")
        .icon(() => "👥")
        .child(
          S.list()
            .title("People")
            .items([
              S.listItem()
                .id("teamMembers")
                .title("Team Members")
                .icon(() => "👤")
                .child(
                  S.documentTypeList("teamMember")
                    .title("Team Members")
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                ),

              S.listItem()
                .id("advisoryBoardMembers")
                .title("Advisory Board")
                .icon(() => "🎓")
                .child(
                  S.documentTypeList("advisoryBoardMember")
                    .title("Advisory Board Members")
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                ),
            ])
        ),
    ]);

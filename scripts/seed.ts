import { createClient } from "@supabase/supabase-js";
import {
  defaults,
  sampleProjects,
  samplePlayground,
  sampleArticles,
} from "../lib/defaults";
// Explicit only. Run with node --env-file=.env.local --import tsx scripts/seed.ts.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL,
  key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key)
  throw new Error("Set the Supabase URL and server-only service role key.");
const db = createClient(url, key, { auth: { persistSession: false } });
async function main() {
  for (const [index, kind] of [
    "projects",
    "playground_items",
    "articles",
  ].entries()) {
    for (const [n, item] of [sampleProjects, samplePlayground, sampleArticles][
      index
    ].entries()) {
      const id = `00000000-0000-4000-800${index}-${String(n + 1).padStart(12, "0")}`;
      const exists = await db
        .from(kind)
        .select("id")
        .eq("id", id)
        .maybeSingle();
      if (exists.error) throw exists.error;
      if (exists.data) continue;
      const resource = await db.from(kind).insert({ id, seed: true });
      if (resource.error) throw resource.error;
      const { id: unused, ...data } = item;
      void unused;
      const revision = await db
        .from(kind + "_revisions")
        .insert({ resource_id: id, state: "draft", data });
      if (revision.error) throw revision.error;
    }
  }
  const existing = await db
    .from("settings_revisions")
    .select("id")
    .eq("state", "draft")
    .maybeSingle();
  if (existing.error) throw existing.error;
  if (!existing.data) {
    const r = await db
      .from("settings_revisions")
      .insert({ state: "draft", data: defaults });
    if (r.error) throw r.error;
  }
  console.log(
    "Starter drafts created. Nothing was published. Existing records were preserved.",
  );
}
main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});

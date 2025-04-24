// utils/wiki.ts
export async function fetchWikiSummary(
  brand: string,
  model: string
): Promise<string> {
  const title = `${brand}`.replace(/\s+/g, "_");

  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`
    );
    if (!res.ok) throw new Error("No summary found");
    const data = await res.json();

    return data.extract || "No description available.";
  } catch (error) {
    console.error("Wiki fetch failed:", error);
    return "No description available.";
  }
}

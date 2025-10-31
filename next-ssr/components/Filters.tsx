'use client';

export default function Filters({
  categories,
  currentCategory,
  currentSort
}: {
  categories: string[];
  currentCategory?: string | null;
  currentSort?: string | null;
}) {
  const sorts = [
    { key: "relevance", label: "Relevance" },
    { key: "price-asc", label: "Price: Low to High" },
    { key: "price-desc", label: "Price: High to Low" },
    { key: "title-asc", label: "Title: A–Z" },
    { key: "title-desc", label: "Title: Z–A" }
  ];

  const link = (cat?: string | null, sort?: string | null) => {
    const params = new URLSearchParams();
    if (cat && cat !== "all") params.set("category", cat);
    if (sort && sort !== "relevance") params.set("sort", sort);
    const qs = params.toString();
    return qs ? `/?${qs}` : "/";
  };

  return (
    <section className="toolbar" aria-label="Filters and sorting">
      <div className="group">
        <label className="label">Category</label>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <a href={link("all", currentSort ?? undefined)} className="badge" aria-current={!currentCategory ? "page" : undefined}>All</a>
          {categories.map(c => (
            <a key={c} href={link(c, currentSort ?? undefined)} className="badge" aria-current={currentCategory === c ? "page" : undefined}>{c}</a>
          ))}
        </div>
      </div>
      <div className="group">
        <label htmlFor="sort" className="label">Sort</label>
        <select
          id="sort"
          className="select"
          defaultValue={currentSort ?? "relevance"}
          onChange={(e) => {
            const value = (e.currentTarget as HTMLSelectElement).value;
            const url = new URL(window.location.href);
            if (value === "relevance") url.searchParams.delete("sort");
            else url.searchParams.set("sort", value);
            window.location.assign(url.toString());
          }}
        >
          {sorts.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
        </select>
      </div>
    </section>
  );
}
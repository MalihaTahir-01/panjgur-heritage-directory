import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, ArrowRight, Info } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageIntro } from "./site";
import { ProfileCard } from "./profile-card";
import { fetchApprovedListings, type Category, type Listing } from "@/lib/directory";

export function DirectoryPage({ category }: { category: Category }) {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [role, setRole] = useState("");
  const [listings, setListings] = useState<Listing[]>([]);
  const [loaded, setLoaded] = useState(false);
  const isDates = category === "dates";
  const hasFilters = !!(search || location || specialty || role);

  useEffect(() => {
    let active = true;
    setLoaded(false);
    fetchApprovedListings(category)
      .then((data) => {
        if (active) setListings(data);
      })
      .finally(() => {
        if (active) setLoaded(true);
      });
    return () => {
      active = false;
    };
  }, [category]);

  const filtered = useMemo(() => {
    return listings.filter((item) => {
      if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (location && !item.location.toLowerCase().includes(location.toLowerCase())) return false;
      if (specialty && !item.products.toLowerCase().includes(specialty.toLowerCase())) return false;
      return true;
    });
  }, [listings, search, location, specialty]);

  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setSpecialty("");
    setRole("");
  };

  return (
    <main>
      <PageIntro
        eyebrow={`DIRECTORY / ${isDates ? "DATES" : "CRAFTS"}`}
        title={isDates ? "Panjgur Date Directory" : "Panjgur Crafts Directory"}
        description={
          isDates
            ? "Discover local date growers, processors and suppliers."
            : "Discover local artisans and traditional workmanship."
        }
      />
      <div className="container-wide directory-layout">
        <aside className="filter-panel">
          <div className="filter-heading">
            <SlidersHorizontal size={18} />
            <h2>Refine your search</h2>
          </div>
          <label>
            SEARCH BY NAME
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search producers"
            />
          </label>
          <label>
            LOCATION
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Village or area"
            />
          </label>
          <label>
            {isDates ? "DATE VARIETY" : "CRAFT CATEGORY"}
            <select value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
              <option value="">All {isDates ? "varieties" : "crafts"}</option>
              {(isDates
                ? ["Muzafati", "Begum Jangi", "Sabzo"]
                : [
                    "Traditional Embroidery",
                    "Palm & Natural-Fiber Crafts",
                    "Woodwork",
                    "Other verified local crafts",
                  ]
              ).map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
          {isDates && (
            <label>
              TYPE
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Producer / Processor</option>
                <option>Producer</option>
                <option>Processor</option>
              </select>
            </label>
          )}
          {hasFilters && (
            <Button variant="link" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
          <div className="filter-note">
            <Info size={16} />
            <span>Listings are shown only after producer details are confirmed.</span>
          </div>
        </aside>

        <div className="directory-results">
          <div className="results-toolbar">
            <div>
              <p className="eyebrow">PEOPLE, NOT PRODUCTS</p>
              <h2>
                {!loaded
                  ? "Loading…"
                  : filtered.length === 0
                    ? "No matching listings yet"
                    : "Directory profiles"}
              </h2>
            </div>
            <span>
              {loaded && listings.length > 0 ? `${filtered.length} LISTED` : "PREVIEW FORMAT"}
            </span>
          </div>

          {loaded && listings.length === 0 && (
            <>
              <div className="notice">
                <Info size={18} />
                <p>
                  This is a design preview. The format below shows how a verified{" "}
                  {isDates ? "date producer" : "artisan"} will appear. No producer names or phone
                  numbers have been invented.
                </p>
              </div>
              <ProfileCard category={category} />
            </>
          )}

          {loaded && listings.length > 0 && filtered.length === 0 && (
            <div className="empty-state">
              <Search size={30} />
              <h3>No matching profiles yet.</h3>
              <p>Try a different search, or check back as local producers join the directory.</p>
              <Button variant="outline" onClick={clearFilters}>
                Clear filters
              </Button>
            </div>
          )}

          {filtered.map((item) => (
            <ProfileCard key={item.id} category={category} listing={item} />
          ))}

          <div className="directory-join">
            <div>
              <h3>Are you a local {isDates ? "date producer" : "artisan"}?</h3>
              <p>Share your work with people looking to connect directly.</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/listing">
                Add your listing <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchListingById, splitProducts, type Listing } from "@/lib/directory";
import { useAuth } from "@/lib/use-auth";
import datePhoto from "@/assets/date-orchard.jpg";
import craftPhoto from "@/assets/balochi-craft.jpg";
import oasis from "@/assets/panjgur-oasis.jpg";

export const Route = createFileRoute("/listing/$id")({
  head: () => ({
    meta: [
      { title: "Producer Profile — Panjgur Heritage Directory" },
      { name: "description", content: "A closer look at a local producer or artisan in Panjgur." },
    ],
  }),
  component: ListingProfilePage,
});

function ListingProfilePage() {
  const { id } = Route.useParams();
  const { user } = useAuth();
  const [listing, setListing] = useState<Listing | null | undefined>(undefined);

  useEffect(() => {
    let active = true;
    fetchListingById(id).then((data) => {
      if (active) setListing(data);
    });
    return () => {
      active = false;
    };
  }, [id]);

  if (listing === undefined) {
    return (
      <main className="profile-page">
        <div className="container-wide">
          <p>Loading…</p>
        </div>
      </main>
    );
  }

  if (!listing) {
    return (
      <main className="profile-page">
        <div className="container-wide">
          <p>This listing doesn't exist or isn't visible to you.</p>
          <Button asChild variant="outline">
            <Link to="/">
              <ArrowLeft /> Back home
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  const isOwner = user?.id === listing.owner_id;
  const category = listing.category;
  const fallbackImage = category === "dates" ? datePhoto : craftPhoto;
  const cover = listing.photos[0] || fallbackImage;

  return (
    <main className="profile-page">
      <div className="container-wide">
        <div className="breadcrumb">
          <Link to={category === "dates" ? "/dates" : "/crafts"}>
            <ArrowLeft size={15} /> {category === "dates" ? "Dates directory" : "Crafts directory"}
          </Link>
          <span>/</span> {listing.name}
        </div>
        <div className="profile-cover">
          <img src={cover} alt={listing.name} width={1024} height={1024} />
        </div>
        <div className="profile-layout">
          <div className="profile-main">
            <p className="eyebrow">
              {category === "dates" ? "DATE PRODUCER / PROCESSOR" : "ARTISAN / CRAFT PRODUCER"}
            </p>
            <h1>{listing.name}</h1>
            <p className="profile-place">
              <MapPin size={17} /> {listing.location}, Panjgur
            </p>
            <div className="notice profile-notice">
              <ShieldCheck size={18} />
              <p>
                {listing.status === "approved"
                  ? "Verified listing, published in the public directory."
                  : isOwner
                    ? `This is your own listing. Status: ${listing.status}.`
                    : "This listing is awaiting review and is not yet public."}
              </p>
            </div>
            <section>
              <p className="eyebrow">01 / THE STORY</p>
              <h2>About the producer</h2>
              <p>{listing.description}</p>
            </section>
            <section>
              <p className="eyebrow">02 / WHAT THEY MAKE</p>
              <h2>{category === "dates" ? "Date varieties" : "Products & techniques"}</h2>
              <ul className="product-list">
                {splitProducts(listing.products).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section>
              <p className="eyebrow">03 / WHEN TO REACH OUT</p>
              <h2>Availability</h2>
              <p>{listing.availability || "Not specified"}</p>
            </section>
            {listing.photos.length > 0 && (
              <section>
                <p className="eyebrow">04 / A CLOSER LOOK</p>
                <h2>From Panjgur</h2>
                <div className="profile-gallery">
                  {listing.photos.map((url) => (
                    <img
                      key={url}
                      src={url}
                      alt="Producer submitted photo"
                      loading="lazy"
                      width={1024}
                      height={1024}
                    />
                  ))}
                  <img
                    src={oasis}
                    alt="Panjgur oasis landscape"
                    loading="lazy"
                    width={1536}
                    height={1024}
                  />
                </div>
              </section>
            )}
            <Button asChild variant="outline">
              <Link to={category === "dates" ? "/dates" : "/crafts"}>
                <ArrowLeft /> Back to Directory
              </Link>
            </Button>
          </div>
          <aside className="contact-panel">
            <p className="eyebrow">DIRECT CONTACT</p>
            <h3>Start a conversation</h3>
            <p>Contact the producer directly to ask about their work and availability.</p>
            <Button asChild className="whatsapp-button">
              <a
                href={`https://wa.me/${listing.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle /> Contact on WhatsApp
              </a>
            </Button>
            <div className="contact-line">
              <Phone size={16} />
              <a href={`tel:${listing.phone}`}>{listing.phone}</a>
            </div>
            <small>No payment or order is handled through this directory.</small>
          </aside>
        </div>
      </div>
    </main>
  );
}

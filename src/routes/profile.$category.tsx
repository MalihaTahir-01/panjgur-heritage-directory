import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profileSamples } from "@/lib/directory";
import datePhoto from "@/assets/date-orchard.jpg";
import craftPhoto from "@/assets/balochi-craft.jpg";
import oasis from "@/assets/panjgur-oasis.jpg";

export const Route = createFileRoute("/profile/$category")({
  head: () => ({
    meta: [
      { title: "Profile Preview — Panjgur Heritage Directory" },
      {
        name: "description",
        content:
          "See how a verified Panjgur producer or artisan profile presents their story, work, availability and contact information.",
      },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { category: param } = Route.useParams();
  const category = param === "crafts" ? "crafts" : "dates";
  const data = profileSamples[category];
  const image = category === "dates" ? datePhoto : craftPhoto;
  return (
    <main className="profile-page">
      <div className="container-wide">
        <div className="breadcrumb">
          <Link to={category === "dates" ? "/dates" : "/crafts"}>
            <ArrowLeft size={15} /> {category === "dates" ? "Dates directory" : "Crafts directory"}
          </Link>
          <span>/</span> Profile preview
        </div>
        <div className="profile-cover">
          <img
            src={image}
            alt={
              category === "dates"
                ? "Date palms bearing fruit"
                : "Traditional Balochi hand embroidery"
            }
            width={1024}
            height={1024}
          />
        </div>
        <div className="profile-layout">
          <div className="profile-main">
            <p className="eyebrow">
              {category === "dates" ? "DATE PRODUCER / PROCESSOR" : "ARTISAN / CRAFT PRODUCER"}
            </p>
            <h1>{data.title}</h1>
            <p className="profile-place">
              <MapPin size={17} /> {data.location}
            </p>
            <div className="notice profile-notice">
              <ShieldCheck size={18} />
              <p>
                Profile layout preview — this is not a real producer. Verified names, photos and
                contact details appear once a real listing is approved.
              </p>
            </div>
            <section>
              <p className="eyebrow">01 / THE STORY</p>
              <h2>About the producer</h2>
              <p>{data.description}</p>
            </section>
            <section>
              <p className="eyebrow">02 / WHAT THEY MAKE</p>
              <h2>{category === "dates" ? "Date varieties" : "Products & techniques"}</h2>
              <p>{data.products}</p>
            </section>
            <section>
              <p className="eyebrow">03 / WHEN TO REACH OUT</p>
              <h2>Availability</h2>
              <p>{data.availability}</p>
            </section>
            <section>
              <p className="eyebrow">04 / A CLOSER LOOK</p>
              <h2>From Panjgur</h2>
              <div className="profile-gallery">
                <img
                  src={image}
                  alt="Local production detail"
                  loading="lazy"
                  width={1024}
                  height={1024}
                />
                <img
                  src={oasis}
                  alt="Panjgur oasis landscape"
                  loading="lazy"
                  width={1536}
                  height={1024}
                />
              </div>
            </section>
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
            <Button className="whatsapp-button" disabled>
              <MessageCircle /> Contact on WhatsApp
            </Button>
            <div className="contact-line">
              <Phone size={16} />
              Phone shown with a verified listing
            </div>
            <small>No payment or order is handled through this directory.</small>
          </aside>
        </div>
      </div>
    </main>
  );
}

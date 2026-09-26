import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Camera,
  LogOut,
  Pencil,
  Phone,
  ShieldCheck,
  Info,
  LockKeyhole,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/directory/site";
import { ProfileCard } from "@/components/directory/profile-card";
import { useAuth } from "@/lib/use-auth";
import { deleteListing, fetchMyListings, type Listing } from "@/lib/directory";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "My Listing — Panjgur Heritage Directory" },
      { name: "description", content: "Manage your Panjgur Heritage Directory listing." },
    ],
  }),
  component: Dashboard,
});

const statusLabel: Record<Listing["status"], string> = {
  pending: "Pending Review",
  approved: "Live in Directory",
  rejected: "Not Approved",
};

function Dashboard() {
  const { user, loading } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    let active = true;
    fetchMyListings(user.id).then((data) => {
      if (active) setListings(data);
    });
    return () => {
      active = false;
    };
  }, [user]);

  const onDelete = async (id: string) => {
    setBusy(true);
    try {
      await deleteListing(id);
      setListings((prev) => prev.filter((l) => l.id !== id));
    } finally {
      setBusy(false);
    }
  };

  if (!loading && !user) {
    return (
      <main>
        <PageIntro
          eyebrow="YOUR SPACE"
          title="My Directory Listing"
          description="Login to see and manage your own listing."
        />
        <div className="container-wide dashboard-content">
          <div className="login-prompt">
            <div>
              <LockKeyhole size={21} />
              <div>
                <h3>Login required</h3>
                <p>You need an account to view your listing dashboard.</p>
              </div>
            </div>
            <Button asChild>
              <Link to="/login">
                Create Account / Login <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <PageIntro
        eyebrow="YOUR SPACE"
        title="My Directory Listing"
        description="A focused place to review and manage your own directory information."
      />
      <div className="container-wide dashboard-content">
        <div className="notice">
          <Info size={18} />
          <p>New and edited listings show as "Pending Review" until an admin approves them.</p>
        </div>
        {listings.length > 0 ? (
          <>
            {listings.map((listing) => (
              <div key={listing.id}>
                <div className="dashboard-heading">
                  <div>
                    <p className="eyebrow">YOUR LISTING</p>
                    <h2>{listing.name}</h2>
                  </div>
                  <span className="status-pill">
                    <ShieldCheck size={14} /> {statusLabel[listing.status]}
                  </span>
                </div>
                <div className="dashboard-grid">
                  <ProfileCard category={listing.category} listing={listing} />
                  <aside className="dashboard-tools">
                    <h3>Manage your listing</h3>
                    <p>Your own details are the only information available here.</p>
                    <Button variant="outline" asChild>
                      <Link to="/listing">
                        <Pencil /> Edit Details <ArrowRight />
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/listing">
                        <Camera /> Update Photos <ArrowRight />
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/listing">
                        <Phone /> Update Contact <ArrowRight />
                      </Link>
                    </Button>
                    <Button variant="ghost" disabled={busy} onClick={() => onDelete(listing.id)}>
                      Delete Listing
                    </Button>
                  </aside>
                </div>
              </div>
            ))}
            <Button variant="ghost" onClick={() => supabase.auth.signOut()}>
              <LogOut /> Logout
            </Button>
          </>
        ) : (
          <div className="empty-state dashboard-empty">
            <ShieldCheck size={32} />
            <h2>No listing yet.</h2>
            <p>Start with your own details to see how your directory profile could appear.</p>
            <Button asChild>
              <Link to="/listing">Add your listing</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}

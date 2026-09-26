import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  CheckCircle2,
  ClipboardList,
  ShieldCheck,
  Trash2,
  Info,
  LockKeyhole,
  ArrowRight,
  XCircle,
} from "lucide-react";
import { PageIntro } from "@/components/directory/site";
import { Button } from "@/components/ui/button";
import { useAuth, useIsAdmin } from "@/lib/use-auth";
import {
  deleteListing,
  fetchListingsForAdmin,
  setListingStatus,
  type Listing,
} from "@/lib/directory";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Panjgur Heritage Directory" },
      { name: "description", content: "Review and moderate Panjgur Heritage Directory listings." },
    ],
  }),
  component: Admin,
});

function Admin() {
  const { user, loading } = useAuth();
  const { isAdmin, checked } = useIsAdmin(user?.id);
  const [listings, setListings] = useState<Listing[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdmin) return;
    let active = true;
    fetchListingsForAdmin().then((data) => {
      if (active) setListings(data);
    });
    return () => {
      active = false;
    };
  }, [isAdmin]);

  const refresh = () => fetchListingsForAdmin().then(setListings);

  const approve = async (id: string) => {
    setBusyId(id);
    try {
      await setListingStatus(id, "approved");
      await refresh();
    } finally {
      setBusyId(null);
    }
  };
  const reject = async (id: string) => {
    setBusyId(id);
    try {
      await setListingStatus(id, "rejected");
      await refresh();
    } finally {
      setBusyId(null);
    }
  };
  const remove = async (id: string) => {
    setBusyId(id);
    try {
      await deleteListing(id);
      setListings((prev) => prev.filter((l) => l.id !== id));
    } finally {
      setBusyId(null);
    }
  };

  if (loading || (user && !checked)) {
    return (
      <main>
        <PageIntro
          eyebrow="ADMIN"
          title="Directory administration"
          description="Checking your access…"
        />
      </main>
    );
  }

  if (!user) {
    return (
      <main>
        <PageIntro
          eyebrow="ADMIN"
          title="Directory administration"
          description="Login with an admin account to review listings."
        />
        <div className="container-wide admin-content">
          <div className="login-prompt">
            <div>
              <LockKeyhole size={21} />
              <div>
                <h3>Login required</h3>
                <p>Only accounts marked as admin in Supabase can access this page.</p>
              </div>
            </div>
            <Button asChild>
              <Link to="/login">
                Login <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  if (checked && !isAdmin) {
    return (
      <main>
        <PageIntro
          eyebrow="ADMIN"
          title="Directory administration"
          description="This account doesn't have admin access."
        />
        <div className="container-wide admin-content">
          <div className="notice">
            <Info size={18} />
            <p>
              To make an account an admin, run this in the Supabase SQL editor:{" "}
              <code>
                update public.profiles set is_admin = true where id = (select id from auth.users
                where email = 'you@example.com');
              </code>
            </p>
          </div>
        </div>
      </main>
    );
  }

  const pending = listings.filter((l) => l.status === "pending");
  const approved = listings.filter((l) => l.status === "approved");

  return (
    <main>
      <PageIntro
        eyebrow="ADMIN"
        title="Directory administration"
        description="Review, verify and keep the directory accurate."
      />
      <div className="container-wide admin-content">
        <section>
          <ClipboardList />
          <p className="eyebrow">REVIEW QUEUE</p>
          <h2>Pending listings ({pending.length})</h2>
          {pending.length === 0 && <p>No submissions to review right now.</p>}
          {pending.map((listing) => (
            <div
              key={listing.id}
              className="admin-row"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                padding: "12px 0",
                borderTop: "1px solid var(--border, #e5e5e5)",
              }}
            >
              <div>
                <strong>{listing.name}</strong> — {listing.category} — {listing.location}
                <br />
                <small>{listing.phone}</small>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <Button
                  size="sm"
                  disabled={busyId === listing.id}
                  onClick={() => approve(listing.id)}
                >
                  <CheckCircle2 size={16} /> Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={busyId === listing.id}
                  onClick={() => reject(listing.id)}
                >
                  <XCircle size={16} /> Reject
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={busyId === listing.id}
                  onClick={() => remove(listing.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </section>

        <section style={{ marginTop: 32 }}>
          <ShieldCheck />
          <p className="eyebrow">DIRECTORY</p>
          <h2>Approved listings ({approved.length})</h2>
          {approved.length === 0 && (
            <p>Published producer and artisan profiles will appear here.</p>
          )}
          {approved.map((listing) => (
            <div
              key={listing.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                padding: "12px 0",
                borderTop: "1px solid var(--border, #e5e5e5)",
              }}
            >
              <div>
                <strong>{listing.name}</strong> — {listing.category} — {listing.location}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={busyId === listing.id}
                  onClick={() => reject(listing.id)}
                >
                  Unpublish
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={busyId === listing.id}
                  onClick={() => remove(listing.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

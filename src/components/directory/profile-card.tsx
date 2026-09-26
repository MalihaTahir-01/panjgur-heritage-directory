import { Link } from '@tanstack/react-router'
import { ArrowUpRight, MapPin, MessageCircle, Phone, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { profileSamples, type Category, type Listing } from '@/lib/directory'
import datePhoto from '@/assets/date-orchard.jpg'
import craftPhoto from '@/assets/balochi-craft.jpg'

export function ProfileCard({ category, listing }: { category: Category; listing?: Listing }) {
  const sample = profileSamples[category]
  const fallbackPhoto = category === 'dates' ? datePhoto : craftPhoto
  const photo = listing?.photos?.[0] || fallbackPhoto
  const statusText = listing ? (listing.status === 'approved' ? 'Live listing' : listing.status === 'pending' ? 'Pending review' : 'Not approved') : 'Not a live listing'

  return (
    <article className="profile-card">
      <div className="profile-card-photo">
        <img src={photo} alt={category === 'dates' ? 'Date palms bearing fruit' : 'Traditional Balochi embroidery in progress'} loading="lazy" width={1024} height={1024} />
        <span className="photo-label">{listing ? 'YOUR LISTING' : 'PROFILE FORMAT PREVIEW'}</span>
      </div>
      <div className="profile-card-body">
        <div className="card-overline">{category === 'dates' ? 'DATE PRODUCER / PROCESSOR' : 'ARTISAN / CRAFT PRODUCER'}</div>
        <h2>{listing?.name || sample.title}</h2>
        <p className="card-location">
          <MapPin size={15} />
          {listing?.location ? `${listing.location}, Panjgur` : sample.location}
        </p>
        <div className="card-rule" />
        <div className="card-detail">
          <span>{category === 'dates' ? 'VARIETIES' : 'CRAFT / TECHNIQUES'}</span>
          <strong>{listing?.products || sample.products}</strong>
        </div>
        <p className="card-description">{listing?.description || sample.description}</p>
        <div className="card-meta">
          <span>{listing?.availability || sample.availability}</span>
        </div>
        <div className="card-contact">
          <span>
            <Phone size={15} /> {listing?.phone || 'Phone added with verified listing'}
          </span>
          <span>
            <ShieldCheck size={15} /> {statusText}
          </span>
        </div>
        <div className="card-actions">
          <Button disabled={!listing} asChild={!!listing} className="whatsapp-button">
            {listing ? (
              <a href={`https://wa.me/${listing.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle /> Contact on WhatsApp
              </a>
            ) : (
              <>
                <MessageCircle /> Contact on WhatsApp
              </>
            )}
          </Button>
          {listing ? (
            <Button variant="outline" asChild>
              <Link to="/listing/$id" params={{ id: listing.id }}>
                View profile <ArrowUpRight />
              </Link>
            </Button>
          ) : (
            <Button variant="outline" asChild>
              <Link to="/profile/$category" params={{ category }}>
                View profile <ArrowUpRight />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}

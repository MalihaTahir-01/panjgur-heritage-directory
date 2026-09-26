import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState, type FormEvent } from 'react'
import { ArrowRight, Check, Info, LockKeyhole, UploadCloud } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { PageIntro } from '@/components/directory/site'
import { useAuth } from '@/lib/use-auth'
import {
  createListing,
  fetchMyListings,
  updateListing,
  uploadListingPhotos,
  type Category,
  type Listing,
} from '@/lib/directory'

export const Route = createFileRoute('/listing')({
  head: () => ({
    meta: [
      { title: 'Add or Update a Listing — Panjgur Heritage Directory' },
      { name: 'description', content: 'Add or update your Panjgur Heritage Directory listing as a date producer or artisan.' },
    ],
  }),
  component: ListingPage,
})

function ListingPage() {
  const { user, loading } = useAuth()

  const [category, setCategory] = useState<Category | null>(null)
  const [existing, setExisting] = useState<Listing | null>(null)
  const [loadingExisting, setLoadingExisting] = useState(true)
  const [photoFiles, setPhotoFiles] = useState<File[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (loading) return
    if (!user) {
      setLoadingExisting(false)
      return
    }
    let active = true
    fetchMyListings(user.id)
      .then(listings => {
        if (!active) return
        const first = listings[0]
        if (first) {
          setExisting(first)
          setCategory(first.category)
        }
      })
      .finally(() => {
        if (active) setLoadingExisting(false)
      })
    return () => {
      active = false
    }
  }, [user, loading])

  if (!loading && !user) {
    return (
      <main>
        <PageIntro eyebrow="JOIN THE DIRECTORY" title="Add or Update Your Directory Listing" description="You need an account to submit or edit a listing." />
        <div className="container-narrow listing-content">
          <div className="login-prompt">
            <div>
              <LockKeyhole size={21} />
              <div>
                <h3>Login required</h3>
                <p>Create a free account or log in to add or manage your own listing.</p>
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
    )
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!category || !user) return
    setBusy(true)
    setError(null)
    try {
      const form = new FormData(event.currentTarget)
      const values = {
        category,
        name: String(form.get('name') || ''),
        location: String(form.get('location') || ''),
        phone: String(form.get('phone') || ''),
        products: String(form.get('products') || ''),
        description: String(form.get('description') || ''),
        availability: String(form.get('availability') || ''),
      }
      const uploadedUrls = photoFiles.length > 0 ? await uploadListingPhotos(user.id, photoFiles) : existing?.photos ?? []
      const saved = existing ? await updateListing(existing.id, values, uploadedUrls) : await createListing(user.id, values, uploadedUrls)
      setExisting(saved)
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save your listing. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main>
      <PageIntro
        eyebrow="JOIN THE DIRECTORY"
        title="Add or Update Your Directory Listing"
        description="Are you a local producer or artisan in Panjgur? Add your information to the directory or update your existing listing."
      />
      <div className="container-narrow listing-content">
        {submitted ? (
          <div className="submitted-panel">
            <span className="success-icon">
              <Check />
            </span>
            <p className="eyebrow">SUBMITTED FOR REVIEW</p>
            <h2>Your listing has been saved.</h2>
            <p>It's now marked "pending" and will appear in the public directory once an admin approves it.</p>
            <Button asChild>
              <Link to="/dashboard">
                View my listing <ArrowRight />
              </Link>
            </Button>
          </div>
        ) : loadingExisting ? (
          <p>Loading…</p>
        ) : (
          <>
            <div className="listing-step">
              <span>01</span>
              <div>
                <p className="eyebrow">START HERE</p>
                <h2>What do you produce?</h2>
                <p>Choose the directory that fits your work.</p>
              </div>
            </div>
            <div className="listing-choices">
              <Button
                type="button"
                variant="outline"
                className={`listing-choice ${category === 'dates' ? 'selected' : ''}`}
                onClick={() => setCategory('dates')}
                aria-pressed={category === 'dates'}
                disabled={!!existing}
              >
                <span className="choice-symbol">✳</span>
                <span>
                  <strong>Date Producer / Processor</strong>
                  <small>Growers, processors and date suppliers</small>
                </span>
                <ArrowRight />
              </Button>
              <Button
                type="button"
                variant="outline"
                className={`listing-choice ${category === 'crafts' ? 'selected' : ''}`}
                onClick={() => setCategory('crafts')}
                aria-pressed={category === 'crafts'}
                disabled={!!existing}
              >
                <span className="choice-symbol">✦</span>
                <span>
                  <strong>Artisan / Craft Producer</strong>
                  <small>Embroidery, palm crafts and handwork</small>
                </span>
                <ArrowRight />
              </Button>
            </div>
            {category && (
              <>
                <div className="listing-step form-step">
                  <span>02</span>
                  <div>
                    <p className="eyebrow">YOUR DETAILS</p>
                    <h2>Tell us about your work.</h2>
                    <p>Only share contact details you're comfortable making public.</p>
                  </div>
                </div>
                <form key={existing?.id || category} className="listing-form" onSubmit={onSubmit}>
                  <div className="form-two">
                    <label>
                      Name / Farm / Collective name
                      <Input name="name" defaultValue={existing?.name} required placeholder="Your name or collective" />
                    </label>
                    <label>
                      Location
                      <Input name="location" defaultValue={existing?.location} required placeholder="Village or area in Panjgur" />
                    </label>
                  </div>
                  <div className="form-two">
                    <label>
                      Phone / WhatsApp
                      <Input name="phone" defaultValue={existing?.phone} required type="tel" inputMode="tel" placeholder="+92 ..." pattern="[+0-9\s()-]{8,20}" />
                    </label>
                    <label>
                      Availability
                      <Input name="availability" defaultValue={existing?.availability} placeholder="e.g. seasonal or year-round" />
                    </label>
                  </div>
                  <label>
                    Products / varieties
                    <Input name="products" defaultValue={existing?.products} required placeholder={category === 'dates' ? 'e.g. Muzafati, Begum Jangi' : 'e.g. embroidery, palm weaving'} />
                  </label>
                  <label>
                    Short description
                    <Textarea name="description" defaultValue={existing?.description} required placeholder="Tell visitors about your work and your connection to Panjgur" rows={5} />
                  </label>
                  <label className="upload-label">
                    Photos
                    <span className="upload-box">
                      <UploadCloud size={23} />
                      <strong>
                        {photoFiles.length
                          ? `${photoFiles.length} new photo${photoFiles.length > 1 ? 's' : ''} selected`
                          : existing?.photos?.length
                            ? `${existing.photos.length} photo${existing.photos.length > 1 ? 's' : ''} already uploaded`
                            : 'Choose photos'}
                      </strong>
                      <small>Photos are uploaded to your account's storage and shown publicly once approved</small>
                      <Input type="file" accept="image/*" multiple onChange={e => setPhotoFiles(Array.from(e.target.files || []))} />
                    </span>
                  </label>
                  {error && <p style={{ color: 'crimson' }}>{error}</p>}
                  <div className="form-disclaimer">
                    <Info size={18} />
                    <p>{existing ? 'Saving changes sends your listing back for review before it updates publicly.' : 'New listings are reviewed by an admin before they appear in the public directory.'}</p>
                  </div>
                  <Button type="submit" size="lg" className="submit-listing" disabled={busy}>
                    {busy ? 'Saving…' : existing ? 'Save Changes' : 'Submit Listing'} <ArrowRight />
                  </Button>
                </form>
              </>
            )}
          </>
        )}
      </div>
    </main>
  )
}

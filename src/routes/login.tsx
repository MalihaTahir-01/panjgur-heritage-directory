import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'
import { ArrowRight, LogIn, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PageIntro } from '@/components/directory/site'
import { useAuth } from '@/lib/use-auth'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { useLanguage } from '@/lib/i18n'

export const Route = createFileRoute('/login')({
  head: () => ({
    meta: [
      { title: 'Login / Create Account — Panjgur Heritage Directory' },
      { name: 'description', content: 'Sign in or create an account to add or manage your Panjgur Heritage Directory listing.' },
    ],
  }),
  component: LoginPage,
})

function LoginPage() {
  const { user, loading } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setNotice(null)
    setBusy(true)
    try {
      if (mode === 'signup') {
        const { error: signUpError } = await supabase.auth.signUp({ email, password })
        if (signUpError) throw signUpError
        setNotice('Account created. If email confirmation is enabled for your Supabase project, check your inbox before signing in.')
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
        if (signInError) throw signInError
        navigate({ to: '/listing' })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  if (!loading && user) {
    return (
      <main>
        <PageIntro eyebrow={t('ACCOUNT')} title={t("You're already signed in")} description={`${t('Signed in as')} ${user.email}.`} />
        <div className="container-narrow listing-content">
          <div className="submitted-panel">
            <p>{t('You can manage your listing from your dashboard, or sign out below.')}</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              <Button asChild>
                <Link to="/dashboard">
                  {t('Go to my dashboard')} <ArrowRight />
                </Link>
              </Button>
              <Button variant="outline" onClick={() => supabase.auth.signOut()}>
                {t('Sign out')}
              </Button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main>
      <PageIntro
        eyebrow={t('ACCOUNT')}
        title={mode === 'signup' ? t('Create your account') : t('Login to your account')}
        description={t('Producers and artisans need an account to add or update their directory listing.')}
      />
      <div className="container-narrow listing-content">
        {!isSupabaseConfigured && (
          <div className="notice">
            <p>Supabase isn't configured yet — add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file, then restart the dev server.</p>
          </div>
        )}
        <form className="listing-form" onSubmit={onSubmit}>
          <label>
            {t('Email')}
            <Input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
          </label>
          <label>
            {t('Password')}
            <Input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)} placeholder={t('At least 6 characters')} />
          </label>
          {error && <p style={{ color: 'crimson' }}>{error}</p>}
          {notice && <p>{notice}</p>}
          <Button type="submit" size="lg" className="submit-listing" disabled={busy}>
            {mode === 'signup' ? <UserPlus /> : <LogIn />}
            {busy ? t('Please wait…') : mode === 'signup' ? t('Create account') : t('Login')}
          </Button>
        </form>
        <p className="prototype-note">
          {mode === 'signup' ? (
            <>
              {t('Already have an account?')}{' '}
              <button type="button" onClick={() => setMode('signin')} style={{ textDecoration: 'underline' }}>
                {t('Login instead')}
              </button>
            </>
          ) : (
            <>
              {t('New producer or artisan?')}{' '}
              <button type="button" onClick={() => setMode('signup')} style={{ textDecoration: 'underline' }}>
                {t('Create an account')}
              </button>
            </>
          )}
        </p>
      </div>
    </main>
  )
}

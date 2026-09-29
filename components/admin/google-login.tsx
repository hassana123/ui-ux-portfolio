'use client';
import { useEffect, useState } from 'react';

export function GoogleLogin({ configured }: { configured: boolean }) {
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    const error = new URLSearchParams(window.location.search).get('auth_error');
    if (error === 'owner') setMessage('This Google account is not an approved portfolio owner. Ask the site administrator to provision it in Supabase.');
    else if (error) setMessage('Google sign-in did not finish. Try again, or check the provider and callback URL settings in Supabase.');
  }, []);
  return <div className="google-login">
    <form action="/api/admin/google" method="post" onSubmit={() => setBusy(true)}>
      <button type="submit" className="button google-login-button" disabled={!configured || busy}>
        <span aria-hidden="true">G</span>{busy ? 'Connecting to Google…' : 'Continue with Google'}
      </button>
    </form>
    {message && <p role="alert">{message}</p>}
    <div className="login-divider">or use email and password</div>
  </div>;
}

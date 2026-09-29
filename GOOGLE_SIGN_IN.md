# Enable Google sign-in

The app supports Google at `/admin/login`. It exchanges the OAuth code using Supabase's cookie-based PKCE flow, verifies the user, and checks `public.owners`. Google login never automatically grants owner privileges. The existing migration is sufficient; do not rerun it.

## 1. Google Cloud

Open https://console.cloud.google.com/ and choose or create a project. In Google Auth Platform configure Branding (app name and support email), Audience, and Data Access. Use External for a normal Gmail account; while in Testing, add the owner's Google email as a test user. Request only openid, email and profile.

Create a Client with type Web application. Set Authorized JavaScript origins to your production origin and `http://localhost:3000` for local development. In Authorized redirect URIs enter the Supabase callback copied from its Google provider panel, typically:

```
https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
```

Save the Client ID and Client Secret in Supabase's Google provider settings and enable the provider. These credentials belong in Supabase, not in public frontend environment variables.

## 2. Supabase redirect configuration

In Authentication → URL Configuration set Site URL to the production website origin. Add these Redirect URLs, replacing the example host:

```
http://localhost:3000/auth/callback
https://YOUR_SITE.vercel.app/auth/callback
```

Add the exact callback for any preview deployment you use to log in. Google redirects to Supabase's `/auth/v1/callback`; Supabase then redirects to this app's `/auth/callback`. They are distinct settings.

## 3. Provision the owner

Keep public new-user signup disabled. In Authentication → Users find the existing owner's account with the exact Google email. If absent, use the dashboard's administrative Add user/Create user control to create it with that email and a strong password; confirm the email only for the account you own. Supabase automatically links a matching Google identity to an existing verified email account.

Copy that user's UUID and run this separately in SQL Editor, replacing the placeholder:

```sql
insert into public.owners (user_id)
values ('REPLACE_WITH_OWNER_USER_UUID')
on conflict (user_id) do nothing;
```

Only add the intended portfolio owner's UUID. No email allowlist or Google client secret is needed in application code. If Google uses a different email from the existing password account, provision that identity deliberately instead of assuming it shares the original UUID.

## 4. Environment and deployment

Keep the existing Supabase URL and anon key in local `.env` and Vercel. Set `NEXT_PUBLIC_SITE_URL` to `http://localhost:3000` locally and to your actual website origin in Vercel. The service-role key is not used for Google login; retain it server-side for the existing media/contact features. Deploy the code changes, open `/admin/login`, and select Continue with Google. Start and finish login in the same browser so the PKCE cookie is available.

## Troubleshooting

- `redirect_uri_mismatch`: Google's redirect must be the exact callback displayed by Supabase.
- Returned to the wrong domain: check Supabase Site URL and the exact app callback allowlist entry.
- Provider disabled: enable Google and save its Client ID/Secret in Supabase.
- Signup disabled: first provision the matching owner email through the dashboard.
- Account not approved: verify the signed-in account's UUID is in `public.owners` and that migration 001 completed.
- Google access denied during Testing: add that Google account under test users.
- Expired/missing authorization code: restart login from `/admin/login`; don't reuse a callback URL.

Validation: local build checks the integration compiles. A full Google round trip still requires the provider configuration above.

References: [Google provider setup](https://supabase.com/docs/guides/auth/social-login/auth-google), [Redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls), [Identity linking](https://supabase.com/docs/guides/auth/auth-identity-linking).

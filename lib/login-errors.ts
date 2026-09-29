export function loginError(error: { code?: string; status?: number }) {
  if (error.code === 'invalid_credentials') return {status:401,message:'Supabase could not verify this email and password in the project connected to this website. Check that the account exists under Authentication → Users in that same project, then check the password. Supabase does not tell us which one failed.'};
  if (error.code === 'email_not_confirmed') return {status:403,message:'Your email has not been confirmed yet. Confirm your email before signing in.'};
  if (error.status === 429 || error.code === 'over_request_rate_limit') return {status:429,message:'Too many sign-in attempts. Please wait a few minutes and try again.'};
  if (error.code === 'email_provider_disabled') return {status:503,message:'Email sign-in is unavailable. The site owner needs to check the email provider settings in Supabase.'};
  return {status:503,message:'The sign-in service could not complete your request. Please try again shortly. If this continues, check the Supabase connection and authentication settings.'};
}

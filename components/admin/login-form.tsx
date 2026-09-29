'use client';
import {useState,type FormEvent} from 'react';
import {useRouter} from 'next/navigation';
import {useToast} from '@/components/toasts';
import {Eye, EyeOff} from 'lucide-react';
export function LoginForm({configured}:{configured:boolean}) {
  const [message,setMessage]=useState('');
  const [busy,setBusy]=useState(false);
  const [showPassword,setShowPassword]=useState(false);
  const router=useRouter();
  const toast=useToast();
  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();if(busy)return;setBusy(true);setMessage('');
    try{
      const r=await fetch('/api/admin/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(e.currentTarget)))});
      const d=await r.json();
      if(!r.ok){const text=d.message||'Sign-in failed. Please try again.';setMessage(text);toast(text,'error');}
      else{toast('You are signed in. Welcome to your studio!');router.push('/admin');router.refresh();}
    }catch{const text='Could not connect to sign-in. Check your connection and try again.';setMessage(text);toast(text,'error');}
    finally{setBusy(false);}
  }
  return (
    <form onSubmit={submit} aria-busy={busy} className="password-login-form">
      <label htmlFor="login-email">Email</label>
      <input id="login-email" name="email" type="email" autoComplete="username" maxLength={254} required/>
      <label htmlFor="login-password">Password</label>
      <div className="login-password-field">
        <input id="login-password" name="password" type={showPassword?'text':'password'} autoComplete="current-password" maxLength={200} required/>
        <button type="button" className="password-visibility-toggle"
          aria-label={showPassword?'Hide password':'Show password'}
          title={showPassword?'Hide password':'Show password'}
          aria-controls="login-password"
          onClick={()=>setShowPassword(value=>!value)}>
          {showPassword?<EyeOff size={20} aria-hidden="true"/>:<Eye size={20} aria-hidden="true"/>}
        </button>
      </div>
      <button className="button dark" disabled={!configured||busy}>{busy?'Signing in…':'Enter the studio ↗'}</button>
      <p role="status">{message||(!configured?'Setup required: connect Supabase and provision the owner account using README.md.':'Owner access only. Use your portfolio account password.')}</p>
    </form>
  );
}

import { GoogleLogin } from "@/components/admin/google-login";
import Link from 'next/link';
import {redirect} from 'next/navigation';
import {owner,configured} from '@/lib/supabase';
import {LoginForm} from '@/components/admin/login-form';
export default async function Login(){if(await owner())redirect('/admin');return <main id="main" className="login-page"><Link href="/" className="monogram">ET<span>.</span></Link><div className="login-panel"><span className="section-kicker">THE OWNER’S STUDIO</span><h1>A little space<br/>behind the scenes.</h1><p>Sign in to manage your work, words and ideas.</p><GoogleLogin configured={configured()}/><LoginForm configured={configured()}/><Link href="/" className="text-link">← Back to the portfolio</Link></div></main>;}

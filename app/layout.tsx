import type { Metadata } from 'next';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import '@fontsource/lora/400.css';
import '@fontsource/lora/400-italic.css';
import './globals.css';
// Retry public data after temporary backend outages instead of caching a fallback indefinitely.
export const revalidate = 60;
export const metadata:Metadata={metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000'),title:{default:'EwaTechie — UI/UX & Product Designer',template:'%s · EwaTechie'},description:'Thoughtful interfaces, clear user journeys and a little personality.',openGraph:{images:[{url:'/images/wordmark.png',width:2550,height:1425}]}};
export default function RootLayout({children}:{children:React.ReactNode}){
  // Extensions may inject body attributes such as cz-shortcut-listen before hydration.
  // Child hydration checks remain enabled.
  return <html lang="en" data-scroll-behavior="smooth"><body suppressHydrationWarning><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>;
}

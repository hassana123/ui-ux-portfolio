'use client';
export default function ErrorPage({retry}:{retry:()=>void}){return <main id="main" className="wrap archive"><h1>A small interruption.</h1><p>This page couldn’t load. Please try again in a moment.</p><button className="button dark" onClick={retry}>Try again</button></main>;}

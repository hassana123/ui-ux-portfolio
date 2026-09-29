'use client';
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
type Notice = { id: number; message: string; kind: 'success' | 'error' };
const ToastContext = createContext<(message:string,kind?:Notice['kind'])=>void>(()=>{});
export const useToast = () => useContext(ToastContext);
function Toast({notice,close}:{notice:Notice;close:(id:number)=>void}) {
  useEffect(()=>{if(notice.kind==='error')return;const timer=setTimeout(()=>close(notice.id),6000);return()=>clearTimeout(timer);},[notice,close]);
  return <div className={`toast toast-${notice.kind}`} role={notice.kind==='error'?'alert':'status'}><span aria-hidden="true">{notice.kind==='success'?'✓':'!'}</span><div><strong>{notice.kind==='success'?'Success':'Something needs attention'}</strong><p>{notice.message}</p></div><button aria-label="Dismiss notification" onClick={()=>close(notice.id)}>×</button></div>;
}
export function ToastProvider({children}:{children:ReactNode}) {
  const [notices,setNotices]=useState<Notice[]>([]);
  const notify=useCallback((message:string,kind:Notice['kind']='success')=>setNotices(current=>[...current.filter(n=>n.message!==message),{id:Date.now(),message,kind}].slice(-3)),[]);
  const close=useCallback((id:number)=>setNotices(current=>current.filter(n=>n.id!==id)),[]);
  return <ToastContext.Provider value={notify}>{children}<div className="toast-stack" aria-label="Notifications">{notices.map(notice=><Toast key={notice.id} notice={notice} close={close}/>)}</div></ToastContext.Provider>;
}

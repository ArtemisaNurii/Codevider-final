'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initAppWorkers, cleanupAppWorkers } from '@/lib/initWorkers';

interface WorkerProviderProps {
  children: React.ReactNode;
}

const WORKER_ROUTES = ['/projects', '/about'];

function shouldInitWorkers(pathname: string): boolean {
  return WORKER_ROUTES.some((route) => pathname.startsWith(route));
}

export function WorkerProvider({ children }: WorkerProviderProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!shouldInitWorkers(pathname)) {
      return;
    }

    let cancelled = false;
    const idleCallback = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1));
    const cancelIdle = window.cancelIdleCallback ?? window.clearTimeout;

    const idleId = idleCallback(() => {
      if (!cancelled) {
        void initAppWorkers();
      }
    });

    return () => {
      cancelled = true;
      cancelIdle(idleId);
      cleanupAppWorkers();
    };
  }, [pathname]);

  return <>{children}</>;
}

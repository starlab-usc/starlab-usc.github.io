import { Component, lazy, Suspense, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import logoUrl from '../../assets/STARLab_logo.svg?url';

const LogoScene = lazy(() => import('./LogoScene'));

class SceneBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function InteractiveLogo({ children }: { children: ReactNode }) {
  const brandRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [target, setTarget] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const preference = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    );
    const update = () => {
      setEnabled(preference.matches);
      setReady(false);
      setTarget([0, 0]);
    };
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  const active = enabled && !failed;

  useEffect(() => {
    // The shared Astro banner owns the hover area; only the badge receives the tilt.
    const banner = brandRef.current?.closest<HTMLElement>('.banner');
    if (!active || !banner) return;

    const move = (event: PointerEvent) => {
      const bounds = banner.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width * 2 - 1;
      const y = (event.clientY - bounds.top) / bounds.height * 2 - 1;
      setTarget([y * 0.35, x * 0.44]);
    };
    const reset = () => setTarget([0, 0]);

    banner.addEventListener('pointermove', move);
    banner.addEventListener('pointerleave', reset);
    banner.addEventListener('pointercancel', reset);
    return () => {
      banner.removeEventListener('pointermove', move);
      banner.removeEventListener('pointerleave', reset);
      banner.removeEventListener('pointercancel', reset);
    };
  }, [active]);

  return (
    <div className="brand" ref={brandRef}>
      <div className="logo" role="img" aria-label="STARLab logo" data-ready={active && ready}>
        <img className="logo__fallback" src={logoUrl} alt="" width="65.616" height="80" />
        {active && (
          <div className="logo__scene" aria-hidden="true">
            <SceneBoundary onFailure={() => setFailed(true)}>
              <Suspense fallback={null}>
                <LogoScene
                  target={target}
                  onReady={() => setReady(true)}
                  onFailure={() => setFailed(true)}
                />
              </Suspense>
            </SceneBoundary>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

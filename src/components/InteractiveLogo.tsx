import { Component, lazy, Suspense, useEffect, useState } from 'react';
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
    if (!active) return;

    // Track the whole viewport while keeping the badge's existing tilt range.
    const move = (event: PointerEvent) => {
      const x = Math.max(-1, Math.min(1, event.clientX / window.innerWidth * 2 - 1));
      const y = Math.max(-1, Math.min(1, event.clientY / window.innerHeight * 2 - 1));
      setTarget([y * 0.35, x * 0.44]);
    };
    const reset = () => setTarget([0, 0]);

    window.addEventListener('pointermove', move);
    document.documentElement.addEventListener('pointerleave', reset);
    window.addEventListener('pointercancel', reset);
    window.addEventListener('blur', reset);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', reset);
      window.removeEventListener('pointercancel', reset);
      window.removeEventListener('blur', reset);
    };
  }, [active]);

  return (
    <div className="brand">
      <div className="logo" role="img" aria-label="StarLab logo" data-ready={active && ready}>
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

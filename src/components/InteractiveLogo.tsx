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
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [target, setTarget] = useState<[number, number]>([0, 0]);
  const badge = useRef<HTMLDivElement>(null);
  const introduced = useRef(false);

  useEffect(() => {
    const preference = window.matchMedia(
      '(prefers-reduced-motion: no-preference)',
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
    const element = badge.current;
    if (!active || !ready || !element) return;

    const mouseAvailable = window.matchMedia('(hover: hover) and (pointer: fine)');
    let drag: { id: number; x: number; y: number; width: number; height: number } | null = null;
    let introTimer: ReturnType<typeof setTimeout> | undefined;
    const cancelIntro = () => clearTimeout(introTimer);
    const tilt = (x: number, y: number) => {
      setTarget([
        Math.max(-1, Math.min(1, y)) * 0.70,
        Math.max(-1, Math.min(1, x)) * 0.70,
      ]);
    };
    const release = () => {
      const id = drag?.id;
      drag = null;
      if (id !== undefined && element.hasPointerCapture(id)) element.releasePointerCapture(id);
    };
    const reset = () => {
      cancelIntro();
      release();
      setTarget([0, 0]);
    };

    // A single gentle tilt reveals the depth on devices without hover.
    // Start only after WebGL is ready, and let any interaction interrupt it.
    if (!introduced.current && !mouseAvailable.matches) {
      introduced.current = true;
      setTarget([-0.16, 0.25]);
      introTimer = setTimeout(() => setTarget([0, 0]), 650);
    }

    // Track the whole viewport using the same tilt limits as touch dragging.
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || !mouseAvailable.matches || drag) return;
      cancelIntro();
      tilt(event.clientX / window.innerWidth * 2 - 1, event.clientY / window.innerHeight * 2 - 1);
    };
    const startDrag = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' || !event.isPrimary || drag) return;
      cancelIntro();
      const { width, height } = element.getBoundingClientRect();
      element.setPointerCapture(event.pointerId);
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY, width, height };
      setTarget([0, 0]);
    };
    const moveDrag = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.id) return;
      tilt((event.clientX - drag.x) / (drag.width / 2), (event.clientY - drag.y) / (drag.height / 2));
    };
    const endDrag = (event: PointerEvent) => {
      if (event.pointerId === drag?.id) reset();
    };
    const leave = () => {
      if (!drag) reset();
    };

    element.addEventListener('pointerdown', startDrag);
    element.addEventListener('pointermove', moveDrag);
    element.addEventListener('pointerup', endDrag);
    element.addEventListener('pointercancel', endDrag);
    element.addEventListener('lostpointercapture', endDrag);
    window.addEventListener('pointermove', move);
    document.documentElement.addEventListener('pointerleave', leave);
    window.addEventListener('blur', reset);
    return () => {
      cancelIntro();
      element.removeEventListener('pointerdown', startDrag);
      element.removeEventListener('pointermove', moveDrag);
      element.removeEventListener('pointerup', endDrag);
      element.removeEventListener('pointercancel', endDrag);
      element.removeEventListener('lostpointercapture', endDrag);
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
      window.removeEventListener('blur', reset);
      release();
    };
  }, [active, ready]);

  return (
    <div className="brand">
      <div ref={badge} className="logo" role="img" aria-label="StarLab logo" data-ready={active && ready}>
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

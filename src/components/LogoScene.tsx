import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Box2, CanvasTexture, DoubleSide, ExtrudeGeometry, MathUtils, PMREMGenerator, Shape, SRGBColorSpace } from 'three';
import type { Group } from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import logoSvg from '../../assets/STARLab_logo.svg?raw';
import { createInlayWalls } from './logoGeometry';

const logoDepth = 16;
const logoScale = 80 / 78.836;

type LogoProps = {
  target: [number, number];
  onReady: () => void;
  onFailure: () => void;
};

function StudioEnvironment() {
  const { gl, scene, invalidate } = useThree();

  useEffect(() => {
    // Built-in, achromatic studio lighting; no external HDR or texture asset.
    const room = new RoomEnvironment();
    const generator = new PMREMGenerator(gl);
    const environment = generator.fromScene(room, 0.04);
    const previous = scene.environment;
    scene.environment = environment.texture;
    invalidate();
    room.dispose();
    generator.dispose();
    return () => {
      scene.environment = previous;
      environment.dispose();
    };
  }, [gl, scene, invalidate]);

  return null;
}

function Logo({ target, onReady, onFailure }: LogoProps) {
  const group = useRef<Group>(null);
  const shown = useRef(false);
  const { invalidate, gl } = useThree();
  const { geometry, inlayWalls, mask } = useMemo(() => {
    const shapes = new SVGLoader().parse(logoSvg).paths.flatMap((path) => path.toShapes());
    const bounds = new Box2();
    shapes.forEach((shape) => shape.getPoints().forEach((point) => bounds.expandByPoint(point)));
    const width = bounds.max.x - bounds.min.x;
    const height = bounds.max.y - bounds.min.y;

    // The exterior mask defines opaque black faces and transmitting clear faces.
    // Crop to the actual ink bounds, excluding the SVG's empty outer margin.
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = Math.round(1024 * height / width);
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Unable to create logo material mask');
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.scale(canvas.width / width, canvas.height / height);
    context.translate(-bounds.min.x, -bounds.min.y);
    context.fillStyle = '#000000';
    for (const shape of shapes) {
      context.beginPath();
      for (const contour of [shape, ...shape.holes]) {
        contour.getPoints(32).forEach((point, index) => {
          if (index === 0) context.moveTo(point.x, point.y);
          else context.lineTo(point.x, point.y);
        });
        context.closePath();
      }
      context.fill('evenodd');
    }
    const mask = new CanvasTexture(canvas);
    mask.colorSpace = SRGBColorSpace;

    // Inset the contour before beveling so the finished block ends exactly at
    // the black logo's outer bounds. No backing, outline, or projecting rim.
    const bevel = 0.6;
    const radius = 8;
    const smallRadius = 2;
    const left = bounds.min.x + bevel;
    const right = bounds.max.x - bevel;
    const top = bounds.min.y + bevel;
    const bottom = bounds.max.y - bevel;
    const outline = new Shape();
    // SVG coordinates run downward; the mesh's Y flip preserves these corners.
    outline.moveTo(left + smallRadius, top);
    outline.lineTo(right - radius, top);
    outline.absarc(right - radius, top + radius, radius, -Math.PI / 2, 0, false);
    outline.lineTo(right, bottom - smallRadius);
    outline.absarc(right - smallRadius, bottom - smallRadius, smallRadius, 0, Math.PI / 2, false);
    outline.lineTo(left + radius, bottom);
    outline.absarc(left + radius, bottom - radius, radius, Math.PI / 2, Math.PI, false);
    outline.lineTo(left, top + smallRadius);
    outline.absarc(left + smallRadius, top + smallRadius, smallRadius, Math.PI, Math.PI * 1.5, false);
    outline.closePath();
    const geometry = new ExtrudeGeometry(outline, {
      depth: logoDepth,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 1,
      steps: 1,
    });
    // Project the same SVG mask through the full depth, including the sides.
    const positions = geometry.getAttribute('position');
    const uv = geometry.getAttribute('uv');
    for (let i = 0; i < positions.count; i++) {
      uv.setXY(i,
        (positions.getX(i) - bounds.min.x) / width,
        1 - (positions.getY(i) - bounds.min.y) / height,
      );
    }
    const inlayWalls = createInlayWalls(shapes, bounds, logoDepth);
    for (const part of [geometry, inlayWalls]) {
      part.translate(-64.663 / 2, -78.836 / 2, -logoDepth / 2);
      part.scale(logoScale, logoScale, logoScale);
    }
    return { geometry, inlayWalls, mask };
  }, []);

  useEffect(() => () => {
    geometry.dispose();
    inlayWalls.dispose();
    mask.dispose();
  }, [geometry, inlayWalls, mask]);
  useEffect(() => { invalidate(); }, [target, invalidate]);
  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener('webglcontextlost', onFailure);
    return () => canvas.removeEventListener('webglcontextlost', onFailure);
  }, [gl, onFailure]);

  useFrame((_, delta) => {
    if (!group.current) return;
    if (!shown.current) {
      shown.current = true;
      onReady();
    }
    const rotation = group.current.rotation;
    // Clamp the first delta after an idle period so a hover starts smoothly.
    rotation.x = MathUtils.damp(rotation.x, target[0], 12, Math.min(delta, 1 / 30));
    rotation.y = MathUtils.damp(rotation.y, target[1], 12, Math.min(delta, 1 / 30));
    if (Math.abs(rotation.x - target[0]) + Math.abs(rotation.y - target[1]) > 0.0001) {
      invalidate();
    }
  });

  return (
    <group ref={group}>
      {/* Opaque walls enter Three.js's transmission pass, so the clear fill
          reveals real interior depth rather than a flat printed pattern. */}
      <mesh geometry={inlayWalls} scale={[1, -1, 1]}>
        <meshStandardMaterial color="#181818" roughness={1} metalness={0} side={DoubleSide} />
      </mesh>
      <mesh geometry={geometry} scale={[1, -1, 1]}>
        <meshPhysicalMaterial
          // Preserve the white banner seen through the resting badge;
          // filmic tone mapping otherwise compresses it toward gray.
          toneMapped={false}
          map={mask}
          transmissionMap={mask}
          // Keep the black inlay dark even when a studio reflection crosses it.
          specularColorMap={mask}
          clearcoatMap={mask}
          color="#ffffff"
          metalness={0}
          roughness={0.1}
          transmission={1.0}
          thickness={logoDepth * logoScale}
          ior={1.3}
          clearcoat={0}
          clearcoatRoughness={0.0}
          envMapIntensity={1}
        />
      </mesh>
    </group>
  );
}

export default function LogoScene(props: LogoProps) {
  return (
    <Canvas
      orthographic
      // Measure the layout box before the mobile CSS scale, keeping the
      // canvas and orthographic camera centered within the logo badge.
      resize={{ offsetSize: true }}
      camera={{ position: [0, 0, 200], zoom: 1, near: 0.1, far: 500 }}
      dpr={[1, 2]}
      frameloop="demand"
      gl={{ alpha: true, antialias: true }}
      fallback={null}
    >
      <color attach="background" args={['#ffffff']} />
      <StudioEnvironment />
      <ambientLight intensity={1.4} />
      <Logo {...props} />
    </Canvas>
  );
}

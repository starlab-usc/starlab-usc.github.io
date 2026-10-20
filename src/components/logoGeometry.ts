import { BufferGeometry, Float32BufferAttribute } from 'three';
import type { Box2, Shape, Vector2 } from 'three';

/** Interior black/clear interfaces for the logo's adjoining SVG polygons.
 * The masked outer block already supplies the front, back, and exterior faces.
 */
export function createInlayWalls(shapes: Shape[], bounds: Box2, depth: number) {
  const epsilon = 1e-5;
  const contours = shapes.flatMap((shape) =>
    [shape, ...shape.holes].map((path) => {
      const points = path.getPoints(32);
      if (points[0].distanceTo(points[points.length - 1]) < epsilon) points.pop();
      return points;
    }),
  );
  const vertices = contours.flat();
  const segments = new Map<string, { a: Vector2; b: Vector2; count: number }>();
  const pointKey = (point: Vector2) => `${point.x.toFixed(5)},${point.y.toFixed(5)}`;

  for (const contour of contours) {
    for (let i = 0; i < contour.length; i++) {
      const a = contour[i];
      const b = contour[(i + 1) % contour.length];
      const direction = b.clone().sub(a);
      const lengthSquared = direction.lengthSq();
      if (lengthSquared < epsilon ** 2) continue;
      // Split long edges where neighboring SVG polygons join them, so shared
      // portions cancel instead of creating walls inside the black material.
      const cuts = [0, 1];
      for (const point of vertices) {
        const offset = point.clone().sub(a);
        const t = offset.dot(direction) / lengthSquared;
        if (t > epsilon && t < 1 - epsilon &&
          Math.abs(offset.cross(direction)) < epsilon * Math.sqrt(lengthSquared)) {
          cuts.push(t);
        }
      }
      const ordered = [...new Set(cuts)].sort((x, y) => x - y);
      for (let j = 0; j < ordered.length - 1; j++) {
        const start = a.clone().addScaledVector(direction, ordered[j]);
        const end = a.clone().addScaledVector(direction, ordered[j + 1]);
        if (start.distanceTo(end) < epsilon) continue;
        const key = [pointKey(start), pointKey(end)].sort().join('|');
        const existing = segments.get(key);
        if (existing) existing.count++;
        else segments.set(key, { a: start, b: end, count: 1 });
      }
    }
  }

  const positions: number[] = [];
  for (const { a, b, count } of segments.values()) {
    if (count !== 1) continue;
    const onOuterEdge = (['x', 'y'] as const).some((axis) =>
      [bounds.min[axis], bounds.max[axis]].some((edge) =>
        Math.abs(a[axis] - edge) < epsilon && Math.abs(b[axis] - edge) < epsilon,
      ),
    );
    if (onOuterEdge) continue;
    positions.push(
      a.x, a.y, 0, b.x, b.y, 0, b.x, b.y, depth,
      a.x, a.y, 0, b.x, b.y, depth, a.x, a.y, depth,
    );
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.computeVertexNormals();
  return geometry;
}

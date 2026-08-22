// components/neuronUtils.ts
"use client";

import * as THREE from "three";

/* ═══════════════════════════════════════════════
   COLOR PALETTE
   ═══════════════════════════════════════════════ */
export const CRIMSON = "#9B1B30";
export const CRIMSON_LIGHT = "#C4475B";
export const CRIMSON_MUTED = "#8B3545";
export const GOLD = "#C9A055";
export const GOLD_SOFT = "#D9B978";
export const CREAM = "#F9F6F2";
export const BG = "#0C0A0B";

/* ═══════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════ */
export interface DendriteBranch {
  curve: THREE.CatmullRomCurve3;
  radius: number;
  depth: number;
}

export interface MyelinInfo {
  position: THREE.Vector3;
  tangent: THREE.Vector3;
  quaternion: THREE.Quaternion;
  t: number;
}

/* ═══════════════════════════════════════════════
   generateAxonPath
   ═══════════════════════════════════════════════ */
export function generateAxonPath(
  start: [number, number, number],
  end: [number, number, number],
  numPoints: number = 8,
  perturb: number = 0.35
): THREE.CatmullRomCurve3 {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const x = start[0] + (end[0] - start[0]) * t;
    const y = start[1] + (end[1] - start[1]) * t;
    const z = start[2] + (end[2] - start[2]) * t;
    if (i === 0 || i === numPoints) {
      pts.push(new THREE.Vector3(x, y, z));
    } else {
      pts.push(
        new THREE.Vector3(
          x + (Math.random() - 0.5) * perturb,
          y + (Math.random() - 0.5) * perturb * 0.6,
          z + (Math.random() - 0.5) * perturb * 0.4
        )
      );
    }
  }
  return new THREE.CatmullRomCurve3(pts);
}

/* ═══════════════════════════════════════════════
   generateDendriteBranches
   ═══════════════════════════════════════════════ */
export function generateDendriteBranches(
  origin: THREE.Vector3,
  direction: THREE.Vector3,
  length: number,
  radius: number,
  depth: number,
  maxDepth: number = 4,
  branches: DendriteBranch[] = []
): DendriteBranch[] {
  if (depth >= maxDepth || length < 0.12) return branches;

  const dir = direction.clone().normalize();
  const end = origin.clone().add(dir.clone().multiplyScalar(length));

  const perpAxis = new THREE.Vector3(
    Math.random() - 0.5,
    Math.random() - 0.5,
    Math.random() - 0.5
  ).normalize();
  const bendAmount = length * 0.3 * (Math.random() - 0.5);
  const mid = origin
    .clone()
    .add(dir.clone().multiplyScalar(length * 0.5))
    .add(perpAxis.clone().multiplyScalar(bendAmount));

  const curve = new THREE.CatmullRomCurve3([origin.clone(), mid, end]);
  branches.push({ curve, radius, depth });

  const forks = depth < 2 ? 3 : 2;
  for (let i = 0; i < forks; i++) {
    const spreadAngle = 0.45 + Math.random() * 0.4;
    const rotAxis = new THREE.Vector3(
      Math.random() - 0.5,
      Math.random() * 1.2 - 0.6,
      Math.random() - 0.5
    ).normalize();
    const forkDir = dir
      .clone()
      .applyAxisAngle(rotAxis, spreadAngle * (i - (forks - 1) / 2))
      .normalize();
    const newLength = length * (0.58 + Math.random() * 0.17);
    const newRadius = Math.max(0.015, radius * 0.65);

    generateDendriteBranches(
      end.clone(),
      forkDir,
      newLength,
      newRadius,
      depth + 1,
      maxDepth,
      branches
    );
  }

  return branches;
}

/* ═══════════════════════════════════════════════
   getMyelinPositions
   ═══════════════════════════════════════════════ */
export function getMyelinPositions(
  curve: THREE.CatmullRomCurve3,
  count: number = 6
): MyelinInfo[] {
  const result: MyelinInfo[] = [];
  const startT = 0.12;
  const endT = 0.82;
  const up = new THREE.Vector3(0, 1, 0);

  for (let i = 0; i < count; i++) {
    const t = startT + (i / (count - 1)) * (endT - startT);
    const position = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t).normalize();

    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(up, tangent);

    result.push({ position, tangent, quaternion, t });
  }
  return result;
}

/* ═══════════════════════════════════════════════
   getTerminalBoutonPositions
   ═══════════════════════════════════════════════ */
export function getTerminalBoutonPositions(
  curve: THREE.CatmullRomCurve3,
  count: number = 5
): THREE.Vector3[] {
  const positions: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const t = 0.86 + (i / (count - 1)) * 0.13;
    const base = curve.getPointAt(Math.min(t, 1));
    const tangent = curve.getTangentAt(Math.min(t, 1));
    const up = new THREE.Vector3(0, 1, 0);
    const perp = new THREE.Vector3().crossVectors(tangent, up).normalize();
    const spread = (i - (count - 1) / 2) * 0.22;
    positions.push(base.clone().add(perp.clone().multiplyScalar(spread)));
  }
  return positions;
}

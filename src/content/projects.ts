/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  name: string;
  image: string; // nombre de archivo dentro de /public/projects/
}

export const PROJECTS: Project[] = [
  { name: "Proyecto 1", image: "proyecto-1.webp" },
  { name: "Proyecto 2", image: "proyecto-2.webp" },
  { name: "Proyecto 3", image: "proyecto-3.webp" },
];

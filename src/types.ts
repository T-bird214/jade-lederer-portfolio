/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  isRealEstate: boolean;
  achievements: string[];
  isCurrent?: boolean;
}

export interface Achievement {
  id: string;
  metric: string;
  label: string;
  description: string;
}

export interface Value {
  id: string;
  title: string;
  description: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  project?: string;
  avatarInitials: string;
}

export interface WorkStep {
  number: string;
  title: string;
  description: string;
}

import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}
export interface Saperator {
  name: string;
  type?: string;
}
export interface SubChildren {
  state: string;
  name: string;
  type?: string;
}
export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  child?: SubChildren[];
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  saperator?: Saperator[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: 'dashboard',
    name: 'Dashboard 1',
    type: 'link',
    icon: 'av_timer',
  },
  {
    state: 'complaints',
    name: 'Complaints',
    type: 'link',
    icon: 'web',
  },
  {
    state: 'faults',
    name: 'Faults',
    type: 'link',
    icon: 'report_problem',
  },
  {
    state: 'buses',
    name: 'Buses',
    type: 'link',
    icon: 'directions_bus',
  },
  {
    state: 'users',
    name: 'Users',
    type: 'link',
    icon: 'person',
  },
  {
    state: 'schedules',
    name: 'Schedules',
    type: 'link',
    icon: 'schedule',
  },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}

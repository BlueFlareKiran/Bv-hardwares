'use client';

import { Search, SlidersHorizontal } from 'lucide-react';

interface Props {
  search: string;
  department: string;
  location: string;
  departments: string[];
  locations: string[];
  onSearch: (value: string) => void;
  onDepartment: (value: string) => void;
  onLocation: (value: string) => void;
}

const controlClass = 'h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm text-foreground outline-none transition focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 dark:focus:border-brand-blue-light';

export default function JobFilters(props: Props) {
  return (
    <div className="grid gap-3 rounded-2xl border border-border bg-card p-3 shadow-card md:grid-cols-[minmax(240px,1fr)_220px_220px]">
      <label className="relative block">
        <span className="sr-only">Search jobs</span>
        <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={props.search}
          onChange={(event) => props.onSearch(event.target.value)}
          className={`${controlClass} pl-10`}
          placeholder="Search jobs or departments"
        />
      </label>
      <label className="relative block">
        <span className="sr-only">Filter by department</span>
        <SlidersHorizontal size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <select value={props.department} onChange={(event) => props.onDepartment(event.target.value)} className={`${controlClass} pl-10`}>
          <option value="all">All departments</option>
          {props.departments.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </label>
      <label>
        <span className="sr-only">Filter by location</span>
        <select value={props.location} onChange={(event) => props.onLocation(event.target.value)} className={controlClass}>
          <option value="all">All locations</option>
          {props.locations.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </label>
    </div>
  );
}

import type { SVGProps } from 'react';

const commonProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round" as "round",
  strokeLinejoin: "round" as "round",
};

export const PassionIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" {...commonProps} {...props}>
    <path d="M19.5 12.572c-1.953-2.264-4.23-3.868-6.953-4.066C9.825 8.309 7.5 10.132 7.5 12.5c0 2.368 2.325 4.191 5.047 4.066 2.723-.2 5-1.802 6.953-4.066z" />
    <path d="M16.5 8.243C18.298 6.45 21.5 6.84 21.5 9.5c0 2.66-3.202 3.05-5 1.257" />
    <path d="M4.5 12.5c0-2.66 3.202-3.05 5-1.257C7.702 6.45 2.5 6.84 2.5 9.5c0 2.66 3.202 3.05 5 1.257" />
  </svg>
);

export const MissionIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" {...commonProps} {...props}>
    <path d="M9 11.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" />
    <path d="M14 11.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" />
    <path d="M9 11.5v1.895c0 .93.592 1.761 1.489 2.042.897.28 1.84.28 2.738 0 .897-.281 1.489-1.112 1.489-2.042V11.5" />
    <path d="M6.064 16.518A2.99 2.99 0 015 18c0 1.657 1.343 3 3 3h7c1.657 0 3-1.343 3-3 .011-.69-.22-1.34-.6-1.85" />
    <path d="M11.5 21v-3.5" />
  </svg>
);

export const VocationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" {...commonProps} {...props}>
    <path d="M12 21.5c-5.247 0-9.5-4.253-9.5-9.5S6.753 2.5 12 2.5s9.5 4.253 9.5 9.5-4.253 9.5-9.5 9.5z" />
    <path d="M12 2.5c-2.42 0-4.706 1.12-6.287 3.097" />
    <path d="M2.5 12c0 2.42 1.12 4.706 3.097 6.287" />
    <path d="M12 21.5c2.42 0 4.706-1.12 6.287-3.097" />
    <path d="M21.5 12c0-2.42-1.12-4.706-3.097-6.287" />
    <path d="M10.887 2.564c1.17 3.65-1.424 7.623-5.074 8.793" />
    <path d="M2.564 13.113c3.65-1.17 7.623 1.424 8.793 5.074" />
    <path d="M13.113 21.436c-1.17-3.65 1.424-7.623 5.074-8.793" />
    <path d="M21.436 10.887c-3.65 1.17-7.623-1.424-8.793-5.074" />
  </svg>
);

export const ProfessionIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" {...commonProps} {...props}>
    <path d="M10 7.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
    <path d="M10 7.5c0 .35-.04.688-.115.996m-8.77 0A4.484 4.484 0 011 7.5" />
    <path d="M13.5 16a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z" />
    <path d="M13.5 16c0-.35.04-.688.115-.996m8.77 0c.075.308.115.645.115.996" />
    <path d="M5.5 12v-.5m0 .5c-1.558 1.13-2.5 2.825-2.5 4.5s.942 3.37 2.5 4.5" />
    <path d="M18.5 12v-.5m0 .5c1.558 1.13 2.5 2.825 2.5 4.5s-.942 3.37-2.5 4.5" />
    <path d="M10 7.5c.928-1.528 2.59-2.5 4.5-2.5s3.572.972 4.5 2.5" />
  </svg>
);

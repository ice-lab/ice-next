import * as React from 'react';
import { Link } from 'ice';

export default function About() {
  return (
    <>
      <h2>About Page</h2>
      <Link to="/">home</Link>
      <span className="mark">new</span>
    </>
  );
}

export function getPageConfig() {
  return {
    title: 'About',
    meta: [
      {
        name: 'theme-color',
        content: '#eee',
      },
    ],
    links: [{
      href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
      rel: 'stylesheet',
      block: true,
    }],
    scripts: [{
      src: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min.js',
      block: true,
    }],
    auth: ['admin'],
  };
}

export function getInitialData() {
  return {
    name: 'about',
  };
}
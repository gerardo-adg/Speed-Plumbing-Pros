import { site } from '../data/site';

type Json = Record<string, unknown>;
const abs = (path: string) => new URL(path, site.url).toString();
const businessId = `${site.url}/#business`;

/** The business itself. Only includes fields that are filled in `src/data/site.ts`. */
export function business(areaNames: string[] = []): Json {
  const { street, city, region, postalCode } = site.address;
  return {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    '@id': businessId,
    name: site.name,
    url: site.url,
    telephone: site.phoneE164,
    ...(site.email ? { email: site.email } : {}),
    image: abs('/og.png'),
    logo: abs('/icon-512.png'),
    address: {
      '@type': 'PostalAddress',
      ...(street ? { streetAddress: street } : {}),
      addressLocality: city,
      addressRegion: region,
      ...(postalCode ? { postalCode } : {}),
      addressCountry: 'US',
    },
    ...(areaNames.length ? { areaServed: areaNames.map((name) => ({ '@type': 'City', name: `${name}, CA` })) } : {}),
    sameAs: [site.links.facebook, site.links.instagram, site.links.bbb, site.links.yelp, site.links.googleReviews].filter(Boolean),
  };
}

export function breadcrumbs(items: { name: string; href: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.href) })),
  };
}

export function service(name: string, description: string, path: string, areaName = 'Greater Sacramento'): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    serviceType: name,
    description,
    url: abs(path),
    provider: { '@id': businessId },
    areaServed: { '@type': 'Place', name: areaName },
  };
}

export function faqPage(faqs: { q: string; a: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

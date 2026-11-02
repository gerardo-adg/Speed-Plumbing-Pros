/**
 * Business details used across the whole site (header, footer, schema, contact page).
 * Anything marked TODO must be confirmed with the client before launch.
 * Keep name / phone / address IDENTICAL to the Google Business Profile.
 */
export interface SiteInfo {
  name: string; url: string; tagline: string; phone: string; phoneE164: string; email: string; license: string;
  address: { street: string; city: string; region: string; postalCode: string };
  hours: string; emergency247: boolean; rating: { value: number; count: number };
  links: { googleReviews: string; leaveReview: string; facebook: string; instagram: string; bbb: string; yelp: string };
}

export const site: SiteInfo = {
  name: 'Speed Plumbing Pros',
  url: 'https://speedplumbingpros.com',
  tagline: 'Fast, friendly plumbers for Sacramento homes',
  phone: '(916) 333-8369',
  phoneE164: '+19163338369',
  email: '', // TODO: confirm public email
  license: '000000', // TODO: real CSLB license number (required in CA advertising)
  address: {
    street: '', // TODO: street address, or leave empty if service-area business only
    city: 'Sacramento',
    region: 'CA',
    postalCode: '',
  },
  hours: '', // TODO: office hours, e.g. "Mon–Sat 7am–7pm"
  emergency247: true,
  rating: { value: 5.0, count: 75 }, // From Google; update periodically
  links: {
    googleReviews: '', // TODO: Google Maps reviews URL
    leaveReview: '', // TODO: Google "write a review" short link
    facebook: '', // TODO
    instagram: '', // TODO
    bbb: '', // TODO: BBB profile URL
    yelp: '', // TODO: Yelp business page URL
  },
};

export const telHref = `tel:${site.phoneE164}`;

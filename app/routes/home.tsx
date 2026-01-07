import type { Route } from "./+types/home";

// Types matching your ACF fields
interface ACFContent {
  // Headings and Content
  heading1?: string;
  heading2?: string;
  heading3?: string;
  heading4?: string;
  heading5?: string;
  heading6?: string;
  heading7?: string;
  heading8?: string;
  content1?: string;
  content2?: string;
  content3?: string;
  content4?: string;
  content5?: string;
  content6?: string;
  content7?: string;
  content8?: string;

  // Location Info
  location?: string;
  county?: string;
  locationstateshort?: string;
  companyphone?: string;
  maplocation?: string;

  // Services
  serviceimage1?: { url: string; alt?: string };
  serviceimage2?: { url: string; alt?: string };
  serviceimage3?: { url: string; alt?: string };
  serviceheading1?: string;
  serviceheading2?: string;
  serviceheading3?: string;
  serviceexcerpt1?: string;
  serviceexcerpt2?: string;
  serviceexcerpt3?: string;
  serviceurl1?: string;
  serviceurl2?: string;
  serviceurl3?: string;

  // Reviews
  reviewslider?: string;

  // Wiki/About
  wikiexcerpt?: string;
  wikiblurb?: string;
  wikilocationurl?: string;
  wikicountyurl?: string;
  wikistateurl?: string;

  // Maps
  locationmap?: string;
  dynamicmaphtml?: string;
  directionsmap?: string;
  gmbmap?: string;

  // Links
  aggregatelinkshtml?: string;
  internallinkprevious?: string;
  internallinknext?: string;

  // SEO
  anchortag?: string;
  masterkeyword?: string;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "description", content: "Welcome to our website" },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  try {
    const response = await fetch(
      "https://statichozio.com/wp-json/wp/v2/pages?slug=home&_fields=id,title,acf"
    );

    if (!response.ok) {
      console.error("API response not ok:", response.status);
      return { acf: null, error: true };
    }

    const pages = await response.json();

    if (!pages || pages.length === 0) {
      console.error("No home page found");
      return { acf: null, error: true };
    }

    const page = pages[0];
    return { acf: page.acf as ACFContent, error: false };
  } catch (error) {
    console.error("Error fetching from WordPress API:", error);
    return { acf: null, error: true };
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { acf, error } = loaderData;

  if (error || !acf) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Unable to load content. Please try again later.</p>
      </div>
    );
  }

  // Build services array from individual fields
  const services = [
    {
      image: acf.serviceimage1,
      heading: acf.serviceheading1,
      excerpt: acf.serviceexcerpt1,
      url: acf.serviceurl1,
    },
    {
      image: acf.serviceimage2,
      heading: acf.serviceheading2,
      excerpt: acf.serviceexcerpt2,
      url: acf.serviceurl2,
    },
    {
      image: acf.serviceimage3,
      heading: acf.serviceheading3,
      excerpt: acf.serviceexcerpt3,
      url: acf.serviceurl3,
    },
  ].filter((s) => s.heading); // Only show services that have a heading

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-950 text-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {acf.heading1 && (
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {acf.heading1}
            </h1>
          )}
          {acf.content1 && (
            <p className="text-xl md:text-2xl text-blue-100 mb-6 max-w-2xl mx-auto">
              {acf.content1}
            </p>
          )}
          {(acf.location || acf.county) && (
            <p className="text-lg text-blue-200">
              {[acf.location, acf.county, acf.locationstateshort].filter(Boolean).join(", ")}
            </p>
          )}
          {acf.companyphone && (
            <a
              href={`tel:${acf.companyphone}`}
              className="inline-block mt-8 bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Call {acf.companyphone}
            </a>
          )}
        </div>
      </section>

      {/* Services Section */}
      {services.length > 0 && (
        <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            {acf.heading2 && (
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
                {acf.heading2}
              </h2>
            )}
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  {service.image?.url && (
                    <img
                      src={service.image.url}
                      alt={service.image.alt || service.heading || ""}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    {service.heading && (
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        {service.heading}
                      </h3>
                    )}
                    {service.excerpt && (
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {service.excerpt}
                      </p>
                    )}
                    {service.url && (
                      <a
                        href={service.url}
                        className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                      >
                        Learn More →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About/Wiki Section */}
      {(acf.wikiexcerpt || acf.wikiblurb) && (
        <section className="py-20 px-6 bg-white dark:bg-gray-950">
          <div className="max-w-4xl mx-auto">
            {acf.heading3 && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                {acf.heading3}
              </h2>
            )}
            {acf.wikiexcerpt && (
              <p className="text-xl text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                {acf.wikiexcerpt}
              </p>
            )}
            {acf.wikiblurb && (
              <div
                className="text-gray-600 dark:text-gray-300 leading-relaxed prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: acf.wikiblurb }}
              />
            )}
            {(acf.wikilocationurl || acf.wikicountyurl || acf.wikistateurl) && (
              <div className="flex flex-wrap gap-4 mt-8">
                {acf.wikilocationurl && (
                  <a href={acf.wikilocationurl} className="text-blue-600 dark:text-blue-400 hover:underline">
                    Learn about {acf.location}
                  </a>
                )}
                {acf.wikicountyurl && (
                  <a href={acf.wikicountyurl} className="text-blue-600 dark:text-blue-400 hover:underline">
                    Learn about {acf.county}
                  </a>
                )}
                {acf.wikistateurl && (
                  <a href={acf.wikistateurl} className="text-blue-600 dark:text-blue-400 hover:underline">
                    Learn about {acf.locationstateshort}
                  </a>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Content Section 2 */}
      {(acf.heading4 || acf.content2) && (
        <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto">
            {acf.heading4 && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                {acf.heading4}
              </h2>
            )}
            {acf.content2 && (
              <div
                className="text-gray-600 dark:text-gray-300 leading-relaxed prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: acf.content2 }}
              />
            )}
          </div>
        </section>
      )}

      {/* Reviews Section */}
      {acf.reviewslider && (
        <section className="py-20 px-6 bg-white dark:bg-gray-950">
          <div className="max-w-6xl mx-auto">
            {acf.heading5 && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                {acf.heading5}
              </h2>
            )}
            <div
              className="reviews-container"
              dangerouslySetInnerHTML={{ __html: acf.reviewslider }}
            />
          </div>
        </section>
      )}

      {/* Content Section 3 */}
      {(acf.heading6 || acf.content3) && (
        <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto">
            {acf.heading6 && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                {acf.heading6}
              </h2>
            )}
            {acf.content3 && (
              <div
                className="text-gray-600 dark:text-gray-300 leading-relaxed prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: acf.content3 }}
              />
            )}
          </div>
        </section>
      )}

      {/* Content Section 4 */}
      {(acf.heading7 || acf.content4) && (
        <section className="py-20 px-6 bg-white dark:bg-gray-950">
          <div className="max-w-4xl mx-auto">
            {acf.heading7 && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                {acf.heading7}
              </h2>
            )}
            {acf.content4 && (
              <div
                className="text-gray-600 dark:text-gray-300 leading-relaxed prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: acf.content4 }}
              />
            )}
          </div>
        </section>
      )}

      {/* Map Section */}
      {(acf.locationmap || acf.dynamicmaphtml || acf.gmbmap) && (
        <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            {acf.heading8 && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                {acf.heading8}
              </h2>
            )}
            <div className="grid md:grid-cols-2 gap-8">
              {acf.gmbmap && (
                <div
                  className="rounded-xl overflow-hidden shadow-lg"
                  dangerouslySetInnerHTML={{ __html: acf.gmbmap }}
                />
              )}
              {acf.dynamicmaphtml && (
                <div
                  className="rounded-xl overflow-hidden shadow-lg"
                  dangerouslySetInnerHTML={{ __html: acf.dynamicmaphtml }}
                />
              )}
              {acf.directionsmap && (
                <div
                  className="rounded-xl overflow-hidden shadow-lg"
                  dangerouslySetInnerHTML={{ __html: acf.directionsmap }}
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* Additional Content Sections */}
      {(acf.content5 || acf.content6 || acf.content7 || acf.content8) && (
        <section className="py-20 px-6 bg-white dark:bg-gray-950">
          <div className="max-w-4xl mx-auto space-y-12">
            {acf.content5 && (
              <div
                className="text-gray-600 dark:text-gray-300 leading-relaxed prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: acf.content5 }}
              />
            )}
            {acf.content6 && (
              <div
                className="text-gray-600 dark:text-gray-300 leading-relaxed prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: acf.content6 }}
              />
            )}
            {acf.content7 && (
              <div
                className="text-gray-600 dark:text-gray-300 leading-relaxed prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: acf.content7 }}
              />
            )}
            {acf.content8 && (
              <div
                className="text-gray-600 dark:text-gray-300 leading-relaxed prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: acf.content8 }}
              />
            )}
          </div>
        </section>
      )}

      {/* Aggregate Links */}
      {acf.aggregatelinkshtml && (
        <section className="py-12 px-6 bg-gray-100 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <div
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: acf.aggregatelinkshtml }}
            />
          </div>
        </section>
      )}

      {/* Internal Navigation */}
      {(acf.internallinkprevious || acf.internallinknext) && (
        <nav className="py-8 px-6 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            {acf.internallinkprevious ? (
              <a
                href={acf.internallinkprevious}
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
              >
                ← Previous
              </a>
            ) : (
              <span />
            )}
            {acf.internallinknext && (
              <a
                href={acf.internallinknext}
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
              >
                Next →
              </a>
            )}
          </div>
        </nav>
      )}
    </div>
  );
}

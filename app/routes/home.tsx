import type { Route } from "./+types/home";

// Types for your content - these will match your ACF fields
interface HeroContent {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
}

interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

interface AboutContent {
  title: string;
  description: string;
  image?: string;
}

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

interface CTAContent {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

interface HomePageContent {
  hero: HeroContent;
  features: Feature[];
  about: AboutContent;
  testimonials: Testimonial[];
  cta: CTAContent;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Your Site Name | Home" },
    { name: "description", content: "Welcome to our website" },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  // TODO: Replace with your ACF REST API call
  // const response = await fetch('https://yoursite.com/wp-json/acf/v3/pages/home');
  // const acfData = await response.json();

  const content: HomePageContent = {
    hero: {
      headline: "Welcome to Our Website",
      subheadline: "We help you achieve amazing things with our innovative solutions",
      ctaText: "Get Started",
      ctaLink: "/contact",
    },
    features: [
      {
        id: "1",
        title: "Feature One",
        description: "Description of your first key feature or service offering.",
      },
      {
        id: "2",
        title: "Feature Two",
        description: "Description of your second key feature or service offering.",
      },
      {
        id: "3",
        title: "Feature Three",
        description: "Description of your third key feature or service offering.",
      },
    ],
    about: {
      title: "About Us",
      description: "Tell your story here. Share your mission, values, and what makes you unique. This section helps visitors connect with your brand on a personal level.",
    },
    testimonials: [
      {
        id: "1",
        quote: "This product changed everything for our business. Highly recommended!",
        author: "Jane Smith",
        role: "CEO, Company Name",
      },
      {
        id: "2",
        quote: "Excellent service and support. We've been customers for years.",
        author: "John Doe",
        role: "Director, Another Company",
      },
    ],
    cta: {
      title: "Ready to Get Started?",
      description: "Join thousands of satisfied customers today.",
      buttonText: "Contact Us",
      buttonLink: "/contact",
    },
  };

  return {
    message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE,
    content,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { content } = loaderData;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-950 text-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {content.hero.headline}
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {content.hero.subheadline}
          </p>
          <a
            href={content.hero.ctaLink}
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            {content.hero.ctaText}
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {content.features.map((feature) => (
              <div
                key={feature.id}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                {feature.icon && (
                  <div className="text-4xl mb-4">{feature.icon}</div>
                )}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {content.about.image && (
              <div className="md:w-1/2">
                <img
                  src={content.about.image}
                  alt="About us"
                  className="rounded-xl shadow-lg"
                />
              </div>
            )}
            <div className={content.about.image ? "md:w-1/2" : "max-w-3xl mx-auto text-center"}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {content.about.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {content.about.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {content.testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm"
              >
                <blockquote className="text-lg text-gray-700 dark:text-gray-200 mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  {testimonial.avatar && (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-blue-600 dark:bg-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {content.cta.title}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {content.cta.description}
          </p>
          <a
            href={content.cta.buttonLink}
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            {content.cta.buttonText}
          </a>
        </div>
      </section>
    </div>
  );
}

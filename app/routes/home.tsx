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
  // Example: const response = await fetch('https://yoursite.com/wp-json/acf/v3/pages/home');
  // const acfData = await response.json();

  // Placeholder content - replace with API data
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
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>{content.hero.headline}</h1>
          <p className="hero-subheadline">{content.hero.subheadline}</p>
          <a href={content.hero.ctaLink} className="btn btn-primary">
            {content.hero.ctaText}
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>What We Offer</h2>
          <div className="features-grid">
            {content.features.map((feature) => (
              <div key={feature.id} className="feature-card">
                {feature.icon && <div className="feature-icon">{feature.icon}</div>}
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="container">
          <div className="about-content">
            {content.about.image && (
              <div className="about-image">
                <img src={content.about.image} alt="About us" />
              </div>
            )}
            <div className="about-text">
              <h2>{content.about.title}</h2>
              <p>{content.about.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2>What Our Customers Say</h2>
          <div className="testimonials-grid">
            {content.testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <blockquote>"{testimonial.quote}"</blockquote>
                <div className="testimonial-author">
                  {testimonial.avatar && (
                    <img src={testimonial.avatar} alt={testimonial.author} />
                  )}
                  <div>
                    <strong>{testimonial.author}</strong>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>{content.cta.title}</h2>
          <p>{content.cta.description}</p>
          <a href={content.cta.buttonLink} className="btn btn-secondary">
            {content.cta.buttonText}
          </a>
        </div>
      </section>
    </div>
  );
}

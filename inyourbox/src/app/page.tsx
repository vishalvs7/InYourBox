// src/app/page.tsx - Complete fixed version
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { ArrowRight, Mail, Users, BarChart, Shield, Zap, Check, Sparkles } from 'lucide-react';
import Link from 'next/link';

/**
 * Landing page for MailFlow
 * - Hero section with CTA
 * - Features showcase
 * - Pricing comparison
 * - Social proof/testimonials
 */
export default function HomePage() {
  const features = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Smart Campaign Builder',
      description: 'Drag & drop editor with beautiful templates',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Contact Management',
      description: 'Import, segment, and manage your audience',
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: 'Detailed Analytics',
      description: 'Track opens, clicks, and conversions in real-time',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Compliance Ready',
      description: 'GDPR, CAN-SPAM, and India IT Act compliant',
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Fast Delivery',
      description: '99% deliverability with smart sending',
    },
  ];

  const plans = [
    {
      name: 'Free',
      price: '₹0',
      period: '/month',
      description: 'Perfect for getting started',
      features: [
        '500 emails/month',
        '1,000 contacts',
        'Basic templates',
        'Email support',
        'Open/click tracking',
      ],
      cta: 'Get Started Free',
      href: '/auth/register',
      popular: false,
    },
    {
      name: 'Starter',
      price: '₹499',
      period: '/month',
      description: 'Growing businesses',
      features: [
        '5,000 emails/month',
        '5,000 contacts',
        'Advanced templates',
        'Priority support',
        'A/B testing',
        'Automation workflows',
        'No MailFlow branding',
      ],
      cta: 'Start Free Trial',
      href: '/auth/register',
      popular: true,
    },
    {
      name: 'Professional',
      price: '₹1,499',
      period: '/month',
      description: 'For scaling teams',
      features: [
        '20,000 emails/month',
        '20,000 contacts',
        'Custom templates',
        'Dedicated support',
        'Advanced analytics',
        'API access',
        'Custom domains',
      ],
      cta: 'Start Free Trial',
      href: '/auth/register',
      popular: false,
    },
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder, StartupIndia',
      content: 'MailFlow helped us triple our email engagement. The simplicity is perfect for Indian startups.',
    },
    {
      name: 'Priya Sharma',
      role: 'Marketing Head, EcoProducts',
      content: 'Compliance was our biggest worry. MailFlow made it effortless with their Indian law expertise.',
    },
    {
      name: 'Amit Patel',
      role: 'Solo Entrepreneur',
      content: 'As a solo founder, I needed affordable email marketing. MailFlow delivers enterprise features at startup prices.',
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Sparkles className="h-4 w-4" />
          Built specifically for Indian businesses
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-gray-50 mb-6">
          Email Marketing Made{' '}
          <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
            Simple & Affordable
          </span>
        </h1>
        
        <p className="mx-auto max-w-2xl text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10">
          Send professional emails, grow your audience, and track results—all from one platform designed for Indian entrepreneurs and startups.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/auth/register">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600 px-8 py-6 text-base">
              Start Free Forever
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button size="lg" variant="outline" className="px-8 py-6 text-base">
              Sign In to Dashboard
            </Button>
          </Link>
        </div>
        
        <p className="text-sm text-gray-500">
          No credit card required • Free plan includes 500 emails/month • Cancel anytime
        </p>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            Everything You Need to Grow
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Powerful features designed specifically for Indian business needs and compliance requirements.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors hover:shadow-lg">
              <CardHeader>
                <div className="inline-flex items-center justify-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-4">
                  <div className="text-blue-500 dark:text-blue-400">{feature.icon}</div>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Section - Fixed Layout */}
      <section className="bg-gray-50 dark:bg-gray-900/50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Pay in INR. No hidden fees. Cancel anytime. Start free, upgrade when you grow.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div key={index} className={`relative ${plan.popular ? 'md:-mt-4' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center z-10">
                    <span className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <Card className={`
                  h-full border-gray-200 dark:border-gray-800 
                  ${plan.popular 
                    ? 'border-blue-300 dark:border-blue-700 shadow-xl' 
                    : 'shadow-md'
                  }
                  ${plan.popular ? 'pt-10' : ''}
                  transition-all duration-300 hover:shadow-xl
                `}>
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="mt-6">
                      <span className="text-4xl font-bold text-gray-900 dark:text-gray-50">{plan.price}</span>
                      <span className="text-gray-500 dark:text-gray-400 ml-2">{plan.period}</span>
                    </div>
                    <CardDescription className="text-lg mt-2">{plan.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link href={plan.href}>
                      <Button
                        className={`w-full py-3 text-base ${
                          plan.popular 
                            ? 'bg-blue-500 hover:bg-blue-600' 
                            : 'bg-gray-900 hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700'
                        }`}
                        size="lg"
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 text-gray-600 dark:text-gray-400">
            <p className="text-sm">All plans include: SPF/DKIM setup, bounce handling, unsubscribe management</p>
            <p className="text-sm mt-2">Need more? Contact us for custom enterprise solutions</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            Trusted by Indian Entrepreneurs
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            See what startups and businesses across India are saying about MailFlow.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-gray-200 dark:border-gray-800">
              <CardContent className="pt-6">
                <div className="text-gray-600 dark:text-gray-400 italic mb-6">
                  "{testimonial.content}"
                </div>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900 dark:text-gray-50">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Email Marketing?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
            Join thousands of Indian entrepreneurs who trust MailFlow for their email marketing needs. 
            Start free, no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-base">
                Get Started Free
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-base">
                Sign In
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-blue-200 text-sm">
            Free forever plan • 500 emails/month • No credit card required
          </p>
        </div>
      </section>
    </div>
  );
}

import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion } from '@/components/ui/accordion';
import { toast } from 'sonner';
import { useNavigate } from "react-router-dom";
import { 
  Phone, MessageCircle, Ruler, Layout, Palette, Wrench, Package, Zap, Home, 
  Check, MapPin, Clock, Mail, Grid3x3, Square, Columns, Maximize2, LayoutGrid, 
  Settings, ExternalLink, Diamond, Layers, Box, PanelTop, Paintbrush, Sparkles 
} from 'lucide-react';
import Header from '@/components/Header.jsx';
import BudgetFactorCard from '@/components/BudgetFactorCard.jsx';
import BudgetLevelCard from '@/components/BudgetLevelCard.jsx';
import KitchenTypeCard from '@/components/KitchenTypeCard.jsx';
import ProcessStep from '@/components/ProcessStep.jsx';
import TestimonialCard from '@/components/TestimonialCard.jsx';
import FAQItem from '@/components/FAQItem.jsx';
import MaterialFinishCard from '@/components/MaterialFinishCard.jsx';

const HomePage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    requirement: '',
    budget: ''
  });

  const handleInputChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBudgetChange = value => {
    setFormData({
      ...formData,
      budget: value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.phone || !formData.location || !formData.budget) {
    toast.error('Please fill in all required fields');
    return;
  }

  try {
    const res = await fetch("/api/hubspot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Request submitted. We will contact you shortly.");
        setTimeout(() => {
    navigate("/thank-you");
  }, 1000);
      setFormData({
        name: '',
        phone: '',
        location: '',
        requirement: '',
        budget: ''
      });
    } else {
      toast.error("Something went wrong");
      console.error(data);
    }
  } catch (error) {
    console.error(error);
    toast.error("Server error");
  }
};

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const budgetFactors = [{
    icon: Ruler,
    title: 'Kitchen size',
    description: 'Larger kitchens need more materials and labor, directly affecting the total cost.'
  }, {
    icon: Layout,
    title: 'Layout type',
    description: 'L-shaped, U-shaped, or parallel layouts have different material and installation requirements.'
  }, {
    icon: Palette,
    title: 'Shutter finish',
    description: 'Laminate, acrylic, or membrane finishes vary significantly in price and durability.'
  }, {
    icon: Wrench,
    title: 'Hardware quality',
    description: 'Hinges, drawer channels, and handles from premium brands add to the overall budget.'
  }, {
    icon: Package,
    title: 'Accessories',
    description: 'Pull-out baskets, corner units, and organizers improve functionality but increase costs.'
  }, {
    icon: Zap,
    title: 'Appliance integration',
    description: 'Built-in hobs, chimneys, and ovens require specific cabinet modifications and wiring.'
  }, {
    icon: Home,
    title: 'Civil/site changes',
    description: 'Plumbing relocation, electrical work, or wall modifications add to the project scope.'
  }];

  const budgetLevels = [{
    title: 'Smart Range',
    priceRange: '₹1.2L - ₹2.4L',
    description: 'Best for first-time homeowners or rental properties',
    image: 'https://images.unsplash.com/photo-1699621895931-afe11a7e1d96',
    features: ['Standard laminate finishes', 'Basic hardware and fittings', 'Essential storage solutions', 'Simple layout designs', 'Standard countertop options'],
    isRecommended: false
  }, {
    title: 'Comfort Range',
    priceRange: '₹2.5L - ₹4.2L',
    description: 'Ideal for families looking for quality and value',
    image: 'https://images.unsplash.com/photo-1617228069096-4638a7ffc906',
    features: ['Premium laminate or acrylic finishes', 'Branded hardware with soft-close', 'Modular storage accessories', 'Customized layout planning', 'Granite or quartz countertops', 'Basic appliance integration'],
    isRecommended: true
  }, {
    title: 'Premium Range',
    priceRange: '₹4.5L - ₹8L+',
    description: 'For those who want the best in design and materials',
    image: 'https://images.unsplash.com/photo-1697946594607-04d755acff2b',
    features: ['High-gloss or membrane finishes', 'Premium imported hardware', 'Full accessory package', 'Designer layouts with islands', 'Imported stone countertops', 'Complete appliance integration', 'Smart storage solutions'],
    isRecommended: false
  }];

  const kitchenTypes = [{
    icon: Grid3x3,
    title: 'L-Shaped',
    image: 'https://images.unsplash.com/photo-1680210849773-f97a41c6b7ed',
    alt: 'Modern L-shaped kitchen layout with modular design',
    description: 'Perfect for medium-sized spaces. Get the best L-shaped modular kitchen price with efficient corner usage.',
    imageContentKey: 'kitchenType_lShaped_image'
  }, {
    icon: Square,
    title: 'U-Shaped',
    image: 'https://images.unsplash.com/photo-1692133231156-257f3c285316',
    alt: 'Modern U-shaped kitchen layout with modular design',
    description: 'Maximum storage for larger kitchens. Discover competitive acrylic kitchen costs for premium U-shaped designs.',
    imageContentKey: 'kitchenType_uShaped_image'
  }, {
    icon: Columns,
    title: 'Parallel',
    image: 'https://images.unsplash.com/photo-1672322331200-c4ac12a93c15',
    description: 'Ideal for narrow spaces. Explore durable laminate kitchen options with two facing counters.',
    imageContentKey: 'kitchenType_parallel_image'
  }, {
    icon: Maximize2,
    title: 'Compact',
    image: 'https://images.unsplash.com/photo-1586753701871-07e025659129',
    description: 'Smart budget modular kitchen designs for small apartments and studio spaces.',
    imageContentKey: 'kitchenType_compact_image'
  }, {
    icon: LayoutGrid,
    title: 'Open',
    image: 'https://images.unsplash.com/photo-1656332336621-ede6257f24c5',
    description: 'Modern designs with kitchen islands and breakfast counters tailored to your budget.',
    imageContentKey: 'kitchenType_open_image'
  }, {
    icon: Settings,
    title: 'Custom Storage',
    image: 'https://images.unsplash.com/photo-1642497589594-c3e5fc670f39',
    description: 'Tailored solutions for unique spaces and requirements with transparent cost estimates.',
    imageContentKey: 'kitchenType_customStorage_image'
  }];

  const processSteps = [{
    number: 1,
    title: 'Requirement discussion',
    description: 'We understand your cooking habits, family size, and storage needs to plan the right kitchen.'
  }, {
    number: 2,
    title: 'Budget understanding',
    description: 'Clear discussion about your budget range and what you can expect within that investment.'
  }, {
    number: 3,
    title: 'Site measurement',
    description: 'Accurate measurements of your kitchen space, including plumbing and electrical points.'
  }, {
    number: 4,
    title: 'Layout planning',
    description: 'We create 2-3 layout options that maximize your space and match your workflow.'
  }, {
    number: 5,
    title: 'Finish selection',
    description: 'Guidance on choosing shutters, countertops, and hardware that fit your budget and style.'
  }, {
    number: 6,
    title: 'Estimate',
    description: 'Detailed breakdown of costs with no hidden charges, so you know exactly what you are paying for.'
  }, {
    number: 7,
    title: 'Final execution',
    description: 'Professional installation with quality checks at every stage until handover.'
  }];

  const materialFinishes = [
    {
      icon: Diamond,
      title: 'Acrylic Kitchen',
      description: 'Premium acrylic finish modular kitchen with a glossy appearance. Discover the best acrylic kitchen price and acrylic modular kitchen cost for your home.',
      image: 'https://images.unsplash.com/photo-1589010245895-fc559acd49cf',
      alt: 'Professional acrylic finish modular kitchen with glossy appearance',
      imageContentKey: 'material-acrylic-image'
    },
    {
      icon: Layers,
      title: 'Laminate Kitchen',
      description: 'Durable laminate kitchen options with various color choices. Get competitive laminate kitchen cost and laminate modular kitchen price estimates.',
      image: 'https://images.unsplash.com/photo-1692133214723-e6ab0c46d3c9',
      alt: 'Durable laminate kitchen with various color options',
      imageContentKey: 'material-laminate-image'
    },
    {
      icon: Box,
      title: 'Membrane Kitchen',
      description: 'Budget-friendly membrane finish kitchen designs. Explore our membrane kitchen catalog for affordable kitchen options that do not compromise on style.',
      image: 'https://images.unsplash.com/photo-1669211620495-00ad7993169a',
      alt: 'Budget-friendly membrane finish kitchen design',
      imageContentKey: 'material-membrane-image'
    },
    {
      icon: PanelTop,
      title: 'Glass Profile Kitchen',
      description: 'Modern glass profile kitchen with a sleek contemporary look. Elevate your space with a stunning glass profile kitchen and modern kitchen design.',
      image: 'https://images.unsplash.com/photo-1669211620495-00ad7993169a',
      alt: 'Modern glass profile kitchen with sleek contemporary look',
      imageContentKey: 'material-glass-image'
    },
    {
      icon: Paintbrush,
      title: 'Matte Finish Options',
      description: 'Elegant matte finish for a sophisticated kitchen appearance. Check our matte finish kitchen and matte modular kitchen collections for a subtle, premium feel.',
      image: 'https://images.unsplash.com/photo-1695542957477-5f5e3baf4800',
      alt: 'Elegant matte finish kitchen with sophisticated appearance',
      imageContentKey: 'finish-matte-image'
    },
    {
      icon: Sparkles,
      title: 'Gloss Finish Options',
      description: 'Shiny gloss finish kitchen for a premium, reflective look. Find the ideal gloss finish kitchen and gloss modular kitchen price to brighten your space.',
      image: 'https://images.unsplash.com/photo-1580587818225-4e05bcda8412',
      alt: 'Premium white glossy mirror finish kitchen with reflective surfaces',
      imageContentKey: 'finish-gloss-image'
    }
  ];

  const faqs = [{
    question: 'What is the typical cost range for a modular kitchen?',
    answer: 'Modular kitchen costs typically range from ₹1.2L to ₹8L+ depending on size, finishes, and accessories. A standard 8x10 ft kitchen in the Comfort Range usually costs between ₹2.5L to ₹4.2L including materials and installation.'
  }, {
    question: 'How long does it take to install a modular kitchen?',
    answer: 'Installation usually takes 7-12 working days after manufacturing. Manufacturing itself takes 3-4 weeks. The total timeline from order to completion is typically 5-7 weeks.'
  }, {
    question: 'What is the difference between laminate and acrylic finishes?',
    answer: 'Laminate is more budget-friendly and comes in many designs, but acrylic offers a high-gloss finish, better moisture resistance, and easier cleaning. Acrylic costs about 30-40% more than laminate but lasts longer in humid conditions.'
  }, {
    question: 'Do you provide a warranty on the kitchen?',
    answer: 'Yes, we provide a 5-year warranty on the carcass and a 1-year warranty on hardware and accessories. Countertops have separate warranties based on the material chosen.'
  }, {
    question: 'Can I see samples before finalizing the design?',
    answer: 'Absolutely. We have a showroom where you can see and touch different finishes, hardware, and accessories. We also provide sample boards for you to take home and match with your interiors.'
  }, {
    question: 'What if my kitchen space has irregular dimensions?',
    answer: 'We specialize in custom solutions for irregular spaces. Our team will measure and design a layout that maximizes every inch of your kitchen, regardless of shape or size constraints.'
  }];

  const testimonials = [{
    quote: 'Dream Kitchens helped us understand exactly where our money was going. They showed us different finish options and explained the cost difference clearly. We got a beautiful kitchen within our ₹3.2L budget.',
    name: 'Priya Sharma',
    role: 'Homeowner',
    location: 'Bangalore',
    image: 'https://images.unsplash.com/photo-1575383596664-30f4489f9786'
  }, {
    quote: 'What I appreciated most was their honesty about what we could afford. Instead of pushing expensive options, they suggested smart alternatives that looked great and saved us almost ₹80,000.',
    name: 'Rajesh Kumar',
    role: 'Software Engineer',
    location: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1590769620285-6926a01c2a58'
  }, {
    quote: 'The team walked us through every cost factor before we committed. No surprises, no hidden charges. The final bill was exactly what they quoted. Rare to find such transparency these days.',
    name: 'Anita Desai',
    role: 'Interior Designer',
    location: 'Pune',
    image: 'https://images.unsplash.com/photo-1536785533700-934dd2b2b6fc'
  }];

  const trustPoints = ['2,847 kitchens delivered across India', 'Transparent pricing with no hidden costs', 'Free design consultation and site visit', '5-year warranty on all installations'];
  const whyDreamKitchens = ['Guidance before finalization - we help you make informed decisions', 'Practical finish selection based on your cooking style and maintenance preferences', 'Better understanding of cost changes when you upgrade or modify designs', 'Solutions for different home sizes - from compact apartments to large villas', 'Support from planning to execution with dedicated project managers'];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Modular Kitchen Showroom Bhopal",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "R48, Zone -2, M P Nagar",
      "addressLocality": "Bhopal",
      "postalCode": "462011",
      "addressRegion": "MP",
      "addressCountry": "IN"
    },
    "telephone": "+91 9403893424",
    "areaServed": ["Bhopal", "Indore", "Bangalore", "Mumbai", "Pune", "Hyderabad", "Chennai"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Modular Kitchen Finishes",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Acrylic Modular Kitchen"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Laminate Modular Kitchen"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Membrane Modular Kitchen"
          }
        }
      ]
    }
  };

  return (
    <>
      <Helmet>
        <title>Modular Kitchen Price in Bhopal | Kitchen Showroom | Free Quotation</title>
        <meta name="description" content="Get modular kitchen price, cost & quotation in Bhopal. Explore L-shaped, acrylic, laminate kitchen designs. Budget-friendly custom modular kitchens near you." />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section id="home" className="relative min-h-[100dvh] flex items-center">
        <div className="absolute inset-0 z-0" style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1645500178047-873ba6551adf)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/70"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ letterSpacing: '-0.02em' }}>
                Discover the Best Modular Kitchen Price in Bhopal at Our Premium Kitchen Showroom
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 max-w-prose">
                Looking for the perfect balance of style and affordability? We provide transparent modular kitchen pricing, detailed estimates, and comprehensive quotations to help you build your dream space. Explore our budget-friendly custom modular kitchens tailored to your exact needs.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {trustPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{point}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-[0.98]" onClick={scrollToContact}>
                  Get Free Quotation
                </Button>
                <Button size="lg" variant="outline" className="transition-all duration-200 active:scale-[0.98]" onClick={() => window.open('https://wa.me/919876543210', '_blank')}>
                  <MessageCircle className="h-5 w-5 mr-2" />
                  WhatsApp for Quick Quote
                </Button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-card rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-card-foreground">Get Your Modular Kitchen Cost & Quotation</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleInputChange} required className="text-foreground placeholder:text-muted-foreground" />
                </div>
                <div>
                  <Input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} required className="text-foreground placeholder:text-muted-foreground" />
                </div>
                <div>
                  <Input type="text" name="location" placeholder="Location/City" value={formData.location} onChange={handleInputChange} required className="text-foreground placeholder:text-muted-foreground" />
                </div>
                <div>
                  <Textarea name="requirement" placeholder="Kitchen Requirement (optional)" value={formData.requirement} onChange={handleInputChange} rows={3} className="text-foreground placeholder:text-muted-foreground" />
                </div>
                <div>
                  <Select value={formData.budget} onValueChange={handleBudgetChange} required>
                    <SelectTrigger className="text-foreground">
                      <SelectValue placeholder="Select Budget Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2L">₹1L - ₹2L</SelectItem>
                      <SelectItem value="2-3L">₹2L - ₹3L</SelectItem>
                      <SelectItem value="3-5L">₹3L - ₹5L</SelectItem>
                      <SelectItem value="5-8L">₹5L - ₹8L</SelectItem>
                      <SelectItem value="8L+">₹8L+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-200 active:scale-[0.98]">
                  Submit Request
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Budget Factors Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
              What affects your kitchen budget?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Understanding these factors helps you make better decisions and plan your budget effectively.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {budgetFactors.map((factor, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <BudgetFactorCard {...factor} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Budget Level Cards Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
              Choose your budget range
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We offer solutions across different price points without compromising on quality.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {budgetLevels.map((level, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <BudgetLevelCard {...level} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Dream Kitchens Section */}
      <section id="about" className="py-20 bg-secondary text-secondary-foreground overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ letterSpacing: '-0.02em' }}>
                Why choose Dream Kitchens?
              </h2>
              <p className="text-lg leading-relaxed mb-8 max-w-prose">
                We believe in helping you make the right choice, not the most expensive one. Our team focuses on understanding your needs and budget before suggesting solutions.
              </p>

              <ul className="space-y-4">
                {whyDreamKitchens.map((point, index) => (
                  <motion.li key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-base leading-relaxed">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://horizons-cdn.hostinger.com/0fa0464d-bde6-46e7-a228-5f4a917b6997/kitchen-trends-2024-3L9by.jpg" alt="Professional kitchen designer consultation" className="object-cover w-full h-full" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Kitchen Types Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
              L-shaped, Acrylic & Laminate Modular Kitchen Prices & Designs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From compact spaces to large open kitchens, we create layouts that work for your home and budget.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {kitchenTypes.map((type, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <KitchenTypeCard {...type} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
              How we work with you
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A clear, step-by-step process from your first call to final installation.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            <div className="space-y-12">
              {processSteps.map((step, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                  <ProcessStep {...step} />
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="hidden lg:block sticky top-24 relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1682888818620-94875adf5bb9" alt="Kitchen installation and transformation process" className="object-cover w-full h-full" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Material & Finish Selection Section */}
      <section className="py-20" data-content-key="material-finish-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
              Price Depends on Finish and Material Selection
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The materials and finishes you choose significantly impact your modular kitchen pricing. Explore our range of options to find the perfect match for your style and budget.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {materialFinishes.map((finish, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <MaterialFinishCard 
                  icon={finish.icon}
                  title={finish.title}
                  description={finish.description}
                  image={finish.image}
                  alt={finish.alt}
                  imageContentKey={finish.imageContentKey}
                  onQuoteClick={scrollToContact}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
              Common questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quick answers to help you understand modular kitchens better.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                  <FAQItem {...faq} value={`item-${index}`} />
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
              What our customers say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real feedback from homeowners who worked with us.
            </p>
          </motion.div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="contact" className="py-20 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
              Need a budget-friendly kitchen plan that still looks good?
            </h2>
            <p className="text-lg mb-8 leading-relaxed opacity-90">
              Let us help you plan a kitchen that fits your space, budget, and lifestyle. No obligation, just honest advice.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-background text-foreground hover:bg-background/90 transition-all duration-200 active:scale-[0.98]" onClick={() => window.location.href = 'tel:+919403893424'}>
                <Phone className="h-5 w-5 mr-2" />
                Call +91 9403893424
              </Button>
              <Button size="lg" className="bg-background text-foreground hover:bg-background/90 transition-all duration-200 active:scale-[0.98]" onClick={() => window.open('https://wa.me/919403893424', '_blank')}>
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp Us
              </Button>
              <Button size="lg" className="bg-background text-foreground hover:bg-background/90 transition-all duration-200 active:scale-[0.98]" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Get Free Quotation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <span className="text-xl font-bold mb-4 block">Dream Kitchens</span>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Helping families plan and build modular kitchens that fit their budget and lifestyle.
              </p>
            </div>

            <div>
              <span className="text-sm font-semibold mb-4 block tracking-wide uppercase">Contact</span>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +91 9403893424
                </p>
                <p className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Available
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  info@dreamkitchens.in
                </p>
              </div>
            </div>

            <div>
              <span className="text-sm font-semibold mb-4 block tracking-wide uppercase">Visit Us</span>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span data-content-key="visitUs_address">R48, Zone -2, M P Nagar Bhopal. 462011</span>
                </p>
                <a 
                  href="https://share.google/rz1ri2AcjiDWDBZtX" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-200 font-medium group"
                >
                  <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                  View on Google Maps
                </a>
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Mon-Sat: 11 AM - 8 PM
                </p>
              </div>
            </div>

            <div>
              <span className="text-sm font-semibold mb-4 block tracking-wide uppercase">Service Area</span>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Bhopal, Indore, Bangalore, Mumbai, Pune, Hyderabad, Chennai, and surrounding areas all majour Cities
              </p>
            </div>
          </div>

          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 Dream Kitchens. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors duration-200">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card border-t shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-3">
            <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-[0.98]" onClick={() => window.location.href = 'tel:+919403893424'}>
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </Button>
            <Button className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-200 active:scale-[0.98]" onClick={() => window.open('https://wa.me/919403893424', '_blank')}>
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

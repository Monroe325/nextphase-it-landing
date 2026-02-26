# NextPhase IT Landing Page

A professional B2B technology consultancy landing page for NextPhase IT, helping UK SMEs transform manual operations into structured, automated systems.

**Experience Qualities**:
1. **Professional** - Enterprise-grade credibility that establishes trust with business owners making significant operational decisions
2. **Structured** - Clear information hierarchy that mirrors the organized systems the consultancy builds for clients
3. **Direct** - No-nonsense communication that respects the time of busy business owners

**Complexity Level**: Content Showcase (information-focused) - This is a marketing landing page designed to communicate value proposition, build credibility, and convert visitors to book a consultation call.

## Essential Features

### Header Navigation
- **Functionality**: Sticky header with brand name and prominent CTA button
- **Purpose**: Maintain brand presence and conversion opportunity throughout page scroll
- **Trigger**: Page load, persistent on scroll
- **Progression**: Always visible → Quick access to booking
- **Success criteria**: Sticky positioning, responsive on mobile, accessible CTA

### Hero Section
- **Functionality**: Presents core value proposition with primary CTA options
- **Purpose**: Immediately communicate what NextPhase IT does and provide multiple contact methods
- **Trigger**: Page load
- **Progression**: Visitor lands → Reads headline → Understands service → Chooses contact method (book call or send message) → Takes action
- **Success criteria**: Clear value prop, visible CTA options with tabs, professional first impression, contact form persists submissions

### Problem Section
- **Functionality**: Articulates common pain points of target audience
- **Purpose**: Create resonance with visitors experiencing these exact challenges
- **Trigger**: Scroll after hero
- **Progression**: Visitor scrolls → Recognizes their problems → Continues reading for solution
- **Success criteria**: Pain points are specific and relatable to UK trades/service businesses

### Solution Section
- **Functionality**: Outlines service offerings and approach
- **Purpose**: Present NextPhase IT's capabilities and methodology
- **Trigger**: Natural scroll progression
- **Progression**: Visitor understands problems → Sees solutions → Gains confidence in approach
- **Success criteria**: Services clearly explained, aligned with stated problems

### Process Section
- **Functionality**: Explains 3-step engagement process
- **Purpose**: Remove uncertainty about what working together looks like
- **Trigger**: Continued scroll
- **Progression**: Visitor interested → Learns process → Understands next steps
- **Success criteria**: Process feels structured, professional, and low-risk

### Pricing Section
- **Functionality**: Displays three service package tiers with clear pricing and features
- **Purpose**: Establish transparency, help visitors understand investment levels, and facilitate decision-making
- **Trigger**: Scroll after process section
- **Progression**: Visitor understands process → Reviews pricing options → Identifies appropriate tier → Takes action to book or contact
- **Success criteria**: Clear differentiation between tiers, transparent pricing, obvious value propositions, "Most Popular" tier highlighted

### ROI Calculator Section
- **Functionality**: Interactive calculator allowing visitors to input their business metrics and see projected savings and ROI
- **Purpose**: Provide concrete, personalized financial justification for the investment decision
- **Trigger**: Scroll after pricing section
- **Progression**: Visitor sees pricing → Uses calculator with their own numbers → Sees personalized ROI projections → Understands tangible value → Motivated to take action
- **Success criteria**: Intuitive inputs (sliders and number fields), real-time calculation updates, clear display of savings breakdown, compelling ROI presentation, CTA button at bottom

### Outcomes Section
- **Functionality**: Presents specific, measurable results
- **Purpose**: Demonstrate tangible value and ROI
- **Trigger**: Scroll progression
- **Progression**: Visitor sees results → Calculates own potential value → Motivated to act
- **Success criteria**: Outcomes are concrete and quantifiable

### Testimonials Section
- **Functionality**: Displays client testimonials with names, roles, and companies
- **Purpose**: Build trust and credibility through social proof
- **Trigger**: Scroll after outcomes
- **Progression**: Visitor sees results → Reads real client experiences → Trust increases
- **Success criteria**: Authentic testimonials, professional presentation, UK-based clients

### Target Client Section
- **Functionality**: Clarifies ideal client profile
- **Purpose**: Help visitors self-qualify and feel "this is for me"
- **Trigger**: Nearing end of page
- **Progression**: Visitor checks if they fit → Confirms alignment → Ready to book
- **Success criteria**: Clear client profiles that resonate with target market

### FAQ Section
- **Functionality**: Accordion-style frequently asked questions
- **Purpose**: Address common objections and concerns proactively
- **Trigger**: Scroll near end of page
- **Progression**: Visitor has questions → Finds answers → Objections resolved → Ready to act
- **Success criteria**: Comprehensive coverage of pricing, process, and integration concerns

### Final CTA Section
- **Functionality**: Strong closing call-to-action with multiple contact options
- **Purpose**: Convert interested visitors to booked consultations or contact form submissions
- **Trigger**: End of content journey
- **Progression**: Visitor convinced → Sees CTA options → Chooses preferred contact method → Takes action
- **Success criteria**: CTA is compelling and action-oriented, contact form available as alternative, submissions persist

### Footer
- **Functionality**: Standard footer with business information
- **Purpose**: Provide credibility markers and contact information
- **Trigger**: Bottom of page
- **Progression**: Visitor needs more info → Finds contact details
- **Success criteria**: Professional, complete business information

## Edge Case Handling
- **Mobile viewport**: Responsive layout adapts cleanly to all screen sizes, header CTA text shortens on small screens
- **Long content sections**: Proper spacing prevents overwhelming walls of text
- **CTA clicks**: Placeholder Calendly link ready to be replaced with real booking URL
- **Contact form submissions**: Form data persists using useKV, toast notifications confirm successful submission, form clears after submission
- **Form validation**: Required fields (name, email, message) enforced with native HTML5 validation
- **Slow connections**: Minimal assets ensure fast load times
- **Accessibility**: Semantic HTML and proper heading hierarchy for screen readers, form labels properly associated with inputs
- **Accordion interactions**: FAQ accordion allows single item open at a time for focused reading
- **Scroll behavior**: Smooth scrolling enabled for better UX
- **Tab switching**: Seamless switching between booking and contact form options in Hero and FinalCTA sections

## Design Direction
The design should evoke **enterprise credibility, operational precision, and professional competence**. This is not a flashy tech startup—it's a serious business consultancy for serious business owners. The aesthetic should feel like walking into a well-organized, efficient office: clean, structured, and confidence-inspiring.

## Color Selection
A refined, professional palette built on trust and clarity:

- **Primary Color**: Deep Navy `oklch(0.25 0.05 250)` - Communicates professionalism, stability, and expertise without the coldness of pure black
- **Secondary Color**: Slate Gray `oklch(0.45 0.015 250)` - Supporting text and secondary elements that maintain readability hierarchy
- **Accent Color**: Vibrant Blue `oklch(0.55 0.15 245)` - CTAs and interactive elements that command attention while staying professional
- **Background**: Pure White `oklch(1 0 0)` - Clean canvas that prioritizes content and maintains enterprise aesthetic
- **Muted**: Light Gray `oklch(0.96 0 0)` - Card backgrounds and subtle section separators

**Foreground/Background Pairings**:
- Primary Navy on White Background - Ratio 12.8:1 ✓ (AAA)
- Accent Blue on White Background - Ratio 5.2:1 ✓ (AA)
- White on Accent Blue - Ratio 5.2:1 ✓ (AA)
- Secondary Slate on White - Ratio 7.1:1 ✓ (AAA)

## Font Selection
Typography should project **clarity, professionalism, and modern business competence**—the visual equivalent of a well-structured business report.

- **Primary Font**: Inter - Clean, highly legible sans-serif perfect for professional B2B communication
- **Typographic Hierarchy**:
  - H1 (Main Headline): Inter Bold / 48px / -0.02em / leading-tight
  - H2 (Section Titles): Inter SemiBold / 36px / -0.01em / leading-tight
  - H3 (Subsections): Inter SemiBold / 24px / normal / leading-snug
  - Body (Primary): Inter Regular / 18px / normal / leading-relaxed
  - Body (Secondary): Inter Regular / 16px / normal / leading-relaxed
  - CTA Button: Inter SemiBold / 18px / normal
  - Small Print: Inter Regular / 14px / normal / leading-normal

## Animations
Animations should be **nearly invisible**—serving clarity and feedback, never decoration. Subtle hover state transitions (200ms) on interactive elements. Smooth scroll behavior for anchor links. No page load animations, no floating elements, no attention-seeking motion. Every transition should feel like the natural physics of a well-built interface.

## Component Selection
- **Components**: Custom-built components using Shadcn primitives where appropriate (Button, Card, Accordion, Tabs, Input, Textarea, Label)
- **Customizations**: 
  - Sticky header with brand and CTA
  - Hero section with centered content and tabbed CTA options (Book Call / Send Message)
  - Contact form with validation and persistence (stores submissions in useKV)
  - Problem section with icon + text list items
  - Solution section with service cards in grid layout
  - Process section with numbered step cards
  - Pricing section with three-tier package table (Systems Audit, Core Build, Enterprise Build) featuring highlighted "Most Popular" option, feature lists with checkmarks, and clear CTA buttons
  - ROI Calculator section with interactive inputs (sliders for employees/hours/lost jobs, number inputs for rates/values), real-time calculation display showing current waste vs potential savings, detailed breakdown of gains (time reclaimed, jobs captured, invoicing improvements), first-year ROI projection with payback timeline, and CTA button
  - Outcomes section with metric/result cards
  - Testimonials section with quote cards in 3-column grid
  - Target client section with profile cards
  - FAQ section with Accordion component for collapsible Q&A
  - Final CTA section with strong closing statement and tabbed contact options
  - Footer with business details and copyright
  - Toast notifications via Sonner for form submission feedback
- **States**: 
  - Buttons: Default with accent blue, hover with darker blue, active with slight scale, disabled state for form submission
  - Cards: Subtle border, hover with slight shadow lift
  - Links: Underline on hover
  - Accordion: Smooth expand/collapse animations
  - Tabs: Active/inactive states with smooth transitions
  - Form inputs: Focus states with ring, error states for validation
  - Form submission: Loading state with disabled button
- **Icon Selection**: Phosphor icons for clean, professional iconography (CheckCircle, X, ArrowRight, Calendar, Envelope, PaperPlaneRight, ChartLine, Users, Gear, ClipboardText, Quotes)
- **Spacing**: Consistent section spacing (py-16 md:py-24), card spacing (p-6 md:p-8), element spacing (gap-4, gap-6, gap-8)
- **Mobile**: 
  - Single column layout on mobile
  - Full-width CTAs on small screens
  - Header CTA text shortens ("Book" instead of "Book Free Audit")
  - Reduced heading sizes (text-3xl → text-4xl → text-5xl)
  - Stack cards vertically below md breakpoint
  - Testimonials stack in single column on mobile
  - Contact form fields stack vertically on mobile
  - Maintain generous spacing even on mobile for readability

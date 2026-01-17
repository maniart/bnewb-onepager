# Building New Bonds - One-Pager Website

A static single-page website recreating the B New B (Building New Bonds) design.

## Files

- `index.html` - Main HTML structure
- `styles.css` - All styling and responsive design
- `script.js` - Interactive features (carousels, navigation, animations)

## Features

### Sections
1. **Navigation** - Sticky header with logo and menu
2. **Hero** - Main headline and mission statement
3. **We Believe** - Interactive carousel with 5 belief statements
4. **Testimonials** - Carousel showcasing 8 client testimonials
5. **What We Do** - Service overview
6. **Why Sections** - Three-column grid explaining Why Art, Why Artists, Why Art at Work
7. **CTA** - Call-to-action with "Book a Call" button
8. **Footer** - Links and copyright

### Interactive Features
- Fully functional carousels with:
  - Previous/Next navigation buttons
  - Dot indicators
  - Auto-play (5-second intervals)
  - Touch/swipe support for mobile
  - Mouse drag support for desktop
  - Keyboard navigation (arrow keys)
  - Pause on hover
- Mobile-responsive hamburger menu
- Smooth scrolling for anchor links
- Fade-in animations on scroll
- Responsive design for all screen sizes

## How to Use

Simply open `index.html` in your web browser. No build process or server required.

## Customization

### Update Images
Replace the CDN URLs in `index.html` with your own images.

### Update Content
Edit the text directly in `index.html`.

### Update Colors
Modify the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2d3142;
    --secondary-color: #ef8354;
    --accent-color: #4f5d75;
    /* ... */
}
```

### Book a Call Integration
Update the Calendly link in the CTA button (`index.html` line with `href="https://calendly.com"`).

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge).

## Responsive Breakpoints

- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px
- Small mobile: < 480px

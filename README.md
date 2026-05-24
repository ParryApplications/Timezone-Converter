# 🌐 Timezone Converter

A beautiful, modern, and user-friendly web application for converting time across global timezones instantly. Built with vanilla JavaScript, Bootstrap 5, and Day.js. **Fully SEO-optimized** for maximum search engine visibility.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![SEO Optimized](https://img.shields.io/badge/SEO-Optimized-success)](SEO-OPTIMIZATION.md)

## ✨ Features

### 🎯 Core Functionality
- **Instant Timezone Conversion** - Convert time between any two timezones with real-time updates
- **Auto-Detection** - Automatically detects and sets your current timezone
- **Comprehensive Timezone Database** - Supports 40+ major cities and timezones worldwide
- **Smart Search** - Quickly find timezones with built-in search functionality
- **Swap Timezones** - One-click swap between source and destination timezones

### 🎨 User Interface
- **Modern Design** - Clean, intuitive interface with smooth animations
- **Dark Mode** - Toggle between light and dark themes with persistent preference
- **Responsive Layout** - Fully responsive design that works on desktop, tablet, and mobile
- **Custom Dropdowns** - Beautiful custom-styled timezone selectors with search
- **Visual Feedback** - Clear indicators for day differences and time offsets

### ⏰ Time Features
- **Live Clocks** - Real-time clocks showing current time in both timezones
- **Day Indicators** - Visual indicators showing if the converted time is the same day, next day, or previous day
- **Time Difference Display** - Shows the exact time difference between timezones
- **UTC Offset Information** - Displays UTC offset for both source and destination timezones
- **Day of Week Display** - Shows the day of the week for both timezones

### 🚀 Additional Features
- **Copy to Clipboard** - One-click copy of conversion results
- **Share Functionality** - Share conversion results using native share API or clipboard
- **Popular Timezone Shortcuts** - Quick access to commonly used timezones (UTC, EST, PST, JST, GMT)
- **Current Time Button** - Instantly set to current date and time
- **Accessibility** - ARIA labels and screen reader support for better accessibility

## 🛠️ Tech Stack

- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Modern styling with CSS variables and animations
- **JavaScript (ES6+)** - Vanilla JavaScript with no framework dependencies
- **Bootstrap 5** - Responsive grid system and components
- **Day.js** - Lightweight date/time library with timezone support
- **Font Awesome** - Icon library for UI elements
- **Google Fonts (Poppins)** - Modern, clean typography

## 📦 Installation

### Option 1: Direct Download
1. Clone or download this repository
```bash
git clone https://github.com/yourusername/Timezone-Converter.git
cd Timezone-Converter
```

2. Open `index.html` in your web browser
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

### Option 2: Local Server
For better performance and to avoid CORS issues, use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## 🎯 Usage

### Basic Conversion
1. **Select Source Timezone** - Choose your starting timezone (auto-detected by default)
2. **Set Date & Time** - Pick the date and time you want to convert
3. **Select Destination Timezone** - Choose the target timezone
4. **View Results** - See the converted time instantly with day indicators and time difference

### Advanced Features
- **Swap Timezones** - Click the swap button (⇄) to exchange source and destination
- **Use Shortcuts** - Click popular timezone badges (UTC, EST, PST, etc.) for quick selection
- **Copy Results** - Click "Copy Result" to copy the conversion to clipboard
- **Share** - Use the "Share" button to share results via native share or clipboard
- **Toggle Dark Mode** - Click the moon/sun icon in the navbar to switch themes

## 📁 Project Structure

```
Timezone-Converter/
├── index.html              # Main HTML file (SEO optimized)
├── robots.txt              # Search engine crawler instructions
├── sitemap.xml             # XML sitemap for search engines
├── SEO-OPTIMIZATION.md     # Complete SEO documentation
├── css/
│   └── style.css          # Custom styles and theme
├── js/
│   └── app.js             # Application logic and functionality
├── favicon.svg            # Application icon
├── .gitignore             # Git ignore rules
├── LICENSE                # MIT License
└── README.md              # Project documentation
```

## 🔍 SEO Optimization

This project is **fully optimized for search engines** to rank highly for timezone converter-related searches. See [SEO-OPTIMIZATION.md](SEO-OPTIMIZATION.md) for complete details.

### SEO Features Implemented

✅ **Meta Tags**
- Comprehensive title and description tags
- Open Graph tags for social media sharing
- Twitter Card tags for Twitter previews
- Canonical URL to prevent duplicate content

✅ **Structured Data (Schema.org)**
- WebApplication JSON-LD schema
- Breadcrumb navigation schema
- Rich snippets for search results

✅ **Technical SEO**
- robots.txt for crawler instructions
- XML sitemap for better indexing
- Semantic HTML5 markup
- Mobile-first responsive design
- Fast loading performance

✅ **Content Optimization**
- Keyword-rich H1 and headings
- Descriptive content sections
- Natural keyword placement
- User-focused copy

✅ **Target Keywords**
- Primary: timezone converter, time zone converter, world clock
- Secondary: UTC converter, time conversion, timezone calculator
- Long-tail: EST to PST converter, GMT to IST, international meeting scheduler

### SEO Best Practices
- ✅ Optimized page title (under 60 characters)
- ✅ Meta description (155-160 characters)
- ✅ Proper heading hierarchy (H1 → H2 → H3)
- ✅ Alt text for images
- ✅ ARIA labels for accessibility
- ✅ Mobile-responsive design
- ✅ Fast loading times
- ✅ HTTPS ready

## 🎨 Customization

### Changing Colors
Edit the CSS variables in [`css/style.css`](css/style.css):

```css
:root {
    --primary: #2563EB;        /* Primary color */
    --accent: #0EA5E9;         /* Accent color */
    --bg-primary: #F8FAFC;     /* Background color */
    /* ... more variables */
}
```

### Adding Timezones
Add new timezones to the `timezones` array in [`js/app.js`](js/app.js):

```javascript
const timezones = [
    { value: 'Your/Timezone', label: 'City Name (Your/Timezone)' },
    // ... existing timezones
];
```

## 🌟 Key Features Explained

### Auto-Detection
The app automatically detects your timezone using the browser's `Intl.DateTimeFormat` API and sets it as the default source timezone.

### Day Indicators
Visual indicators show:
- **Same Day** - Converted time is on the same calendar day
- **Next Day** - Converted time is one or more days ahead
- **Previous Day** - Converted time is one or more days behind

### Live Clocks
Real-time clocks update every second to show the current time in both selected timezones, helping you understand the time difference at a glance.

### Dark Mode
Theme preference is saved to localStorage and persists across sessions. The dark mode uses carefully selected colors for optimal readability.

## 🔧 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Opera (latest)
- ⚠️ Internet Explorer (not supported)

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- **Mobile** (< 768px) - Stacked layout with vertical swap button
- **Tablet** (768px - 1023px) - Optimized spacing and font sizes
- **Desktop** (≥ 1024px) - Full side-by-side layout
- **Large Screens** (≥ 1440px) - Enhanced spacing and larger elements

## ♿ Accessibility

- **ARIA Labels** - Proper ARIA labels for screen readers
- **Keyboard Navigation** - Full keyboard support for all interactive elements
- **Focus Indicators** - Clear focus states for better navigation
- **High Contrast Mode** - Support for high contrast preferences
- **Reduced Motion** - Respects `prefers-reduced-motion` setting
- **Semantic HTML** - Proper heading hierarchy and semantic elements

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Contribution Ideas
- Add more timezones to the database
- Implement timezone favorites/bookmarks
- Add timezone comparison for multiple cities
- Create a timezone map visualization
- Add support for recurring time conversions
- Implement URL parameter support for sharing specific conversions

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**ParryApplications**

- Built with ❤️ using HTML, CSS, Bootstrap & JavaScript

## 🙏 Acknowledgments

- [Bootstrap](https://getbootstrap.com/) - UI framework
- [Day.js](https://day.js.org/) - Date/time library
- [Font Awesome](https://fontawesome.com/) - Icon library
- [Google Fonts](https://fonts.google.com/) - Poppins font family

## 📸 Screenshots

### Light Mode
![Light Mode Screenshot](screenshots/light-mode.png)

### Dark Mode
![Dark Mode Screenshot](screenshots/dark-mode.png)

### Mobile View
![Mobile View Screenshot](screenshots/mobile-view.png)

---

<div align="center">

**[⬆ Back to Top](#-timezone-converter)**

Made with ❤️ by ParryApplications

</div>

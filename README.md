# TextForge: The Ultimate Text & Data Manipulation Toolkit

A comprehensive, production-ready web application for text processing, data manipulation, and utility generation. Built with React, TypeScript, and Tailwind CSS featuring a modern, responsive interface.

## 🚀 Features

### 📝 Text Cleanup & Analysis
- **Whitespace Management**: Remove extra spaces, line breaks, or all spaces
- **Line Processing**: Trim individual lines and format text structure
- **Live Analysis**: Real-time word count, character count, and line statistics
- **Smart Cleanup**: Intelligent text processing with multiple cleanup options

### 🔤 Case Converter
- **Standard Cases**: UPPERCASE, lowercase, Sentence case, Title Case
- **Programming Cases**: camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE
- **Instant Conversion**: One-click transformation between case formats
- **Preview Examples**: Visual preview of each case format before conversion

### 🛠 Code & Data Formatter
- **JSON Tools**: Beautify (pretty-print) and minify JSON data
- **Data Conversion**: Transform key-value pairs into JSON objects
- **CSS Processing**: Minify CSS by removing comments and whitespace
- **Error Handling**: Comprehensive validation with descriptive error messages

### 🔐 Encoding & Hashing
- **Base64**: Encode and decode text to/from Base64 format
- **URL Encoding**: Safe URL encoding and decoding for web applications
- **SHA-256 Hashing**: Generate secure, one-way cryptographic hashes
- **Security Focused**: Built with Web Crypto API for robust security

### ⚡ Utility Generators
- **UUID Generation**: Create both UUID v1 (timestamp-based) and v4 (random)
- **Password Generator**: Generate secure passwords with customizable options
  - Configurable length (8-64 characters)
  - Character type selection (lowercase, uppercase, numbers, symbols)
  - Cryptographically secure random generation
- **Batch Generation**: Generate multiple UUIDs or passwords as needed

## 🎨 Design & User Experience

### Modern Interface
- **Clean Design**: Professional, minimalist interface with streamlined tab-based navigation
- **Purple-Centric Theme**: Modern color palette with purple gradients and accents
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: System-aware theme switching with persistent preferences

### Intuitive Navigation
- **Tab Navigation**: Clean horizontal tabs for easy tool category switching
- **Responsive Layout**: Two-column layout on desktop, stacked on mobile
- **Tool Organization**: Logical grouping of related functionality
- **Card-Based Tools**: Clean tool cards with hover effects and clear descriptions

### Real-Time Feedback
- **Live Statistics**: Continuous text analysis in the footer bar
- **Instant Processing**: Real-time output updates as you type or apply tools
- **Visual Feedback**: Hover states, transitions, and loading indicators
- **Error Handling**: Clear error messages with helpful suggestions

## 🛠 Technical Implementation

### Architecture
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Full type safety with comprehensive type definitions
- **Vite**: Lightning-fast development and optimized production builds
- **Tailwind CSS**: Utility-first CSS framework with custom design system

### Code Organization
- **Modular Components**: Clean separation of concerns with focused components
- **Custom Hooks**: Reusable logic for theme management and state
- **Utility Functions**: Pure functions for text processing and data manipulation
- **Type Safety**: Comprehensive TypeScript coverage for reliability

### Performance
- **Web APIs**: Native browser APIs for encoding, hashing, and clipboard operations
- **Minimal Dependencies**: Lean dependency tree with only essential packages
- **Optimized Builds**: Tree-shaking and code splitting for optimal bundle size
- **Responsive Design**: Efficient CSS with mobile-first approach

## 📦 Dependencies

### Core Dependencies
- **React 18.3.1**: Modern React framework
- **React DOM 18.3.1**: React DOM rendering
- **Lucide React**: Beautiful, customizable icons
- **UUID 9.0.1**: RFC-compliant UUID generation

### Development Dependencies
- **Vite**: Build tool and development server
- **TypeScript**: Static type checking
- **Tailwind CSS**: Utility-first CSS framework
- **ESLint**: Code linting and quality assurance

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd textforge

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development
```bash
# Run development server with hot reload
npm run dev

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 🌐 Deployment

### Build Process
```bash
npm run build
```
This creates an optimized production build in the `dist/` directory.

### Deployment Options
- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your repository for automatic deployments
- **GitHub Pages**: Use the built assets for static hosting
- **Any Static Host**: Upload the `dist` folder contents

### Environment Configuration
No environment variables required for basic functionality. All tools work client-side with Web APIs.

## 🧪 Testing

### Manual Testing Checklist
- [ ] Text cleanup tools process input correctly
- [ ] Case conversions work for all formats
- [ ] JSON beautify/minify handles valid and invalid JSON
- [ ] Key-value to JSON conversion works with various formats
- [ ] CSS minification removes comments and whitespace
- [ ] Base64 encoding/decoding handles various text inputs
- [ ] URL encoding/decoding processes special characters
- [ ] SHA-256 hashing generates consistent results
- [ ] UUID generation creates valid identifiers
- [ ] Password generation respects all options
- [ ] Copy to clipboard functionality works
- [ ] Theme switching persists across sessions
- [ ] Responsive design works on mobile devices
- [ ] Error handling displays appropriate messages

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🔒 Security Considerations

### Client-Side Processing
- All text processing happens locally in the browser
- No data is sent to external servers
- Cryptographic operations use secure Web Crypto API

### Password Generation
- Uses cryptographically secure random number generation
- Configurable complexity options
- No password storage or logging

### Input Validation
- Comprehensive error handling for all operations
- Safe encoding/decoding with proper error messages
- XSS protection through React's built-in sanitization

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes with proper TypeScript types
4. Test thoroughly across different browsers
5. Commit with descriptive messages
6. Push to your branch
7. Open a Pull Request

### Code Standards
- Follow existing TypeScript and React patterns
- Use Tailwind CSS for styling
- Maintain component modularity (< 200 lines per file)
- Add comprehensive error handling
- Include JSDoc comments for complex functions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Lucide React**: Beautiful icon library
- **Tailwind CSS**: Utility-first CSS framework
- **React Team**: Amazing framework and ecosystem
- **Web Standards**: Native browser APIs for secure operations

---

## 📊 Project Statistics

- **Components**: 10 modular React components
- **Utilities**: 3 focused utility modules
- **Tools**: 20+ text and data manipulation tools
- **Bundle Size**: Optimized for performance
- **Type Coverage**: 100% TypeScript coverage
- **Browser Support**: Modern browsers with Web Crypto API

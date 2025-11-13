# String Calculator - React & Accessibility Assessment

A fully accessible string calculator built with React, TypeScript, and TDD principles (using Jest) for the Incubyte Senior Frontend Engineer position.



## 🚀 Live Demo

View Live Application here https://string-calculator-1b4n.vercel.app/


## 📖 About

This project demonstrates a fully accessible string calculator application built following Test-Driven Development (TDD) principles. The application resolves multiple accessibility issues and provides an inclusive user experience for all users, including those using screen readers and keyboard-only navigation.

**Assessment Requirements:**
- Fix accessibility issues in React UI
- Support screen readers, keyboard navigation, and regular users
- Follow TDD best practices with frequent commits
- Deploy the application

## ✨ Features

- **Multiple Delimiters**: Supports comma, newline, and custom delimiters (e.g., `//;\n1;2;3`)
- **Negative Number Validation**: Throws clear error messages for negative numbers
- **Large Number Filtering**: Ignores numbers greater than 1000
- **Keyboard Shortcuts**: Ctrl+Enter to calculate quickly
- **Real-time Error Handling**: Clear error messages with visual feedback
- **Responsive Design**: Modern, gradient UI with card-based layout

## ♿ Accessibility

This application is **WCAG 2.1 Level AA compliant** and includes:

- ✅ **Semantic HTML**: Proper use of `<main>`, `<header>`, `<footer>`, `<section>` elements
- ✅ **ARIA Attributes**: `aria-label`, `aria-live`, `aria-describedby`, `aria-invalid`
- ✅ **Keyboard Navigation**: Full keyboard support with visible focus indicators
- ✅ **Screen Reader Support**: All interactive elements properly labeled
- ✅ **Color Contrast**: Meets WCAG AA standards (4.5:1 ratio)
- ✅ **Focus Management**: Proper tab order and focus trapping
- ✅ **Error Announcements**: `role="alert"` with `aria-live="assertive"`
- ✅ **Success Announcements**: `role="status"` with `aria-live="polite"`

## 🛠 Tech Stack

**Frontend:**
- React 18.3
- TypeScript 5.7
- Vite 6.0

**Testing:**
- Jest / Vitest
- React Testing Library
- jest-axe (Accessibility testing)
- @testing-library/user-event

**Development:**
- ESLint
- Prettier

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**

git clone https://github.com/bansalshivam11/StringCalculator

cd react-a11y-project

2. Install dependencies

npm install

3. Run development server

npm run dev

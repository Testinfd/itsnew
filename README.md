# ItsNew - Gaming News & Updates Platform

ItsNew is a modern web application for gaming news, tournaments, guides, and updates, built with React, TypeScript and Tailwind CSS.

![ItsNew Screenshot](https://i.imgur.com/PLACEHOLDER.png)

## Features

- Modern UI/UX design optimized for gaming news consumption
- Responsive layout that works on all screen sizes
- Dark mode by default for better readability
- Article categories: News, Tournaments, E-Sports, Guides, and more
- Article bookmarking and sharing functionality
- Newsletter subscription system
- SEO-optimized structure

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Radix UI for accessible UI components
- React Router for navigation
- Vite for fast development and builds

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Testinfd/itsnew.git
   cd itsnew
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

## Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## Deployment

This project is set up to automatically deploy to GitHub Pages when changes are pushed to the main branch, using GitHub Actions.

To manually deploy:

```bash
npm run deploy
# or
yarn deploy
```

## Project Structure

```
itsnew/
├── public/        # Static assets
├── src/
│   ├── components/    # React components
│   │   ├── layout/    # Layout components
│   │   ├── news/      # News-specific components
│   │   └── ui/        # Reusable UI components
│   ├── data/          # Mock data
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   ├── pages/         # Page components
│   ├── App.tsx        # Main app component
│   ├── index.css      # Global styles
│   └── main.tsx       # Entry point
├── index.html         # HTML template
├── package.json       # Dependencies and scripts
└── README.md          # This file
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Created by Testinfd - [GitHub Profile](https://github.com/Testinfd) 
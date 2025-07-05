# Hello Lead - AI Receptionist for Business Owners

A modern web application that helps business owners handle inbound calls with an AI-powered receptionist. The app provides analytics, setup configuration, and lead management capabilities.

## Features

### 📊 Analytics Dashboard
- Track call performance and metrics
- View appointment booking statistics
- Monitor lead conversion rates
- Real-time activity feed
- Visual charts and graphs

### ⚙️ Setup Configuration
- Business information management
- Working hours configuration
- Service offerings setup
- Pricing information
- AI agent prompt generation
- Agent testing capabilities

### 👥 Leads Management
- View all incoming leads from calls
- Filter and search leads
- Lead status tracking
- Contact information management
- Appointment booking integration
- Lead conversion tracking

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: Zustand
- **Forms**: React Hook Form

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hello-lead
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
hello-lead/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Analytics page
│   ├── setup/             # Setup page
│   └── leads/             # Leads page
├── components/            # React components
│   ├── ui/               # UI components
│   ├── Navigation.tsx    # Navigation component
│   ├── AnalyticsDashboard.tsx
│   ├── SetupForm.tsx
│   └── LeadsList.tsx
├── public/               # Static assets
└── package.json          # Dependencies and scripts
```

## Pages

### Analytics Dashboard (`/`)
- Overview of call performance
- Key metrics and statistics
- Interactive charts
- Recent activity feed

### Setup (`/setup`)
- Business information form
- Working hours configuration
- Service offerings setup
- AI agent prompt generation
- Agent testing interface

### Leads (`/leads`)
- Lead management interface
- Filtering and search
- Lead status tracking
- Contact management

## Configuration

The app is designed to integrate with:
- **VAPI API** for AI voice agent setup
- **Google Gemini** for prompt generation
- **Calendar systems** for appointment booking
- **CRM systems** for lead management

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. Create new components in the `components/` directory
2. Add new pages in the `app/` directory
3. Update navigation in `components/Navigation.tsx`
4. Add any new dependencies to `package.json`

## API Integration

The app is designed to integrate with external APIs:

### VAPI Integration
- AI agent creation and configuration
- Voice call handling
- Real-time call analytics

### Gemini Integration
- Dynamic prompt generation
- Business-specific AI training
- Context-aware responses

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team. 
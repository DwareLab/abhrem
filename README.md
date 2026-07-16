# Abhrem

A professional single-page website for Abhrem, an investment and holding company.

## Structure

```
abhrem/
├── index.html      # Main page
├── css/
│   └── styles.css  # Styles
├── js/
│   └── main.js     # Interactivity
└── README.md
```

## Getting Started

Open `index.html` directly in your browser, or serve it locally:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve .
```

Then visit `http://localhost:8000`.

## Sections

- **Hero** — Company introduction and key positioning
- **About** — Who Abhrem is and what they do
- **Approach** — Four-step investment framework
- **Sectors** — Focus areas and portfolio industries
- **Values** — Core principles and philosophy
- **Contact** — Inquiry form and contact details

## Customization

- Update contact email in `index.html` (`info@abhrem.com`)
- Adjust sector focus areas in the Sectors section
- Modify colors and fonts in `css/styles.css` (`:root` variables)
- Wire the contact form to a backend or email service in `js/main.js`

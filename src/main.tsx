import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Older links used HashRouter (/#/sat-test-prep). Move them onto real paths
// so deep links, redirects, and in-page anchors keep working.
if (window.location.hash.startsWith("#/")) {
  const next = window.location.hash.slice(1);
  window.history.replaceState(null, "", next);
}

createRoot(document.getElementById("root")!).render(<App />);

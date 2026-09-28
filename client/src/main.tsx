import { createRoot } from "react-dom/client";
import App from "./App";
import { CmsProvider } from "./cms/CmsProvider";
import "./index.css";

if ("scrollRestoration" in history) history.scrollRestoration = "manual";
window.scrollTo(0, 0);

createRoot(document.getElementById("root")!).render(<CmsProvider><App /></CmsProvider>);

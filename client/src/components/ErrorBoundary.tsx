import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, ReactNode } from "react";
import { useCms } from "@/cms/CmsProvider";

interface Props {
  children: ReactNode;
  title: string;
  reload: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background p-8">
          <div className="flex w-full max-w-2xl flex-col items-center p-8">
            <AlertTriangle size={48} className="mb-6 shrink-0 text-red-600" />

            <h2 className="mb-4 text-xl">{this.props.title}</h2>

            <div className="mb-6 w-full overflow-auto rounded bg-mist p-4">
              <pre className="whitespace-break-spaces text-sm text-steel">
                {this.state.error?.stack}
              </pre>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-charcoal px-4 py-2 text-white hover:opacity-90"
            >
              <RotateCcw size={16} />
              {this.props.reload}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function CmsErrorBoundary({ children }: { children: ReactNode }) {
  const { text } = useCms();
  return (
    <ErrorBoundary
      title={text("global", "error.title", "Ocurrió un error inesperado.")}
      reload={text("global", "error.reload", "Recargar página")}
    >
      {children}
    </ErrorBoundary>
  );
}

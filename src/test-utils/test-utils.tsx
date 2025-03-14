import { ThemeProvider } from "@/core/ui/theme/ThemeContext";
import { render, RenderOptions } from "@testing-library/react-native";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

const mockSetImmediate = () =>
  (global.setImmediate = jest.fn((cb) =>
    setTimeout(cb, 0)
  ) as unknown as typeof setImmediate);
const deleteMockSetImmediate = () =>
  (global.setImmediate = undefined as unknown as typeof setImmediate);

// re-export everything
export * from "@testing-library/react-native";

// override render method
export { customRender as render };
export { mockSetImmediate, deleteMockSetImmediate };

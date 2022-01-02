import AppAuth from "./AppAuth";
import { UserProvider } from "./context/auth.context";

export const provider = (provider, props = {}) => [provider, props];
export const ProviderComposer = ({ providers, children }) => {
  for (let i = providers.length - 1; i >= 0; --i) {
    const [Provider, props] = providers[i];
    children = <Provider {...props}>{children}</Provider>
  }
  return children;
}




export default function App() {

  return (
    <ProviderComposer
      providers={[
        provider(UserProvider)
      ]}
    >
      <AppAuth></AppAuth>
    </ProviderComposer>
  );
}



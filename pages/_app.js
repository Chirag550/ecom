import "../styles/globals.css";
import Layout from "@/components/Layout";
import { StateContext } from "@/context/statecontext";
export default function App({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}

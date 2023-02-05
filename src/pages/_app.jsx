import "../style.css";
import "../App.css";
import dynamic from "next/dynamic";

/* https://stackoverflow.com/questions/74902411/window-is-undefined-in-nextjs-tauri */
const DynamicCustomTitleBar = dynamic(
  () => import("../components/CustomTitleBar"),
  {
    ssr: false,
  }
);

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="flex-col">
        <DynamicCustomTitleBar />
        <Component {...pageProps} />
      </div>
    </>
  );
}

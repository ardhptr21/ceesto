import '../styles/globals.css';

function App({ Component, pageProps }) {
  return (
    <>
      <main className="p-10">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default App;

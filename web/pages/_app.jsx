import '../styles/globals.css';
import { SWRConfig } from 'swr';
import axios from 'axios';

const fetcher = (url) => axios.get(url).then((res) => res.data);

function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <main className="p-10">
        <Component {...pageProps} />
      </main>
      <footer className="text-center p-10">
        <p>
          Powered by <span className="text-primary font-bold">Ceesto</span>, Est 2022
        </p>
      </footer>
    </SWRConfig>
  );
}

export default App;

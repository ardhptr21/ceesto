import '../styles/globals.css';
import { SWRConfig } from 'swr';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fetcher = (url) => axios.get(url).then((res) => res.data);

function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <ToastContainer />
      <main className="p-10">
        <Component {...pageProps} />
      </main>
      <footer className="text-center p-10">
        <p>
          Powered by <span className="font-bold">Ceesto</span>, Est 2022
        </p>
      </footer>
    </SWRConfig>
  );
}

export default App;

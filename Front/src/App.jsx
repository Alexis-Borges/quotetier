import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddQuotePage from './pages/AddQuote';
import Header from './components/Header';
import Footer from './components/Footer';
import Quote from './components/Quote';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [filterByLikes, setFilterByLikes] = useState(false);

  useEffect(() => {
    fetchQuotes();
  }, [filterByLikes]);

  const fetchQuotes = () => {
    fetch('http://localhost:3000/quotes')
      .then(response => response.json())
      .then(data => {
        if (filterByLikes) {
          data.sort((a, b) => b.likes - a.likes);
        }
        setQuotes(data);
      });
  };

  const handleUpdateQuote = updatedQuote => {
    setQuotes(prevQuotes =>
      prevQuotes.map(quote =>
        quote.id === updatedQuote.id ? updatedQuote : quote
      )
    );
  };

  const handleDeleteQuote = quoteId => {
    setQuotes(prevQuotes => prevQuotes.filter(quote => quote.id !== quoteId));
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-16 pb-16">
          <div className="flex items-center">
            <label className="text-sm leading-none text-violet-600 m-4" htmlFor="filter">
              Filtrer par likes
            </label>
            <Checkbox.Root
              className="shadow-blackA4 hover:bg-violet3 flex h-6 w-6 appearance-none items-center justify-center rounded-md bg-white shadow-md outline-none focus:shadow-outline-black m-4"
              checked={filterByLikes}
              onCheckedChange={setFilterByLikes}
              id="filter"
            >
              <Checkbox.Indicator className="text-violet-600">
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Root>
          </div>
          <Routes>
            <Route path="/add-quote" element={<AddQuotePage />} />
            <Route path="/" element={quotes.map(quote => (
              <Quote
                key={quote.id}
                quote={quote}
                onUpdateQuote={handleUpdateQuote}
                onDeleteQuote={handleDeleteQuote}
              />
            ))} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

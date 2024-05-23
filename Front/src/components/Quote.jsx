import PropTypes from 'prop-types';
import { useState } from 'react';
import * as Separator from '@radix-ui/react-separator';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // replace #root with your app's root element id

function Quote({ quote, onUpdateQuote, onDeleteQuote }) {
  const [likes, setLikes] = useState(quote.likes);
  const [dislikes, setDislikes] = useState(quote.dislikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [newAuthor, setNewAuthor] = useState(quote.author);
  const [newContent, setNewContent] = useState(quote.content);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const quoteId = quote.id;

  const handleLike = () => {
    if (!hasLiked && !hasDisliked) {
      fetch(`http://localhost:3000/quotes/${quoteId}/like`, {
        method: 'POST',
      })
        .then(response => response.json())
        .then(data => {
          setLikes(data.likes);
          setHasLiked(true);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  const handleDislike = () => {
    if (!hasLiked && !hasDisliked) {
      fetch(`http://localhost:3000/quotes/${quoteId}/dislike`, {
        method: 'POST',
      })
        .then(response => response.json())
        .then(data => {
          setDislikes(data.dislikes);
          setHasDisliked(true);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  const handleDelete = () => {
    fetch(`http://localhost:3000/quotes/${quoteId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        onDeleteQuote(quoteId);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleUpdate = () => {
    fetch(`http://localhost:3000/quotes/${quoteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        author: newAuthor,
        content: newContent,
      }),
    })
      .then(response => response.json())
      .then(data => {
        onUpdateQuote(data);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="p-6 m-4 bg-white border border-gray-300 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <p className="text-xl font-semibold text-violet-600">{quote.author}</p>
      </div>
      <Separator.Root
        className="bg-violet-600 h-px w-full my-2"
        decorative
        orientation="horizontal"
      />
      <p className="mb-4 text-gray-700">{quote.content}</p>
      <div className="flex mt-4">
        <button onClick={handleLike} className="text-gray-600 hover:text-violet-600">
          👍 {likes}
        </button>
        <div className="bg-violet-600 w-px mx-2"></div>
        <button onClick={handleDislike} className="text-gray-600 hover:text-violet-600">
          👎 {dislikes}
        </button>
        <div className="bg-violet-600  w-px mx-2"></div>
        <button onClick={handleDelete} className="text-gray-600 hover:text-violet-600">
          🗑️ Supprimer
        </button>
        <div className="bg-violet-600 w-px mx-2"></div>
        <button onClick={() => setIsModalOpen(true)} className="text-gray-600 hover:text-violet-600">
          🔄 Modifier
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Modifier la citation"
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-center">Modifier la citation</h2>
          <div className="mb-4">
            <label className="block text-violet-600 mb-2" htmlFor="author">
              Auteur:
            </label>
            <input
              id="author"
              type="text"
              value={newAuthor}
              onChange={e => setNewAuthor(e.target.value)}
              className="w-full p-2 border border-violet-600 rounded-md focus:outline-none focus:border-violet-800"
            />
          </div>
          <div className="mb-4">
            <label className="block text-violet-600 mb-2" htmlFor="content">
              Contenu:
            </label>
            <textarea
              id="content"
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
              className="w-full p-2 border border-violet-600 rounded-md focus:outline-none focus:border-violet-800"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleUpdate}
              className="bg-gray-300 text-violet-600 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none"
            >
              Mettre à jour
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-300 text-violet-600 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none"
            >
              Annuler
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

Quote.propTypes = {
  quote: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    dislikes: PropTypes.number.isRequired,
  }).isRequired,
  onUpdateQuote: PropTypes.func.isRequired,
  onDeleteQuote: PropTypes.func.isRequired,
};

export default Quote;
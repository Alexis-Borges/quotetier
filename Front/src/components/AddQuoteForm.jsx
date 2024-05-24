import { useState } from 'react';
import PropTypes from 'prop-types';
import * as Form from '@radix-ui/react-form';

function AddQuoteForm({ onAddQuote }) {
  const [quote, setQuote] = useState({ text: '', author: '' });

  const handleChange = (event) => {
    setQuote({ ...quote, [event.target.name]: event.target.value });
  };

  AddQuoteForm.propTypes = {
   onAddQuote: PropTypes.func.isRequired,
 };

  const handleSubmit = (event) => {
   event.preventDefault();

   if (!quote.text.trim() || !quote.author.trim()) {
     alert('Veuillez remplir tous les champs.');
     return;
   }

   if (quote.text.length > 200 || quote.author.length > 50) {
     alert('La citation ou le nom de l\'auteur est trop long.');
     return;
   }

   const regex = /^[a-z0-9 ]+$/i;
   if (!regex.test(quote.text) || !regex.test(quote.author)) {
     alert('Seuls les chiffres et les lettres sont autorisés.');
     return;
   }
 
   fetch('http://localhost:3000/quotes', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       author: quote.author,
       content: quote.text,
     }),
   })
     .then(response => response.json())
     .then(data => {
       onAddQuote(data);
       setQuote({ text: '', author: '' });
     })
     .catch((error) => {
       console.error('Error:', error);
     });
 };

 return (
  <div className="flex flex-col items-center pt-10 overflow-hidden">
    <div className="flex flex-col justify-center items-center w-[550px] space-y-2"> 
       <Form.Root onSubmit={handleSubmit}>
        <Form.Field className="grid mb-[5px]" name="author"> 
          <Form.Label className="text-[20px] font-medium leading-[60px] text-violet11">Auteur de la citation</Form.Label>   
            <Form.Control asChild>
            <input
              value={quote.author}
              onChange={handleChange}
              className="text-black box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[60px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[20px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="grid mb-[5px]" name="text"> 
          <Form.Label className="text-[20px] font-medium leading-[60px] text-violet11">Texte de la citation</Form.Label> 
              <Form.Control asChild>
            <input
              value={quote.text}
              onChange={handleChange}
              className="text-black box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[60px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[20px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
              required
            />
          </Form.Control>
        </Form.Field>
        <button onClick={handleSubmit} className="box-border w-full text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[60px] items-center justify-center rounded-[4px] bg-white px-[20px] font-medium leading-none shadow-[0_2px_15px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[5px]">
          Ajouter une citation
        </button>
      </Form.Root>
    </div>
  </div>
 );
}

export default AddQuoteForm;
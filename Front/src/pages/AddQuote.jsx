import AddQuoteForm from './../components/AddQuoteForm'; 

function AddQuotePage() {
      const handleAddQuote = (quote) => {
        console.log(quote);
      };
   
     return (
       <div>
         <AddQuoteForm onAddQuote={handleAddQuote} />
       </div>
     );
   }

   

export default AddQuotePage;
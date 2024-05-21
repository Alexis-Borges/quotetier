const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
   const quote1 = await prisma.quote.create({
     data: {
       author: 'Manio 1',
       content: 'Quote content 1',
       likes: 5,
       dislikes: 2,
     },
   });
 
   const quote2 = await prisma.quote.create({
     data: {
       author: 'Manifold 2',
       content: 'Quote content 2',
       likes: 3,
       dislikes: 1,
     },
   });

   const comment1 = await prisma.comment.create({
     data: {
       author: 'Comment Author 1',
       content: 'Comment content 1',
       quoteId: quote1.id,
     },
   });

   const comment2 = await prisma.comment.create({
     data: {
       author: 'Comment Author 2',
       content: 'Comment content 2',
       quoteId: quote2.id,
     },
   });
 
   console.log({ quote1, quote2, comment1, comment2 });
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
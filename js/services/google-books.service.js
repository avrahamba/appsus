export const googleBook ={
    getbooksSearch
}
  
  

function getbooksSearch(query) {
    const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${query}`
    return axios.get(url)
        .then(res => {
            return res.data.items.map((book)=>{
                let img = '';
                if(book.volumeInfo.imageLinks)
                if(!img) img = book.volumeInfo.imageLinks.thumbnail;

                let subtitle = book.volumeInfo.subtitle;
                if(!subtitle)subtitle=''
                let listPrice = book.saleInfo.listPrice
                if(!listPrice) listPrice={amount:0,currencyCode:'ILS'} 
                let categories = book.volumeInfo.categories
                if(!categories)categories=[]
                let authors =book.volumeInfo.authors
                if(!authors)authors=[] 
                return {
                    id:book.id,
                    title: book.volumeInfo.title,
                    subtitle,
                    authors,
                    publishedDate: book.volumeInfo.publishedDate,
                    description: book.volumeInfo.description,
                    pageCount: book.volumeInfo.pageCount,
                    categories,
                    thumbnail: img,
                    language: book.volumeInfo.language,
                    listPrice               
                }
            })
        })
}








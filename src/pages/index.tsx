import ReactMarkdown from 'react-markdown'

const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:


`


export default function Home (){
    return(
    <main className='flex  gap-4 flex-col w-screen items-center justify-center'>    
        <h1>API</h1>
        <ReactMarkdown  children={markdown} />
    </main>

    )
}
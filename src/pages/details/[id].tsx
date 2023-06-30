import { LoadingPage } from '@/components/Loading';
import {PostProps} from '@/components/Post';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';



export default function Blog() {
	// State to store the quote
	const [response, setResponse] = useState<PostProps>();
  const[loading, setLoading] = useState(false)
  const router = useRouter()

	const fetchQuotes = async () => {
		try {
			const res = await axios.get(`/api/posts/${router.query.id}`, {
			});
			// Set the response to the state.
			setResponse(res.data);
      //Change loading page/state to false
      setLoading(true)
		} catch (err) {
			console.log(err);
		}
	};

  useEffect(()=>{
    fetchQuotes()
  })
if(!loading){
  return (
  <div className='flex flex-col gap-2 h-screen w-screen items-center justify-center'>
    <h1>Loading...</h1>
   <LoadingPage/>
  </div>
);
}
	return (
		<div className='flex flex-col gap-2 h-screen w-screen items-center justify-center'>
			<h1>Title : {response?.title}</h1>
      <p>Content :{response?.content}</p>
		</div>
	);
}
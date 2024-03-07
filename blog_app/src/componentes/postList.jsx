import { useContext, useEffect, useState } from "react"
import Post from "./post"
import { PostList as PostListData } from "../store/post-list-store";
import WelcomeMsg from "./welcomeMsg";
import LodingSplinner from "./lodingSpinner";


export default function PostList(){

  const {postList,addInitialPost} = useContext(PostListData);
  const [featching,setFeatching] = useState(false);

  useEffect(()=>{
    setFeatching(true);

    const controler = new AbortController();
    const signal = controler.signal;
    
    fetch('https://dummyjson.com/posts')
     .then((res) => res.json())
     .then((data)=>{
      addInitialPost(data.posts);
      setFeatching(false);
     });

     return()=>{
      // console.log("cleaning up use effect");
      controler.abort();
     }
  },[]);
  return (
    <>
    {
      featching && <LodingSplinner/>
    }
    {
      !featching && postList.length === 0 && <WelcomeMsg />
    }
    {
     !featching && postList.map((post)=>(
        <Post key={post.id} post = {post}/>
      ))
    }
    </>
  ) 
}
import { createContext, useReducer,useState,useEffect } from "react";

export const PostList = createContext ({
    postList: [],
    addPost: ()=>{},
    featching: false,
    deletePost: ()=>{},
});


const postListReducer = (currPostList,action) =>{
    let newPostList = currPostList;
    if(action.type === "DELETE_POST"){
        newPostList = currPostList.filter((post) => post.id !== action.payload.postId);
    }
    else if(action.type === "ADD_INITIAL-POSTS"){
        newPostList = action.payload.posts;
    }
    else if(action.type === "ADD_POST"){
        newPostList = [action.payload , ...currPostList];
    }
    return newPostList;
};


const PostListProvider = ({children})=>{
    
    const [postList,dispachPostList] = useReducer(postListReducer,[]);   
    const [featching,setFeatching] = useState(false);

    
   const addPost = (post) =>{
   
    dispachPostList({
        type:"ADD_POST",
        payload:post
        
    })
   };

   const addInitialPost = (posts)=>{
    dispachPostList({
        type:"ADD_INITIAL-POSTS",
        payload:{
            posts
        }
    })
    };

   const deletePost = (postId) =>{
    dispachPostList({
        type:"DELETE_POST",
        payload:{
            postId,
        },
    })
   };


   useEffect(()=>{
    setFeatching(true);

    const controler = new AbortController();
    const signal = controler.signal;
    
    fetch('https://dummyjson.com/posts' ,{signal})
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

   return <PostList.Provider value={{postList,featching,addPost,deletePost}}>
        {children}
    </PostList.Provider>
}


export default PostListProvider;



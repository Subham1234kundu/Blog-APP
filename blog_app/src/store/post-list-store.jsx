import { createContext, useReducer } from "react";

export const PostList = createContext ({
    postList: [],
    addPost: ()=>{},
    addInitialPost: ()=>{},
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
   

   

    
   const addPost = (userId,postTitle,postBody,tags,reactions) =>{
   
    dispachPostList({
        type:"ADD_POST",
        payload:{
            id:Date.now(),
            title:postTitle,
            body:postBody,
            reactions:reactions,
            userId:userId,
            tags:tags
        }
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

   return <PostList.Provider value={{postList,addInitialPost,addPost,deletePost}}>
        {children}
    </PostList.Provider>
}


export default PostListProvider;



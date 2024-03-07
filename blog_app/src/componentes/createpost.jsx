import { useContext, useRef } from "react"
import { PostList } from "../store/post-list-store";
import { useNavigate } from "react-router-dom";

export default function CreatePost(){

  const{addPost} = useContext(PostList);
  const navigate = useNavigate();

  const userIdElem = useRef();
  const postTitleElem = useRef();
  const postBodyElem = useRef();
  const tagsElem = useRef(); 
  const reactionsElem = useRef();

  const handleSubmit = (e)=>{
    e.preventDefault();

    const userId = userIdElem.current.value;
    const postTitle = postTitleElem.current.value;
    const postBody = postBodyElem.current.value;
    const tags = tagsElem.current.value.split(" ");
    const reactions = reactionsElem.current.value;

    userIdElem.current.value = "";
    postTitleElem.current.value = "";
    postBodyElem.current.value = "";
    tagsElem.current.value = "";
    reactionsElem.current.value = "";

    fetch('https://dummyjson.com/posts/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: postTitle,
    userId: userId,
    body:postBody,
    tags:tags,
    reactions:reactions
  })
})
  .then(res => res.json())
  .then((post)=>{addPost(post)});
  
  navigate("/")
  }

  return <form className="create-post" onSubmit={handleSubmit}>
    
    <div className="mb-3">
      <label htmlFor="userId" className="form-label">Enter your user Id here</label>
      <input type="text" ref={userIdElem} className="form-control" id="userId"
      placeholder="your user id" 
      />
    </div>

    <div className="mb-3">
      <label htmlFor="title" className="form-label">Post Title</label>
      <input type="text" ref={postTitleElem} className="form-control" id="title"
      placeholder="How are you feeling today..." 
      />
    </div>

    <div className="mb-3">
      <label htmlFor="body" className="form-label">Post Content</label>
      <textarea rows={5} type="text" ref={postBodyElem} className="form-control" id="body"
      placeholder="tell us about it.." 
      />
    </div>

    <div className="mb-3">
      <label htmlFor="tags" className="form-label">Enter yours hashtags here</label>
      <input type="text" ref={tagsElem} className="form-control" id="tags"
      placeholder="enter your tags useing space..." 
      />
    </div>

    <div className="mb-3">
      <label htmlFor="reactions" className="form-label">enter reactions </label>
      <input type="reactions" ref={reactionsElem} className="form-control" id="reactions"
      placeholder="Enter peoples reactions" 
      />
    </div>
    

    <button type="post" className="btn btn-primary">post</button>
  </form>
};

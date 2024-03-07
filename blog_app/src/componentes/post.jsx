import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { PostList } from "../store/post-list-store";
export default function Post ({post}){
  
  const {deletePost} = useContext(PostList);

    return <div className="card post-card" style={{width: "30rem"}}>
    <div className="card-body">
      <h5 className="card-title">{post.title}</h5>
      <p className="card-text">{post.body}</p>
      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" onClick={()=>deletePost(post.id)}>
      <MdDelete/>
      </span>
      {
        post.tags.map((tag) => (
          <span  key={tag} className="badge text-bg-primary hashtag">{tag}</span>
        ))
      }

    <div className="alert alert-warning reactions" role="alert">
      This post is reacted by {post.reactions} peoples.
    </div>
    </div>
  </div>
}
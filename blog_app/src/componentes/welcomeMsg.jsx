export default function WelcomeMsg ({onGetPostClick}){
    return (
        <center style={{margin:"50px"}}><h1>There are No Post</h1>
        <button onClick={onGetPostClick} type="button" className="btn btn-primary">Get post from server</button>
        
        </center>
    )
}
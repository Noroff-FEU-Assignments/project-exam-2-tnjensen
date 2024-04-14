import {url} from '../../constants/api.js';
import './posts.scss';
import useApi from '../../hooks/useApi.js';
import Post from '../post/Post.jsx';

function Posts(){
    const {data:posts, isLoading,isError} = useApi(url);

    if(isLoading){
        return <div>Loading...</div>
    }
    if(isError){
        return <div>Error loading posts.</div>
    }
    return(
        <div className="posts">
            {posts.map((post) => {
                return <Post key={post.id} post={post} />
            })}
        </div>
    )
}
export default Posts;
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation} from "react-router-dom";

const Comments = (props) =>{
     const [allComments, setAllComments] = useState([{}])
    useEffect(()=>{
        fetchAllComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const fetchAllComments = async () =>{
        try{
          const response = await axios
            .get('http://localhost:3000/workout/comments/'+props.workout.id,{ crossdomain: true }
        )
        setAllComments(response.data)
        } catch (error){
          console.log(error);
        }
    }
    const path = useLocation()
    const [comment, setComment] = useState({
        author:"",
        body:"",
        workout_id:""
    })

    const inpuHandler = (event) =>{
        const { name, value } = event.target;
        setComment((prevProps) => ({
          ...prevProps,
          [name]: value
        }));
    }
    const submitHandler = (event) =>{
        event.preventDefault();
        console.log(comment);
        comment.author=localStorage.getItem('userEmail')
        comment.workout_id=props.workout.id
        axios.post('http://127.0.0.1:3000/workout/comments', comment,{
            headers: {
            'Authorization': `${localStorage.getItem('token')}`
          }
        }).then((res)=>{
            console.log(path.pathname);
            fetchAllComments()
            setComment({ 
                author:"",
                body:"",
                workout_id:""})
        }).catch((error) =>{
            console.log(error);
        })
    }
    return < >
    <h4> Comments:</h4>
    {
        Object.keys(allComments).length >0 ? <div>{
            allComments.map((allComment) => <p>{allComment.user}: {allComment.body}</p>)
            }</div>: <p>No Comments Yet </p>
    }
    <form onSubmit={submitHandler}>
        <input type="text" name="body" placeholder="Comment here" value={comment.body} onChange={inpuHandler} required/>
        <input type="submit" value="submit" />
    </form>
    </>
}

export default Comments;
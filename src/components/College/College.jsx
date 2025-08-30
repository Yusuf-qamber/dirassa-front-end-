import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const College = ()=>{
const { college } = useParams()
  return(
    <>
    <h1>{college.toUpperCase()} College</h1>
    <ul>
      <li><Link to={`/${college}/notes`}>Notes</Link></li>
    </ul>
    </>
  )
}

export default College
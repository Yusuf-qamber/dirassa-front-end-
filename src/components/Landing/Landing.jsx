import { Link } from 'react-router-dom';


const colleges = ["it", "business", "science", "law","engineering","art"];


const Landing = () =>{
return(
<>
<h1>Colleges</h1>
<div className="landing-container">
      <div className="college-list">
        {colleges.map((college,index) => (
          <Link
            key={index}
            to={`/${college}`} 
            className="college-card"
            
          >
            <br />
            {college.toUpperCase()}
          </Link>
        ))}
      </div>
    </div>
</>


)


}

export default Landing;
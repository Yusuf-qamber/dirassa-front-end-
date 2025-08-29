import { Link } from 'react-router-dom';


const colleges = ["IT", "Business", "Science", "Law","Engineering","Art"];


const Landing = () =>{
return(
<>
<h1>Colleges</h1>
<div className="landing-container">
      <div className="college-list">
        {colleges.map((college,index) => (
          <Link
            key={index}
            to={`/${college.toLowerCase()}`} 
            className="college-card"
            
          >
            <br />
            {college}
          </Link>
        ))}
      </div>
    </div>
</>


)


}

export default Landing;
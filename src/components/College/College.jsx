import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./College.scss";

const College = () => {
  const { college } = useParams();

  return (
    <main className="college-page">
      <h1 className="college-title">{college.toUpperCase()} College</h1>
      
      <section className="college-grid">
        <Link to={`/${college}/notes`} className="college-card">
          <div className="college-card__content">
            <h2>📘 Notes</h2>
            <p>Browse, upload, and share study notes with peers.</p>
          </div>
        </Link>

        <Link to={`/${college}/events`} className="college-card">
          <div className="college-card__content">
            <h2>📅 Events</h2>
            <p>Stay updated with upcoming college events.</p>
          </div>
        </Link>
      </section>
    </main>
  );
};

export default College;

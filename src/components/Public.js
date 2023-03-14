import { Link } from "react-router-dom";

const Public = () => {

  const content = (

    <section className="public">
      <header>
        <h1>Welcome to <span className="nowrap">Dan D. Repairs!</span></h1>
      </header>
      <main className="public__main">
        <p>
          Located in Beautiful Downtown Jogja City, Dan D. Repairs provides a trained staff ready to meet your tech repair needs.
        </p>
        <address className="public__addr">
          Dan D. Repairs<br />
          Jogja Main Road<br />
          Jogja City, DIY 12345<br />
          <a href="tel:+622741234444">(0274) 123-4444</a>
        </address>
        <br />
        <p>Owner: Haa Dhee</p>
      </main>
      <footer>
        <Link to="/login">Employee Login</Link>
      </footer>
    </section>

  )
  
  return content
}

export default Public
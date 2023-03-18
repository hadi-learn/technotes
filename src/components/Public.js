import { Link } from "react-router-dom";

const Public = () => {

  const content = (

    <section className="public">
      <header>
        <h1>Selamat Datang di <span className="nowrap">Jog-Tron Repairs</span></h1>
      </header>
      <main className="public__main">
        <p>
          Berpusat di kota Yogyakarta dengan teknisi ahli yang handal dan berpengalaman dapat memenuhi kebutuhan reparasi alat elektronik Anda
        </p>
        <address className="public__addr">
          JogTron Repairs<br />
          Jalan Jend. Sudirman<br />
          Kota Yogyakarta, DI. Yogyakarta 12345<br />
          <a href="tel:+622741234444">(0274) 123-4444</a>
        </address>
        <br />
        <p>Pemilik: Haa Dhee</p>
      </main>
      <footer>
        <Link to="/login">Employee Login</Link>
      </footer>
    </section>

  )
  
  return content
}

export default Public
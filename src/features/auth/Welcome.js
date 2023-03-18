import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const Welcome = () => {

  const { username, isManager, isAdmin } = useAuth()

  const date = new Date()
  const today = new Intl.DateTimeFormat('ID', { dateStyle: 'full', timeStyle: 'short'}).format(date)
  const time = date.getHours()
  const greetTime = 
  time < 10 ? 'Pagi' 
    : time < 14 ? 'Siang' 
    : time < 18 ? 'Sore' 
    : 'Malam'

  const content = (

    <section>
      <p>{today} WIB</p>

      <h1>Welcome, selamat {greetTime} {username}</h1><br></br>

      <p><Link to='/dash/notes'>Tampilkan Notes</Link></p>

      <p><Link to='/dash/notes/new'>Tambah Note Baru</Link></p><br></br>
      
      {(isManager || isAdmin) && <p><Link to='/dash/users'>Tampilkan Users</Link></p>}

      {(isManager || isAdmin) && <p><Link to='/dash/users/new'>Tambah User Baru</Link></p>}
    </section>

  )

  return content
}

export default Welcome
import { Link } from "react-router-dom"

const Welcome = () => {

  const date = new Date()
  const today = new Intl.DateTimeFormat('ID', { dateStyle: 'full', timeStyle: 'short'}).format(date)

  const content = (

    <section>
      <p>{today} WIB</p>

      <h1>Welcome!</h1>

      <p><Link to='/dash/notes'>View techNotes</Link></p>

      <p><Link to='/dash/notes/new'>Add New techNote</Link></p>
      
      <p><Link to='/dash/users'>View User Settings</Link></p>

      <p><Link to='/dash/users/new'>Add New User</Link></p>
    </section>

  )

  return content
}

export default Welcome
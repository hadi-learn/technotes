import { useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"

import { useSendLogoutMutation } from "../features/auth/authApiSlice"

const DASH_REGEX = /^\/dash(\/)?$/
  const NOTES_REGEX = /^\/dash\/notes(\/)?$/
  const USERS_REGEX = /^$\/dash\/users(\/)?/

const DashHeader = () => {

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) navigate('/')
  }, [isSuccess, navigate])

  if (isLoading) return <p>Logging Out...</p>

  if (isError) return <p>Error: {error.data?.message}</p>

  let dashClass = null
  if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
    dashClass = "dash-header__container--small"
  }

  const logoutButton = (
    <button
      className="icon-button"
      title="Logout"
      onClick={() => sendLogout()}
    >
      <FontAwesomeIcon icon={faArrowRightFromBracket} />
    </button>
  )

  const content = (

    <header className={`dash-header ${dashClass}`}>
      <div className="dash-header__container">
        <Link to="/dash">
          <h1 className="dash-header__title">techNotes</h1>
        </Link>
        <nav className="dash-header__nav">
          {/* add more button later */}
          {logoutButton}
        </nav>
      </div>
    </header>

  )
  return content
}

export default DashHeader
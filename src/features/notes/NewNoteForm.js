import { useState, useEffect } from "react"
import { useAddNewNoteMutation } from "./notesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave } from "@fortawesome/free-solid-svg-icons"

const TITLE_REGEX = /^[A-z ]{3,50}$/

const NewNoteForm = ({ users }) => {

  const [addNewNote, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewNoteMutation()

  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [validTitle, setValidTitle] = useState(false)
  const [text, setText] = useState('')
  const [userId, setUserId] = useState('')

  useEffect(() => {
    setValidTitle(TITLE_REGEX.test(title))
  }, [title])

  useEffect(() => {
    if (isSuccess) {
      setTitle('')
      setText('')
      setUserId('')
      navigate('/dash/notes')
    }
  }, [isSuccess, navigate])

  const onTitleChanged = e => setTitle(e.target.value)
  const onTextChanged = e => setText(e.target.value)
  const onUserIdChanged = e => setUserId(e.target.value)

  const canSave = validTitle && text && userId && !isLoading

  const onSaveNoteClicked = async (e) => {
    e.preventDefault()
    if (canSave) {
      await addNewNote({
        title: title,
        text: text,
        user: userId
      })
    }
  }

  const usersOptions = users.map(user => (
    <option
      key={user._id}
      value={user._id}
    >
      {user.username}
    </option>
  ))

  const errClass = isError ? 'errmsg' : 'offscreen'
  const validTitleClass = !validTitle ? 'form__input--incomplete' : ''
  const validTextClass = !text ? 'form__input--incomplete' : ''

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveNoteClicked}>

        <div className="form__title-row">
          <h2>New Note</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>

        <label className="form__label" htmlFor="title">
          Title: <span>[3-50 letters]</span>
        </label>
        <input 
          id="title"
          className={`form__input ${validTitleClass}`}
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        />

        <label className="form__label" htmlFor="text">
          Content:
        </label>
        <textarea 
          id="text"
          className={`form__input form__input--text ${validTextClass}`}
          name="text"
          value={text}
          onChange={onTextChanged}
        />

        <label htmlFor="username">
          ASSIGNED USER:
        </label>
        <select
          id="username"
          name="username"
          className="form__select"
          value={userId}
          onChange={onUserIdChanged}
        >
          {usersOptions}
        </select>

      </form>
    </>
  )

  return content
}

export default NewNoteForm
import { useState, useEffect } from "react"
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"

const TITLE_REGEX = /^[A-z ]{3,50}$/

const EditNoteForm = ({ note, users }) => {

  const { isManager, isAdmin } = useAuth()

  const [updateNote, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateNoteMutation()

  const [deleteNote, {
    isSuccess: isDelSuccess,
    isError: isDelError,
    error: delError
  }] = useDeleteNoteMutation()

  const navigate = useNavigate()

  const [title, setTitle] = useState(note?.title)
  const [validTitle, setValidTitle] = useState(false)
  const [text, setText] = useState(note?.text)
  const [completed, setCompleted] = useState(note?.completed)
  const [userId, setUserId] = useState(note?.user)

  useEffect(() => {
    setValidTitle(TITLE_REGEX.test(title))
  }, [title])

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle('')
      setText('')
      setUserId('')
      navigate('/dash/notes')
    }
  }, [isSuccess, isDelSuccess, navigate])

  const onTitleChanged = e => setTitle(e.target.value)
  const onTextChanged = e => setText(e.target.value)
  const onCompletedChanged = () => setCompleted(prev => !prev)
  const onUserIdChanged = e => setUserId(e.target.value)

  const onSaveNoteClicked = async () => {
    // console.log(userId)
    await updateNote({
      id: note.id,
      title: title,
      text: text,
      completed: completed,
      user: userId
    })
  }

  const onDeleteNoteClicked = async (e) => {
    await deleteNote({ id: note.id })
  }

  const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
  const updated = new Date(note.updatedAt).toLocaleString('ID', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

  const usersOptions = users.map(user => (
    <option
      key={user.id}
      value={user.id}
    >
      {user.username}
    </option>
  ))

  const canSave = [validTitle, text, userId].every(Boolean) && !isLoading

  const errClass = isError || isDelError ? 'errmsg' : 'offscreen'
  const validTitleClass = !validTitle ? 'form__input--incomplete' : ''
  const validTextClass = !text ? 'form__input--incomplete' : ''

  const errContent = (error?.data?.message || delError?.data?.message) ?? ''

  const deleteButton = (
    (isAdmin | isManager)
    ? <button
        className="icon-button"
        title="Delete"
        onClick={onDeleteNoteClicked}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    : null
  )

  const content = (

    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={e => e.preventDefault()}>

        <div className="form__title-row">
          <h2>Edit Note #{note.ticket}</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSaveNoteClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            {deleteButton}
          </div>
        </div>

        <label className="form__label" htmlFor="note-title">
          Judul Pekerjaan: <span className="nowrap">[3-50 huruf]</span>
        </label>
        <input 
          id="note-title"
          className={`form_input ${validTitleClass}`}
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        />

        <label className="form__label" htmlFor="note-text">
          Detail Pekerjaan:
        </label>
        <textarea 
          id="note-text"
          className={`form__input form__iput--text ${validTextClass}`}
          name="text"
          value={text}
          onChange={onTextChanged}
        />

        <div className="form__row">
          <div className="form__divider">
            <label className="form_label form__checkbox-container" htmlFor="note-completed">
            Selesai..?:
            <input 
              id="note-completed"
              className="form__checkbox"
              name="note-completed"
              type="checkbox"
              checked={completed}
              onChange={onCompletedChanged}
            />
            </label>

            <label className="form__label form__checkbox-container" htmlFor="note-username">
              Pilih Teknisi:
            </label>
            <select
              id="note-username"
              className="form__select"
              name="username"
              value={userId}
              onChange={onUserIdChanged}
            >
              {usersOptions}
            </select>
          </div>
          <div className="form__divider">
            <p className="form__created">Created: <br />{created}</p>
            <p className="form__updated">Updated: <br />{updated}</p>
          </div>
        </div>

        

      </form>
    </>

  )

  return content
}

export default EditNoteForm
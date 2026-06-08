import NoteItem from './NoteItem'

function NoteList({ notes, setNotes }) {
  if (notes.length === 0) {
    return <p className="empty">Aucune annonce pour le moment.</p>
  }

  return (
    <ul className="item-list">
      {notes.map(note => (
        <NoteItem key={note.id} note={note} setNotes={setNotes} />
      ))}
    </ul>
  )
}

export default NoteList

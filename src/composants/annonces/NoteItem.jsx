import { useState } from 'react'
import { supabase } from '../../services/supabase'

function NoteItem({ note, setNotes }) {
  const [enModification, setEnModification] = useState(false)
  const [contenu, setContenu] = useState(note.contenu)
  const [auteur, setAuteur] = useState(note.auteur)

  const handleDelete = async () => {
    await supabase.from('notes').delete().eq('id', note.id)
    setNotes(prev => prev.filter(n => n.id !== note.id))
  }

  const handleUpdate = async () => {
    const { data } = await supabase
      .from('notes')
      .update({ contenu, auteur })
      .eq('id', note.id)
      .select()

    if (data) setNotes(prev => prev.map(n => n.id === note.id ? data[0] : n))
    setEnModification(false)
  }

  if (enModification) {
    return (
      <li className="note-item">
        <input value={contenu} onChange={(e) => setContenu(e.target.value)} />
        <input value={auteur} onChange={(e) => setAuteur(e.target.value)} />
        <div className="btn-group">
          <button onClick={handleUpdate} className="btn-save">💾 Sauvegarder</button>
          <button onClick={() => setEnModification(false)} className="btn-cancel">Annuler</button>
        </div>
      </li>
    )
  }

  return (
    <li className="note-item">
      <p className="note-contenu">"{note.contenu}"</p>
      <small>— {note.auteur} · {new Date(note.date).toLocaleDateString()}</small>
      <div className="btn-group">
        <button onClick={() => setEnModification(true)} className="btn-edit">✏️ Modifier</button>
        <button onClick={handleDelete} className="btn-delete">🗑️ Supprimer</button>
      </div>
    </li>
  )
}

export default NoteItem

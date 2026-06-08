import { useState } from 'react'
import { supabase } from '../../services/supabase'

function NoteForm({ setNotes }) {
  const [contenu, setContenu] = useState('')
  const [auteur, setAuteur] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!contenu || !auteur) return

    const { data } = await supabase
      .from('notes')
      .insert([{ contenu, auteur, date: new Date().toISOString() }])
      .select()

    if (data) setNotes(prev => [...prev, data[0]])
    setContenu('')
    setAuteur('')
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>📌 Nouvelle annonce</h3>
      <input
        type="text"
        placeholder="Votre message..."
        value={contenu}
        onChange={(e) => setContenu(e.target.value)}
      />
      <input
        type="text"
        placeholder="Votre prénom"
        value={auteur}
        onChange={(e) => setAuteur(e.target.value)}
      />
      <button type="submit" className="btn-primary">Publier</button>
    </form>
  )
}

export default NoteForm

import { useState } from 'react'
import { supabase } from '../../services/supabase'

function TaskForm({ setTaches }) {
  const [titre, setTitre] = useState('')
  const [description, setDescription] = useState('')
  const [assignee, setAssignee] = useState('')
  const [date_echeance, setDateEcheance] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!titre) return

    const { data } = await supabase
      .from('taches')
      .insert([{ titre, description, assignee, date_echeance, est_complete: false }])
      .select()

    if (data) setTaches(prev => [...prev, data[0]])
    setTitre('')
    setDescription('')
    setAssignee('')
    setDateEcheance('')
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>➕ Nouvelle tâche</h3>
      <input
        type="text"
        placeholder="Titre de la tâche *"
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Assignée à"
        value={assignee}
        onChange={(e) => setAssignee(e.target.value)}
      />
      <input
        type="date"
        value={date_echeance}
        onChange={(e) => setDateEcheance(e.target.value)}
      />
      <button type="submit" className="btn-primary">Ajouter</button>
    </form>
  )
}

export default TaskForm

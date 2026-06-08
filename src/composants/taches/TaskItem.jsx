import { useState } from 'react'
import { supabase } from '../../services/supabase'

function TaskItem({ tache, setTaches }) {
  const [enModification, setEnModification] = useState(false)
  const [titre, setTitre] = useState(tache.titre)
  const [description, setDescription] = useState(tache.description)
  const [assignee, setAssignee] = useState(tache.assignee)

  const handleDelete = async () => {
    await supabase.from('taches').delete().eq('id', tache.id)
    setTaches(prev => prev.filter(t => t.id !== tache.id))
  }

  const handleUpdate = async () => {
    const { data } = await supabase
      .from('taches')
      .update({ titre, description, assignee })
      .eq('id', tache.id)
      .select()

    if (data) setTaches(prev => prev.map(t => t.id === tache.id ? data[0] : t))
    setEnModification(false)
  }

  const toggleComplete = async () => {
    const { data } = await supabase
      .from('taches')
      .update({ est_complete: !tache.est_complete })
      .eq('id', tache.id)
      .select()

    if (data) setTaches(prev => prev.map(t => t.id === tache.id ? data[0] : t))
  }

  if (enModification) {
    return (
      <li className="task-item">
        <input value={titre} onChange={(e) => setTitre(e.target.value)} />
        <input value={description} onChange={(e) => setDescription(e.target.value)} />
        <input value={assignee} onChange={(e) => setAssignee(e.target.value)} />
        <div className="btn-group">
          <button onClick={handleUpdate} className="btn-save">💾 Sauvegarder</button>
          <button onClick={() => setEnModification(false)} className="btn-cancel">Annuler</button>
        </div>
      </li>
    )
  }

  return (
    <li className={`task-item ${tache.est_complete ? 'complete' : ''}`}>
      <div className="task-header">
        <h3>{tache.titre}</h3>
        <span className={`badge ${tache.est_complete ? 'badge-green' : 'badge-blue'}`}>
          {tache.est_complete ? '✅ Terminée' : '⏳ En cours'}
        </span>
      </div>
      {tache.description && <p>{tache.description}</p>}
      <small>👤 {tache.assignee} · 📅 {tache.date_echeance}</small>
      <div className="btn-group">
        <button onClick={toggleComplete} className="btn-toggle">
          {tache.est_complete ? 'Rouvrir' : 'Terminer'}
        </button>
        <button onClick={() => setEnModification(true)} className="btn-edit">✏️ Modifier</button>
        <button onClick={handleDelete} className="btn-delete">🗑️ Supprimer</button>
      </div>
    </li>
  )
}

export default TaskItem

import { useState, useEffect } from 'react'
import { supabase } from '../services/supabase'
import TaskForm from '../composants/taches/TaskForm'
import TaskList from '../composants/taches/TaskList'

function Taches() {
  const [taches, setTaches] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('taches').select('*').order('id', { ascending: false })
      if (data) setTaches(data)
    }
    getData()
  }, [])

  const enCours = taches.filter(t => !t.est_complete)
  const terminees = taches.filter(t => t.est_complete)

  return (
    <div className="page">
      <div className="page-header">
        <h1>✅ Gestion des tâches</h1>
        <p className="subtitle">{enCours.length} en cours · {terminees.length} terminées</p>
      </div>

      <div className="two-col">
        <div>
          <h2>Ajouter une tâche</h2>
          <TaskForm setTaches={setTaches} />
        </div>
        <div>
          <h2>Liste des tâches</h2>
          <TaskList taches={taches} setTaches={setTaches} />
        </div>
      </div>
    </div>
  )
}

export default Taches

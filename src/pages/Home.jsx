import { useState, useEffect } from 'react'
import { supabase } from '../services/supabase'
import NoteForm from '../composants/annonces/NoteForm'
import NoteList from '../composants/annonces/NoteList'

function Home() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('notes').select('*').order('date', { ascending: false })
      if (data) setNotes(data)
    }
    getData()
  }, [])

  return (
    <div className="page">
      <div className="page-header">
        <h1>🏡 Tableau de bord</h1>
        <p className="subtitle">Bienvenue dans votre espace colocation</p>
      </div>

      <div className="two-col">
        <div>
          <h2>📌 Annonces</h2>
          <NoteForm setNotes={setNotes} />
        </div>
        <div>
          <h2>📋 Dernières annonces</h2>
          <NoteList notes={notes} setNotes={setNotes} />
        </div>
      </div>
    </div>
  )
}

export default Home

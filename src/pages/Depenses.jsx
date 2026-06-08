import { useState, useEffect } from 'react'
import { supabase } from '../services/supabase'
import ExpenseForm from '../composants/depenses/ExpenseForm'
import ExpenseList from '../composants/depenses/ExpenseList'

function Depenses() {
  const [depenses, setDepenses] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('depenses').select('*').order('id', { ascending: false })
      if (data) setDepenses(data)
    }
    getData()
  }, [])

  return (
    <div className="page">
      <div className="page-header">
        <h1>💰 Gestion des dépenses</h1>
        <p className="subtitle">{depenses.length} dépense(s) enregistrée(s)</p>
      </div>

      <div className="two-col">
        <div>
          <h2>Ajouter une dépense</h2>
          <ExpenseForm setDepenses={setDepenses} />
        </div>
        <div>
          <h2>Liste des dépenses</h2>
          <ExpenseList depenses={depenses} setDepenses={setDepenses} />
        </div>
      </div>
    </div>
  )
}

export default Depenses

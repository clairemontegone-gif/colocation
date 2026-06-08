import { useState } from 'react'
import { supabase } from '../../services/supabase'

function ExpenseItem({ depense, setDepenses }) {
  const [enModification, setEnModification] = useState(false)
  const [montant, setMontant] = useState(depense.montant)
  const [payeur, setPayeur] = useState(depense.payeur)
  const [categorie, setCategorie] = useState(depense.categorie)
  const [description, setDescription] = useState(depense.description)

  const handleDelete = async () => {
    await supabase.from('depenses').delete().eq('id', depense.id)
    setDepenses(prev => prev.filter(d => d.id !== depense.id))
  }

  const handleUpdate = async () => {
    const { data } = await supabase
      .from('depenses')
      .update({ montant: parseFloat(montant), payeur, categorie, description })
      .eq('id', depense.id)
      .select()

    if (data) setDepenses(prev => prev.map(d => d.id === depense.id ? data[0] : d))
    setEnModification(false)
  }

  if (enModification) {
    return (
      <li className="expense-item">
        <input type="number" value={montant} onChange={(e) => setMontant(e.target.value)} />
        <input type="text" value={payeur} onChange={(e) => setPayeur(e.target.value)} />
        <input type="text" value={categorie} onChange={(e) => setCategorie(e.target.value)} />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        <div className="btn-group">
          <button onClick={handleUpdate} className="btn-save">💾 Sauvegarder</button>
          <button onClick={() => setEnModification(false)} className="btn-cancel">Annuler</button>
        </div>
      </li>
    )
  }

  return (
    <li className="expense-item">
      <div className="expense-header">
        <h3>{depense.categorie || 'Dépense'}</h3>
        <span className="montant">{depense.montant} $</span>
      </div>
      {depense.description && <p>{depense.description}</p>}
      <small>👤 {depense.payeur} · 📅 {depense.date}</small>
      <div className="btn-group">
        <button onClick={() => setEnModification(true)} className="btn-edit">✏️ Modifier</button>
        <button onClick={handleDelete} className="btn-delete">🗑️ Supprimer</button>
      </div>
    </li>
  )
}

export default ExpenseItem

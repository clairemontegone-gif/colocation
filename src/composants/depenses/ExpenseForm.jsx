import { useState } from 'react'
import { supabase } from '../../services/supabase'

function ExpenseForm({ setDepenses }) {
  const [montant, setMontant] = useState('')
  const [payeur, setPayeur] = useState('')
  const [categorie, setCategorie] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!montant || !payeur) return

    const { data } = await supabase
      .from('depenses')
      .insert([{ montant: parseFloat(montant), payeur, categorie, description, date }])
      .select()

    if (data) setDepenses(prev => [...prev, data[0]])
    setMontant('')
    setPayeur('')
    setCategorie('')
    setDescription('')
    setDate('')
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>➕ Nouvelle dépense</h3>
      <input
        type="number"
        placeholder="Montant ($) *"
        value={montant}
        onChange={(e) => setMontant(e.target.value)}
      />
      <input
        type="text"
        placeholder="Payé par *"
        value={payeur}
        onChange={(e) => setPayeur(e.target.value)}
      />
      <input
        type="text"
        placeholder="Catégorie (ex: Courses, Loyer)"
        value={categorie}
        onChange={(e) => setCategorie(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button type="submit" className="btn-primary">Ajouter</button>
    </form>
  )
}

export default ExpenseForm

import ExpenseItem from './ExpenseItem'

function ExpenseList({ depenses, setDepenses }) {
  if (depenses.length === 0) {
    return <p className="empty">Aucune dépense pour le moment.</p>
  }

  const total = depenses.reduce((sum, d) => sum + parseFloat(d.montant || 0), 0)

  return (
    <>
      <div className="total-card">
        💰 Total des dépenses : <strong>{total.toFixed(2)} $</strong>
      </div>
      <ul className="item-list">
        {depenses.map(depense => (
          <ExpenseItem key={depense.id} depense={depense} setDepenses={setDepenses} />
        ))}
      </ul>
    </>
  )
}

export default ExpenseList

import TaskItem from './TaskItem'

function TaskList({ taches, setTaches }) {
  if (taches.length === 0) {
    return <p className="empty">Aucune tâche pour le moment.</p>
  }

  return (
    <ul className="item-list">
      {taches.map(tache => (
        <TaskItem key={tache.id} tache={tache} setTaches={setTaches} />
      ))}
    </ul>
  )
}

export default TaskList

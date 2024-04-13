import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useContext } from "react"
import { CyclesContext } from "../../contexts/CyclesContext.tsx"
import { HistoryContainer, HistoryList, Status } from "./styles.ts"

export const History = () => {

  const { cycles } = useContext(CyclesContext)

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutos</td>
                <td>{formatDistanceToNow(cycle.startDate, { addSuffix: true, locale: ptBR })}</td>
                <td>
                  {cycle.endDate && <Status statusColor="green">Concluído</Status>}
                  {cycle.interruptedDate && <Status statusColor="red">Interrompido</Status>}
                  {(!cycle.endDate && !cycle.interruptedDate) && <Status statusColor="yellow">Em andamento</Status>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}

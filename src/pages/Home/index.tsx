import { zodResolver } from "@hookform/resolvers/zod"
import { HandPalm, Play } from "phosphor-react"
import { useContext } from "react"
import { FormProvider, useForm } from "react-hook-form"
import * as zod from 'zod'
import { CyclesContext } from "../../contexts/CyclesContext.tsx"
import { Countdown } from './components/Countdown/index.tsx'
import { NewCycleForm } from "./components/NewCycleForm/index.tsx"
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles.ts"

export const Home = () => {

  const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)

  const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number()
      .min(1, 'O ciclo precisa ser de no mínimo 60 minutos.')
      .max(60, 'O ciclo precisa ser de no máximo 60 minutos.')
  })

  type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    createNewCycle(data)
    reset()
  }


  const task = watch('task')
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>

        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}

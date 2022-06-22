import { Button } from "@mui/material";
import { useApplicationContext } from "apps/tracka/components/appContext";
import Link from "next/link";

const SelectClients = () => {
  const { value, setValue } = useApplicationContext()

  const handleClick = () => {
    setValue("activeStep", 1)
  }


  return (
    <div>
      <h1>SelectClients</h1>
      <h2>{value?.activeStep}</h2>
      <Link href="/onboarding/select-team">Select Clients</Link>
      <Button onClick={handleClick}>Set new Step</Button>
    </div>
  )
}
export default SelectClients;
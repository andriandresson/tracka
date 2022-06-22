import { Button } from "@mui/material";
import { useApplicationContext } from "apps/tracka/components/appContext";
import Link from "next/link";

const SelectTeam = () => {
  const { value, setValue } = useApplicationContext()
  return (
    <div style={{ color: '#fff' }}>
      <h1>SelectTeam</h1>
      <h2>{value?.team}</h2>

      <Button onClick={() => setValue("team", "Test Team")}> Set team </Button>

      <Link href="/onboarding/select-clients">Select Clients</Link>
    </div>

  );
}

export default SelectTeam;
import { withAuth } from "apps/tracka/components/withAuth";
import axios from "axios";
import { useQuery } from "react-query";


const fetchSpaces = async (teamId: string) => {
  const { data } = await axios.get(`api/spaces/${teamId}`);
  return data;
}

const SelectSpaces = ({ session }) => {
  const { user } = session;

  // Todo get selected team from context
  const defaultTeam = user["defaultTeam"];

  const { data, isLoading, isError } = useQuery("spaces", () => fetchSpaces(defaultTeam));

  return (
    <div style={{ color: '#fff' }}>
      {isLoading ? <div>Loading...</div> : null}
      {isError ? <div>Error</div> : null}
      {data && <h1>We got Data</h1>}
    </div>
  );
};


export default SelectSpaces
import { useQuery } from 'react-query';
import axios from 'axios';
import styled from '../styles/teams.module.css';

const Index = () => {
  const fetchTeams = async () => {
    const { data } = await axios.get('api/teams/');
    return data;
  };

  const { data, status } = useQuery('teams', fetchTeams);

  if (status === 'loading') {
    return <div>loading...</div>;
  }
  if (status === 'error') {
    return <div>Error</div>;
  }

  return (
    <div className={styled.center}>
      {data.teams.map((teams) => (
        <div className={styled.team} key={teams.id}>
          {teams.name}
        </div>
      ))}
    </div>
  );
};
Index.auth = true;
export default Index;
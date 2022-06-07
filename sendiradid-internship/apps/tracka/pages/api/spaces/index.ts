import { getSession } from 'next-auth/react';
import axios from 'axios';



const Handler = async (req, res) => {
  const session = await getSession({ req });
  const team = req.body.team

  if (!session || !session.user) {
    return res.status(401).json({ message: 'unathorized' });
  }
  const accessToken = session.user['accessToken'];
  const defaultTeamID = session.user['defaultTeam'];
  
  
  const config = {
    headers: {
      Authorization: accessToken,
    },
  };
  const respons = await axios.get(
    `https://api.clickup.com/api/v2/team/${team}/space?archived=false`,
    config
  );
  const { data } = respons;
  res.status(200).json(data);
};

export default Handler;
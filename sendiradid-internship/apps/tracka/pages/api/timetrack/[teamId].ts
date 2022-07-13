import { getSession } from 'next-auth/react';
import axios, { AxiosRequestConfig } from 'axios';

// Fetching all spaces for a team

const Handler = async (req, res) => {
  const session = await getSession({ req });
  const { query } = req;
  console.log('query', query);
  if (!session || !session.user) {
    return res.status(401).json({ message: 'unathorized' });
  }

  const apiToken = session.user['apiToken'];

  const { teamId, ...params } = query;
  if (!teamId) {
    return res.status(400).json({ message: 'no team id' });
  }

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: apiToken,
    },
    params,
  };
  try {
    const response = await axios.get(
      `https://api.clickup.com/api/v2/team/${teamId}/time_entries`,
      config
    );
    console.log(response);
    const { data } = response;
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'error' });
  }
};

export default Handler;

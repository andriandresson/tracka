import { getSession } from 'next-auth/react';
import axios from 'axios';

// Fetching all spaces for a team

const Handler = async (req, res) => {
  const session = await getSession({ req });

  if (!session || !session.user) {
    return res.status(401).json({ message: 'unathorized' });
  }

  const accessToken = session.user['accessToken'];

  const { spaceId = null } = req.query;
  if (!spaceId) {
    return res.status(400).json({ message: 'no space id' });
  }

  const config = {
    headers: {
      Authorization: accessToken,
    },
  };
  try {
    const response = await axios.get(
      `https://api.clickup.com/api/v2/space/${spaceId}/folder`,
      config
    );
    const { data } = response;
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'error' });
  }
};

export default Handler;
